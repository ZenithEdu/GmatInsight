import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Plus,
  FileText,
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  X,
  RefreshCw,
} from "lucide-react";
import Loading from "../../components/Loading";
import Snackbar from "../../components/Snackbar";

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
const levelOptions = ["All", "L1", "L2", "L3", "L4", "L5"];

export default function QuantPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    set_id: "",
    id: "",
    topic: "",
    difficulty: "",
    level: "",
    createdAt: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, questionId: null });
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch quant questions from backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/quantVault/QuantVaultQuestions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setSnackbar({ open: true, message: err.message, type: "error" });
        setQuestions([]);
        setLoading(false);
      });
  }, []);

  const getDifficultyClass = useCallback((difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }, []);

  const handlePreview = useCallback((id) => {
    const question = questions.find((q) => q.questionId === id);
    setSelectedQuestion(question);
    setEditedQuestion({ ...question, options: question.options || [] });
    setIsEditing(false);
    setFormErrors({});
    setHasUnsavedChanges(false);
  }, [questions]);

  const closePreview = useCallback(() => {
    if (isEditing && hasUnsavedChanges) {
      if (!window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        return;
      }
    }
    setSelectedQuestion(null);
    setEditedQuestion(null);
    setIsEditing(false);
    setFormErrors({});
    setHasUnsavedChanges(false);
  }, [isEditing, hasUnsavedChanges]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm(`Are you sure you want to delete Question ${id}?`)) {
      setDeleteLoading(true);
      setSnackbar({ open: false, message: "", type: "success" });
      try {
        const res = await fetch(`${API_URL}/quantVault/QuantVaultQuestions/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to delete question");
        }
        // Re-fetch questions after delete
        const refreshed = await fetch(`${API_URL}/quantVault/QuantVaultQuestions`);
        if (!refreshed.ok) throw new Error("Failed to reload questions");
        const data = await refreshed.json();
        setQuestions(data);
        setSnackbar({ open: true, message: "Question deleted successfully!", type: "success" });
        if (selectedQuestion && selectedQuestion.questionId === id) {
          closePreview();
        }
      } catch (err) {
        setSnackbar({ open: true, message: err.message, type: "error" });
      } finally {
        setDeleteLoading(false);
      }
    }
  }, [selectedQuestion, API_URL, closePreview]);

  const handleEditChange = useCallback((key, value) => {
    setEditedQuestion((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const handleOptionChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, options: "" }));
  }, []);

  const addOption = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeOption = useCallback((index) => {
    setEditedQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!editedQuestion.set_id) errors.set_id = "Set ID is required";
    if (!editedQuestion.topic) errors.topic = "Topic is required";
    if (!editedQuestion.question) errors.question = "Question is required";
    if (!editedQuestion.answer) errors.answer = "Correct answer is required";
    if (!editedQuestion.difficulty) errors.difficulty = "Difficulty is required";
    if (!editedQuestion.level) errors.level = "Level is required";
    if (!editedQuestion.options || editedQuestion.options.length < 2) {
      errors.options = "At least 2 options are required";
    } else if (editedQuestion.options.some((opt) => !opt)) {
      errors.options = "All options must be filled";
    }
    if (!editedQuestion.options.includes(editedQuestion.answer)) {
      errors.answer = "Correct answer must match one of the options";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [editedQuestion]);

  const handleSave = useCallback(() => {
    if (!validateForm()) {
      alert("Please fix the errors before saving.");
      return;
    }
    fetch(
      `${API_URL}/quantVault/QuantVaultQuestions/${editedQuestion.questionId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set_id: editedQuestion.set_id,
          topic: editedQuestion.topic,
          question: editedQuestion.question,
          options: editedQuestion.options,
          answer: editedQuestion.answer,
          difficulty: editedQuestion.difficulty,
          level: editedQuestion.level,
          explanation: editedQuestion.explanation || "",
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update question");
        return res.json();
      })
      .then((updatedQuestion) => {
        setQuestions((prev) =>
          prev.map((q) =>
            q.questionId === updatedQuestion.questionId ? updatedQuestion : q
          )
        );
        setSelectedQuestion(updatedQuestion);
        setIsEditing(false);
        setHasUnsavedChanges(false);
        alert("Question updated successfully!");
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  }, [editedQuestion, validateForm]);

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
        if (key === "createdAt") {
          const filterDate = new Date(value).toISOString().split("T")[0];
          const questionDate = q.metadata?.createdAt
            ? new Date(q.metadata.createdAt).toISOString().split("T")[0]
            : "";
          return questionDate.includes(filterDate);
        }
        if (key === "id")
          return String(q.questionId || "")
            .toLowerCase()
            .includes(value.toLowerCase());
        if (key === "set_id")
          return String(q.set_id || "")
            .toLowerCase()
            .includes(value.toLowerCase());
        if (key === "level")
          return String(q.level || "")
            .toLowerCase()
            .includes(value.toLowerCase());
        return String(q[key] || "")
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [questions, filters]);

  const sortedQuestions = useMemo(() => {
    if (!sortConfig.key) return filteredQuestions;

    return [...filteredQuestions].sort((a, b) => {
      const aVal =
        sortConfig.key === "createdAt"
          ? new Date(a.metadata?.createdAt || 0)
          : a[sortConfig.key] || "";
      const bVal =
        sortConfig.key === "createdAt"
          ? new Date(b.metadata?.createdAt || 0)
          : b[sortConfig.key] || "";

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
      <ChevronDown className="w-4 h-4 inline" />
    );
  }, [sortConfig]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      set_id: "",
      id: "",
      topic: "",
      difficulty: "",
      level: "",
      createdAt: "",
    });
  }, []);

  const handleRegenerate = useCallback((id) => {
    setConfirmDialog({ open: true, questionId: id });
  }, []);

  const confirmRegenerate = useCallback(async () => {
    if (!confirmDialog.questionId) return;
    setConfirmDialog({ open: false, questionId: null });
    setSnackbar({ open: false, message: "", type: "success" });
    try {
      const res = await fetch(
        `${API_URL}/quantVault/QuantVaultQuestions/${confirmDialog.questionId}/regenerate`,
        { method: "POST" }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to regenerate question");
      }
      // Reload questions after regeneration
      const refreshed = await fetch(`${API_URL}/quantVault/QuantVaultQuestions`);
      if (!refreshed.ok) throw new Error("Failed to reload questions");
      const data = await refreshed.json();
      setQuestions(data);
      setSnackbar({
        open: true,
        message: "Question regenerated and added to the end",
        type: "success",
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, type: "error" });
    }
  }, [API_URL, confirmDialog.questionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Loading Overlay */}
      {deleteLoading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg px-8 py-6 flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span className="text-blue-700 font-semibold">Deleting question...</span>
          </div>
        </div>
      )}
      {loading && <Loading overlay text="Loading questions..." />}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
              Quantitative Vault
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
              onClick={() => navigate("/quant/quantitative-upload-page")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Set ID
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Search Set ID"
                  value={filters.set_id}
                  onChange={(e) => updateFilter("set_id", e.target.value)}
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  value={filters.level}
                  onChange={(e) => updateFilter("level", e.target.value)}
                >
                  {levelOptions.map((option) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
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
          <div className="hidden md:grid grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_1fr_0.8fr] bg-gray-50 px-4 py-3 border-b border-gray-200 text-sm font-semibold text-gray-600">
            <div className="cursor-pointer" onClick={() => handleSort("set_id")}>
              Set ID {getSortIcon("set_id")}
            </div>
            <div className="cursor-pointer" onClick={() => handleSort("questionId")}>
              Question ID {getSortIcon("questionId")}
            </div>
            <div className="cursor-pointer" onClick={() => handleSort("topic")}>
              Topic {getSortIcon("topic")}
            </div>
            <div className="cursor-pointer" onClick={() => handleSort("difficulty")}>
              Difficulty {getSortIcon("difficulty")}
            </div>
            <div className="cursor-pointer" onClick={() => handleSort("level")}>
              Level {getSortIcon("level")}
            </div>
            <div className="cursor-pointer" onClick={() => handleSort("createdAt")}>
              Created At {getSortIcon("createdAt")}
            </div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {sortedQuestions.length > 0 ? (
            sortedQuestions.map((q) => (
              <div
                key={q.questionId}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr_0.8fr_0.8fr_1fr_0.8fr] px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm"
              >
                <div>{q.set_id || "N/A"}</div>
                <div>{q.questionId}</div>
                <div className="truncate py-2 md:py-0" title={q.topic}>{q.topic}</div>
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyClass(q.difficulty)}`}>
                    {q.difficulty}
                  </span>
                </div>
                <div>{q.level}</div>
                <div className="text-gray-500 py-2 md:py-0">
                  {q.metadata?.createdAt
                    ? new Date(q.metadata.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="flex gap-2 items-center py-2 md:py-0">
                  <button
                    onClick={() => handleRegenerate(q.questionId)}
                    className="p-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
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
                className="text-blue-600 hover:text-blue-800 font-medium"
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
                    {selectedQuestion.questionId} - {selectedQuestion.topic}
                  </h3>
                  <p className="text-gray-600">{selectedQuestion.type || "Quantitative Reasoning"}</p>
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
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyClass(selectedQuestion.difficulty)}`}>
                    {selectedQuestion.difficulty} ({selectedQuestion.level})
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Created</h4>
                  <p className="text-sm text-gray-600">
                    {selectedQuestion.metadata?.createdAt
                      ? new Date(selectedQuestion.metadata.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-1">Set ID</h4>
                  <span>{selectedQuestion.set_id}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Question</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-800">{selectedQuestion.question}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Answer Options</h4>
                <div className="space-y-2">
                  {selectedQuestion.options?.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded ${
                        selectedQuestion.answer === option
                          ? "bg-green-200 border border-green-300"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          selectedQuestion.answer === option
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span
                        className={`text-sm ${
                          selectedQuestion.answer === option
                            ? "font-semibold text-gray-800"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                      {selectedQuestion.answer === option && (
                        <span className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedQuestion.explanation && (
                <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Explanation</h4>
                  <p className="text-yellow-700 text-sm whitespace-pre-line">
                    {selectedQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => handleDelete(selectedQuestion.questionId)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete Question
                </button>
                <button
                  onClick={closePreview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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