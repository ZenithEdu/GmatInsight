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
  HelpCircle,
  FileCheck,
  FileX
} from "lucide-react";
import * as XLSX from "xlsx";
import Loading from "../../../components/Loading";

const QuantBulkUpload = ({ 
  API_URL, 
  showSnackbar, 
  loading, 
  setLoading,
  renderTextWithLatex 
}) => {
  const [excelFile, setExcelFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    requirements: false,
    latexExamples: false,
    importantNotes: false
  });
  const [showAllErrors, setShowAllErrors] = useState(false);
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
        showSnackbar("File selected! Processing preview...", { type: "success" });

        // Auto preview after file selection
        await previewExcelFile(file);
      } else {
        showSnackbar("Invalid file type. Please upload an Excel file.", { type: "error" });
      }
    }
  };

  const previewExcelFile = async (file = excelFile) => {
    if (!file) {
      showSnackbar("Please select a file first", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length < 2) {
        showSnackbar("Excel file is empty or has no data rows", { type: "error" });
        return;
      }

      const headers = jsonData[0].map((h) =>
        h ? h.toString().toLowerCase().trim() : ""
      );
      const requiredHeaders = [
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

          if (!rowObj.level || !rowObj.level.toString().trim()) {
            errors.push(`Row ${idx + 2}: Level is required`);
          }

          const options = [
            rowObj.optiona || "",
            rowObj.optionb || "",
            rowObj.optionc || "",
            rowObj.optiond || "",
            rowObj.optione || "",
          ];

          const answerIdx = ["A", "B", "C", "D", "E"].indexOf(
            (rowObj.answer || "").toString().toUpperCase().trim()
          );

          return {
            set_id: rowObj.set_id || "",
            topic: rowObj.topic || "",
            type: rowObj.type || "",
            question: rowObj.question || "",
            options,
            answer: options[answerIdx] || "",
            difficulty: rowObj.difficulty || "medium",
            level: rowObj.level || "",
            explanation: rowObj.explanation || "",
          };
        })
        .filter(
          (q) =>
            q.question &&
            q.options.filter((opt) => opt && opt.toString().trim()).length >= 2
        );

      if (processedQuestions.length === 0) {
        errors.push("No valid questions found in file.");
      }

      setValidationErrors(errors);
      setPreviewData(processedQuestions);

      if (errors.length > 0) {
        showSnackbar(`File processed with ${errors.length} validation errors.`, { type: "warning" });
      } else {
        showSnackbar(`Preview ready! Found ${processedQuestions.length} valid questions.`, { type: "success" });
      }
    } catch (err) {
      showSnackbar("Error reading Excel file", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const processExcelFile = async () => {
    if (!previewData || previewData.length === 0) {
      showSnackbar("No data to upload", { type: "error" });
      return;
    }

    if (validationErrors.length > 0) {
      showSnackbar("Please fix validation errors before uploading", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quantVault/QuantVaultQuestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(previewData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Bulk upload failed");
      }

     showSnackbar(`Successfully uploaded ${previewData.length} questions!`, { type: "success" });
      
      // Clear everything after successful upload
      setExcelFile(null);
      setPreviewData(null);
      setValidationErrors([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
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
        "explanation",
      ],
      [
        "1",
        "Solve: $$x^2 - 5x + 6 = 0$$",
        "$$x = 2, 3$$",
        "$$x = 1, 6$$",
        "$$x = -2, -3$$",
        "$$x = 0, 5$$",
        "",
        "A",
        "Algebra",
        "Problem Solving",
        "medium",
        "L2",
        "Factor the quadratic equation: $$(x-2)(x-3)=0$$",
      ],
      [
        "1",
        "Area of circle with radius r?",
        "$$\\pi r$$",
        "$$\\pi r^2$$",
        "$$2\\pi r$$",
        "$$\\pi r^3$$",
        "$$4\\pi r^2$$",
        "B",
        "Geometry",
        "Problem Solving",
        "easy",
        "L1",
        "The area of a circle is given by $$A = \\pi r^2$$",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(sampleData);
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
    XLSX.writeFile(wb, "Quantitative_Questions_Template.xlsx");
    showSnackbar("Excel Template downloaded", { type: "success" });
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

  const getLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'L1': return 'bg-blue-100 text-blue-800';
      case 'L2': return 'bg-indigo-100 text-indigo-800';
      case 'L3': return 'bg-purple-100 text-purple-800';
      case 'L4': return 'bg-pink-100 text-pink-800';
      case 'L5': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const displayedErrors = showAllErrors ? validationErrors : validationErrors.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-blue-500 bg-blue-100 scale-[1.01]' 
            : 'border-blue-300 bg-blue-50/30 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative inline-block">
          <Upload className="w-14 h-14 md:w-16 md:h-16 text-blue-500 mx-auto mb-4" />
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
            ? `${excelFile.name} - ${loading ? 'Processing...' : previewData ? 'Ready to upload' : 'Click to change file'}` 
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
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg active:scale-95"
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

      {/* Template Download */}
      <div className="text-center">
        <button
          onClick={downloadExcelTemplate}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all text-sm md:text-base flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg active:scale-95"
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

      {/* Inline Preview - Only show when data exists */}
      {previewData && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                Preview Questions ({previewData.length} found)
              </h3>
              <div className="flex items-center gap-3">
                {validationErrors.length > 0 ? (
                  <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                    <FileX className="w-4 h-4" />
                    {validationErrors.length} errors
                  </span>
                ) : (
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <FileCheck className="w-4 h-4" />
                    Ready to upload
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto p-6 bg-gray-50">
            {previewData.slice(0, 3).map((question, index) => (
              <div key={index} className="mb-6 p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-800 text-lg">
                    Question {index + 1}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Set ID: {question.set_id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(question.level)}`}>
                      {question.level}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">
                    Question:
                  </span>
                  <div className="text-sm mt-1 p-3 bg-gray-50 rounded-lg border">
                    {renderTextWithLatex(question.question)}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-1">
                    Options:
                  </span>
                  <div className="grid grid-cols-1 gap-2 mt-1">
                    {question.options.map(
                      (option, optIndex) =>
                        option && (
                          <div 
                            key={optIndex} 
                            className={`flex items-start p-2 rounded-lg border ${
                              question.answer === option 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <span className="font-medium mr-2 bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <div className="text-sm flex-1">
                              {renderTextWithLatex(option)}
                            </div>
                            {question.answer === option && (
                              <Check className="w-4 h-4 text-green-500 ml-2 flex-shrink-0 mt-0.5" />
                            )}
                          </div>
                        )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">
                      Topic:
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {question.topic}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">
                      Type:
                    </span>
                    <span>{question.type}</span>
                  </div>
                </div>

                {question.explanation && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700 block mb-1">
                      Explanation:
                    </span>
                    <div className="text-sm mt-1 p-3 bg-gray-50 rounded-lg border">
                      {renderTextWithLatex(question.explanation)}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {previewData.length > 3 && (
              <div className="text-center text-gray-500 text-sm">
                ... and {previewData.length - 3} more questions
              </div>
            )}
          </div>

          {/* Single Upload Action */}
          <div className="p-6 border-t bg-white">
            <button
              onClick={processExcelFile}
              disabled={validationErrors.length > 0 || loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loading />
                  Uploading {previewData.length} Questions...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload {previewData.length} Questions
                </>
              )}
            </button>
            
            {validationErrors.length > 0 && (
              <p className="text-center text-red-600 text-sm mt-2">
                Fix validation errors before uploading
              </p>
            )}
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
                ["B", "question * (use $$formula$$ for LaTeX)"],
                ["C", "optionA *"],
                ["D", "optionB *"],
                ["E", "optionC *"],
                ["F", "optionD *"],
                ["G", "optionE (optional)"],
                ["H", "answer * (A/B/C/D/E)"],
                ["I", "topic *"],
                ["J", "type *"],
                ["K", "difficulty * (Easy/Medium/Hard)"],
                ["L", "level * (L1/L2/L3/L4/L5)"],
                ["M", "explanation (optional)"],
              ].map(([col, desc]) => (
                <div key={col} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
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
              className="p-4 bg-blue-50 rounded-lg shadow-inner cursor-pointer"
              onClick={() => toggleSection('latexExamples')}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-blue-800 text-sm md:text-base flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  LaTeX Examples in Excel
                </h4>
                <button className="text-blue-600">
                  {expandedSections.latexExamples ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              
              {expandedSections.latexExamples && (
                <div className="mt-3 space-y-2 text-sm text-blue-700">
                  <div>
                    <span className="font-medium">Question:</span> What is the solution
                    to $$ax^2 + bx + c = 0$$?
                  </div>
                  <div>
                    <span className="font-medium">Option A:</span>{" "}
                    {`$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$`}
                  </div>
                  <div>
                    <span className="font-medium">Explanation:</span> Use the quadratic
                    formula {`$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$`}
                  </div>
                </div>
              )}
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
                  <li>LaTeX equations must be wrapped in double dollar signs</li>
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
    </div>
  );
};

export default QuantBulkUpload;