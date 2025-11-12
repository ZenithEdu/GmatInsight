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
import ContentDomainDialog from "../components/ContentDomainDialog"; // Import the shared component

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Constants
const STANDARD_HEADERS = ["Fair", "Discussion"];
const STANDARD_ROWS = ["260", "271", "296", "306", "311"];

const REQUIRED_HEADERS = [
  "context_text",
  "instruction_text",
  "table_headers",
  "table_values",
  "correct_answers",
  "topic",
  "difficulty",
  "level",
  "content_domain", // Added
];

const INITIAL_QUESTION_DATA = {
  setId: "",
  contextText: "",
  instructionText: "",
  tableHeaders: ["Option 1", "Option 2"],
  tableValues: ["Value 1"],
  answers: {},
  topic: "",
  difficulty: "medium",
  level: "L1",
  explanation: "",
  contentDomain: "", // Added
};

const SAMPLE_DATA = {
  set_id: "1",
  contextText: `A committee recently held a planning meeting for a craft fair. The committee decided that the fair would occur on a Tuesday and that a public discussion about the fair would be held sometime after, also on a Tuesday.`,
  instructionText: `In the table, select for Fair a number of days between the planning meeting and the fair and select for Discussion a number of days between the planning meeting and the public discussion that would be jointly consistent with the given information. Make only two selections, one in each column.`,
  tableHeaders: STANDARD_HEADERS,
  tableValues: STANDARD_ROWS,
  answers: ["296", "260"], // Array of strings matching tableValues for each column
  topic: "Arithmetic",
  difficulty: "medium",
  level: "L3",
  explanation: "Explanation for the correct answers...",
  contentDomain: "Math", // Added for sample
};

// Utility function to convert array of correct answer values to object format
const convertAnswersToObject = (answersArray, tableValues) => {
  const answersObj = {};
  answersArray.forEach((value, colIndex) => {
    const rowIndex = tableValues.indexOf(value);
    if (rowIndex !== -1) {
      answersObj[`${rowIndex}-${colIndex}`] = true;
    }
  });
  return answersObj;
};

// Utility function for form validation
const validateForm = (questionData) => {
  const errors = {};
  if (!questionData.contextText.trim()) {
    errors.contextText = "Context text is required";
  }
  if (!questionData.instructionText.trim()) {
    errors.instructionText = "Instruction text is required";
  }
  if (questionData.tableHeaders.length < 1) {
    errors.tableHeaders = "At least one table header is required";
  }
  if (questionData.tableValues.length < 1) {
    errors.tableValues = "At least one table value is required";
  }
  if (!questionData.topic) {
    errors.topic = "Topic is required";
  }
  if (!questionData.level) {
    errors.level = "Level is required";
  }
  // Validate that each column has exactly one selected answer
  const selectedColumns = new Set(
    Object.keys(questionData.answers).map((key) => key.split("-")[1])
  );
  if (selectedColumns.size !== questionData.tableHeaders.length) {
    errors.answers = "Please select exactly one answer per column";
  }
  return errors;
};

