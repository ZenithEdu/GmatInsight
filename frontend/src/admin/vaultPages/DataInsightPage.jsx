import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
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
  RefreshCw,
  Check,
  Table,
  BarChart2,
  List,
} from "lucide-react";
import Loading from "../../components/Loading";
import Snackbar from "../../components/Snackbar";
import Dialog from "../../components/Dialog";
import { useSnackbar } from "../../components/SnackbarProvider";

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
const levelOptions = ["All", "L1", "L2", "L3", "L4", "L5"];
const questionTypeOptions = [
  "All",
  "Data Sufficiency",
  "Multi-source Reasoning",
  "Table Analysis",
  "Graphics Interpretation",
  "Two-part Analysis",
];
const contentDomainOptions = ["All", "Math", "Non-Math"];

export default function DataInsightPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    set_id: "",
    questionId: "",
    type: "",
    topic: "",
    difficulty: "",
    level: "",
    createdAt: "",
    contentDomain: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showStatements, setShowStatements] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    questionId: null,
  });
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const showSnackbar = useSnackbar();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const [dsRes, tpaRes, giRes] = await Promise.all([
        fetch(`${API_URL}/dataSufficiency`),
        fetch(`${API_URL}/twoPartAnalysis`),
        fetch(`${API_URL}/graphicsInterpretation`),
      ]);

      if (!dsRes.ok) throw new Error("Failed to fetch Data Sufficiency questions");
      if (!tpaRes.ok) throw new Error("Failed to fetch Two-Part Analysis questions");
      if (!giRes.ok) throw new Error("Failed to fetch Graphics Interpretation questions");

      const ds = await dsRes.json();
      const tpa = await tpaRes.json();
      const gi = await giRes.json();

      const dsQuestions = (ds || []).map((q) => ({
        ...q,
        type: "Data Sufficiency",
      }));
      const tpaQuestions = (tpa || []).map((q) => ({
        ...q,
        type: "Two-part Analysis",
      }));
      const giQuestions = (gi || []).map((q) => ({
        ...q,
        type: "Graphics Interpretation",
      }));
      setQuestions([...dsQuestions, ...tpaQuestions, ...giQuestions]);
    } catch (err) {
      setError(err.message);
      setQuestions([]);
      showSnackbar(`Error: ${err.message}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [API_URL, showSnackbar]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

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

  const getQuestionTypeIcon = useCallback((type) => {
    const formattedType = type
      ?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    switch (formattedType) {
      case "Multi-source Reasoning":
        return <List className="w-4 h-4 mr-2 text-blue-500" />;
      case "Table Analysis":
        return <Table className="w-4 h-4 mr-2 text-purple-500" />;
      case "Graphics Interpretation":
        return <BarChart2 className="w-4 h-4 mr-2 text-teal-500" />;
      case "Two-part Analysis":
        return <div className="w-4 h-4 mr-2 text-orange-500">2P</div>;
      case "Data Sufficiency":
        return <Check className="w-4 h-4 mr-2 text-violet-500" />;
      default:
        return <FileText className="w-4 h-4 mr-2 text-gray-500" />;
    }
  }, []);

  const handlePreview = useCallback(
    (id) => {
      const question = questions.find((q) => q.questionId === id);
      setSelectedQuestion(question);
      setEditedQuestion({
        ...question,
        statements: question.statements || [],
        options: question.options || [],
      });
      setIsEditing(false);
      setFormErrors({});
      setHasUnsavedChanges(false);
      setShowStatements(true);
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

  const getEndpoint = useCallback((type) => {
    return type === "Data Sufficiency" ? "dataSufficiency" : "twoPartAnalysis";
  }, []);

  const handleDelete = useCallback((id) => {
    setConfirmDialog({ open: true, type: "delete", questionId: id });
  }, []);

  const confirmDelete = useCallback(async () => {
    const id = confirmDialog.questionId;
    const question = questions.find((q) => q.questionId === id);
    if (!question) return;

    const endpoint = getEndpoint(question.type);
    setDeleteLoading(true);
    setConfirmDialog({ open: false, type: "", questionId: null });
    try {
      const res = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete question");
      }
      await fetchQuestions();
      showSnackbar("Question deleted successfully", { type: "success" });
      if (selectedQuestion && selectedQuestion.questionId === id) {
        closePreview();
      }
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
    } finally {
      setDeleteLoading(false);
    }
  }, [
    confirmDialog.questionId,
    questions,
    selectedQuestion,
    getEndpoint,
    API_URL,
    fetchQuestions,
    closePreview,
    showSnackbar,
  ]);

  const handleEditChange = useCallback((key, value) => {
    setEditedQuestion((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const handleStatementChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newStatements = [...prev.statements];
      newStatements[index] = value;
      return { ...prev, statements: newStatements };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, statements: "" }));
  }, []);

  const addStatement = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      statements: [...prev.statements, ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeStatement = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newStatements = prev.statements.filter((_, i) => i !== index);
      return { ...prev, statements: newStatements };
    });
    setHasUnsavedChanges(true);
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
      options: [...prev.options, ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeOption = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newOptions = prev.options.filter((_, i) => i !== index);
      return { ...prev, options: newOptions };
    });
    setHasUnsavedChanges(true);
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!editedQuestion.set_id) errors.set_id = "Set ID is required";
    if (!editedQuestion.topic) errors.topic = "Topic is required";
    if (!editedQuestion.contextText)
      errors.contextText = "Context text is required";
    if (!editedQuestion.difficulty)
      errors.difficulty = "Difficulty is required";
    if (!editedQuestion.level) errors.level = "Level is required";
    if (!editedQuestion.contentDomain)
      errors.contentDomain = "Content domain is required";
    if (!editedQuestion.statements || editedQuestion.statements.length < 2) {
      errors.statements = "At least 2 statements are required";
    } else if (editedQuestion.statements.some((stmt) => !stmt)) {
      errors.statements = "All statements must be filled";
    }
    if (!editedQuestion.options || editedQuestion.options.length < 4) {
      errors.options = "At least 4 options are required";
    } else if (editedQuestion.options.some((opt) => !opt)) {
      errors.options = "All options must be filled";
    }
    if (!editedQuestion.answer) {
      errors.answer = "Correct answer is required";
    } else if (!["A", "B", "C", "D", "E"].includes(editedQuestion.answer)) {
      errors.answer = "Correct answer must be A, B, C, D, or E";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [editedQuestion]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      showSnackbar("Please fix the errors before saving.", { type: "error" });
      return;
    }
    try {
      const endpoint = getEndpoint(editedQuestion.type);
      const payload = {
        set_id: editedQuestion.set_id,
        type: editedQuestion.type,
        topic: editedQuestion.topic,
        contextText: editedQuestion.contextText,
        statements: editedQuestion.statements.filter((s) => s.trim()),
        options: editedQuestion.options.filter((o) => o.trim()),
        answer: editedQuestion.answer,
        difficulty: editedQuestion.difficulty,
        level: editedQuestion.level,
        contentDomain: editedQuestion.contentDomain,
        explanation: editedQuestion.explanation || "",
        metadata: {
          source: editedQuestion.metadata?.source || "manual",
          createdAt: editedQuestion.metadata?.createdAt || new Date(),
        },
      };
      const res = await fetch(
        `${API_URL}/${endpoint}/${editedQuestion.questionId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Failed to update question");
      const updatedQuestion = await res.json();
      setQuestions((prev) =>
        prev.map((q) =>
          q.questionId === updatedQuestion.questionId ? updatedQuestion : q
        )
      );
      setSelectedQuestion(updatedQuestion);
      setIsEditing(false);
      setHasUnsavedChanges(false);
      showSnackbar("Question updated successfully!", { type: "success" });
    } catch (err) {
      showSnackbar(`Error: ${err.message}`, { type: "error" });
    }
  }, [editedQuestion, validateForm, getEndpoint, API_URL, showSnackbar]);

  const handleRegenerate = useCallback((id) => {
    setConfirmDialog({ open: true, type: "regenerate", questionId: id });
  }, []);

  const confirmRegenerate = useCallback(async () => {
    const id = confirmDialog.questionId;
    const question = questions.find((q) => q.questionId === id);
    if (!question) return;

    const endpoint = getEndpoint(question.type);
    setConfirmDialog({ open: false, type: "", questionId: null });
    try {
      const res = await fetch(`${API_URL}/${endpoint}/${id}/regenerate`, {
        method: "POST",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to regenerate question");
      }
      await fetchQuestions();
      showSnackbar("Question regenerated and added to the end", {
        type: "success",
      });
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
    }
  }, [confirmDialog.questionId, questions, getEndpoint, API_URL, fetchQuestions, showSnackbar]);

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
        if (key === "questionId")
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
      let aVal, bVal;
      if (sortConfig.key === "createdAt") {
        aVal = new Date(a.metadata?.createdAt || 0);
        bVal = new Date(b.metadata?.createdAt || 0);
      } else if (sortConfig.key === "source") {
        aVal = a.metadata?.source || "";
        bVal = b.metadata?.source || "";
      } else {
        aVal = a[sortConfig.key] || "";
        bVal = b[sortConfig.key] || "";
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredQuestions, sortConfig]);

  const getSerialNumber = useCallback(
    (index) => {
      if (sortConfig.direction === "asc") {
        return index + 1;
      } else {
        return sortedQuestions.length - index;
      }
    },
    [sortedQuestions.length, sortConfig.direction]
  );

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
      set_id: "",
      questionId: "",
      type: "",
      topic: "",
      difficulty: "",
      level: "",
      createdAt: "",
      contentDomain: "",
    });
  }, []);

  const renderQuestionDetails = (question) => {
    switch (question.type) {
      case "Data Sufficiency":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Statements:</h4>
            <p className="text-sm text-gray-600">
              {question.statements?.length || 0} data statements provided
            </p>
          </div>
        );
      case "Multi-source Reasoning":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Sources:</h4>
            <div className="flex gap-2 mt-2">
              {question.sources?.map((source, i) => (
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
              {question.rows || 0} rows × {question.columns || 0} columns
            </p>
          </div>
        );
      case "Graphics Interpretation":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Chart Type:</h4>
            <p className="text-sm text-gray-600 capitalize">
              {question.chartType || "N/A"} chart
            </p>
          </div>
        );
      case "Two-part Analysis":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Variables:</h4>
            <p className="text-sm text-gray-600">
              {question.variables || 0} variables to analyze
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-100">
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
            <h1 className="text-2xl font-bold text-emerald-800 flex items-center">
              <PieChart className="w-6 h-6 text-emerald-600 mr-2" />
              Data Insights Vault
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
              onClick={() => navigate("/data-insight/data-insight-upload-page")}
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
            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-sm border border-emerald-200 p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Set ID
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      <input
                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Search Set ID"
                        value={filters.set_id}
                        onChange={(e) => updateFilter("set_id", e.target.value)}
                        aria-label="Search by Set ID"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Question ID
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      <input
                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Search Question ID"
                        value={filters.questionId}
                        onChange={(e) =>
                          updateFilter("questionId", e.target.value)
                        }
                        aria-label="Search by Question ID"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Question Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={filters.type}
                      onChange={(e) => updateFilter("type", e.target.value)}
                      aria-label="Filter by Question Type"
                    >
                      {questionTypeOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Topic
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Search topic"
                      value={filters.topic}
                      onChange={(e) => updateFilter("topic", e.target.value)}
                      aria-label="Search by Topic"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      className="w-full px-3 py-2 bg-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-300 transition-colors"
                      aria-label="Reset Filters"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Level
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={filters.level}
                      onChange={(e) => updateFilter("level", e.target.value)}
                      aria-label="Filter by Level"
                    >
                      {levelOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Content Domain
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={filters.contentDomain}
                      onChange={(e) =>
                        updateFilter("contentDomain", e.target.value)
                      }
                      aria-label="Filter by Content Domain"
                    >
                      {contentDomainOptions.map((option) => (
                        <option
                          key={option}
                          value={option === "All" ? "" : option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-1">
                      Created Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
              <div className="hidden md:grid grid-cols-[0.5fr_0.7fr_1fr_1.7fr_1.3fr_1fr_0.8fr_0.8fr_1fr_1fr_1fr] bg-emerald-50 px-4 py-3 border-b border-emerald-200 text-sm font-semibold text-emerald-600">
                <div>S.No</div>
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
                  onClick={() => handleSort("contentDomain")}
                >
                  Content Domain {getSortIcon("contentDomain")}
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
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort("source")}
                >
                  Source {getSortIcon("source")}
                </div>
                <div>Actions</div>
              </div>
              {sortedQuestions.length > 0 ? (
                sortedQuestions.map((q, index) => (
                  <div
                    key={q.questionId}
                    className="grid grid-cols-1 md:grid-cols-[0.5fr_0.7fr_1fr_1.7fr_1.3fr_1fr_0.8fr_0.8fr_1fr_1fr_1fr] px-4 py-3 border-b border-emerald-200 hover:bg-emerald-50 transition-colors text-sm"
                  >
                    <div className="py-2 md:py-0 font-medium">{getSerialNumber(index)}</div>
                    <div className="py-2 md:py-0">{q.set_id || "N/A"}</div>
                    <div className="flex items-center py-2 md:py-0">
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="font-medium" title={q.questionId}>
                        {q.questionId}
                      </span>
                    </div>
                    <div className="flex items-center py-2 md:py-0 capitalize">
                      {getQuestionTypeIcon(q.type)}
                      <span className="truncate " title={q.type}>
                        {q.type}
                      </span>
                    </div>
                    <div className="truncate py-2 md:py-0" title={q.topic}>
                      {q.topic || "N/A"}
                    </div>
                    <div
                      className="truncate py-2 md:py-0"
                      title={q.contentDomain}
                    >
                      {q.contentDomain || "N/A"}
                    </div>
                    <div className="py-2 md:py-0">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyClass(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty || "N/A"}
                      </span>
                    </div>
                    <div className="py-2 md:py-0">
                      {q.level?.toUpperCase() || "N/A"}
                    </div>
                    <div className="text-gray-500 py-2 md:py-0">
                      {q.metadata?.createdAt
                        ? new Date(q.metadata.createdAt).toLocaleString()
                        : "N/A"}
                    </div>
                    <div className="py-2 md:py-0 capitalize">
                      {q.metadata?.source || "N/A"}
                    </div>
                    <div className="flex gap-2 items-center py-2 md:py-0">
                      <button
                        onClick={() => handleRegenerate(q.questionId)}
                        className="p-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                        title="Regenerate"
                        aria-label={`Regenerate question ${q.questionId}`}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePreview(q.questionId)}
                        className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        title="Preview"
                        aria-label={`Preview question ${q.questionId}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.questionId)}
                        className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
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
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
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
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-emerald-50 to-blue-50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedQuestion.questionId} - {selectedQuestion.type}
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
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Set ID
                  </label>
                  {isEditing ? (
                    <input
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.set_id
                          ? "border-red-500"
                          : "focus:ring-emerald-500"
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
                          : "focus:ring-emerald-500"
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
                    Level
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.level
                          ? "border-red-500"
                          : "focus:ring-emerald-500"
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
                            {option}
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
                <div className="bg-gray-50 p-3 rounded-md">
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    Content Domain
                  </label>
                  {isEditing ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                        formErrors.contentDomain
                          ? "border-red-500"
                          : "focus:ring-emerald-500"
                      }`}
                      value={editedQuestion.contentDomain || ""}
                      onChange={(e) =>
                        handleEditChange("contentDomain", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {contentDomainOptions
                        .filter((opt) => opt !== "All")
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <span className="text-sm font-medium text-gray-800">
                      {selectedQuestion.contentDomain || "N/A"}
                    </span>
                  )}
                  {formErrors.contentDomain && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.contentDomain}
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
                          : "focus:ring-emerald-500"
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
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Context Text */}
                  <div className="bg-blue-50 rounded-lg border border-blue-200">
                    <div className="p-3">
                      <h4 className="font-medium text-blue-800 mb-2">
                        Context Text
                      </h4>
                      {isEditing ? (
                        <textarea
                          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                            formErrors.contextText
                              ? "border-red-500"
                              : "focus:ring-blue-500"
                          }`}
                          value={editedQuestion.contextText || ""}
                          onChange={(e) =>
                            handleEditChange("contextText", e.target.value)
                          }
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {selectedQuestion.contextText ||
                            "No context available."}
                        </p>
                      )}
                      {formErrors.contextText && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.contextText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Statements - Collapsible */}
                  {selectedQuestion.statements && (
                    <div className="bg-gray-50 rounded-lg border">
                      <button
                        className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setShowStatements(!showStatements)}
                      >
                        <h4 className="font-medium text-gray-700 flex items-center">
                          <ChevronRight
                            className={`w-4 h-4 mr-2 transform transition-transform ${
                              showStatements ? "rotate-90" : ""
                            }`}
                          />
                          Statements
                        </h4>
                        <span className="text-xs text-gray-500">
                          {selectedQuestion.statements?.length || 0} statements
                        </span>
                      </button>
                      {showStatements && (
                        <div className="px-3 pb-3 space-y-2">
                          {isEditing ? (
                            <>
                              {editedQuestion.statements?.map(
                                (statement, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="text-sm font-medium text-gray-700">
                                      Statement {index + 1}
                                    </span>
                                    <input
                                      className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                      value={statement || ""}
                                      onChange={(e) =>
                                        handleStatementChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {editedQuestion.statements.length > 2 && (
                                      <button
                                        onClick={() => removeStatement(index)}
                                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                )
                              )}
                              <button
                                onClick={addStatement}
                                className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                              >
                                + Add Statement
                              </button>
                            </>
                          ) : (
                            <div className="space-y-1">
                              {selectedQuestion.statements?.map(
                                (statement, index) => (
                                  <div
                                    key={index}
                                    className="bg-white p-2 rounded border border-gray-200"
                                  >
                                    <span className="text-sm font-medium text-gray-700">
                                      Statement {index + 1}:
                                    </span>{" "}
                                    <span className="text-sm text-gray-800">
                                      {statement}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          {formErrors.statements && (
                            <p className="text-red-500 text-xs mt-2">
                              {formErrors.statements}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
                              {editedQuestion.options.length > 4 && (
                                <button
                                  onClick={() => removeOption(index)}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          {editedQuestion.options.length < 5 && (
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
                                selectedQuestion.answer ===
                                String.fromCharCode(65 + index)
                                  ? "bg-green-200 border border-green-300"
                                  : "bg-white border border-gray-200"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                  selectedQuestion.answer ===
                                  String.fromCharCode(65 + index)
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span
                                className={`text-sm ${
                                  selectedQuestion.answer ===
                                  String.fromCharCode(65 + index)
                                    ? "font-semibold text-gray-800"
                                    : "text-gray-700"
                                }`}
                              >
                                {option}
                              </span>
                              {selectedQuestion.answer ===
                                String.fromCharCode(65 + index) && (
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
                            <option
                              key={index}
                              value={String.fromCharCode(65 + index)}
                            >
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
                        {selectedQuestion.explanation ||
                          "No explanation provided."}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Question Details */}
              {renderQuestionDetails(selectedQuestion)}
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
                    className="px-4 py-2 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
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