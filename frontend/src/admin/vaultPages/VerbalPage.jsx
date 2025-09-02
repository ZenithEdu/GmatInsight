import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  Plus,
  FileText,
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  X,
} from "lucide-react";

const difficultyOptions = ["All", "easy", "medium", "hard"];
const levelOptions = ["All", "l1", "l2", "l3", "l4", "l5"];
const questionTypeOptions = [
  "All",
  "reading_comprehension",
  "critical_reasoning",
  "sentence_correction",
  "vocabulary",
  "para_completion",
];

export default function VerbalPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
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

  useEffect(() => {
    // Fetch from backend
    fetch("/api/verbalVault/VerbalVaultQuestions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch(() => setQuestions([]));
  }, []);

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

  const handlePreview = useCallback((id) => {
    const question = questions.find((q) => q.questionId === id);
    setSelectedQuestion(question);
  }, [questions]);

  const closePreview = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm(`Are you sure you want to delete Question ${id}?`)) {
        setQuestions((prev) => prev.filter((q) => q.questionId !== id));
        if (selectedQuestion && selectedQuestion.questionId === id) {
          setSelectedQuestion(null);
        }
      }
    },
    [selectedQuestion]
  );

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
              Verbal Reasoning Vault
            </h1>
            <p className="text-gray-500 text-sm">
              (
              {filteredQuestions.length} question
              {filteredQuestions.length !== 1 ? "s" : ""} found)
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
              onClick={() => navigate("/verbal-upload-page")}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                  onChange={(e) => updateFilter("difficultyLevel", e.target.value)}
                >
                  {levelOptions.map((option) => (
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
          <div className="hidden md:grid grid-cols-[1fr_1.2fr_1.2fr_1.5fr_1.2fr_0.8fr_0.8fr_1.2fr_0.8fr] bg-gray-50 px-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div>Set ID</div>
            <div>Question ID</div>
            <div>Type</div>
            <div>Topic</div>
            <div>Difficulty</div>
            <div>Level</div>
            <div>Created At</div>
            <div>Answer</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((q) => (
              <div
                key={q.questionId}
                className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr_1.5fr_1.2fr_0.8fr_0.8fr_1.2fr_0.8fr] px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
              >
                <div>{q.set_id}</div>
                <div>{q.questionId}</div>
                <div>{q.type}</div>
                <div>{q.topic}</div>
                <div>{q.difficulty}</div>
                <div>{q.level}</div>
                <div>
                  {q.metadata?.createdAt
                    ? new Date(q.metadata.createdAt).toLocaleString()
                    : ""}
                </div>
                <div>{q.answer}</div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handlePreview(q.questionId)}
                    className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(q.questionId)}
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
                className="text-purple-600 hover:text-purple-800 font-medium"
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
                    {selectedQuestion.questionId} - {selectedQuestion.type}
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
                    {selectedQuestion.difficulty} ({selectedQuestion.level})
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Created</h4>
                  <p className="text-sm text-gray-600">
                    {selectedQuestion.metadata?.createdAt
                      ? new Date(selectedQuestion.metadata.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Question Type</h4>
                  <span>{selectedQuestion.type}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Question Preview</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    Preview for {selectedQuestion.type} question (ID:{" "}
                    {selectedQuestion.questionId}) would appear here.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => handleDelete(selectedQuestion.questionId)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete Question
                </button>
                <button
                  onClick={closePreview}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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