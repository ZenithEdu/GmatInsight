import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Play, 
  Download, 
  Database,
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
  Image as ImageIcon
} from "lucide-react";
import MultiSourcePreview from "./preview/MultiSourcePreview";
import { useSnackbar } from "../../components/SnackbarProvider";
import { useNavigate } from "react-router-dom";

const MultiSourceStructure = () => {
  const [currentView, setCurrentView] = useState("input");
  const [activeTab, setActiveTab] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [activeHelp, setActiveHelp] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [dataSources, setDataSources] = useState([
    {
      id: 1,
      title: "Customer Identifiers",
      type: "table",
      instructions: `To comply with laws regarding the use of personally identifiable information, a certain company must adopt a new way of determining its customer identification numbers (CIDs) in its customer records database. Proposals are being considered on the basis of the following principles:

{table}

• Error Checking: There must be some mechanism for determining if a CID could be valid without checking the database.
• Meaningful: Each CID must reflect some information about the customer to which it is assigned.
Whichever proposal is adopted, the new CIDs will be issued to all former customers currently in the database.`,
      tableTitle: "Allowable Alphanumeric Characters",
      tableFooterTitle: "Allowable Alphanumeric Characters",
      headers: ["", "", "", "", "", ""],
      rows: [
        ["a", "b", "c", "d", "e", "f"],
        ["g", "h", "i", "j", "k", "l"],
        ["m", "n", "o", "p", "q", "r"],
        ["s", "t", "u", "v", "w", "x"],
        ["y", "z", "0", "1", "2", "3"],
        ["4", "5", "6", "7", "8", "9"]
      ],
      isActive: true,
      image: null,
      imageTitle: ""
    },
    {
      id: 2,
      title: "Proposal 1",
      type: "image",
      instructions: "This proposal satisfies database constraints and produces meaningful CIDs by using the first three allowable alphanumeric characters from the customer's email address followed by a portion of the timestamp of her first purchase.",
      image: null,
      imageTitle: ""
    },
    {
      id: 3,
      title: "Proposal 2", 
      type: "table",
      instructions: `This proposal is an extension of Proposal 1. Under this proposal, a customer's CID will consist of three parts:

{table}

1) Four randomly generated digits, 2) The CID generated as in Proposal 1 after being transformed per the Character Transformation Table, 3) A single check digit equal to the units digit of the sum of all numeric characters in the first two parts.`,
      tableTitle: "Character Transformation Table",
      tableFooterTitle: "Character Transformation Table",
      headers: [],
      rows: [
        ["0151", "ra9094237", "se9094237", "1", "0151se90942371"],
        ["1039", "str012916", "str012916", "6", "1039str0129166"]
      ],
      isActive: false,
      image: null,
      imageTitle: "Proposal 2 Image"
    }
  ]);

  const [statements, setStatements] = useState([
    { id: 1, text: "", answer: null },
  ]);

  const [statementsInstructions, setStatementsInstructions] = useState("");
  const [setId, setSetId] = useState("");

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

  const validateForm = () => {
    const errors = {};
    if (!dataSources.some(source => source.type === 'table' && source.rows?.length > 0)) {
      errors.dataSources = "At least one data source with content is required";
    }
    if (!statements.some((s) => s.text.trim())) {
      errors.statements = "At least one statement is required";
    }
    statements.forEach((stmt, index) => {
      if (!stmt.text.trim()) {
        errors[`statement${index}`] = "Statement text is required";
      }
    });
    return errors;
  };

  const loadSampleData = () => {
    const sampleSources = [
      {
        id: 1,
        title: "Customer Identifiers",
        type: "table",
        instructions: `To comply with laws regarding the use of personally identifiable information, a certain company must adopt a new way of determining its customer identification numbers (CIDs) in its customer records database. Proposals are being considered on the basis of the following principles:

{table}

• Error Checking: There must be some mechanism for determining if a CID could be valid without checking the database.
• Meaningful: Each CID must reflect some information about the customer to which it is assigned.
Whichever proposal is adopted, the new CIDs will be issued to all former customers currently in the database.`,
        tableTitle: "Allowable Alphanumeric Characters",
        tableFooterTitle: "Allowable Alphanumeric Characters",
        headers: [],
        rows: [
          ["a", "b", "c", "d", "e", "f"],
          ["g", "h", "i", "j", "k", "l"],
          ["m", "n", "o", "p", "q", "r"],
          ["s", "t", "u", "v", "w", "x"],
          ["y", "z", "0", "1", "2", "3"],
          ["4", "5", "6", "7", "8", "9"]
        ],
        isActive: true,
        image: null,
        imageTitle: ""
      },
      {
        id: 2,
        title: "Proposal 1",
        type: "image",
        instructions: "This proposal satisfies database constraints and produces meaningful CIDs by using the first three allowable alphanumeric characters from the customer's email address followed by a portion of the timestamp of her first purchase.",
        image: "https://via.placeholder.com/300x200?text=Proposal+1+Image",
        imageTitle: ""
      },
      {
        id: 3,
        title: "Proposal 2",
        type: "table", 
        instructions: `This proposal is an extension of Proposal 1. Under this proposal, a customer's CID will consist of three parts:

{table}

1) Four randomly generated digits, 2) The CID generated as in Proposal 1 after being transformed per the Character Transformation Table, 3) A single check digit equal to the units digit of the sum of all numeric characters in the first two parts.`,
        tableTitle: "Character Transformation Table",
        tableFooterTitle: "Character Transformation Table",
        headers: [],
        rows: [
          ["0151", "ra9094237", "se9094237", "1", "0151se90942371"],
          ["1039", "str012916", "str012916", "6", "1039str0129166"]
        ],
        isActive: false,
        image: "https://via.placeholder.com/300x200?text=Proposal+2+Image",
        imageTitle: "Proposal 2 Image"
      }
    ];

    setDataSources(sampleSources);
    
    const sampleStatements = [
      "Suppose that Proposal 2 has been adopted and that a customer has been issued a CID of 1039str0129016. The customer's email was str@example.com.",
      "The customer began shopping at 10:39 in the evening on the day before the first purchase.", 
      "The customer's first purchase was made 16 seconds after 1:29:00 in the morning."
    ];

    setStatements(
      sampleStatements.map((text, index) => ({
        id: index + 1,
        text,
        answer: null,
      }))
    );

    setStatementsInstructions("For each of the following statements about this customer, select Could be true if, in light of the given information, the statement could be true. Otherwise, select Could not be true.");
    setFormErrors({});
    showSnackbar("Sample multi-source question loaded!", { type: "success" });
  };

  const clearForm = () => {
    setDataSources([
      {
        id: 1,
        title: "Source 1",
        type: "instructions",
        instructions: "",
        isActive: true,
        image: null,
        imageTitle: "",
        tableFooterTitle: ""
      }
    ]);
    setStatements([{ id: 1, text: "", answer: null }]);
    setStatementsInstructions("");
    setSetId("");
    setFormErrors({});
    setActiveTab(0);
    showSnackbar("Form cleared", { type: "info" });
  };

  const addDataSource = () => {
    const newId = Math.max(...dataSources.map(s => s.id)) + 1;
    setDataSources([
      ...dataSources,
      {
        id: newId,
        title: `Source ${newId}`,
        type: "instructions",
        instructions: "",
        isActive: false,
        image: null,
        imageTitle: "",
        tableFooterTitle: ""
      }
    ]);
  };

  const removeDataSource = (id) => {
    if (dataSources.length > 1) {
      const newSources = dataSources.filter(source => source.id !== id);
      setDataSources(newSources);
      if (activeTab >= newSources.length) {
        setActiveTab(Math.max(0, newSources.length - 1));
      }
      showSnackbar("Data source removed", { type: "info" });
    }
  };

  const updateDataSource = (id, updates) => {
    setDataSources(dataSources.map(source => 
      source.id === id ? { ...source, ...updates } : source
    ));
  };

  const addStatement = () => {
    if (statements.length >= 10) {
      showSnackbar("Maximum 10 statements allowed", { type: "warning" });
      return;
    }
    setStatements([
      ...statements,
      {
        id: statements.length > 0 ? Math.max(...statements.map((s) => s.id)) + 1 : 1,
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

  const addTableRow = (sourceId) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      const newRow = new Array(source.headers.length || source.rows[0]?.length || 0).fill("");
      updateDataSource(sourceId, {
        rows: [...source.rows, newRow]
      });
    }
  };

  const removeTableRow = (sourceId, rowIndex) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table' && source.rows.length > 1) {
      const newRows = [...source.rows];
      newRows.splice(rowIndex, 1);
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const updateTableCell = (sourceId, rowIndex, colIndex, value) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      const newRows = [...source.rows];
      newRows[rowIndex][colIndex] = value;
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const addTableColumn = (sourceId) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      updateDataSource(sourceId, {
        rows: source.rows.map(row => [...row, ""])
      });
    }
  };

  const removeTableColumn = (sourceId, colIndex) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table' && source.rows[0].length > 1) {
      const newRows = source.rows.map(row => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showSnackbar("Please upload a valid image file (PNG, JPG, GIF).", { type: "error" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar("Image file size must be less than 5MB.", { type: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        updateDataSource(id, { image: reader.result });
        showSnackbar("Image uploaded successfully", { type: "success" });
      };
      reader.onerror = () => {
        showSnackbar("Failed to read the image file.", { type: "error" });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportToCSV = () => {
    const allTablesData = dataSources.filter(source => source.type === 'table');
    if (allTablesData.length === 0) {
      showSnackbar("No table data to export", { type: "warning" });
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    
    allTablesData.forEach((source, index) => {
      csvContent += `\n=== ${source.title} ===\n`;
      csvContent += source.rows.map(row => row.join(",")).join("\r\n");
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "multi_source_gmat_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSnackbar("Table data exported to CSV", { type: "success" });
  };

  const handlePreview = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowAllErrors(true);
      showSnackbar("Please fix all errors before previewing", { type: "error" });
      return;
    }
    setCurrentView("preview");
  };

  // Render preview component
  if (currentView === "preview") {
    return (
      <MultiSourcePreview
        dataSources={dataSources}
        statements={statements}
        setStatements={setStatements}
        statementsInstructions={statementsInstructions}
        onBack={() => setCurrentView("input")}
      />
    );
  }

  const currentSource = dataSources[activeTab];
  const validationErrors = Object.values(formErrors).filter(
    (error) => error && error.trim() !== "" && error !== "."
  );
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
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
              <Database className="w-6 h-6 text-emerald-600 mr-2" />
              Multi-Source GMAT Analyzer
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
              <Download className="w-4 h-4 mr-1" />
              Export CSV
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Set ID (Optional)
                  </label>
                  <input
                    type="number"
                    value={setId}
                    onChange={(e) => setSetId(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter numeric Set ID"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-emerald-800 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Multi-Source Data Configuration
                  </h3>
                  <button
                    onMouseEnter={() => setActiveHelp("dataSources")}
                    onMouseLeave={() => setActiveHelp(null)}
                    className="text-emerald-500"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {activeHelp === "dataSources" && (
                    <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                      Create multiple data sources with different content types (instructions, tables, images)
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-300 mb-4">
                  <div className="flex flex-wrap -mb-px">
                    {dataSources.map((source, index) => (
                      <button
                        key={source.id}
                        onClick={() => setActiveTab(index)}
                        className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium mr-2 mb-1 rounded-t-lg ${
                          activeTab === index
                            ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span>{source.title}</span>
                        {dataSources.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDataSource(source.id);
                            }}
                            className="ml-2 text-red-500 hover:text-red-700 text-xs"
                          >
                            ×
                          </button>
                        )}
                      </button>
                    ))}
                    <button
                      onClick={addDataSource}
                      className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-300 rounded-t-lg"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Source
                    </button>
                  </div>
                </div>

                {currentSource && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Source Title
                        </label>
                        <input
                          type="text"
                          value={currentSource.title}
                          onChange={(e) => updateDataSource(currentSource.id, { title: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                          placeholder="Enter source title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content Type
                        </label>
                        <select
                          value={currentSource.type}
                          onChange={(e) => updateDataSource(currentSource.id, { 
                            type: e.target.value,
                            ...(e.target.value === 'table' ? { headers: [], rows: [], tableTitle: "", tableFooterTitle: "" } : {}),
                            ...(e.target.value === 'instructions' ? { content: "" } : {}),
                            ...(e.target.value === 'image' ? { instructions: "", image: null, imageTitle: e.target.value === 'image' && currentSource.title === "Proposal 1" ? "" : currentSource.imageTitle } : {})
                          })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                        >
                          <option value="instructions">Instructions/Text</option>
                          <option value="table">Data Table</option>
                          <option value="image">Image</option>
                        </select>
                      </div>
                    </div>

                    {(currentSource.type === 'instructions' || currentSource.type === 'image' || currentSource.type === 'table') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={currentSource.instructions || ''}
                          onChange={(e) => updateDataSource(currentSource.id, { instructions: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                          placeholder={currentSource.type === 'table' ? "Describe what this table represents (use {table} to indicate table position)..." : "Enter description or instructions..."}
                        />
                      </div>
                    )}

                    {(currentSource.type === 'image' || currentSource.type === 'table') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image Title
                        </label>
                        <input
                          type="text"
                          value={currentSource.title === "Proposal 1" ? "" : currentSource.imageTitle || ''}
                          onChange={(e) => updateDataSource(currentSource.id, { imageTitle: currentSource.title === "Proposal 1" ? "" : e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                          placeholder="Enter image title..."
                          disabled={currentSource.title === "Proposal 1"}
                        />
                      </div>
                    )}

                    {(currentSource.type === 'image' || currentSource.type === 'table') && (
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-semibold text-blue-800">
                            Upload Image
                          </label>
                          {currentSource.image && (
                            <span className="text-emerald-600 text-sm flex items-center">
                              <Check className="w-4 h-4 mr-1" />
                              Image uploaded
                            </span>
                          )}
                        </div>
                        {!currentSource.image && (
                          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-white">
                            <label className="cursor-pointer flex flex-col items-center">
                              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                <ImageIcon className="w-6 h-6 text-blue-500" />
                              </div>
                              <span className="text-sm text-blue-600 font-medium mb-1">
                                Click to upload image
                              </span>
                              <span className="text-xs text-gray-500">
                                PNG, JPG, GIF (max 5MB)
                              </span>
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/gif"
                                onChange={(e) => handleImageUpload(currentSource.id, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                        {currentSource.image && (
                          <div className="mt-4 relative group">
                            <img
                              src={currentSource.image}
                              alt="Preview"
                              className="w-full h-auto max-h-48 object-contain border border-gray-300 rounded-xl shadow-sm"
                            />
                            <button
                              onClick={() => updateDataSource(currentSource.id, { image: null })}
                              className="absolute top-2 right-2 text-red-500 hover:bg-red-100 p-2 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {currentSource.type === 'table' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Table Title
                          </label>
                          <input
                            type="text"
                            value={currentSource.tableTitle || ''}
                            onChange={(e) => updateDataSource(currentSource.id, { tableTitle: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                            placeholder="Enter table title..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Table Footer Title
                          </label>
                          <input
                            type="text"
                            value={currentSource.tableFooterTitle || ''}
                            onChange={(e) => updateDataSource(currentSource.id, { tableFooterTitle: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                            placeholder="Enter table footer title..."
                          />
                        </div>
                        
                        {/* Enhanced Table Editor */}
                        <div className="border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                          <div className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  {currentSource.rows[0]?.map((_, index) => (
                                    <th
                                      key={index}
                                      className="min-w-[160px] h-10 bg-gray-100 border border-gray-300 text-xs font-semibold text-gray-700 sticky top-0 z-10"
                                    >
                                      <div className="flex items-center justify-between px-3 h-full">
                                        <div className="flex items-center flex-1">
                                          <span className="text-sm font-medium">
                                            {String.fromCharCode(65 + index)}
                                          </span>
                                        </div>
                                        {currentSource.rows[0].length > 1 && (
                                          <button
                                            onClick={() => removeTableColumn(currentSource.id, index)}
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
                                      onClick={() => addTableColumn(currentSource.id)}
                                      className="w-full h-full flex items-center justify-start px-3 text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
                                      title="Add Column"
                                    >
                                      <Plus className="w-4 h-4 mr-1" />
                                      Add Column
                                    </button>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentSource.rows.map((row, rowIndex) => (
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
                                              currentSource.id,
                                              rowIndex,
                                              colIndex,
                                              e.target.value
                                            )
                                          }
                                          className="w-full h-full px-3 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-emerald-50 rounded-none bg-white hover:bg-gray-50 transition-colors"
                                          placeholder="Enter value"
                                        />
                                      </td>
                                    ))}
                                    <td className="min-w-[160px] h-10 bg-gray-50 border border-gray-300">
                                      {currentSource.rows.length > 1 && (
                                        <button
                                          onClick={() => removeTableRow(currentSource.id, rowIndex)}
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
                                    colSpan={currentSource.rows[0]?.length + 1}
                                    className="h-12 bg-gray-50 border border-gray-300 p-0"
                                  >
                                    <button
                                      onClick={() => addTableRow(currentSource.id)}
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
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
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
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-semibold text-orange-800">
                    Verification Statements
                  </h3>
                  <button
                    onMouseEnter={() => setActiveHelp("statements")}
                    onMouseLeave={() => setActiveHelp(null)}
                    className="text-orange-500"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {activeHelp === "statements" && (
                    <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                      Add statements that users will verify as "Could be true" or "Could not be true"
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statements Instructions
                  </label>
                  <textarea
                    value={statementsInstructions}
                    onChange={(e) => setStatementsInstructions(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="Provide instructions for the verification statements..."
                  />
                </div>

                <div className="space-y-4">
                  {statements.map((statement, index) => (
                    <div
                      key={statement.id}
                      className="border border-orange-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              Statement {index + 1}
                            </span>
                          </div>
                          <textarea
                            value={statement.text}
                            onChange={(e) => updateStatement(statement.id, e.target.value)}
                            rows={2}
                            className={`w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                              formErrors[`statement${index}`]
                                ? "border-red-500"
                                : "border-gray-300 hover:border-orange-300"
                            }`}
                            placeholder={`Statement ${index + 1}...`}
                          />
                          <div className="mt-3 flex space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`statement-${statement.id}`}
                                checked={statement.answer === "yes"}
                                onChange={() => setAnswer(statement.id, "yes")}
                                className="w-4 h-4 cursor-pointer focus:ring-orange-300 text-orange-600"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Could be true
                              </span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`statement-${statement.id}`}
                                checked={statement.answer === "no"}
                                onChange={() => setAnswer(statement.id, "no")}
                                className="w-4 h-4 cursor-pointer focus:ring-orange-300 text-orange-600"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Could not be true
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
                  <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.statements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 mt-8 border-t border-gray-200">
            <button
              onClick={handlePreview}
              disabled={
                !dataSources.some(source => 
                  (source.type === 'instructions' && source.instructions) ||
                  (source.type === 'table' && source.rows?.length > 0) ||
                  (source.type === 'image' && (source.image || source.instructions))
                ) ||
                !statements.some((s) => s.text)
              }
              className={`px-8 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all ${
                !dataSources.some(source => 
                  (source.type === 'instructions' && source.instructions) ||
                  (source.type === 'table' && source.rows?.length > 0) ||
                  (source.type === 'image' && (source.image || source.instructions))
                ) ||
                !statements.some((s) => s.text)
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Preview Multi-Source Analysis</span>
            </button>
          </div>

          {(!dataSources.some(source => 
            (source.type === 'instructions' && source.instructions) ||
            (source.type === 'table' && source.rows?.length > 0) ||
            (source.type === 'image' && (source.image || source.instructions))
          ) || !statements.some((s) => s.text)) && (
            <div className="text-center text-red-500 text-sm mt-3 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {!dataSources.some(source => 
                (source.type === 'instructions' && source.instructions) ||
                (source.type === 'table' && source.rows?.length > 0) ||
                (source.type === 'image' && (source.image || source.instructions))
              )
                ? "Please add content to at least one data source."
                : "Please add at least one statement with text."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSourceStructure;