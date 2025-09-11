import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Download,
  FileText,
  HelpCircle,
  ArrowLeft,
  Upload,
  Save,
  Trash2,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCheck,
  FileX,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Hash,
  Star,
  TrendingUp,
} from "lucide-react";
import * as XLSX from "xlsx";
import { useSnackbar } from "../../components/SnackbarProvider";
import Loading from "../../components/Loading";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Constants
const STANDARD_OPTIONS = [
  "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
  "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
  "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
  "EACH statement ALONE is sufficient.",
  "", // Optional 5th option
];

const OPTION_LABELS = ["A", "B", "C", "D", "E"];
const REQUIRED_HEADERS = [
  "context_text",
  "statement_1",
  "statement_2",
  "option_1",
  "option_2",
  "option_3",
  "option_4",
  "correct_answer",
  "difficulty",
  "topic",
  "level",
  "content_domain",
];

const INITIAL_QUESTION_DATA = {
  contextText: "",
  statements: ["", ""],
  options: [...STANDARD_OPTIONS],
  correctAnswer: null,
  explanation: "",
  difficulty: "",
  topic: "",
  level: "",
  type: "data sufficiency",
  contentDomain: "",
};

const SAMPLE_DATA = {
  set_id: "3",
  contextText:
    "Last week a certain comedian had an audience of 120 people for each of the afternoon performances and 195 people for each of the evening performances. What was the average (arithmetic mean) number of people in an audience if the comedian gave only afternoon and evening performances last week?",
  statements: [
    "Last week the comedian gave 3 more evening performances than afternoon performances.",
    "Last week the comedian gave twice as many evening performances as afternoon performances.",
  ],
  options: [...STANDARD_OPTIONS],
  correctAnswer: "A",
  explanation: "Statement (1) alone is sufficient because it allows us to set up equations to find the number of performances and calculate the average.",
  difficulty: "medium",
  topic: "Arithmetic",
  level: "L3",
  type: "data sufficiency",
  contentDomain: "Math",
};

// Utility function for form validation
const validateForm = (questionData) => {
  const errors = {};
  if (!questionData.contextText.trim()) {
    errors.contextText = "Context text is required";
  }
  if (questionData.statements.filter((s) => s.trim()).length < 2) {
    errors.statements = "At least two statements are required";
  }
  if (questionData.options.filter((o) => o.trim()).length < 4) {
    errors.options = "At least four options are required";
  }
  if (!questionData.correctAnswer) {
    errors.correctAnswer = "Please select a correct answer";
  }
  if (!questionData.topic) {
    errors.topic = "Topic is required";
  }
  if (!questionData.level) {
    errors.level = "Level is required";
  }
  return errors;
};

