import { useState, useEffect } from "react";
import {
  Table,
  Upload,
  Plus,
  Trash2,
  Play,
  Download,
  ArrowLeft,
  Save,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Eye,
  TrendingUp,
  Star,
  Hash,
} from "lucide-react";
import GMATTablePreview from "./preview/GMATTablePreview";
import { useSnackbar } from "../../components/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import ContentDomainDialog from "../components/ContentDomainDialog";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const GMATTableAnalyzer = () => {
  const [tableData, setTableData] = useState({
    setId: "",
    topic: "",
    difficulty: "",
    level: "",
    instructions: "",
    headers: [],
    rows: [],
    sortBy: "",
    explanation: "",
  });

  const [statements, setStatements] = useState([
    { id: 1, text: "", answer: null },
  ]);

  const [currentView, setCurrentView] = useState("input");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [activeHelp, setActiveHelp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDomainDialog, setShowDomainDialog] = useState(false);
  const [pendingDomainAction, setPendingDomainAction] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("");
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleData = {
    setId: "1",
    topic: "Data Interpretation",
    difficulty: "medium",
    level: "L3",
    instructions:
      "The table lists data on each of 8 items advertised by an Internet retailer on a single web page as part of a one-day sale. The term customer refers to anyone who viewed that web page on that day. For each item, the page placement denotes the quadrant of the page on which the item's advertisement appeared; the mean eye time is the average (arithmetic mean) number of seconds that each customer spent viewing the item's advertisement; the infoclick percentage is the percentage of all customers who clicked a button for more information; and the sales rank is the item's ranking based on sales, where a lesser number denotes greater sales.",
    headers: [
      "Item",
      "Page placement",
      "Mean eye time (seconds)",
      "Infoclick percentage",
      "Sales rank",
    ],
    rows: [
      ["A", "upper left", "8.20", "35%", "2"],
      ["B", "upper left", "7.15", "67%", "3"],
      ["C", "upper left", "7.25", "22%", "8"],
      ["D", "upper left", "8.35", "52%", "1"],
      ["E", "upper left", "8.42", "74%", "7"],
      ["F", "upper right", "7.35", "18%", "4"],
      ["G", "lower left", "6.55", "5%", "6"],
      ["H", "lower right", "6.87", "22%", "5"],
    ],
    sortBy: "Item",
    explanation:
      "The analysis shows that items in the upper left quadrant generally had higher mean eye times and infoclick percentages. The sales rank indicates that item D performed best despite not having the highest eye time or infoclick percentage.",
  };

  const sampleStatements = [
    "Infoclick percentage is directly proportional to mean eye time.",
    "The 2 items having the greatest sales were advertised in the upper part of the web page.",
    "Mean eye time was greatest for the item having the greatest infoclick percentage and least for the item having the least infoclick percentage.",
  ];

  const validateForm = () => {
    const errors = {};
    if (!tableData.topic) errors.topic = "Topic is required";
    if (!tableData.difficulty) errors.difficulty = "Difficulty is required";
    if (!tableData.level) errors.level = "Level is required";
    if (!tableData.instructions.trim())
      errors.instructions = "Instructions are required";
    if (tableData.headers.length === 0)
      errors.headers = "At least one column is required";
    if (tableData.rows.length === 0)
      errors.rows = "At least one row is required";
    if (!statements.some((s) => s.text.trim()))
      errors.statements = "At least one statement is required";

    statements.forEach((stmt, index) => {
      if (!stmt.text.trim())
        errors[`statement${index}`] = "Statement text is required";
    });

    return errors;
  };

  const loadSampleData = () => {
    setTableData(sampleData);
    setStatements(
      sampleStatements.map((text, index) => ({
        id: index + 1,
        text,
        answer: null,
      }))
    );
    setFormErrors({});
    showSnackbar("Sample GMAT question loaded!", { type: "success" });
  };

  const clearForm = () => {
    setTableData({
      setId: "",
      topic: "",
      difficulty: "",
      level: "",
      instructions: "",
      headers: [],
      rows: [],
      sortBy: "",
      explanation: "",
    });
    setStatements([{ id: 1, text: "", answer: null }]);
    setFileUploaded(false);
    setFormErrors({});
    setSelectedDomain("");
    setShowDomainDialog(false);
    showSnackbar("Form cleared", { type: "info" });
  };

  const handleInputChange = (field, value) => {
    setTableData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addStatement = () => {
    if (statements.length >= 10) {
      showSnackbar("Maximum 10 statements allowed", { type: "warning" });
      return;
    }
    setStatements([
      ...statements,
      {
        id:
          statements.length > 0
            ? Math.max(...statements.map((s) => s.id)) + 1
            : 1,
        text: "",
        answer: null,
      },
    ]);
  };

  const removeStatement = (id) => {
    if (statements.length > 1) {
      setStatements(statements.filter((stmt) => stmt.id !== id));
      showSnackbar("Statement removed", { type: "info" });
    }
  };

  const updateStatement = (id, text) => {
    setStatements(
      statements.map((stmt) => (stmt.id === id ? { ...stmt, text } : stmt))
    );
  };

  const setAnswer = (id, answer) => {
    setStatements(
      statements.map((stmt) => (stmt.id === id ? { ...stmt, answer } : stmt))
    );
  };

  const addTableRow = () => {
    const newRow = new Array(tableData.headers.length).fill("");
    setTableData({
      ...tableData,
      rows: [...tableData.rows, newRow],
    });
  };

  const removeTableRow = (rowIndex) => {
    if (tableData.rows.length > 1) {
      const newRows = [...tableData.rows];
      newRows.splice(rowIndex, 1);
      setTableData({
        ...tableData,
        rows: newRows,
      });
      showSnackbar("Row removed", { type: "info" });
    }
  };

  const updateTableCell = (rowIndex, colIndex, value) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };

  const addTableColumn = () => {
    if (tableData.headers.length >= 8) {
      showSnackbar("Maximum 8 columns allowed", { type: "warning" });
      return;
    }
    setTableData({
      ...tableData,
      headers: [...tableData.headers, `Column ${tableData.headers.length + 1}`],
      rows: tableData.rows.map((row) => [...row, ""]),
      sortBy: tableData.sortBy || `Column ${tableData.headers.length + 1}`,
    });
  };

  const removeTableColumn = (colIndex) => {
    if (tableData.headers.length > 1) {
      const newHeaders = [...tableData.headers];
      newHeaders.splice(colIndex, 1);

      const newRows = tableData.rows.map((row) => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });

      const newSortBy =
        tableData.sortBy === tableData.headers[colIndex]
          ? newHeaders[0] || ""
          : tableData.sortBy;

      setTableData({
        ...tableData,
        headers: newHeaders,
        rows: newRows,
        sortBy: newSortBy,
      });
      showSnackbar("Column removed", { type: "info" });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target.result;
          const lines = content
            .split("\n")
            .filter((line) => line.trim() !== "");
          const headers = lines[0].split(",").map((h) => h.trim());
          const rows = lines
            .slice(1)
            .map((line) => line.split(",").map((cell) => cell.trim()));

          setTableData({
            ...tableData,
            headers,
            rows,
            sortBy: headers[0] || "",
          });
          setFileUploaded(true);
          setFormErrors((prev) => ({ ...prev, headers: "", rows: "" }));
          showSnackbar("CSV file imported successfully", { type: "success" });
        } catch (error) {
          showSnackbar("Error parsing file. Please check the format.", {
            type: "error",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const exportToCSV = () => {
    if (tableData.headers.length === 0 || tableData.rows.length === 0) {
      showSnackbar("No data to export", { type: "warning" });
      return;
    }

    const { headers, rows } = tableData;
    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent += headers.join(",") + "\r\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gmat_table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSnackbar("Table exported to CSV", { type: "success" });
  };

  const handleSaveQuestion = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowAllErrors(true);
      showSnackbar("Please fix all errors before saving", { type: "error" });
      return;
    }
    if (!selectedDomain) {
      setPendingDomainAction(() => saveToBackend);
      setShowDomainDialog(true);
      return;
    }
    await saveToBackend(selectedDomain);
  };

  const handleDomainConfirm = (domain) => {
    setShowDomainDialog(false);
    setSelectedDomain(domain);
    if (pendingDomainAction && domain) {
      pendingDomainAction(domain);
    }
    setPendingDomainAction(null);
  };

  const saveToBackend = async (domain) => {
    setLoading(true);
    try {
      const payload = {
        setId: tableData.setId || null,
        topic: tableData.topic,
        difficulty: tableData.difficulty,
        level: tableData.level,
        instructions: tableData.instructions,
        headers: tableData.headers,
        rows: tableData.rows,
        sortBy: tableData.sortBy,
        explanation: tableData.explanation,
        statements: statements.map((s) => ({
          text: s.text,
          answer: s.answer,
        })),
        contentDomain: domain,
        metadata: {
          source: "manual",
          createdAt: new Date().toISOString(),
        },
      };
      await axios.post(`${API_URL}/tableAnalysis/upload`, payload);
      showSnackbar("GMAT table question saved successfully!", {
        type: "success",
      });
      clearForm();
      setSelectedDomain("");
    } catch (error) {
      showSnackbar("Error saving question: " + error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowAllErrors(true);
      showSnackbar("Please fix all errors before previewing", {
        type: "error",
      });
      return;
    }
    setCurrentView("preview");
  };

  if (currentView === "preview") {
    return (
      <GMATTablePreview
        tableData={tableData}
        statements={statements}
        setStatements={setStatements}
        onBack={() => setCurrentView("input")}
      />
    );
  }

  const validationErrors = Object.values(formErrors).filter(
    (error) => error && error.trim() !== "" && error !== "."
  );
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <ContentDomainDialog
        isOpen={showDomainDialog}
        onClose={() => setShowDomainDialog(false)}
        onConfirm={handleDomainConfirm}
      />
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Go back"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <Table className="w-6 h-6 text-emerald-600 mr-2" />
              GMAT Table Analyzer
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={loadSampleData}
              className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <Play className="w-4 h-4" />
              Sample
            </button>
            <button
              onClick={exportToCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleSaveQuestion}
              disabled={loading}
              className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 overflow-hidden">
          {hasErrors && (
            <div className="mb-6 p-5 bg-red-50 rounded-2xl shadow-inner border border-red-100 transition-all duration-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Validation Errors ({validationErrors.length})
                </h3>
                {validationErrors.length > 5 && (
                  <button
                    onClick={() => setShowAllErrors(!showAllErrors)}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
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
                  {(showAllErrors
                    ? validationErrors
                    : validationErrors.slice(0, 5)
                  ).map((error, index) =>
                    error && error.trim() !== "" && error !== "." ? (
                      <li
                        key={index}
                        className="flex items-start gap-2 py-1 border-b border-red-100 last:border-b-0"
                      >
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{error}</span>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Set ID (Optional)
              </label>
              <input
                type="number"
                value={tableData.setId}
                onChange={(e) =>
                  handleInputChange("setId", e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter numeric Set ID"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Topic <span className="text-red-500">*</span>
              </label>
              <select
                value={tableData.topic}
                onChange={(e) => handleInputChange("topic", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                value={tableData.difficulty}
                onChange={(e) =>
                  handleInputChange("difficulty", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              {formErrors.difficulty && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.difficulty}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleInputChange("level", level)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      tableData.level === level
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
            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-semibold text-blue-800">
                    Instructions <span className="text-red-500">*</span>
                  </label>
                  <button
                    onMouseEnter={() => setActiveHelp("instructions")}
                    onMouseLeave={() => setActiveHelp(null)}
                    className="text-blue-500"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {activeHelp === "instructions" && (
                    <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                      Provide clear instructions and context for the table
                      analysis.
                    </div>
                  )}
                </div>
                <textarea
                  value={tableData.instructions}
                  onChange={(e) =>
                    handleInputChange("instructions", e.target.value)
                  }
                  rows={4}
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-blue-400 transition-all duration-200 ${
                    formErrors.instructions
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Provide instructions and context for the table analysis..."
                />
                {formErrors.instructions && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.instructions}
                  </p>
                )}
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-semibold text-emerald-800">
                      Table Data <span className="text-red-500">*</span>
                    </label>
                    <button
                      onMouseEnter={() => setActiveHelp("tableData")}
                      onMouseLeave={() => setActiveHelp(null)}
                      className="text-emerald-500"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                    {activeHelp === "tableData" && (
                      <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                        Edit table data directly in the cells. Use + buttons to
                        add rows/columns.
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <label className="cursor-pointer bg-white hover:bg-emerald-100 px-3 py-2 rounded-lg text-sm flex items-center border border-emerald-300 transition-colors">
                      <Upload className="w-4 h-4 mr-1" />
                      Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {fileUploaded && (
                      <span className="text-emerald-600 text-sm flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        CSV uploaded
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Table Design */}
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <div className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          {tableData.headers.map((header, index) => (
                            <th
                              key={index}
                              className="min-w-[160px] h-10 bg-gray-100 border border-gray-300 text-xs font-semibold text-gray-700 sticky top-0 z-10"
                            >
                              <div className="flex items-center justify-between px-3 h-full">
                                <div className="flex items-center flex-1">
                                  <input
                                    type="text"
                                    value={header}
                                    onChange={(e) => {
                                      const newHeaders = [...tableData.headers];
                                      newHeaders[index] = e.target.value;
                                      setTableData({
                                        ...tableData,
                                        headers: newHeaders,
                                      });
                                    }}
                                    className="w-full text-sm font-medium bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded text-left"
                                    placeholder={`Column ${index + 1}`}
                                  />
                                </div>
                                {tableData.headers.length > 1 && (
                                  <button
                                    onClick={() => removeTableColumn(index)}
                                    className="ml-2 p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Remove column"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </th>
                          ))}
                          <th className="w-20 h-10 bg-gray-100 border border-gray-300 sticky top-0 z-10">
                            <button
                              onClick={addTableColumn}
                              disabled={tableData.headers.length >= 10}
                              className="w-full h-full flex items-center justify-start px-3 text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors disabled:opacity-30 text-sm font-medium"
                              title="Add Column"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Column
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            {row.map((cell, colIndex) => (
                              <td
                                key={colIndex}
                                className="min-w-[160px] h-10 border border-gray-300 p-0"
                              >
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) =>
                                    updateTableCell(
                                      rowIndex,
                                      colIndex,
                                      e.target.value
                                    )
                                  }
                                  className="w-full h-full px-3 text-sm border-none outline-none focus:ring-1 focus:ring-blue-500 focus:bg-blue-50 rounded-none bg-white hover:bg-gray-50 transition-colors"
                                  placeholder="Enter value"
                                />
                              </td>
                            ))}
                            <td className="min-w-[160px] h-10 bg-gray-50 border border-gray-300">
                              {tableData.rows.length > 1 && (
                                <button
                                  onClick={() => removeTableRow(rowIndex)}
                                  className="w-full h-full flex items-center justify-start px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                                  title="Remove Row"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan={tableData.headers.length + 1}
                            className="h-12 bg-gray-50 border border-gray-300 p-0"
                          >
                            <button
                              onClick={addTableRow}
                              className="w-full h-full flex items-center justify-start px-3 text-gray-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium border-none transition-colors"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add New Row
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Status bar with export/import buttons */}
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-t border-gray-300 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Ready</span>
                      <span>
                        {tableData.rows.length} row
                        {tableData.rows.length !== 1 ? "s" : ""}
                      </span>
                      <span>
                        {tableData.headers.length} column
                        {tableData.headers.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
                  <span className="flex items-center">
                    💡 Click any cell to edit directly
                  </span>
                  <span className="flex items-center">
                    • Use + buttons to add rows/columns
                  </span>
                  <span className="flex items-center">
                    • Use trash icons to remove rows/columns
                  </span>
                </div>

                {(formErrors.headers || formErrors.rows) && (
                  <div className="mt-3">
                    {formErrors.headers && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.headers}
                      </p>
                    )}
                    {formErrors.rows && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.rows}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Explanation
                </h3>
                <textarea
                  value={tableData.explanation}
                  onChange={(e) =>
                    handleInputChange("explanation", e.target.value)
                  }
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm hover:border-purple-400 transition-all duration-200"
                  placeholder="Enter explanation for the table analysis..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                {statements.map((statement, index) => (
                  <div
                    key={statement.id}
                    className="border border-purple-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                            Statement {index + 1}
                          </span>
                        </div>
                        <textarea
                          value={statement.text}
                          onChange={(e) =>
                            updateStatement(statement.id, e.target.value)
                          }
                          rows={3}
                          className={`w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                            formErrors[`statement${index}`]
                              ? "border-red-500"
                              : "border-gray-300 hover:border-purple-300"
                          }`}
                          placeholder={`Enter statement ${index + 1}...`}
                        />
                        <div className="mt-3 flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`statement-${statement.id}`}
                              checked={statement.answer === "yes"}
                              onChange={() => setAnswer(statement.id, "yes")}
                              className="w-4 h-4 cursor-pointer focus:ring-purple-300 text-purple-600"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              True
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`statement-${statement.id}`}
                              checked={statement.answer === "no"}
                              onChange={() => setAnswer(statement.id, "no")}
                              className="w-4 h-4 cursor-pointer focus:ring-purple-300 text-purple-600"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              False
                            </span>
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={() => removeStatement(statement.id)}
                        disabled={statements.length <= 1}
                        className={`p-2 rounded-lg transition-colors ${
                          statements.length <= 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 hover:text-red-700 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {formErrors[`statement${index}`] && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors[`statement${index}`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addStatement}
                disabled={statements.length >= 10}
                className={`w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-3 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors ${
                  statements.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Statement {statements.length >= 10 && "(Max 10)"}
              </button>

              {formErrors.statements && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.statements}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 mt-8 border-t border-gray-200">
            <button
              onClick={handlePreview}
              className="px-8 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Table Structure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GMATTableAnalyzer;
