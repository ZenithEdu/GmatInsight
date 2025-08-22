import React, { useState, useMemo, useCallback } from "react";
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

const initialQuestions = [
  { id: "V-201", type: "Reading Comprehension", topic: "Science Passage", difficulty: "Medium", difficultyLevel: "L3", createdAt: "2025-08-10 09:15 AM" },
  { id: "V-202", type: "Critical Reasoning", topic: "Argument Analysis", difficulty: "Hard", difficultyLevel: "L4", createdAt: "2025-08-08 11:30 AM" },
  { id: "V-203", type: "Sentence Correction", topic: "Grammar", difficulty: "Easy", difficultyLevel: "L1", createdAt: "2025-08-07 03:45 PM" },
  { id: "V-204", type: "Vocabulary", topic: "Word Meaning", difficulty: "Easy", difficultyLevel: "L2", createdAt: "2025-08-05 10:20 AM" },
  { id: "V-205", type: "Para Completion", topic: "Paragraph Structure", difficulty: "Medium", difficultyLevel: "L3", createdAt: "2025-08-04 02:10 PM" },
  { id: "V-206", type: "Reading Comprehension", topic: "Business Passage", difficulty: "Hard", difficultyLevel: "L5", createdAt: "2025-08-03 04:30 PM" },
  { id: "V-207", type: "Critical Reasoning", topic: "Assumption Questions", difficulty: "Medium", difficultyLevel: "L3", createdAt: "2025-08-02 09:45 AM" },
  { id: "V-208", type: "Sentence Correction", topic: "Parallelism", difficulty: "Hard", difficultyLevel: "L4", createdAt: "2025-08-01 01:15 PM" },
];

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
const difficultyLevelOptions = ["All", "L1", "L2", "L3", "L4", "L5"];
const questionTypeOptions = ["All", "Reading Comprehension", "Critical Reasoning", "Sentence Correction", "Vocabulary", "Para Completion"];

export default function VerbalPage() {
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

  const handlePreview = useCallback((id) => {
    const question = questions.find((q) => q.id === id);
    setSelectedQuestion(question);
  }, [questions]);

  const closePreview = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm(`Are you sure you want to delete Question ${id}?`)) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      if (selectedQuestion && selectedQuestion.id === id) {
        setSelectedQuestion(null);
      }
    }
  }, [selectedQuestion]);

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

  const getSortIcon = useCallback((key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 inline" />
    ) : (
      <ChevronDown className="w-4 h-4 inline" />);
  }, [sortConfig]);

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
          <div className="hidden md:grid grid-cols-[1fr_1.8fr_1.5fr_0.8fr_0.6fr_1.2fr_0.8fr] bg-gray-50 px-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
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
                className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr_1.5fr_0.8fr_0.6fr_1.2fr_0.8fr] px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
              >
                <div className="flex items-center py-2 md:py-0">
                  <FileText className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium" title={q.id}>{q.id}</span>
                </div>
                <div className="truncate py-2 md:py-0" title={q.type}>{q.type}</div>
                <div className="truncate py-2 md:py-0" title={q.topic}>{q.topic}</div>
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
                    {selectedQuestion.difficulty} ({selectedQuestion.difficultyLevel})
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Created</h4>
                  <p className="text-sm text-gray-600">{selectedQuestion.createdAt}</p>
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
                    Preview for {selectedQuestion.type} question (ID: {selectedQuestion.id}) would appear here.
                  </p>
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