// Sub-component: Context Input
const ContextInput = ({ contextText, onChange, error }) => (
  <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 transition-all duration-200">
    <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
      <HelpCircle className="w-5 h-5" />
      Context Text
    </h3>
    <textarea
      value={contextText}
      onChange={onChange}
      rows={4}
      className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm hover:border-emerald-400 transition-all duration-200 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Enter the context or background information..."
      aria-label="Context text"
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

// Sub-component: Instruction Input
const InstructionInput = ({ instructionText, onChange, error }) => (
  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 transition-all duration-200">
    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
      <HelpCircle className="w-5 h-5" />
      Instruction Text
    </h3>
    <textarea
      value={instructionText}
      onChange={onChange}
      rows={3}
      className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm hover:border-blue-400 transition-all duration-200 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder="Instructions for the student..."
      aria-label="Instruction text"
      aria-invalid={!!error}
      aria-describedby={error ? "instruction-error" : undefined}
    />
    {error && (
      <p id="instruction-error" className="text-red-500 text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);

// Sub-component: Table Headers Input
const TableHeadersInput = ({ tableHeaders, onChange, onAdd, onRemove, error }) => (
  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-amber-900">Table Headers</h3>
      <button
        onClick={onAdd}
        className="bg-amber-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-amber-700 transition-all duration-200 transform hover:scale-105"
        title="Add new header"
      >
        <Plus className="w-4 h-4" />
        Add Header
      </button>
    </div>
    <div className="space-y-3">
      {tableHeaders.map((header, index) => (
        <div key={index} className="flex items-start gap-2 animate-slideIn">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Header {index + 1}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={header}
                onChange={(e) => onChange(index, e.target.value)}
                className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm hover:border-amber-400 transition-all duration-200 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Header ${index + 1}`}
              />
              {tableHeaders.length > 1 && (
                <button
                  onClick={() => onRemove(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

// Sub-component: Table Values Input
const TableValuesInput = ({ tableValues, onChange, onAdd, onRemove, error }) => (
  <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 transition-all duration-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-purple-900">Table Values</h3>
      <button
        onClick={onAdd}
        className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-purple-700 transition-all duration-200 transform hover:scale-105"
        title="Add new value"
      >
        <Plus className="w-4 h-4" />
        Add Value
      </button>
    </div>
    <div className="space-y-3">
      {tableValues.map((value, index) => (
        <div key={index} className="flex items-start gap-2 animate-slideIn">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Value {index + 1}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm hover:border-purple-400 transition-all duration-200 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={`Value ${index + 1}`}
              />
              {tableValues.length > 1 && (
                <button
                  onClick={() => onRemove(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

// Sub-component: Table Preview
const TablePreview = ({ tableHeaders, tableValues, answers, setCorrectAnswer }) => (
  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
    <h4 className="font-semibold text-gray-800 mb-3">Table Preview:</h4>
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-300 mx-auto rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-emerald-50">
            {tableHeaders.map((header, colIndex) => (
              <th
                key={colIndex}
                className="border border-emerald-200 p-2 bg-emerald-50 text-sm font-medium text-emerald-800"
              >
                {header}
              </th>
            ))}
            <th className="border border-emerald-200 p-2 bg-emerald-100 text-sm font-medium text-emerald-800">
              Values
            </th>
          </tr>
        </thead>
        <tbody>
          {tableValues.map((value, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {tableHeaders.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-200 p-2 text-center"
                >
                  <input
                    type="radio"
                    name={`preview-column-${colIndex}`}
                    checked={Boolean(answers[`${rowIndex}-${colIndex}`])}
                    onChange={() => setCorrectAnswer(rowIndex, colIndex)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                    aria-label={`Select ${header} for ${value}`}
                  />
                </td>
              ))}
              <td className="border border-gray-200 p-2 text-center text-sm font-medium bg-gray-50">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <p className="text-gray-600 mb-6 text-sm">
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
          className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
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
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Instruction:</h4>
            <div className="p-4 bg-blue-50 rounded-lg border text-sm leading-relaxed">
              {question.instructionText}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Table:</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-emerald-50">
                    {question.tableHeaders.map((header, colIndex) => (
                      <th
                        key={colIndex}
                        className="border border-emerald-200 p-3 font-medium text-sm text-emerald-800"
                      >
                        {header}
                      </th>
                    ))}
                    <th className="border border-emerald-200 p-3 font-medium text-sm text-emerald-800 bg-emerald-100">
                      Values
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {question.tableValues.map((value, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                      {question.tableHeaders.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 p-3 text-center"
                        >
                          <input
                            type="radio"
                            name={`preview-column-${colIndex}`}
                            checked={Boolean(question.answers[`${rowIndex}-${colIndex}`])}
                            readOnly
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            aria-label={`Selected ${header} for ${value}`}
                          />
                        </td>
                      ))}
                      <td className="border border-gray-200 p-3 text-center font-medium bg-gray-50">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
const TwoPartAnalysisStructure = () => {
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
  const [showDomainDialog, setShowDomainDialog] = useState(false); // Added
  const [pendingAction, setPendingAction] = useState(null); // Added
  const fileInputRef = useRef(null);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

    const topicsList = [
    "Arithmetic",
    "Statistics",
    "Overlapping Sets",
    "Speed distance and Time",
    "Work rate",
    "Profit and Loss",
    "Ratios and Mixtures",
    "Logic Based",
    ];

  const levels = ["L1", "L2", "L3", "L4", "L5"];
  const validContentDomains = ["Math", "Non-Math"]; // Added

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleTableHeaderChange = useCallback(
    (index, value) => {
      setQuestionData((prev) => ({
        ...prev,
        tableHeaders: prev.tableHeaders.map((h, i) => (i === index ? value : h)),
        answers: {}, // Reset answers when headers change
      }));
      setFormErrors((prev) => ({ ...prev, answers: "" }));
    },
    []
  );

  const addTableHeader = useCallback(() => {
    setQuestionData((prev) => ({
      ...prev,
      tableHeaders: [...prev.tableHeaders, `Option ${prev.tableHeaders.length + 1}`],
      answers: {}, // Reset answers when adding a header
    }));
    setFormErrors((prev) => ({ ...prev, answers: "" }));
  }, []);

  const removeTableHeader = useCallback((index) => {
    if (questionData.tableHeaders.length > 1) {
      setQuestionData((prev) => ({
        ...prev,
        tableHeaders: prev.tableHeaders.filter((_, i) => i !== index),
        answers: {}, // Reset answers when removing a header
      }));
      setFormErrors((prev) => ({ ...prev, answers: "" }));
    }
  }, [questionData.tableHeaders.length]);

  const handleTableValueChange = useCallback(
    (index, value) => {
      setQuestionData((prev) => ({
        ...prev,
        tableValues: prev.tableValues.map((v, i) => (i === index ? value : v)),
        answers: {}, // Reset answers when values change
      }));
      setFormErrors((prev) => ({ ...prev, answers: "" }));
    },
    []
  );

  const addTableValue = useCallback(() => {
    setQuestionData((prev) => ({
      ...prev,
      tableValues: [...prev.tableValues, `Value ${prev.tableValues.length + 1}`],
      answers: {}, // Reset answers when adding a value
    }));
    setFormErrors((prev) => ({ ...prev, answers: "" }));
  }, []);

  const removeTableValue = useCallback((index) => {
    if (questionData.tableValues.length > 1) {
      setQuestionData((prev) => ({
        ...prev,
        tableValues: prev.tableValues.filter((_, i) => i !== index),
        answers: {}, // Reset answers when removing a value
      }));
      setFormErrors((prev) => ({ ...prev, answers: "" }));
    }
  }, [questionData.tableValues.length]);

  const setCorrectAnswer = useCallback((rowIndex, colIndex) => {
    setQuestionData((prev) => {
      const newAnswers = { ...prev.answers };
      // Remove existing selection in this column
      Object.keys(newAnswers).forEach((key) => {
        if (key.endsWith(`-${colIndex}`)) {
          delete newAnswers[key];
        }
      });
      // Add new selection
      newAnswers[`${rowIndex}-${colIndex}`] = true;
      return { ...prev, answers: newAnswers };
    });
    setFormErrors((prev) => ({ ...prev, answers: "" }));
  }, []);

  const loadSampleData = useCallback(() => {
    // Convert sample data's answers array to object format for the UI
    const sampleWithObjectAnswers = {
      ...SAMPLE_DATA,
      answers: convertAnswersToObject(SAMPLE_DATA.answers, SAMPLE_DATA.tableValues),
    };
    setQuestionData(sampleWithObjectAnswers);
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
      // Convert answers object back to array format for database storage
      const answersArray = questionData.tableHeaders.map((_, colIndex) => {
        const key = Object.keys(questionData.answers).find((k) =>
          k.endsWith(`-${colIndex}`)
        );
        const rowIndex = key ? parseInt(key.split("-")[0]) : -1;
        return rowIndex !== -1 ? questionData.tableValues[rowIndex] : "";
      }).filter(Boolean);

      const questionPayload = {
        set_id: setId || null,
        type: "two_part_analysis",
        topic: questionData.topic,
        contextText: questionData.contextText,
        instructionText: questionData.instructionText,
        tableHeaders: questionData.tableHeaders,
        tableValues: questionData.tableValues,
        answers: answersArray, // Store as array of strings
        difficulty: questionData.difficulty,
        level: questionData.level,
        contentDomain: domain, // Added
        explanation: questionData.explanation,
        metadata: {
          source: "manual",
          createdAt: new Date().toISOString(),
        },
      };
      await axios.post(`${API_URL}/twoPartAnalysis/upload`, questionPayload);
      setLoading(false);
        showSnackbar("Question saved successfully!", { type: "success" });
        clearForm();
    } catch (err) {
      showSnackbar("Error saving question: " + err.message, { type: "error" });
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
    (event) => {
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
      previewExcelFile(file);
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
            `Missing required columns: ${missingHeaders.join(", ")}.`,
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

            // Validate fields
            if (!rowObj.context_text || !rowObj.context_text.trim()) {
              errors.push(`Row ${idx + 2}: Context text is missing.`);
            }
            if (!rowObj.instruction_text || !rowObj.instruction_text.trim()) {
              errors.push(`Row ${idx + 2}: Instruction text is missing.`);
            }
            const tableHeaders = rowObj.table_headers
              ? rowObj.table_headers.split(",").map((h) => h.trim())
              : [];
            const tableValues = rowObj.table_values
              ? rowObj.table_values.split(",").map((v) => v.trim())
              : [];
            let answers = {};
            if (rowObj.correct_answers) {
              const answerValues = rowObj.correct_answers
                .split(",")
                .map((v) => v.trim());
              if (answerValues.length !== tableHeaders.length) {
                errors.push(
                  `Row ${idx + 2}: Correct answers must have exactly one value per header (${tableHeaders.length} required).`
                );
              } else {
                // Map answer values to row-col indices for UI
                answerValues.forEach((value, colIndex) => {
                  const rowIndex = tableValues.indexOf(value);
                  if (rowIndex === -1) {
                    errors.push(
                      `Row ${idx + 2}: Correct answer "${value}" for header "${tableHeaders[colIndex]}" not found in table values.`
                    );
                  } else {
                    answers[`${rowIndex}-${colIndex}`] = true;
                  }
                });
                // Validate one answer per column
                const selectedColumns = new Set(
                  Object.keys(answers).map((key) => key.split("-")[1])
                );
                if (selectedColumns.size !== tableHeaders.length) {
                  errors.push(
                    `Row ${idx + 2}: Exactly one answer must be selected per column.`
                  );
                }
              }
            } else {
              errors.push(`Row ${idx + 2}: Correct answers are missing.`);
            }
            if (tableHeaders.length < 1) {
              errors.push(`Row ${idx + 2}: At least one table header is required.`);
            }
            if (tableValues.length < 1) {
              errors.push(`Row ${idx + 2}: At least one table value is required.`);
            }
            if (!rowObj.topic || !rowObj.topic.trim()) {
              errors.push(`Row ${idx + 2}: Topic is missing.`);
            }
            if (!rowObj.level || !rowObj.level.trim()) {
              errors.push(`Row ${idx + 2}: Level is missing.`);
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

            return {
              set_id: rowObj.set_id || "",
              contextText: rowObj.context_text || "",
              instructionText: rowObj.instruction_text || "",
              tableHeaders,
              tableValues,
              answers,
              topic: rowObj.topic || "",
              difficulty: rowObj.difficulty || "medium",
              level: rowObj.level || "L1",
              explanation: rowObj.explanation || "",
              contentDomain: rowObj.content_domain || "", // Added
            };
          })
          .filter(
            (q) =>
              q.contextText &&
              q.instructionText &&
              q.tableHeaders.length >= 1 &&
              q.tableValues.length >= 1 &&
              q.topic &&
              q.level &&
              q.contentDomain &&
              validContentDomains.includes(q.contentDomain) && // Added
              Object.keys(q.answers).length >= q.tableHeaders.length
          );

        setValidationErrors(errors);
        setPreviewData(processedQuestions);

        if (errors.length > 0) {
          showSnackbar(
            `File processed with ${errors.length} validation errors.`,
            { type: "warning" }
          );
        } else {
          showSnackbar(
            `Preview ready! Found ${processedQuestions.length} valid questions.`,
            { type: "success" }
          );
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
          "Please fix validation errors before uploading",
          { type: "error" }
        );
        return;
      }
      setLoading(true);
      try {
        const payload = previewData.map((question) => {
          // Convert answers object to array format for database
          const answersArray = question.tableHeaders.map((_, colIndex) => {
            const key = Object.keys(question.answers).find((k) =>
              k.endsWith(`-${colIndex}`)
            );
            const rowIndex = key ? parseInt(key.split("-")[0]) : -1;
            return rowIndex !== -1 ? question.tableValues[rowIndex] : "";
          }).filter(Boolean);

          return {
            set_id: question.set_id || null,
            type: "two_part_analysis",
            topic: question.topic,
            contextText: question.contextText,
            instructionText: question.instructionText,
            tableHeaders: question.tableHeaders,
            tableValues: question.tableValues,
            answers: answersArray, // Store as array of strings
            difficulty: question.difficulty,
            level: question.level,
            contentDomain: question.contentDomain, // Added
            explanation: question.explanation,
            metadata: {
              source: "excel",
              createdAt: new Date().toISOString(),
            },
          };
        });
        // Simulate API call (replace with axios.post if backend available)
         await axios.post(`${API_URL}/twoPartAnalysis/upload`, payload);
        setTimeout(() => {
          showSnackbar(
            `Successfully uploaded ${payload.length} questions!`,
            { type: "success" }
          );
          setExcelFile(null);
          setPreviewData(null);
          setValidationErrors([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
          setLoading(false);
        }, 2000);
      } catch (err) {
        showSnackbar("Error uploading file: " + err.message, { type: "error" });
        setLoading(false);
      }
    },
    [previewData, validationErrors.length, showSnackbar]
  );

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
    // Use the array format directly from SAMPLE_DATA
    const sampleAnswers = SAMPLE_DATA.answers.join(",");
    const sampleData = [
      [
        "set_id",
        "context_text",
        "instruction_text",
        "table_headers",
        "table_values",
        "correct_answers",
        "topic",
        "difficulty",
        "level",
        "explanation",
        "content_domain", // Added
      ],
      [
        SAMPLE_DATA.set_id,
        SAMPLE_DATA.contextText,
        SAMPLE_DATA.instructionText,
        SAMPLE_DATA.tableHeaders.join(","),
        SAMPLE_DATA.tableValues.join(","),
        sampleAnswers, // e.g., "296,260"
        SAMPLE_DATA.topic,
        SAMPLE_DATA.difficulty,
        SAMPLE_DATA.level,
        SAMPLE_DATA.explanation,
        SAMPLE_DATA.contentDomain, // Added
      ],
    ];
    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Two Part Analysis");
    XLSX.writeFile(wb, "Two_Part_Analysis_Template.xlsx");
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
          prev < (activeTab === "single" ? 0 : previewData.length - 1) ? prev + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentPreviewIndex((prev) =>
          prev > 0 ? prev - 1 : activeTab === "single" ? 0 : previewData.length - 1
        );
      } else if (e.key === "Escape") {
        setShowPreviewModal(false);
        setCurrentPreviewIndex(0);
      }
    },
    [showPreviewModal, previewData, activeTab]
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
              Two-Part Analysis Generator
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
                  Two-Part Analysis Questions
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Create GMAT two-part analysis questions with tables and answer choices
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
                    title="Clear all fields"
                    disabled={loading}
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
                <InstructionInput
                  instructionText={questionData.instructionText}
                  onChange={(e) => handleInputChange("instructionText", e.target.value)}
                  error={formErrors.instructionText}
                />
                <TableHeadersInput
                  tableHeaders={questionData.tableHeaders}
                  onChange={handleTableHeaderChange}
                  onAdd={addTableHeader}
                  onRemove={removeTableHeader}
                  error={formErrors.tableHeaders}
                />
                <TableValuesInput
                  tableValues={questionData.tableValues}
                  onChange={handleTableValueChange}
                  onAdd={addTableValue}
                  onRemove={removeTableValue}
                  error={formErrors.tableValues}
                />
                {questionData.tableHeaders.length > 0 && questionData.tableValues.length > 0 && (
                  <TablePreview
                    tableHeaders={questionData.tableHeaders}
                    tableValues={questionData.tableValues}
                    answers={questionData.answers}
                    setCorrectAnswer={setCorrectAnswer}
                  />
                )}
                {formErrors.answers && (
                  <p className="text-red-500 text-sm mt-2">{formErrors.answers}</p>
                )}
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
                    placeholder="Enter explanation..."
                    aria-label="Question explanation"
                  />
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    onClick={() => setShowPreviewModal(true)}
                    disabled={!isFormValid}
                    className={`px-6 py-2 rounded-xl flex items-center space-x-2 ${
                      !isFormValid
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                    aria-label="Preview question"
                  >
                    <Play className="w-4 h-4" />
                    <span>Preview Question</span>
                  </button>
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
                      onClick={processExcelFile}
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
        data={activeTab === "single" ? [questionData] : previewData}
        currentIndex={currentPreviewIndex}
        onClose={() => {
          setShowPreviewModal(false);
          setCurrentPreviewIndex(0);
        }}
        onNext={() =>
          setCurrentPreviewIndex((prev) =>
            prev < (activeTab === "single" ? 0 : previewData.length - 1) ? prev + 1 : 0
          )
        }
        onPrev={() =>
          setCurrentPreviewIndex((prev) =>
            prev > 0 ? prev - 1 : activeTab === "single" ? 0 : previewData.length - 1
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

export default TwoPartAnalysisStructure;