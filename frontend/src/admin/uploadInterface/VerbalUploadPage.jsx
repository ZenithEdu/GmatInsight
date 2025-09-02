import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FilePlus, AlertCircle, Download, ArrowLeft, BookOpen, X } from "lucide-react";
import * as XLSX from "xlsx";

const VerbalUploadPage = ({ onFileUpload, onCreate }) => {
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadError("");
    setIsUploading(true);

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setUploadError("Please upload an Excel file (.xlsx or .xls)");
      setIsUploading(false);
      return;
    }

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Accept all relevant headers for backend, but only show some in UI
      const requiredHeaders = [
        "set_id",
        "questionId",
        "type",
        "topic",
        "question_text",
        "passage",
        "option1",
        "option2",
        "option3",
        "option4",
        "option5",
        "answer",
        "difficulty",
        "level",
        "layout"
      ];
      const headers = jsonData[0];
      const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
      if (missingHeaders.length > 0) {
        setUploadError(`Missing required columns: ${missingHeaders.join(", ")}`);
        setIsUploading(false);
        return;
      }

      const processedQuestions = jsonData.slice(1).map((row, index) => {
        const rowObj = headers.reduce((obj, header, i) => {
          obj[header] = row[i];
          return obj;
        }, {});

        const options = [];
        for (let i = 1; i <= 5; i++) {
          const optionValue = rowObj[`option${i}`];
          if (optionValue && optionValue.toString().trim() !== "") {
            options.push(optionValue.toString().trim());
          }
        }

        // correctAnswer: index (0-based) if answer is a number, else find index by value
        let correctAnswer = parseInt(rowObj.answer);
        if (isNaN(correctAnswer)) {
          correctAnswer = options.findIndex(opt => opt === rowObj.answer);
          if (correctAnswer === -1) correctAnswer = 0;
        } else {
          correctAnswer = correctAnswer - 1;
        }

        return {
          set_id: rowObj.set_id || "",
          questionId: rowObj.questionId || "",
          type: rowObj.type || "",
          topic: rowObj.topic || "",
          question_text: rowObj.question_text || "",
          passage: rowObj.passage || "",
          options,
          correctAnswer,
          layout: rowObj.layout || "single",
          difficulty: rowObj.difficulty || "",
          level: rowObj.level || "",
          // keep all fields for backend, but editor UI will only use passage/question/options/correctAnswer/layout
        };
      }).filter(Boolean);

      if (processedQuestions.length === 0) {
        setUploadError("The Excel file appears to be empty or contains invalid data.");
        setIsUploading(false);
        return;
      }

      setUploadError("");
      setIsUploading(false);
      setSelectedFile(null);
      fileInputRef.current.value = "";
      setIsModalOpen(false);
      alert("File uploaded successfully! Preparing to preview the uploaded data.");
      onFileUpload(processedQuestions);
    } catch (error) {
      setUploadError("Error reading the Excel file. Please check the format.");
      setIsUploading(false);
      console.error("Excel parsing error:", error);
    }
  };

  const exportToExcel = () => {
    try {
      setIsExporting(true);
      console.log("Exporting default Excel template");
      const templateData = [
        {
          set_id: "SET_001",
          questionId: "V-001",
          type: "reading_comprehension",
          topic: "science_passage",
          question_text: "What is the main idea of the passage?",
          passage: "Sample passage text here...",
          option1: "Option A",
          option2: "Option B",
          option3: "Option C",
          option4: "Option D",
          option5: "",
          answer: "Option A",
          difficulty: "medium",
          level: "l1",
          layout: "single"
        },
      ];
      const worksheet = XLSX.utils.json_to_sheet(templateData, {
        header: [
          "set_id",
          "questionId",
          "type",
          "topic",
          "question_text",
          "passage",
          "option1",
          "option2",
          "option3",
          "option4",
          "option5",
          "answer",
          "difficulty",
          "level",
          "layout"
        ],
      });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "GMAT Questions");
      const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
      XLSX.writeFile(workbook, `gmat_verbal_template_${timestamp}.xlsx`);
      alert("Excel template downloaded successfully!");
    } catch (error) {
      console.error("Error exporting Excel template:", error);
      alert("Failed to download the Excel template. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              title="Back to Verbal Reasoning"
              aria-label="Back to Verbal Reasoning"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
              Verbal Reasoning Vault
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
            <h2 className="text-2xl font-semibold text-white">Create Verbal Questions</h2>
            <p className="text-indigo-100 text-sm mt-1">
              Upload an Excel file or create questions from scratch to build your Verbal Question Vault.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div
                onClick={() => setIsModalOpen(true)}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
                aria-label="Upload Excel file to import GMAT questions"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                    <Upload className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Upload Excel File</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Import questions from an Excel file (.xlsx or .xls).
                </p>
              </div>

              <div
                onClick={onCreate}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onCreate()}
                aria-label="Create new GMAT questions from scratch"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                    <FilePlus className="w-5 h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Create Questions</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Start creating new GMAT questions from scratch.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={exportToExcel}
                className={`w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-200 ${
                  isExporting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Download Excel template for GMAT questions"
                disabled={isExporting}
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>{isExporting ? "Generating Template..." : "Download Excel Template"}</span>
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300"
            ref={modalRef}
          >
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 relative shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Excel File</h2>

              {uploadError && (
                <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700 text-sm mb-6">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="space-y-6">
                <div
                  className={`relative border-2 border-dashed ${
                    isUploading ? "border-gray-300" : "border-indigo-300 hover:border-indigo-400"
                  } rounded-xl p-8 text-center transition-colors bg-gray-50`}
                >
                  <label
                    htmlFor="file-upload"
                    className={`block ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    role="button"
                    aria-label="Upload Excel file"
                  >
                    <Upload className="w-12 h-12 mx-auto text-indigo-500 mb-4" aria-hidden="true" />
                    <p className="text-base text-gray-700 mb-4 font-medium">
                      {selectedFile ? (
                        <span className="font-semibold text-indigo-600">{selectedFile.name}</span>
                      ) : (
                        "Drag and drop an Excel file (.xlsx, .xls) or click to select"
                      )}
                    </p>
                    <button
                      className={`bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center mx-auto shadow-sm ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={isUploading}
                      aria-disabled={isUploading}
                    >
                      {isUploading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Select File"
                      )}
                    </button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      ref={fileInputRef}
                      disabled={isUploading}
                      aria-describedby="file-upload-description"
                    />
                  </label>
                  <p id="file-upload-description" className="sr-only">
                    Upload an Excel file containing GMAT questions
                  </p>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Supported formats: .xlsx, .xls. Use the template for best results.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VerbalUploadPage;