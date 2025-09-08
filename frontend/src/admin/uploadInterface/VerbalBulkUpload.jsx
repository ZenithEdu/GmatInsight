import { useState, useRef } from "react";
import {
  Upload,
  X,
  AlertCircle,
  FileText,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import * as XLSX from "xlsx";

const VerbalBulkUpload = ({ 
  API_URL, 
  setSnackbar, 
  loading, 
  setLoading
}) => {
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
        setLoading(false);
        return;
      }

      // Lowercase all headers for mapping
      const headers = jsonData[0].map((h) =>
        h ? h.toString().toLowerCase().trim() : ""
      );

      // Add "optione", "passage", "explanation" to required headers for mapping
      const requiredHeaders = [
        "set_id",
        "question",
        "optiona",
        "optionb",
        "optionc",
        "optiond",
        "optione", // ensure this is present for mapping, even if optional
        "answer",
        "topic",
        "type",
        "difficulty",
        "level",
        "layout",
        "passage", // optional, but should be mapped
        "explanation", // optional, but should be mapped
      ];

      const missingHeaders = [
        "set_id",
        "question",
        "optiona",
        "optionb",
        "optionc",
        "optiond",
        "answer",
        "topic",
        "type",
        "difficulty",
        "level",
        "layout",
        "passage",
        "explanation",
      ].filter((h) => !headers.includes(h));

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
          // Map row to object using headers
          const rowObj = headers.reduce((obj, header, i) => {
            obj[header] =
              row[i] !== undefined && row[i] !== null ? row[i].toString() : "";
            return obj;
          }, {});

          // Validation
          if (!rowObj.set_id || !rowObj.set_id.toString().trim()) {
            errors.push(`Row ${idx + 2}: Set ID is required`);
          }
          if (!rowObj.question || !rowObj.question.toString().trim()) {
            errors.push(`Row ${idx + 2}: Question is required`);
          }
          if (!rowObj.optiona || !rowObj.optiona.toString().trim()) {
            errors.push(`Row ${idx + 2}: Option A is required`);
          }
          if (!rowObj.optionb || !rowObj.optionb.toString().trim()) {
            errors.push(`Row ${idx + 2}: Option B is required`);
          }
          if (!rowObj.optionc || !rowObj.optionc.toString().trim()) {
            errors.push(`Row ${idx + 2}: Option C is required`);
          }
          if (!rowObj.optiond || !rowObj.optiond.toString().trim()) {
            errors.push(`Row ${idx + 2}: Option D is required`);
          }
          if (
            !rowObj.answer ||
            !["A", "B", "C", "D", "E"].includes(
              rowObj.answer.toString().toUpperCase().trim()
            )
          ) {
            errors.push(`Row ${idx + 2}: Answer must be A, B, C, D, or E`);
          }
          if (!rowObj.topic || !rowObj.topic.toString().trim()) {
            errors.push(`Row ${idx + 2}: Topic is required`);
          }
          if (!rowObj.type || !rowObj.type.toString().trim()) {
            errors.push(`Row ${idx + 2}: Type is required`);
          }
          if (!rowObj.difficulty || !rowObj.difficulty.toString().trim()) {
            errors.push(`Row ${idx + 2}: Difficulty is required`);
          }
          if (!rowObj.level || !rowObj.level.toString().trim()) {
            errors.push(`Row ${idx + 2}: Level is required`);
          }
          if (!rowObj.layout || !rowObj.layout.toString().trim()) {
            errors.push(`Row ${idx + 2}: Layout is required`);
          }

          // Build options array (always 5 elements)
          const options = [
            rowObj.optiona || "",
            rowObj.optionb || "",
            rowObj.optionc || "",
            rowObj.optiond || "",
            rowObj.optione || "",
          ];

          // Map answer letter to option value
          const answerIdx = ["A", "B", "C", "D", "E"].indexOf(
            (rowObj.answer || "").toString().toUpperCase().trim()
          );
          const answerValue =
            answerIdx >= 0 && answerIdx < options.length
              ? options[answerIdx]
              : "";

          // Return the mapped question object
          return {
            set_id: rowObj.set_id || "",
            topic: rowObj.topic || "",
            type: rowObj.type || "",
            question: rowObj.question || "",
            passage: rowObj.passage || "",
            options,
            answer: answerValue,
            difficulty: rowObj.difficulty || "medium",
            level: rowObj.level || "",
            layout: rowObj.layout || "single",
            explanation: rowObj.explanation || "",
          };
        })
        // Only include questions that have all required fields (already validated above)
        .filter(
          (q) =>
            q.set_id &&
            q.question &&
            q.options[0] &&
            q.options[1] &&
            q.options[2] &&
            q.options[3] &&
            q.answer &&
            q.topic &&
            q.type &&
            q.difficulty &&
            q.level &&
            q.layout
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
      const res = await fetch(`${API_URL}/verbalVault/VerbalVaultQuestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(previewData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Bulk upload failed");
      }

      setSnackbar({
        open: true,
        message: `Successfully uploaded ${previewData.length} questions!`,
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
      [
        "set_id",
        "question",
        "passage",
        "optionA",
        "optionB",
        "optionC",
        "optionD",
        "optionE",
        "answer",
        "topic",
        "type",
        "difficulty",
        "level",
        "layout",
        "explanation",
      ],
      [
        "1",
        "What is the main idea of the passage?",
        "In recent decades, the tension between economic development and environmental protection has become increasingly apparent...",
        "Economic growth should be prioritized",
        "Environmental protection is more important",
        "Balance between economy and environment is needed",
        "Technology will solve all environmental issues",
        "",
        "C",
        "Reading Comprehension",
        "Main Idea",
        "medium",
        "L2",
        "double",
        "The passage discusses the need for balance between economic development and environmental protection.",
      ],
      [
        "1",
        "Which of the following best describes the author's tone?",
        "",
        "Neutral and analytical",
        "Critical and dismissive",
        "Optimistic and enthusiastic",
        "Pessimistic and alarmist",
        "Sarcastic and mocking",
        "A",
        "Critical Reasoning",
        "Tone",
        "hard",
        "L1",
        "single",
        "The author presents facts without strong emotional language, maintaining a neutral tone.",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Verbal Questions");
    XLSX.writeFile(wb, "Verbal_Questions_Template.xlsx");
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLayoutColor = (layout) => {
    switch (layout?.toLowerCase()) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'double': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            Question Preview ({currentPreviewIndex + 1}/{previewData.length})
          </h3>
          <button 
            onClick={closePreviewModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Layout-specific rendering */}
          {question.layout === "single" ? (
            // Single Layout - Question and options only
            <>
            <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Passage:</h4>
                  <div className="p-4 bg-gray-50 rounded-lg border text-sm leading-relaxed max-h-96 overflow-y-auto sticky top-0">
                    {question.passage || 'No passage provided'}
                  </div>
                </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Question:</h4>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  {question.question}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Options:</h4>
                <div className="space-y-2">
                  {question.options?.filter(option => option).map((option, index) => (
                    <div 
                      key={`option-${index}`}
                      className={`p-3 rounded-lg border flex items-start transition-colors ${
                        question.answer === option 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium mr-3 bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <div className="flex-1">
                        {option}
                      </div>
                      {question.answer === option && (
                        <Check className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Double Layout - Passage + Question side by side
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Left side - Passage */}
                <div className="lg:pr-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Passage:</h4>
                  <div className="p-4 bg-gray-50 rounded-lg border text-sm leading-relaxed max-h-96 overflow-y-auto sticky top-0">
                    {question.passage || 'No passage provided'}
                  </div>
                </div>
                
                {/* Right side - Question and Options */}
                <div className="lg:pl-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Question:</h4>
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      {question.question}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Options:</h4>
                    <div className="space-y-2">
                      {question.options?.filter(option => option).map((option, index) => (
                        <div 
                          key={`option-${index}`}
                          className={`p-3 rounded-lg border flex items-start transition-colors ${
                            question.answer === option 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <span className="font-medium mr-3 bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <div className="flex-1">
                            {option}
                          </div>
                          {question.answer === option && (
                            <Check className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Topic:</h4>
              <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
                {question.topic || 'Not specified'}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Type:</h4>
              <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                {question.type || 'Not specified'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Difficulty:</h4>
              <div className={`px-3 py-2 rounded-lg text-sm ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty || 'Not specified'}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Layout:</h4>
              <div className={`px-3 py-2 rounded-lg text-sm ${getLayoutColor(question.layout)}`}>
                {question.layout || 'single'}
              </div>
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
        </div>
        
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            <button
              onClick={prevPreview}
              disabled={currentPreviewIndex === 0}
              className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous question"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 mx-2">
              {currentPreviewIndex + 1} of {previewData.length}
            </span>
            <button
              onClick={nextPreview}
              disabled={currentPreviewIndex === previewData.length - 1}
              className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next question"
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
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-purple-500 bg-purple-100 scale-[1.01]' 
            : 'border-purple-300 bg-purple-50/30 hover:border-purple-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative inline-block">
          <Upload className="w-14 h-14 md:w-16 md:h-16 text-purple-500 mx-auto mb-4" />
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
            className="bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg active:scale-95"
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
            className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                ["A", "set_id *"],
                ["B", "question *"],
                ["C", "passage"],
                ["D", "optionA *"],
                ["E", "optionB *"],
                ["F", "optionC *"],
                ["G", "optionD *"],
                ["H", "optionE (optional)"],
                ["I", "answer * (A/B/C/D/E)"],
                ["J", "topic *"],
                ["K", "type *"],
                ["L", "difficulty * (Easy/Medium/Hard)"],
                ["M", "level * (L1/L2/L3/L4/L5)"],
                ["N", "layout * (single/double)"],
                ["O", "explanation (optional)"],
              ].map(([col, desc]) => (
                <div key={col} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-7 h-7 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
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
                  <li>For "single" layout questions, passage can be left empty</li>
                  <li>For "double" layout questions, include the reading passage</li>
                  <li>Correct answer must be exactly A, B, C, D, or E</li>
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

      {/* Preview Modal */}
      {renderPreviewModal()}
    </div>
  );
};

export default VerbalBulkUpload;