// Content Domain Dialog
const ContentDomainDialog = ({ isOpen, onClose, onConfirm }) => {
  const [domain, setDomain] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Select Content Domain</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Please select whether this question is Math-related or Non-Math related:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setDomain("Math")}
              className={`p-4 rounded-xl border-2 transition-all ${
                domain === "Math"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
            >
              Math Related
            </button>
            <button
              onClick={() => setDomain("Non-Math")}
              className={`p-4 rounded-xl border-2 transition-all ${
                domain === "Non-Math"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
            >
              Non-Math Related
            </button>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(domain)}
              disabled={!domain}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Context Input
const ContextInput = ({ contextText, onChange, error }) => (
  <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 transition-all duration-200">
    <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
      <HelpCircle className="w-5 h-5" />
      Question Context
    </h3>
    <textarea
      value={contextText}
      onChange={onChange}
      rows={4}
      className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm hover:border-emerald-400 transition-all duration-200 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Enter the main question text..."
      aria-label="Question context"
      aria-invalid={!!error}
      aria-describedby={error ? "context-error" : undefined}
    />
    {error && (
      <p id="context-error" className="text-red-500 text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);

// Sub-component: Statements Input
const StatementsInput = ({ statements, onChange, onAdd, onRemove }) => (
  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-blue-900">Statements</h3>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
        title="Add new statement"
        aria-label="Add new statement"
      >
        <Plus className="w-4 h-4" />
        Add Statement
      </button>
    </div>
    <div className="space-y-3">
      {statements.map((statement, index) => (
        <div key={index} className="flex items-start gap-2 animate-slideIn">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Statement {index + 1}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={statement}
                onChange={(e) => onChange(index, e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-blue-400 transition-all duration-200"
                placeholder="Enter statement..."
                aria-label={`Statement ${index + 1}`}
              />
              {statements.length > 2 && (
                <button
                  onClick={() => onRemove(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                  title="Remove statement"
                  aria-label={`Remove statement ${index + 1}`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Sub-component: Options Input
const OptionsInput = ({ options, correctAnswer, onChange, setCorrectAnswer, errors }) => (
  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-amber-900 flex items-center gap-2">
        <HelpCircle className="w-5 h-5" />
        Answer Choices
      </h3>
    </div>
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex items-start gap-2 animate-slideIn">
          <div className="flex items-center gap-3 w-full mb-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="answer-choices"
                checked={correctAnswer === OPTION_LABELS[index]}
                onChange={() => setCorrectAnswer(OPTION_LABELS[index])}
                className="text-amber-600 focus:ring-amber-500"
                disabled={!OPTION_LABELS[index]}
                aria-label={`Select option ${OPTION_LABELS[index] || index + 1} as correct`}
              />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {OPTION_LABELS[index] || index + 1}
              </span>
            </div>
            <input
              type="text"
              value={option}
              onChange={(e) => onChange(index, e.target.value)}
              className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm hover:border-amber-400 transition-all duration-200 ${
                errors.options ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter option..."
              aria-label={`Option ${OPTION_LABELS[index] || index + 1}`}
              aria-invalid={!!errors.options}
            />
          </div>
        </div>
      ))}
      {errors.options && (
        <p className="text-red-500 text-sm mt-1">{errors.options}</p>
      )}
      {errors.correctAnswer && (
        <p className="text-red-500 text-sm mt-1">{errors.correctAnswer}</p>
      )}
    </div>
  </div>
);

// Sub-component: File Upload
const FileUpload = ({
  excelFile,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  onClear,
  fileInputRef,
}) => (
  <div
    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
      dragOver
        ? "border-emerald-500 bg-emerald-100 scale-[1.01]"
        : "border-emerald-300 bg-emerald-50/30 hover:border-emerald-400"
    }`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <div className="relative inline-block">
      <Upload className="w-14 h-14 md:w-16 md:h-16 text-emerald-500 mx-auto mb-4" />
      {excelFile && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      {excelFile ? "File Selected!" : "Upload Excel File"}
    </h3>
    <p className="text-gray-500 mb-6 text-sm">
      {excelFile
        ? `${excelFile.name}`
        : "Drag and drop or click below to select (.xlsx, .xls only)"}
    </p>
    <input
      ref={fileInputRef}
      type="file"
      accept=".xlsx,.xls"
      onChange={onFileChange}
      className="hidden"
      id="excel-upload"
      aria-label="Upload Excel file"
    />
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <label
        htmlFor="excel-upload"
        className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg active:scale-95"
        title={excelFile ? "Change Excel file" : "Choose Excel file"}
      >
        {excelFile ? <FileCheck className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
        {excelFile ? "Change File" : "Choose File"}
      </label>
      {excelFile && (
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
          title="Clear selected file"
          aria-label="Clear selected file"
        >
          <X className="w-4 h-4" />
          Clear File
        </button>
      )}
    </div>
  </div>
);

// Sub-component: Validation Errors
const ValidationErrors = ({ errors, showAllErrors, toggleShowAllErrors }) => (
  <div className="p-5 bg-red-50 rounded-2xl shadow-inner border border-red-100 transition-all duration-200">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        Validation Errors ({errors.length})
      </h3>
      {errors.length > 5 && (
        <button
          onClick={toggleShowAllErrors}
          className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
          aria-label={showAllErrors ? "Show fewer errors" : "Show all errors"}
        >
          {showAllErrors ? "Show less" : "Show all"}
          {showAllErrors ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
    <div className="max-h-60 overflow-y-auto">
      <ul className="text-sm text-red-700 space-y-1 pl-2">
        {(showAllErrors ? errors : errors.slice(0, 5)).map((error, index) => (
          <li
            key={index}
            className="flex items-start gap-2 py-1 border-b border-red-100 last:border-b-0"
          >
            <span className="text-red-500 mt-0.5">•</span>
            <span>{error}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Sub-component: Preview Modal
const PreviewModal = ({ isOpen, data, currentIndex, onClose, onNext, onPrev }) => {
  if (!isOpen || !data || data.length === 0) return null;
  const question = data[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-labelledby="preview-modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 id="preview-modal-title" className="text-xl font-bold text-gray-800">
            Question Preview ({currentIndex + 1}/{data.length})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Close preview"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Context:</h4>
            <div className="p-4 bg-gray-50 rounded-lg border text-sm leading-relaxed">
              {question.contextText}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Statements:</h4>
            <div className="space-y-3">
              {question.statements.map((statement, index) => (
                statement && (
                  <div
                    key={index}
                    className="p-4 bg-blue-50 rounded-lg border transition-all duration-200"
                  >
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Statement {index + 1}:
                    </div>
                    <div className="text-sm">{statement}</div>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Options:</h4>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                option && (
                  <div
                    key={index}
                    className="p-4 bg-amber-50 rounded-lg border transition-all duration-200"
                  >
                    <div className="text-sm font-medium text-amber-800 mb-1">
                      Option {OPTION_LABELS[index]}:
                    </div>
                    <div className="text-sm">{option}</div>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Correct Answer:</h4>
            <div className="p-4 bg-emerald-50 rounded-lg border text-sm">
              {question.correctAnswer}.{" "}
              {question.options[OPTION_LABELS.indexOf(question.correctAnswer)]}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Topic:</h4>
            <div className="p-4 bg-purple-50 rounded-lg border text-sm">
              {question.topic}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Difficulty:</h4>
            <div className="p-4 bg-yellow-50 rounded-lg border text-sm">
              {question.difficulty}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Level:</h4>
            <div className="p-4 bg-blue-50 rounded-lg border text-sm">
              {question.level}
            </div>
          </div>
          {question.explanation && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Explanation:</h4>
              <div className="p-4 bg-gray-50 rounded-lg border text-sm">
                {question.explanation}
              </div>
            </div>
          )}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Content Domain:</h4>
            <div className="p-4 bg-purple-50 rounded-lg border text-sm">
              {question.contentDomain}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-6 border-t">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
              title="Previous question"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
              title="Next question"
              aria-label="Next question"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            title="Cancel"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const DataSufficiencyUploadPage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [questionData, setQuestionData] = useState(INITIAL_QUESTION_DATA);
  const [setId, setSetId] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [showDomainDialog, setShowDomainDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const fileInputRef = useRef(null);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const topicsList = [
    "Arithmetic",
    "Algebra",
    "Geometry",
    "Statistics",
    "Probability",
    "Word Problems",
    "Data Interpretation",
  ];

  const levels = ["L1", "L2", "L3", "L4", "L5"];
  const validContentDomains = ["Math", "Non-Math"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debounced input handler
  const debouncedHandleInputChange = useCallback(
    debounce((field, value) => {
      setQuestionData((prev) => ({ ...prev, [field]: value }));
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }, 300),
    []
  );

  const handleInputChange = (field, value) => {
    debouncedHandleInputChange(field, value);
  };

  const handleStatementChange = useCallback(
    (index, value) => {
      setQuestionData((prev) => {
        const newStatements = [...prev.statements];
        newStatements[index] = value;
        return { ...prev, statements: newStatements };
      });
      setFormErrors((prev) => ({ ...prev, statements: "" }));
    },
    []
  );

  const addStatement = useCallback(() => {
    setQuestionData((prev) => ({
      ...prev,
      statements: [...prev.statements, ""],
    }));
  }, []);

  const removeStatement = useCallback((index) => {
    if (questionData.statements.length <= 2) return;
    setQuestionData((prev) => {
      const newStatements = [...prev.statements];
      newStatements.splice(index, 1);
      return { ...prev, statements: newStatements };
    });
  }, [questionData.statements.length]);

  const handleOptionChange = useCallback(
    (index, value) => {
      setQuestionData((prev) => {
        const newOptions = [...prev.options];
        newOptions[index] = value;
        return { ...prev, options: newOptions };
      });
      setFormErrors((prev) => ({ ...prev, options: "" }));
    },
    []
  );

  const setCorrectAnswer = useCallback((label) => {
    setQuestionData((prev) => ({ ...prev, correctAnswer: label }));
    setFormErrors((prev) => ({ ...prev, correctAnswer: "" }));
  }, []);

  const loadSampleData = useCallback(() => {
    setQuestionData(SAMPLE_DATA);
    setSetId(SAMPLE_DATA.set_id || "");
    setFormErrors({});
    showSnackbar("Sample question loaded!", { type: "success" });
  }, [showSnackbar]);

  const clearForm = useCallback(() => {
    setQuestionData(INITIAL_QUESTION_DATA);
    setFormErrors({});
    setSetId("");
    showSnackbar("Form cleared", { type: "info" });
  }, [showSnackbar]);

  const isFormValid = useMemo(() => {
    return Object.keys(validateForm(questionData)).length === 0;
  }, [questionData]);

  const saveQuestion = useCallback(async (domain) => {
    const errors = validateForm(questionData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      showSnackbar("Please fix all errors before saving", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      const questionPayload = {
        set_id: setId || null,
        type: questionData.type,
        topic: questionData.topic,
        contextText: questionData.contextText,
        statements: questionData.statements.filter((s) => s.trim()),
        options: questionData.options.filter((o) => o.trim()),
        answer: questionData.correctAnswer,
        difficulty: questionData.difficulty,
        level: questionData.level,
        contentDomain: domain,
        explanation: questionData.explanation,
        metadata: {
          source: "manual",
          createdAt: new Date(),
        },
      };
      await axios.post(`${API_URL}/dataSufficiency/upload`, questionPayload);
      showSnackbar("Question saved to database!", { type: "success" });
      clearForm();
    } catch (err) {
      showSnackbar(
        "Error saving question: " + (err.response?.data?.error || err.message),
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  }, [questionData, setId, showSnackbar, clearForm]);

  const handleSaveWithDomain = useCallback(() => {
    const errors = validateForm(questionData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      showSnackbar("Please fix all errors before saving", { type: "error" });
      return;
    }
    setPendingAction(() => saveQuestion);
    setShowDomainDialog(true);
  }, [questionData, saveQuestion, showSnackbar]);

  const handleFileUpload = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.ms-excel"
      ) {
        showSnackbar("Please upload a valid Excel file (.xlsx or .xls)", {
          type: "error",
        });
        return;
      }
      setExcelFile(file);
      await previewExcelFile(file);
    },
    [showSnackbar]
  );

  const previewExcelFile = useCallback(
    async (file) => {
      if (!file) {
        showSnackbar("No file selected for preview", { type: "error" });
        return;
      }
      setLoading(true);
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length < 2) {
          setValidationErrors(["The Excel file is empty or has no data rows."]);
          setLoading(false);
          return;
        }

        const headers = jsonData[0].map((h) =>
          h ? h.toString().toLowerCase().trim() : ""
        );
        const missingHeaders = REQUIRED_HEADERS.filter((h) => !headers.includes(h));
        if (missingHeaders.length > 0) {
          setValidationErrors([
            `Missing required columns: ${missingHeaders.join(", ")}. Please add these columns to your Excel file and try again.`,
          ]);
          setLoading(false);
          return;
        }

        const errors = [];
        const processedQuestions = jsonData
          .slice(1)
          .map((row, idx) => {
            const rowObj = headers.reduce((obj, header, i) => {
              obj[header] =
                row[i] !== undefined && row[i] !== null ? row[i].toString() : "";
              return obj;
            }, {});

            if (!rowObj.context_text || !rowObj.context_text.trim()) {
              errors.push(
                `Row ${idx + 2}: Context text is missing. Please provide a valid context in the Excel file.`
              );
            }

            if (!rowObj.statement_1 || !rowObj.statement_1.trim()) {
              errors.push(
                `Row ${idx + 2}: Statement 1 is missing. Please provide a valid statement in the Excel file.`
              );
            }

            if (!rowObj.statement_2 || !rowObj.statement_2.trim()) {
              errors.push(
                `Row ${idx + 2}: Statement 2 is missing. Please provide a valid statement in the Excel file.`
              );
            }

            if (!rowObj.topic || !rowObj.topic.trim()) {
              errors.push(
                `Row ${idx + 2}: Topic is missing. Please provide a valid topic in the Excel file.`
              );
            }

            if (!rowObj.difficulty || !rowObj.difficulty.trim()) {
              errors.push(
                `Row ${idx + 2}: Difficulty is missing. Please provide a valid difficulty (easy, medium, hard) in the Excel file.`
              );
            }

            if (!rowObj.level || !rowObj.level.trim()) {
              errors.push(
                `Row ${idx + 2}: Level is missing. Please provide a valid level (L1, L2, L3, L4, L5) in the Excel file.`
              );
            }

            if (!rowObj.content_domain || !rowObj.content_domain.trim()) {
              errors.push(
                `Row ${idx + 2}: Content domain is missing. Please provide a valid content domain (Math or Non-Math) in the Excel file.`
              );
            } else if (!validContentDomains.includes(rowObj.content_domain.trim())) {
              errors.push(
                `Row ${idx + 2}: Invalid content domain "${rowObj.content_domain}". Please use "Math" or "Non-Math" in the Excel file.`
              );
            }

            const options = [];
            let optionIndex = 1;
            while (rowObj[`option_${optionIndex}`]) {
              const option = rowObj[`option_${optionIndex}`].toString().trim();
              if (option) options.push(option);
              optionIndex++;
            }

            if (options.length < 4) {
              errors.push(
                `Row ${idx + 2}: At least 4 options are required. Please provide at least 4 valid options in the Excel file.`
              );
            }

            const ca = rowObj.correct_answer.toString().trim().toUpperCase();
            if (!OPTION_LABELS.includes(ca)) {
              errors.push(
                `Row ${idx + 2}: Correct answer must be A, B, C, D, or E. Please provide a valid correct answer in the Excel file.`
              );
            }

            const statements = [];
            let statementIndex = 1;
            while (rowObj[`statement_${statementIndex}`]) {
              const statement = rowObj[`statement_${statementIndex}`].toString().trim();
              if (statement) statements.push(statement);
              statementIndex++;
            }

            if (statements.length < 2) {
              errors.push(
                `Row ${idx + 2}: At least 2 statements are required. Please provide at least 2 valid statements in the Excel file.`
              );
            }

            return {
              set_id: rowObj.set_id || "",
              contextText: rowObj.context_text || "",
              statements,
              options,
              correctAnswer: ca,
              topic: rowObj.topic || "",
              difficulty: rowObj.difficulty || "medium",
              level: rowObj.level || "L1",
              explanation: rowObj.explanation || "",
              type: "data sufficiency",
              contentDomain: rowObj.content_domain || "",
            };
          })
          .filter(
            (q) =>
              q.contextText &&
              q.statements.length >= 2 &&
              q.options.length >= 4 &&
              q.correctAnswer &&
              q.topic &&
              q.difficulty &&
              q.level &&
              q.contentDomain &&
              validContentDomains.includes(q.contentDomain)
          );

        if (processedQuestions.length === 0 && errors.length > 0) {
          errors.unshift(
            "No valid questions found in the file. Please fix the errors listed below and re-upload."
          );
        }

        setValidationErrors(errors);
        setPreviewData(processedQuestions);

        if (errors.length > 0) {
          showSnackbar(
            `File processed with ${errors.length} validation errors. Please fix the issues in the Excel file and try again.`,
            { type: "warning" }
          );
        } else {
          showSnackbar(`Preview ready! Found ${processedQuestions.length} valid questions.`, {
            type: "success",
          });
        }
      } catch (err) {
        showSnackbar("Error processing file: " + err.message, { type: "error" });
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  const processExcelFile = useCallback(
    async () => {
      if (!previewData || previewData.length === 0) {
        showSnackbar("No preview data to upload", { type: "error" });
        return;
      }
      if (validationErrors.length > 0) {
        showSnackbar(
          "Please fix validation errors in the Excel file before uploading",
          { type: "error" }
        );
        return;
      }
      setLoading(true);
      try {
        const updatedPreviewData = previewData.map((question, idx) => ({
          set_id: question.set_id || null,
          type: question.type,
          topic: question.topic,
          contextText: question.contextText,
          statements: question.statements.filter((s) => s.trim()),
          options: question.options.filter((o) => o.trim()),
          answer: question.correctAnswer,
          difficulty: question.difficulty,
          level: question.level,
          contentDomain: question.contentDomain,
          explanation: question.explanation,
          metadata: {
            source: "excel",
            createdAt: new Date(),
          },
        }));
        await axios.post(`${API_URL}/dataSufficiency/upload`, updatedPreviewData);
        showSnackbar(
          `Successfully uploaded ${updatedPreviewData.length} questions to database!`,
          { type: "success" }
        );
        setExcelFile(null);
        setPreviewData(null);
        setValidationErrors([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (err) {
        showSnackbar(
          "Error uploading file: " + (err.response?.data?.error || err.message),
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    },
    [previewData, validationErrors.length, showSnackbar]
  );

  const handleBulkUpload = useCallback(() => {
    if (!previewData || previewData.length === 0) {
      showSnackbar("No preview data to upload", { type: "error" });
      return;
    }
    if (validationErrors.length > 0) {
      showSnackbar(
        "Please fix validation errors in the Excel file before uploading",
        { type: "error" }
      );
      return;
    }
    processExcelFile();
  }, [previewData, validationErrors.length, processExcelFile, showSnackbar]);

  const handleDomainConfirm = useCallback(
    (domain) => {
      setShowDomainDialog(false);
      if (pendingAction && domain) {
        pendingAction(domain);
      }
      setPendingAction(null);
    },
    [pendingAction]
  );

  const downloadExcelTemplate = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const sampleData = [
      [
        "set_id",
        "context_text",
        "statement_1",
        "statement_2",
        "statement_3",
        "option_1",
        "option_2",
        "option_3",
        "option_4",
        "option_5",
        "correct_answer",
        "topic",
        "difficulty",
        "level",
        "explanation",
        "type",
        "content_domain",
      ],
      [
        SAMPLE_DATA.set_id,
        SAMPLE_DATA.contextText,
        ...SAMPLE_DATA.statements,
        "",
        ...SAMPLE_DATA.options,
        SAMPLE_DATA.correctAnswer,
        SAMPLE_DATA.topic,
        SAMPLE_DATA.difficulty,
        SAMPLE_DATA.level,
        SAMPLE_DATA.explanation,
        SAMPLE_DATA.type,
        SAMPLE_DATA.contentDomain,
      ],
      [
        "",
        "If x and y are integers, what is the value of x?",
        "x + y = 10",
        "x - y = 4",
        "x * y = 24",
        ...STANDARD_OPTIONS,
        "D",
        "Algebra",
        "medium",
        "L2",
        "Both statements together are sufficient to solve for x.",
        "data sufficiency",
        "Math",
      ],
    ];
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Data Sufficiency Questions");
    XLSX.writeFile(wb, "Data_Sufficiency_Template.xlsx");
    showSnackbar("Excel template downloaded", { type: "success" });
  }, [showSnackbar]);

  const clearFile = useCallback(() => {
    setExcelFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (!showPreviewModal) return;
      if (e.key === "ArrowRight") {
        setCurrentPreviewIndex((prev) =>
          prev < previewData.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentPreviewIndex((prev) =>
          prev > 0 ? prev - 1 : previewData.length - 1
        );
      } else if (e.key === "Escape") {
        setShowPreviewModal(false);
        setCurrentPreviewIndex(0);
      }
    },
    [showPreviewModal, previewData]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {loading && <Loading overlay text="Processing..." />}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50"
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <PieChart className="w-6 h-6 text-emerald-600 mr-2" />
              Data Sufficiency Vault
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Data Sufficiency Questions
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Create GMAT data sufficiency questions with statements and answer choices
                </p>
              </div>
              {activeTab === "single" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={loadSampleData}
                    className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Load sample question"
                    disabled={loading}
                  >
                    <Play className="w-4 h-4" />
                    Sample
                  </button>
                  <button
                    onClick={handleSaveWithDomain}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || !isFormValid}
                    title="Save question to database"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={clearForm}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    title="Clear all fields"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-4 py-2 font-medium text-sm md:text-base relative flex items-center gap-2 ${
                  activeTab === "single"
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
                aria-label="Single Question Tab"
              >
                <FileText className="w-4 h-4" />
                Single Question
                {activeTab === "single" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-4 py-2 font-medium text-sm md:text-base relative flex items-center gap-2 ${
                  activeTab === "bulk"
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
                aria-label="Bulk Upload Tab"
              >
                <Upload className="w-4 h-4" />
                Bulk Upload
                {activeTab === "bulk" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
                )}
              </button>
            </div>

            {activeTab === "single" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Set ID
                    </label>
                    <input
                      type="number"
                      value={setId}
                      onChange={(e) => setSetId(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter numeric Set ID (optional)"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={questionData.topic}
                      onChange={(e) => handleInputChange("topic", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                      required
                    >
                      <option value="">Select topic</option>
                      {topicsList.map((topic, index) => (
                        <option key={index} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                    {formErrors.topic && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.topic}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Difficulty <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={questionData.difficulty}
                      onChange={(e) => handleInputChange("difficulty", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                      required
                    >
                      <option value="">Select difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Level <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleInputChange("level", level)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all ${
                            questionData.level === level
                              ? "bg-emerald-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    {formErrors.level && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.level}</p>
                    )}
                  </div>
                </div>

                <ContextInput
                  contextText={questionData.contextText}
                  onChange={(e) => handleInputChange("contextText", e.target.value)}
                  error={formErrors.contextText}
                />
                <StatementsInput
                  statements={questionData.statements}
                  onChange={handleStatementChange}
                  onAdd={addStatement}
                  onRemove={removeStatement}
                />
                <OptionsInput
                  options={questionData.options}
                  correctAnswer={questionData.correctAnswer}
                  onChange={handleOptionChange}
                  setCorrectAnswer={setCorrectAnswer}
                  errors={formErrors}
                />

                <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 transition-all duration-200">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Explanation
                  </h3>
                  <textarea
                    value={questionData.explanation}
                    onChange={(e) => handleInputChange("explanation", e.target.value)}
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm hover:border-purple-400 transition-all duration-200"
                    placeholder="Enter explanation for the correct answer..."
                    aria-label="Question explanation"
                  />
                </div>
              </div>
            )}

            {activeTab === "bulk" && (
              <div className="space-y-6">
                <FileUpload
                  excelFile={excelFile}
                  dragOver={dragOver}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const files = e.dataTransfer.files;
                    if (files.length) handleFileUpload({ target: { files } });
                  }}
                  onFileChange={handleFileUpload}
                  onClear={clearFile}
                  fileInputRef={fileInputRef}
                />
                {previewData && previewData.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setShowPreviewModal(true)}
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                      title="Preview uploaded questions"
                      aria-label="Preview questions"
                    >
                      <FileText className="w-4 h-4" />
                      Preview Questions
                    </button>
                    <button
                      onClick={handleBulkUpload}
                      disabled={validationErrors.length > 0 || loading}
                      className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      title="Upload questions to database"
                      aria-label="Upload questions"
                    >
                      <Upload className="w-4 h-4" />
                      Upload {previewData.length} Questions
                    </button>
                  </div>
                )}
                {!excelFile && (
                  <div className="text-center">
                    <button
                      onClick={downloadExcelTemplate}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all text-sm md:text-base flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg transform hover:scale-105"
                      title="Download Excel template"
                      aria-label="Download Excel template"
                    >
                      <Download className="w-4 h-4" />
                      Download Excel Template
                    </button>
                  </div>
                )}
                {validationErrors.length > 0 && (
                  <ValidationErrors
                    errors={validationErrors}
                    showAllErrors={showAllErrors}
                    toggleShowAllErrors={() => setShowAllErrors(!showAllErrors)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <PreviewModal
        isOpen={showPreviewModal}
        data={previewData}
        currentIndex={currentPreviewIndex}
        onClose={() => {
          setShowPreviewModal(false);
          setCurrentPreviewIndex(0);
        }}
        onNext={() =>
          setCurrentPreviewIndex((prev) =>
            prev < previewData.length - 1 ? prev + 1 : 0
          )
        }
        onPrev={() =>
          setCurrentPreviewIndex((prev) =>
            prev > 0 ? prev - 1 : previewData.length - 1
          )
        }
      />
      <ContentDomainDialog
        isOpen={showDomainDialog}
        onClose={() => setShowDomainDialog(false)}
        onConfirm={handleDomainConfirm}
      />
    </div>
  );
};

DataSufficiencyUploadPage.propTypes = {
  useSnackbar: PropTypes.func.isRequired,
};

const styles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slideIn {
    animation: slideIn 0.2s ease-out;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default DataSufficiencyUploadPage;