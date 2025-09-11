import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Eye,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  X,
  Plus,
  ChevronRight,
} from "lucide-react";
import { RefreshCw } from "lucide-react";

import Loading from "../../components/Loading";
import Snackbar from "../../components/Snackbar";
import Dialog from "../../components/Dialog";
import { useSnackbar } from "../../components/SnackbarProvider";

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
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
    level: "",
    createdAt: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showPassage, setShowPassage] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    questionId: null,
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const showSnackbar = useSnackbar();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/verbalVault/VerbalVaultQuestions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
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

  const handlePreview = useCallback(
    (id) => {
      const question = questions.find((q) => q.questionId === id);
      setSelectedQuestion(question);
      setEditedQuestion({ ...question, options: question.options || [] });
      setIsEditing(false);
      setFormErrors({});
      setHasUnsavedChanges(false);
      setShowPassage(false);
    },
    [questions]
  );

  const closePreview = useCallback(() => {
    if (isEditing && hasUnsavedChanges) {
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to close?"
        )
      ) {
        return;
      }
    }
    setSelectedQuestion(null);
    setEditedQuestion(null);
    setIsEditing(false);
    setFormErrors({});
    setHasUnsavedChanges(false);
  }, [isEditing, hasUnsavedChanges]);
  const handleDelete = useCallback((id) => {
    setConfirmDialog({ open: true, type: "delete", questionId: id });
  }, []);

  const confirmDelete = useCallback(async () => {
    const id = confirmDialog.questionId;
    setDeleteLoading(true);
    setConfirmDialog({ open: false, type: "", questionId: null });
    try {
      const res = await fetch(
        `${API_URL}/verbalVault/VerbalVaultQuestions/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete question");
      }
      // Re-fetch questions after delete
      const refreshed = await fetch(
        `${API_URL}/verbalVault/VerbalVaultQuestions`
      );
      if (!refreshed.ok) throw new Error("Failed to reload questions");
      const data = await refreshed.json();
      setQuestions(data);
      showSnackbar("Question deleted successfully", { type: "success" });
      if (selectedQuestion && selectedQuestion.questionId === id) {
        closePreview();
      }
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
    } finally {
      setDeleteLoading(false);
    }
  }, [confirmDialog.questionId, selectedQuestion, API_URL, closePreview]);

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
    if (!editedQuestion.type) errors.type = "Question type is required";
    if (!editedQuestion.topic) errors.topic = "Topic is required";
    if (!editedQuestion.question) errors.question = "Question is required";
    if (!editedQuestion.passage) errors.passage = "Passage is required";
    if (!editedQuestion.answer) errors.answer = "Correct answer is required";
    if (!editedQuestion.difficulty)
      errors.difficulty = "Difficulty is required";
    if (!editedQuestion.level) errors.level = "Level is required";
    if (!editedQuestion.layout) errors.layout = "Layout is required";
    if (!editedQuestion.options || editedQuestion.options.length < 2) {
      errors.options = "At least 2 options are required";
    } else if (editedQuestion.options.some((opt) => !opt)) {
      errors.options = "All options must be filled";
    }
    if (!editedQuestion.options.includes(editedQuestion.answer)) {
      errors.answer = "Correct answer must match one of the options";
    }
    // explanation is optional, do not validate
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [editedQuestion]);

  const handleSave = useCallback(() => {
    if (!validateForm()) {
      alert("Please fix the errors before saving.");
      return;
    }
    fetch(
      `${API_URL}/verbalVault/VerbalVaultQuestions/${editedQuestion.questionId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set_id: editedQuestion.set_id,
          type: editedQuestion.type,
          topic: editedQuestion.topic,
          question: editedQuestion.question,
          passage: editedQuestion.passage,
          options: editedQuestion.options,
          answer: editedQuestion.answer,
          difficulty: editedQuestion.difficulty,
          level: editedQuestion.level,
          layout: editedQuestion.layout,
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
      level: "",
      createdAt: "",
    });
  }, []);

  const handleRegenerate = useCallback((id) => {
    setConfirmDialog({ open: true, type: "regenerate", questionId: id });
  }, []);

  const confirmRegenerate = useCallback(async () => {
    if (!confirmDialog.questionId) return;
    setConfirmDialog({ open: false, questionId: null });
    showSnackbar("Question regenerated successfully", { type: "success" });
    try {
      const res = await fetch(
        `${API_URL}/verbalVault/VerbalVaultQuestions/${confirmDialog.questionId}/regenerate`,
        { method: "POST" }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to regenerate question");
      }
      // Reload questions after regeneration
      const refreshed = await fetch(
        `${API_URL}/verbalVault/VerbalVaultQuestions`
      );
      if (!refreshed.ok) throw new Error("Failed to reload questions");
      const data = await refreshed.json();
      setQuestions(data);
      showSnackbar("Question regenerated and added to the end", {
        type: "success",
      });
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
    }
  }, [API_URL, confirmDialog.questionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Dialogs */}
      <Dialog
        open={confirmDialog.open && confirmDialog.type === "delete"}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() =>
          setConfirmDialog({ open: false, type: "", questionId: null })
        }
        confirmText="Delete"
        loading={deleteLoading}
      />
      <Dialog
        open={confirmDialog.open && confirmDialog.type === "regenerate"}
        title="Regenerate Question"
        message="Are you sure you want to regenerate this question? It will be duplicated and added to the end of the list."
        onConfirm={confirmRegenerate}
        onCancel={() =>
          setConfirmDialog({ open: false, type: "", questionId: null })
        }
        confirmText="Regenerate"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-purple-800 flex items-center">
              <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
              Verbal Reasoning Vault
            </h1>
            <p className="text-gray-500 text-sm">
              ({filteredQuestions.length} question
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
              onClick={() => navigate("/verbal/verbal-upload-page")}
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
        {loading && <Loading overlay text="Loading questions..." />}
        {error && (
          <Snackbar
            open={true}
            message={`Error: ${error}`}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        {!loading && !error && (
          <>
            {deleteLoading && <Loading overlay text="Deleting question..." />}
            {deleteSuccess && (
              <Snackbar
                open={true}
                message={deleteSuccess}
                type="success"
                onClose={() => setDeleteSuccess("")}
              />
            )}
            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Question ID
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input
                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="Search ID"
                        value={filters.id}
                        onChange={(e) => updateFilter("id", e.target.value)}
                        aria-label="Search by Question ID"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Question Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={filters.type}
                      onChange={(e) => updateFilter("type", e.target.value)}
                      aria-label="Filter by Question Type"
                    >
                      {questionTypeOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option.replace("_", " ").toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Topic
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Search topic"
                      value={filters.topic}
                      onChange={(e) => updateFilter("topic", e.target.value)}
                      aria-label="Search by Topic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={filters.difficulty}
                      onChange={(e) =>
                        updateFilter("difficulty", e.target.value)
                      }
                      aria-label="Filter by Difficulty"
                    >
                      {difficultyOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      className="w-full px-3 py-2 bg-purple-200 text-purple-700 rounded-lg hover:bg-purple-300 transition-colors"
                      aria-label="Reset Filters"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Level
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={filters.level}
                      onChange={(e) => updateFilter("level", e.target.value)}
                      aria-label="Filter by Level"
                    >
                      {levelOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-1">
                      Created Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={filters.createdAt}
                      onChange={(e) =>
                        updateFilter("createdAt", e.target.value)
                      }
                      aria-label="Filter by Created Date"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Questions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_1.2fr_1.2fr_1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] bg-purple-50 px-4 py-3 border-b border-purple-200 text-sm font-semibold text-purple-600">
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("set_id")}
                >
                  Set ID {getSortIcon("set_id")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("questionId")}
                >
                  Question ID {getSortIcon("questionId")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("type")}
                >
                  Type {getSortIcon("type")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("topic")}
                >
                  Topic {getSortIcon("topic")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("difficulty")}
                >
                  Difficulty {getSortIcon("difficulty")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("level")}
                >
                  Level {getSortIcon("level")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At {getSortIcon("createdAt")}
                </div>
                <div>Source</div>
                <div>Actions</div>
              </div>
              {sortedQuestions.length > 0 ? (
                sortedQuestions.map((q) => (
                  <div
                    key={q.questionId}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.2fr_1.5fr_1.2fr_0.8fr_0.8fr_0.8fr_1fr] px-4 py-3 border-b border-purple-200 hover:bg-purple-50 transition-colors text-sm"
                  >
                    <div>{q.set_id || "N/A"}</div>
                    <div className="flex items-center py-2 md:py-0">
                      <FileText className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="font-medium" title={q.questionId}>{q.questionId}</span>
                    </div>

                    <div className="truncate cursor-default" title={q.type}>
                      {q.type?.replace("_", " ").toUpperCase() || "N/A"}
                    </div>
                    <div className="truncate cursor-default" title={q.topic}>
                      {q.topic || "N/A"}
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyClass(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty || "N/A"}
                      </span>
                    </div>
                    <div>{q.level?.toUpperCase() || "N/A"}</div>
                    <div>
                      {q.metadata?.createdAt
                        ? new Date(q.metadata.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div className="capitalize">
                      {q.metadata?.source === "regenerated"
                        ? "regenerated"
                        : q.metadata?.source === "excel"
                        ? "excel"
                        : "manual"}
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleRegenerate(q.questionId)}
                        className="p-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors cursor-pointer"
                        title="Regenerate"
                        aria-label={`Regenerate question ${q.questionId}`}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePreview(q.questionId)}
                        className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors cursor-pointer"
                        title="Preview"
                        aria-label={`Preview question ${q.questionId}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(q.questionId)}
                        className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors cursor-pointer"
                        title="Delete"
                        aria-label={`Delete question ${q.questionId}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2">No questions match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    aria-label="Reset filters"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Question Preview Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedQuestion.questionId} -{" "}
                    {selectedQuestion.type?.replace("_", " ").toUpperCase() ||
                      "N/A"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedQuestion.topic || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-white/50 rounded"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Metadata Grid - More Compact */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Set ID
                  </label>
                  {isEditing ? (
                    <input
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.set_id
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.set_id || ""}
                      onChange={(e) =>
                        handleEditChange("set_id", e.target.value)
                      }
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.set_id || "N/A"}
                    </span>
                  )}
                  {formErrors.set_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.set_id}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Difficulty
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.difficulty
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.difficulty || ""}
                      onChange={(e) =>
                        handleEditChange("difficulty", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {difficultyOptions
                        .filter((opt) => opt !== "All")
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyClass(
                        selectedQuestion.difficulty
                      )}`}
                    >
                      {selectedQuestion.difficulty || "N/A"}
                    </span>
                  )}
                  {formErrors.difficulty && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.difficulty}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Type
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.type
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.type || ""}
                      onChange={(e) => handleEditChange("type", e.target.value)}
                    >
                      <option value="">Select</option>
                      {questionTypeOptions
                        .filter((opt) => opt !== "All")
                        .map((option) => (
                          <option key={option} value={option}>
                            {option.replace("_", " ").toUpperCase()}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.type?.replace("_", " ").toUpperCase() ||
                        "N/A"}
                    </span>
                  )}
                  {formErrors.type && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.type}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Layout
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.layout
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.layout || ""}
                      onChange={(e) =>
                        handleEditChange("layout", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.layout || "N/A"}
                    </span>
                  )}
                  {formErrors.layout && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.layout}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Topic
                  </label>
                  {isEditing ? (
                    <input
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.topic
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.topic || ""}
                      onChange={(e) =>
                        handleEditChange("topic", e.target.value)
                      }
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.topic || "N/A"}
                    </span>
                  )}
                  {formErrors.topic && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.topic}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Level
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.level
                          ? "border-red-500"
                          : "focus:ring-purple-500"
                      }`}
                      value={editedQuestion.level || ""}
                      onChange={(e) =>
                        handleEditChange("level", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {levelOptions
                        .filter((opt) => opt !== "All")
                        .map((option) => (
                          <option key={option} value={option}>
                            {option.toUpperCase()}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.level?.toUpperCase() || "N/A"}
                    </span>
                  )}
                  {formErrors.level && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.level}
                    </p>
                  )}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Passage - Collapsible */}
                  {selectedQuestion.passage && (
                    <div className="bg-gray-50 rounded-lg border">
                      <button
                        className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setShowPassage(!showPassage)}
                      >
                        <h4 className="font-medium text-gray-700 flex items-center">
                          <ChevronRight
                            className={`w-4 h-4 mr-2 transform transition-transform ${
                              showPassage ? "rotate-90" : ""
                            }`}
                          />
                          Passage
                        </h4>
                        <span className="text-xs text-gray-500">
                          {selectedQuestion.passage?.length || 0} chars
                        </span>
                      </button>
                      {showPassage && (
                        <div className="px-3 pb-3">
                          {isEditing ? (
                            <textarea
                              className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                                formErrors.passage
                                  ? "border-red-500"
                                  : "focus:ring-purple-500"
                              }`}
                              value={editedQuestion.passage || ""}
                              onChange={(e) =>
                                handleEditChange("passage", e.target.value)
                              }
                              rows={4}
                            />
                          ) : (
                            <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
                              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                {selectedQuestion.passage}
                              </p>
                            </div>
                          )}
                          {formErrors.passage && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.passage}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Question */}
                  <div className="bg-blue-50 rounded-lg border border-blue-200">
                    <div className="p-3">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Question
                      </h4>
                      {isEditing ? (
                        <textarea
                          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                            formErrors.question
                              ? "border-red-500"
                              : "focus:ring-blue-500"
                          }`}
                          value={editedQuestion.question || ""}
                          onChange={(e) =>
                            handleEditChange("question", e.target.value)
                          }
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {selectedQuestion.question ||
                            "No question available."}
                        </p>
                      )}
                      {formErrors.question && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.question}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Options */}
                  <div className="bg-green-50 rounded-lg border border-green-200">
                    <div className="p-3">
                      <h4 className="font-medium text-green-800 mb-2">
                        Answer Options
                      </h4>
                      {isEditing ? (
                        <div className="space-y-2">
                          {editedQuestion.options?.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <input
                                className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={option || ""}
                                onChange={(e) =>
                                  handleOptionChange(index, e.target.value)
                                }
                              />
                              {editedQuestion.options.length > 2 && (
                                <button
                                  onClick={() => removeOption(index)}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          {editedQuestion.options.length < 6 && (
                            <button
                              onClick={addOption}
                              className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                            >
                              + Add Option
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {selectedQuestion.options?.map((option, index) => (
                            <div
                              key={index}
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
                                {String.fromCharCode(65 + index)}
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
                      )}
                      {formErrors.options && (
                        <p className="text-red-500 text-xs mt-2">
                          {formErrors.options}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Correct Answer (Edit Mode) */}
                  {isEditing && (
                    <div className="bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="p-3">
                        <h4 className="font-medium text-yellow-800 mb-2">
                          Correct Answer
                        </h4>
                        <select
                          className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                            formErrors.answer
                              ? "border-red-500"
                              : "focus:ring-yellow-500"
                          }`}
                          value={editedQuestion.answer || ""}
                          onChange={(e) =>
                            handleEditChange("answer", e.target.value)
                          }
                        >
                          <option value="">Select correct answer</option>
                          {editedQuestion.options?.map((option, index) => (
                            <option key={index} value={option}>
                              {String.fromCharCode(65 + index)}:{" "}
                              {option || `Option ${index + 1}`}
                            </option>
                          ))}
                        </select>
                        {formErrors.answer && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Explanation - Collapsible */}
              {(isEditing || selectedQuestion.explanation) && (
                <div className="bg-yellow-50 rounded-lg border border-yellow-200 mt-4">
                  <div className="p-3">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Explanation{" "}
                      <span className="text-gray-400">(optional)</span>
                    </h4>
                    {isEditing ? (
                      <textarea
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        value={editedQuestion.explanation || ""}
                        onChange={(e) =>
                          handleEditChange("explanation", e.target.value)
                        }
                        rows={3}
                        placeholder="Enter explanation for the answer (optional)..."
                      />
                    ) : (
                      <p className="text-yellow-700 text-sm whitespace-pre-line">
                        {selectedQuestion.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t bg-gray-50 p-4 flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={closePreview}
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
