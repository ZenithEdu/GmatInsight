import { useState, useRef, useEffect } from "react";
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
  Copy,
  AlertCircle,
  FileCheck,
  FileX,
  ChevronLeft,
  ChevronRight,
  Minus
} from "lucide-react";
import * as XLSX from "xlsx";

const DataSufficiencyStructure = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [questionData, setQuestionData] = useState({
    contextText: "",
    statements: ["", ""],
    correctAnswer: null,
  });

  const standardOptions = [
    "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
    "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
    "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
    "EACH statement ALONE is sufficient.",
    "Statements (1) and (2) TOGETHER are NOT sufficient."
  ];

  const optionLabels = ["A", "B", "C", "D", "E"];

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

  // Bulk upload states
  const [excelFile, setExcelFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    requirements: false,
    importantNotes: false
  });
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar({ ...snackbar, open: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  const sampleData = {
    contextText:
      "Last week a certain comedian had an audience of 120 people for each of the afternoon performances and 195 people for each of the evening performances. What was the average (arithmetic mean) number of people in an audience if the comedian gave only afternoon and evening performances last week?",
    statements: [
      "Last week the comedian gave 3 more evening performances than afternoon performances.",
      "Last week the comedian gave twice as many evening performances as afternoon performances."
    ],
    correctAnswer: "A",
  };

  const loadSampleData = () => {
    setQuestionData(sampleData);
    setSnackbar({
      open: true,
      message: "Sample data loaded successfully!",
      type: "success",
    });
  };

  const handleInputChange = (field, value) => {
    setQuestionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatementChange = (index, value) => {
    const newStatements = [...questionData.statements];
    newStatements[index] = value;
    setQuestionData((prev) => ({
      ...prev,
      statements: newStatements,
    }));
  };

  const addStatement = () => {
    setQuestionData((prev) => ({
      ...prev,
      statements: [...prev.statements, ""],
    }));
  };

  const removeStatement = (index) => {
    if (questionData.statements.length <= 2) return;
    
    const newStatements = [...questionData.statements];
    newStatements.splice(index, 1);
    
    setQuestionData((prev) => ({
      ...prev,
      statements: newStatements,
    }));
  };

  const setCorrectAnswer = (label) => {
    setQuestionData((prev) => ({
      ...prev,
      correctAnswer: label,
    }));
  };

  const exportQuestion = () => {
    const questionJson = JSON.stringify(questionData, null, 2);
    const blob = new Blob([questionJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_sufficiency_question.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setSnackbar({
      open: true,
      message: "Question exported successfully!",
      type: "success",
    });
  };

  const clearForm = () => {
    setQuestionData({
      contextText: "",
      statements: ["", ""],
      correctAnswer: null,
    });
    setSnackbar({
      open: true,
      message: "Form cleared",
      type: "info",
    });
  };

  const saveQuestion = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbar({
        open: true,
        message: "Question saved successfully!",
        type: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error saving question",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Bulk upload functions
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload({ target: { files } });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        setExcelFile(file);
        setSnackbar({
          open: true,
          message: "File selected! Processing preview...",
          type: "success",
        });
        
        // Auto preview after file selection
        await previewExcelFile(file);
      } else {
        setSnackbar({
          open: true,
          message: "Please select a valid Excel file (.xlsx or .xls)",
          type: "error",
        });
      }
    }
  };

  const previewExcelFile = async (file = excelFile) => {
    if (!file) {
      setSnackbar({
        open: true,
        message: "Please select a file first",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length < 2) {
        setSnackbar({
          open: true,
          message: "Excel file is empty or has no data rows",
          type: "error",
        });
        return;
      }

      const headers = jsonData[0].map((h) =>
        h ? h.toString().toLowerCase().trim() : ""
      );
      
      // Data sufficiency specific required headers
      const requiredHeaders = [
        "context_text",
        "statement_1",
        "statement_2",
        "correct_answer",
      ];

      const missingHeaders = requiredHeaders.filter(
        (h) => !headers.includes(h)
      );

      if (missingHeaders.length > 0) {
        setValidationErrors([
          `Missing required columns: ${missingHeaders.join(", ")}`,
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

          if (!rowObj.context_text || !rowObj.context_text.toString().trim()) {
            errors.push(`Row ${idx + 2}: Context text is required`);
          }

          if (!rowObj.statement_1 || !rowObj.statement_1.toString().trim()) {
            errors.push(`Row ${idx + 2}: Statement 1 is required`);
          }

          if (!rowObj.statement_2 || !rowObj.statement_2.toString().trim()) {
            errors.push(`Row ${idx + 2}: Statement 2 is required`);
          }

          let ca = rowObj.correct_answer.toString().trim().toUpperCase();
          if (/^[0-4]$/.test(ca)) {
            ca = optionLabels[parseInt(ca)];
          }
          if (!optionLabels.includes(ca)) {
            errors.push(`Row ${idx + 2}: Correct answer must be A, B, C, D, or E (or 0-4)`);
          }

          // Extract all statements dynamically
          const statements = [];
          let statementIndex = 1;
          while (rowObj[`statement_${statementIndex}`]) {
            const statement = rowObj[`statement_${statementIndex}`].toString().trim();
            if (statement) {
              statements.push(statement);
            }
            statementIndex++;
          }

          if (statements.length < 2) {
            errors.push(`Row ${idx + 2}: At least 2 statements are required`);
          }

          return {
            contextText: rowObj.context_text || "",
            statements: statements,
            correctAnswer: ca,
          };
        })
        .filter(
          (q) =>
            q.contextText &&
            q.statements.length >= 2 &&
            q.correctAnswer !== ""
        );

      if (processedQuestions.length === 0) {
        errors.push("No valid questions found in file.");
      }

      setValidationErrors(errors);
      setPreviewData(processedQuestions);

      if (errors.length > 0) {
        setSnackbar({
          open: true,
          message: `File processed with ${errors.length} validation errors.`,
          type: "warning",
        });
      } else {
        setSnackbar({
          open: true,
          message: `Preview ready! Found ${processedQuestions.length} valid questions.`,
          type: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error processing file: " + err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const processExcelFile = async () => {
    if (!previewData || previewData.length === 0) {
      setSnackbar({
        open: true,
        message: "No data to upload",
        type: "error",
      });
      return;
    }

    if (validationErrors.length > 0) {
      setSnackbar({
        open: true,
        message: "Please fix validation errors before uploading",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to save questions to database
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: `Successfully uploaded ${previewData.length} questions to database!`,
        type: "success",
      });
      
      // Clear everything after successful upload
      setExcelFile(null);
      setPreviewData(null);
      setValidationErrors([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setSnackbar({ open: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const downloadExcelTemplate = () => {
    const wb = XLSX.utils.book_new();
    const sampleData = [
      ["context_text", "statement_1", "statement_2", "statement_3", "statement_4", "correct_answer"],
      [
        "Last week a certain comedian had an audience of 120 people for each of the afternoon performances and 195 people for each of the evening performances. What was the average (arithmetic mean) number of people in an audience if the comedian gave only afternoon and evening performances last week?",
        "Last week the comedian gave 3 more evening performances than afternoon performances.",
        "Last week the comedian gave twice as many evening performances as afternoon performances.",
        "",
        "",
        "A"
      ],
      [
        "If x and y are integers, what is the value of x?",
        "x + y = 10",
        "x - y = 4",
        "x * y = 24",
        "x is positive",
        "D"
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Data Sufficiency Questions");
    XLSX.writeFile(wb, "Data_Sufficiency_Template.xlsx");
    setSnackbar({
      open: true,
      message: "Excel template downloaded",
      type: "success",
    });
  };

  const clearFile = () => {
    setExcelFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const displayedErrors = showAllErrors ? validationErrors : validationErrors.slice(0, 5);

  // Preview modal navigation functions
  const nextPreview = () => {
    setCurrentPreviewIndex(prev => 
      prev < previewData.length - 1 ? prev + 1 : 0
    );
  };

  const prevPreview = () => {
    setCurrentPreviewIndex(prev => 
      prev > 0 ? prev - 1 : previewData.length - 1
    );
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setCurrentPreviewIndex(0);
  };

  // Render the preview modal
  const renderPreviewModal = () => {
    if (!showPreviewModal || !previewData || previewData.length === 0) return null;
    
    const question = previewData[currentPreviewIndex];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">
              Question Preview ({currentPreviewIndex + 1}/{previewData.length})
            </h3>
            <button 
              onClick={closePreviewModal}
              className="text-gray-500 hover:text-gray-700"
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
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Statement ({index + 1}):
                    </div>
                    <div className="text-sm">
                      {statement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Correct Answer:</h4>
              <div className="p-4 bg-emerald-50 rounded-lg border text-sm">
                {question.correctAnswer}. {standardOptions[optionLabels.indexOf(question.correctAnswer)]}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-6 border-t">
            <div className="flex items-center gap-2">
              <button
                onClick={prevPreview}
                className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPreview}
                className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={closePreviewModal}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processExcelFile}
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload Questions"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50"
              title="Back"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <FileText className="w-6 h-6 text-emerald-600 mr-2" />
              Data Sufficiency Generator
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left Side: Upload Section */}
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
                    className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    <Play className="w-4 h-4" />
                    Sample
                  </button>
                  <button
                    onClick={saveQuestion}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={clearForm}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
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
                }`}
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
                }`}
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
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                  <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Question Context
                  </h3>
                  <p className="text-emerald-700 text-sm mb-3">
                    Enter the main question text that statements will refer to
                  </p>
                  <textarea
                    value={questionData.contextText}
                    onChange={(e) => handleInputChange("contextText", e.target.value)}
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                    placeholder="Enter the main question text..."
                  />
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-blue-900">
                      Statements
                    </h3>
                    <button
                      onClick={addStatement}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Statement
                    </button>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">
                    Add data statements (minimum 2 required)
                  </p>
                  
                  <div className="space-y-3">
                    {questionData.statements.map((statement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            Statement ({index + 1})
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={statement}
                              onChange={(e) => handleStatementChange(index, e.target.value)}
                              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              placeholder="Enter statement..."
                            />
                            {questionData.statements.length > 2 && (
                              <button
                                onClick={() => removeStatement(index)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                title="Remove statement"
                              >
                                <Minus className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Answer Choices
                  </h3>
                  <p className="text-amber-700 text-sm mb-3">
                    Select the correct answer choice for this data sufficiency question
                  </p>

                  <div className="space-y-3">
                    {standardOptions.map((option, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
                        <input
                          type="radio"
                          name="answer-choices"
                          checked={questionData.correctAnswer === optionLabels[index]}
                          onChange={() => setCorrectAnswer(optionLabels[index])}
                          className="mt-1 mr-3 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-700 font-medium mr-2">{optionLabels[index]}.</span>
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={exportQuestion}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all shadow-md hover:shadow-lg hover:bg-emerald-700"
                  >
                    <Download className="w-5 h-5" />
                    <span>Export Question</span>
                  </button>
                </div>

                {(!questionData.contextText.trim() ||
                  questionData.statements.filter(s => s.trim()).length < 2 ||
                  questionData.correctAnswer === null) && (
                  <div className="text-center text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
                    {!questionData.contextText.trim()
                      ? "Please add question context."
                      : questionData.statements.filter(s => s.trim()).length < 2
                      ? "Please add at least 2 statements."
                      : "Please select the correct answer choice."}
                  </div>
                )}
              </div>
            )}

            {activeTab === "bulk" && (
              <div className="space-y-6">
                {/* Upload Section */}
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragOver 
                      ? 'border-emerald-500 bg-emerald-100 scale-[1.01]' 
                      : 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
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
                      ? `${excelFile.name} - ${loading ? 'Processing...' : previewData ? 'Ready to preview' : 'Click to change file'}` 
                      : "Drag and drop or click below to select (.xlsx, .xls only)"}
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="excel-upload"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <label
                      htmlFor="excel-upload"
                      className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg active:scale-95"
                    >
                      {excelFile ? <FileCheck className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                      {excelFile ? "Change File" : "Choose File"}
                    </label>

                    {excelFile && (
                      <button
                        onClick={clearFile}
                        className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
                      >
                        <X className="w-4 h-4" />
                        Clear File
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {previewData && previewData.length > 0 && (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setShowPreviewModal(true)}
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
                    >
                      <FileText className="w-4 h-4" />
                      Preview Questions
                    </button>
                    
                    <button
                      onClick={processExcelFile}
                      disabled={validationErrors.length > 0 || loading}
                      className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4" />
                      Upload {previewData.length} Questions
                    </button>
                  </div>
                )}

                {/* Template Download */}
                <div className="text-center">
                  <button
                    onClick={downloadExcelTemplate}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all text-sm md:text-base flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Download Excel Template
                  </button>
                </div>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="p-5 bg-red-50 rounded-2xl shadow-inner border border-red-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Validation Errors ({validationErrors.length})
                      </h3>
                      {validationErrors.length > 5 && (
                        <button 
                          onClick={() => setShowAllErrors(!showAllErrors)}
                          className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          {showAllErrors ? 'Show less' : 'Show all'}
                          {showAllErrors ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <ul className="text-sm text-red-700 space-y-1 pl-2">
                        {displayedErrors.map((error, index) => (
                          <li key={index} className="flex items-start gap-2 py-1 border-b border-red-100 last:border-b-0">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Excel Format Requirements - Collapsible */}
                <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('requirements')}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Excel Format Requirements
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700">
                      {expandedSections.requirements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {expandedSections.requirements && (
                    <div className="mt-5 space-y-4">
                      <div className="grid gap-3">
                        {[
                          ["A", "context_text *"],
                          ["B", "statement_1 *"],
                          ["C", "statement_2 *"],
                          ["D", "statement_3 (optional)"],
                          ["E", "statement_4 (optional)"],
                          ["F", "correct_answer * (A-E or 0-4)"],
                        ].map(([col, desc]) => (
                          <div key={col} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                            <div className="w-7 h-7 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {col}
                            </div>
                            <span className="text-sm text-gray-700">
                              {desc.includes("*") ? (
                                <>
                                  {desc.split("*")[0]}
                                  <span className="text-red-500">*</span>
                                  {desc.split("*")[1]}
                                </>
                              ) : (
                                desc
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div 
                        className="p-4 bg-yellow-50 rounded-lg shadow-inner cursor-pointer"
                        onClick={() => toggleSection('importantNotes')}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-yellow-800 text-sm md:text-base flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Important Notes
                          </h4>
                          <button className="text-yellow-600">
                            {expandedSections.importantNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        {expandedSections.importantNotes && (
                          <ul className="mt-3 text-sm text-yellow-700 space-y-1 list-disc pl-5">
                            <li>First row should contain column headers</li>
                            <li>Each question should be in a separate row</li>
                            <li>At least 2 statements are required</li>
                            <li>Correct answer must be A, B, C, D, or E (numbers 0-4 also accepted)</li>
                            <li>Additional statements can be added as statement_3, statement_4, etc.</li>
                            <li>File size limit: 10MB</li>
                            <li>
                              Fields marked with <span className="text-red-500">*</span> are
                              required
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {renderPreviewModal()}

      {/* Snackbar Notification */}
      {snackbar.open && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
          snackbar.type === "success" ? "bg-emerald-600" : 
          snackbar.type === "error" ? "bg-red-600" : "bg-blue-600"
        }`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default DataSufficiencyStructure;