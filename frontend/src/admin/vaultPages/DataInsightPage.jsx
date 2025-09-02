import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Plus,
  FileText,
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  Table,
  BarChart2,
  List,
  Check,
  X,
} from "lucide-react";

const initialQuestions = [
  {
    id: "DI-101",
    type: "Multi-source Reasoning",
    topic: "Business Reports",
    difficulty: "Hard",
    difficultyLevel: "L5",
    createdAt: "2025-08-12 11:45 AM",
    sources: ["text", "chart", "table"],
    contentDomain: "Non-Math Related",
  },
  {
    id: "DI-102",
    type: "Table Analysis",
    topic: "Financial Data",
    difficulty: "Medium",
    difficultyLevel: "L3",
    createdAt: "2025-08-10 02:30 PM",
    columns: 5,
    rows: 8,
    contentDomain: "Math Related",
  },
  {
    id: "DI-103",
    type: "Graphics Interpretation",
    topic: "Market Trends",
    difficulty: "Medium",
    difficultyLevel: "L4",
    createdAt: "2025-08-09 09:15 AM",
    chartType: "bar",
    contentDomain: "Non-Math Related",
  },
  {
    id: "DI-104",
    type: "Two-part Analysis",
    topic: "Resource Allocation",
    difficulty: "Easy",
    difficultyLevel: "L2",
    createdAt: "2025-08-07 04:20 PM",
    variables: 2,
    contentDomain: "Math Related",
  },
  {
    id: "DI-105",
    type: "Data Sufficiency",
    topic: "Quantitative Comparison",
    difficulty: "Hard",
    difficultyLevel: "L5",
    createdAt: "2025-08-05 10:10 AM",
    statements: 2,
    contentDomain: "Non-Math Related",
  },
  {
    id: "DI-106",
    type: "Multi-source Reasoning",
    topic: "Scientific Research",
    difficulty: "Medium",
    difficultyLevel: "L4",
    createdAt: "2025-08-03 03:45 PM",
    sources: ["text", "diagram"],
    contentDomain: "Math Related",
  },
  {
    id: "DI-107",
    type: "Table Analysis",
    topic: "Sales Performance",
    difficulty: "Easy",
    difficultyLevel: "L1",
    createdAt: "2025-08-01 01:30 PM",
    columns: 4,
    rows: 6,
    contentDomain: "Non-Math Related",
  },
];

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
const difficultyLevelOptions = ["All", "L1", "L2", "L3", "L4", "L5"];
const questionTypeOptions = [
  "All",
  "Multi-source Reasoning",
  "Table Analysis",
  "Graphics Interpretation",
  "Two-part Analysis",
  "Data Sufficiency",
];

export default function DataInsightsPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(initialQuestions);
  const [filters, setFilters] = useState({
    id: "",
    type: "",
    topic: "",
    difficulty: "",
    difficultyLevel: "",
    createdAt: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const getDifficultyClass = useCallback((difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }, []);

  const getQuestionTypeIcon = useCallback((type) => {
    switch (type) {
      case "Multi-source Reasoning":
        return <List className="w-4 h-4 mr-2 text-blue-500" />;
      case "Table Analysis":
        return <Table className="w-4 h-4 mr-2 text-purple-500" />;
      case "Graphics Interpretation":
        return <BarChart2 className="w-4 h-4 mr-2 text-teal-500" />;
      case "Two-part Analysis":
        return <div className="w-4 h-4 mr-2 text-orange-500">2P</div>;
      case "Data Sufficiency":
        return <Check className="w-4 h-4 mr-2 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 mr-2 text-gray-500" />;
    }
  }, []);

  const handlePreview = useCallback((id) => {
    const question = questions.find((q) => q.id === id);
    setSelectedQuestion(question);
  }, [questions]);

  const closePreview = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm(`Are you sure you want to delete Question ${id}?`)) {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        if (selectedQuestion && selectedQuestion.id === id) {
          setSelectedQuestion(null);
        }
      }
    },
    [selectedQuestion]
  );

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(q[key]).toLowerCase().includes(value.toLowerCase());
      })
    );
  }, [questions, filters]);

  const sortedQuestions = useMemo(() => {
    if (!sortConfig.key) return filteredQuestions;

    return [...filteredQuestions].sort((a, b) => {
      const aVal =
        sortConfig.key === "createdAt"
          ? new Date(a[sortConfig.key])
          : a[sortConfig.key];
      const bVal =
        sortConfig.key === "createdAt"
          ? new Date(b[sortConfig.key])
          : b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredQuestions, sortConfig]);

  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="w-4 h-4 inline" />
      ) : (
        <ChevronDown className="w-4 h-4 inline" />
      );
    },
    [sortConfig]
  );

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      id: "",
      type: "",
      topic: "",
      difficulty: "",
      difficultyLevel: "",
      createdAt: "",
    });
  }, []);

  const renderQuestionDetails = (question) => {
    switch (question.type) {
      case "Multi-source Reasoning":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Sources:</h4>
            <div className="flex gap-2 mt-2">
              {question.sources.map((source, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        );
      case "Table Analysis":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Table Dimensions:</h4>
            <p className="text-sm text-gray-600">
              {question.rows} rows × {question.columns} columns
            </p>
          </div>
        );
      case "Graphics Interpretation":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Chart Type:</h4>
            <p className="text-sm text-gray-600 capitalize">
              {question.chartType} chart
            </p>
          </div>
        );
      case "Two-part Analysis":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Variables:</h4>
            <p className="text-sm text-gray-600">
              {question.variables} variables to analyze
            </p>
          </div>
        );
      case "Data Sufficiency":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Statements:</h4>
            <p className="text-sm text-gray-600">
              {question.statements} data statements provided
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <PieChart className="w-6 h-6 text-emerald-600 mr-2" />
              Data Insights Vault
            </h1>
            <p className="text-gray-500 text-sm">
              ({filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""} found)
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button
              onClick={() => navigate("/data-insight-upload-page")}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Question
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
                    placeholder="Search ID"
                    value={filters.id}
                    onChange={(e) => updateFilter("id", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters.type}
                  onChange={(e) => updateFilter("type", e.target.value)}
                >
                  {questionTypeOptions.map((option) => (
                    <option key={option} value={option === "All" ? "" : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Search topic"
                  value={filters.topic}
                  onChange={(e) => updateFilter("topic", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters.difficulty}
                  onChange={(e) => updateFilter("difficulty", e.target.value)}
                >
                  {difficultyOptions.map((option) => (
                    <option key={option} value={option === "All" ? "" : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters.difficultyLevel}
                  onChange={(e) =>
                    updateFilter("difficultyLevel", e.target.value)
                  }
                >
                  {difficultyLevelOptions.map((option) => (
                    <option key={option} value={option === "All" ? "" : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters.createdAt}
                  onChange={(e) => updateFilter("createdAt", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Questions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_1.8fr_1.5fr_1.2fr_0.8fr_0.6fr_1.2fr_0.8fr] bg-gray-50 px-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div
              className="cursor-pointer flex items-center pl-2"
              onClick={() => handleSort("id")}
            >
              Question ID {getSortIcon("id")}
            </div>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleSort("type")}
            >
              Type {getSortIcon("type")}
            </div>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleSort("topic")}
            >
              Topic {getSortIcon("topic")}
            </div>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleSort("contentDomain")}
            >
              Content Domain {getSortIcon("contentDomain")}
            </div>
            <div className="flex items-center">Difficulty</div>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleSort("difficultyLevel")}
            >
              Level {getSortIcon("difficultyLevel")}
            </div>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => handleSort("createdAt")}
            >
              Created At {getSortIcon("createdAt")}
            </div>
            <div className="flex items-center">Actions</div>
          </div>

          {/* Table Rows */}
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((q) => (
              <div
                key={q.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr_1.5fr_1.2fr_0.8fr_0.6fr_1.2fr_0.8fr] px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
              >
                <div className="flex items-center py-2 md:py-0">
                  <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                  <span className="font-medium" title={q.id}>{q.id}</span>
                </div>
                <div className="flex items-center py-2 md:py-0">
                  {getQuestionTypeIcon(q.type)}
                  <span className="truncate" title={q.type}>{q.type}</span>
                </div>
                <div className="truncate py-2 md:py-0" title={q.topic}>{q.topic}</div>
                <div className="truncate py-2 md:py-0" title={q.contentDomain}>{q.contentDomain}</div>
                <div className="py-2 md:py-0">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyClass(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <div className="py-2 md:py-0">{q.difficultyLevel}</div>
                <div className="text-gray-500 py-2 md:py-0">{q.createdAt}</div>
                <div className="flex gap-2 items-center py-2 md:py-0">
                  <button
                    onClick={() => handlePreview(q.id)}
                    className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="mb-2">No questions match your filters</p>
              <button
                onClick={resetFilters}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Question Preview Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedQuestion.id} - {selectedQuestion.type}
                  </h3>
                  <p className="text-gray-600">{selectedQuestion.topic}</p>
                </div>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Difficulty</h4>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyClass(
                      selectedQuestion.difficulty
                    )}`}
                  >
                    {selectedQuestion.difficulty} (
                    {selectedQuestion.difficultyLevel})
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Created</h4>
                  <p className="text-sm text-gray-600">
                    {selectedQuestion.createdAt}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">
                    Question Type
                  </h4>
                  <div className="flex items-center">
                    {getQuestionTypeIcon(selectedQuestion.type)}
                    <span>{selectedQuestion.type}</span>
                  </div>
                </div>
              </div>

              {renderQuestionDetails(selectedQuestion)}

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">
                  Question Preview
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {selectedQuestion.type === "Multi-source Reasoning" && (
                    <div>
                      <p className="mb-4">
                        This question requires analyzing information from
                        multiple sources:
                      </p>
                      <div className="flex gap-4 mb-4">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                          Text
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                          Chart
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                          Table
                        </button>
                      </div>
                      <p>
                        Sample question would appear here after examining all
                        sources.
                      </p>
                    </div>
                  )}

                  {selectedQuestion.type === "Table Analysis" && (
                    <div>
                      <p className="mb-2">
                        Analyze the following table and determine the accuracy
                        of statements:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border">
                          <thead>
                            <tr className="bg-gray-100">
                              {Array.from({
                                length: selectedQuestion.columns,
                              }).map((_, i) => (
                                <th key={i} className="border p-2">
                                  Column {i + 1}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: selectedQuestion.rows }).map(
                              (_, i) => (
                                <tr key={i}>
                                  {Array.from({
                                    length: selectedQuestion.columns,
                                  }).map((_, j) => (
                                    <td key={j} className="border p-2">
                                      Data {i + 1}-{j + 1}
                                    </td>
                                  ))}
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {selectedQuestion.type === "Graphics Interpretation" && (
                    <div>
                      <p className="mb-2">
                        Interpret the following chart and complete the
                        statements:
                      </p>
                      <div className="bg-gray-200 h-48 flex items-center justify-center rounded-lg mb-4">
                        <p className="text-gray-500">
                          [{selectedQuestion.chartType} chart visualization]
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>The ____ shows an increasing trend from Q1 to Q4.</p>
                        <select className="border p-1 rounded">
                          <option>Select an option</option>
                          <option>Revenue</option>
                          <option>Expenses</option>
                          <option>Profit</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedQuestion.type === "Two-part Analysis" && (
                    <div>
                      <p className="mb-4">Solve the two-part problem:</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border p-2">Variable 1</th>
                              <th className="border p-2">Variable 2</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">Option A</td>
                              <td className="border p-2">Option X</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Option B</td>
                              <td className="border p-2">Option Y</td>
                            </tr>
                            <tr>
                              <td className="border p-2">Option C</td>
                              <td className="border p-2">Option Z</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {selectedQuestion.type === "Data Sufficiency" && (
                    <div>
                      <p className="mb-2">
                        Determine if the data is sufficient to answer:
                      </p>
                      <p className="font-medium mb-4">
                        "What is the value of x?"
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="font-medium mr-2">(1)</span>
                          <p>x + y = 10</p>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium mr-2">(2)</span>
                          <p>y = 4</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                          Select the correct answer:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1 bg-gray-100 rounded">
                            Statement (1) alone is sufficient
                          </button>
                          <button className="px-3 py-1 bg-gray-100 rounded">
                            Statement (2) alone is sufficient
                          </button>
                          <button className="px-3 py-1 bg-gray-100 rounded">
                            Both statements together are sufficient
                          </button>
                          <button className="px-3 py-1 bg-gray-100 rounded">
                            Neither statement is sufficient
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => handleDelete(selectedQuestion.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete Question
                </button>
                <button
                  onClick={closePreview}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}