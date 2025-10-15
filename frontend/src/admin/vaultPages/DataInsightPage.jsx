import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  FileText,
  Eye,
  Trash2,
  Search,
  Filter,
  Plus,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  BarChart2,
  Check,
  Table,
} from "lucide-react";
import { ListChecks, Workflow } from "lucide-react";
import Loading from "../../components/Loading";
import Snackbar from "../../components/Snackbar";
import Dialog from "../../components/Dialog";
import { useSnackbar } from "../../components/SnackbarProvider";
import QuestionPreviewModal from "./QuestionPreviewModal";
import TableAnalysisPreviewModal from "./TableAnalysisPreviewModal"; // Add this import

const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
const levelOptions = ["All", "L1", "L2", "L3", "L4", "L5"];
const questionTypeOptions = [
  "All",
  "Data Sufficiency",
  "Two-part Analysis",
  "Graphics Interpretation",
  "Table Analysis",
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    questionId: null,
  });
  const [showTableAnalysisModal, setShowTableAnalysisModal] = useState(false);
  const [tableAnalysisEditData, setTableAnalysisEditData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const showSnackbar = useSnackbar();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const [dsRes, tpaRes, giRes, tableRes] = await Promise.all([
        fetch(`${API_URL}/dataSufficiency`),
        fetch(`${API_URL}/twoPartAnalysis`),
        fetch(`${API_URL}/graphicsInterpretation`),
        fetch(`${API_URL}/tableAnalysis`),
      ]);

      if (!dsRes.ok)
        throw new Error("Failed to fetch Data Sufficiency questions");
      if (!tpaRes.ok)
        throw new Error("Failed to fetch Two-Part Analysis questions");
      if (!giRes.ok)
        throw new Error("Failed to fetch Graphics Interpretation questions");
      if (!tableRes.ok)
        throw new Error("Failed to fetch Table Analysis questions");

      const ds = await dsRes.json();
      const tpa = await tpaRes.json();
      const gi = await giRes.json();
      const table = await tableRes.json();

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
      const tableQuestions = (table || []).map((q) => ({
        ...q,
        type: "Table Analysis",
        questionId: q.questionId || q._id || "", // Use questionId from backend
        set_id: q.setId || q.set_id || "",
        contentDomain: q.contentDomain || "",
        metadata: q.metadata || {},
        topic: q.topic || "",
        difficulty: q.difficulty || "",
        level: q.level || "",
      }));
      setQuestions([
        ...dsQuestions,
        ...tpaQuestions,
        ...giQuestions,
        ...tableQuestions,
      ]);
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
      case "Graphics Interpretation":
        return <BarChart2 className="w-4 h-4 mr-2 text-teal-500" />;

      case "Two-part Analysis":
        return <Workflow className="w-4 h-4 mr-2 text-orange-500" />;

      case "Data Sufficiency":
        return <ListChecks className="w-4 h-4 mr-2 text-violet-500" />;

      case "Table Analysis":
        return <Table className="w-4 h-4 mr-2 text-emerald-500" />; // Use Table icon

      default:
        return <FileText className="w-4 h-4 mr-2 text-gray-500" />;
    }
  }, []);

  const handlePreview = useCallback(
    (id) => {
      const question = questions.find((q) => q.questionId === id);
      setSelectedQuestion(question);
    },
    [questions]
  );

  const closePreview = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

  const getEndpoint = useCallback((type) => {
    switch (type) {
      case "Data Sufficiency":
        return "dataSufficiency";
      case "Two-part Analysis":
        return "twoPartAnalysis";
      case "Graphics Interpretation":
        return "graphicsInterpretation";
      case "Table Analysis":
        return "tableAnalysis";
      default:
        return "";
    }
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
  }, [
    confirmDialog.questionId,
    questions,
    getEndpoint,
    API_URL,
    fetchQuestions,
    showSnackbar,
  ]);

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
      case "Two-part Analysis":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Table Details:</h4>
            <p className="text-sm text-gray-600">
              Headers: {question.tableHeaders?.length || 0}, Values:{" "}
              {question.tableValues?.length || 0}
            </p>
          </div>
        );
      case "Graphics Interpretation":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Graph Details:</h4>
            <p className="text-sm text-gray-600">
              Dropdowns: {question.dropdowns?.length || 0}
            </p>
            <p className="text-sm text-gray-600">
              Graph URL:{" "}
              <a
                href={question.graphUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Graph
              </a>
            </p>
          </div>
        );
      case "Table Analysis":
        return (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700">Table Analysis Details:</h4>
            <p className="text-sm text-gray-600">
              Rows: {question.rows?.length || 0}, Columns:{" "}
              {question.columns?.length || 0}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  // Show Table Analysis preview modal
  const handleTableAnalysisPreview = useCallback((id) => {
    const question = questions.find((q) => q.questionId === id);
    setTableAnalysisEditData(question);
    setShowTableAnalysisModal(true);
  }, [questions]);

  // Update Table Analysis question
  const handleTableAnalysisUpdate = useCallback(
    async (updatedQuestion) => {
      const endpoint = getEndpoint(updatedQuestion.type);
      try {
        const res = await fetch(
          `${API_URL}/${endpoint}/${updatedQuestion.questionId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuestion),
          }
        );
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to update question");
        }
        await fetchQuestions();
        showSnackbar("Question updated successfully", { type: "success" });
        setShowTableAnalysisModal(false);
        setTableAnalysisEditData(null);
      } catch (err) {
        showSnackbar(err.message, { type: "error" });
      }
    },
    [API_URL, fetchQuestions, showSnackbar, getEndpoint]
  );

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
              <div className="hidden md:grid grid-cols-[60px_60px_120px_140px_120px_110px_100px_80px_140px_120px_140px] bg-emerald-600 px-4 py-3 border-b border-emerald-200 text-sm font-semibold text-white sticky top-0 z-10">
                <div className="text-center">S.No</div>
                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort("set_id")}
                >
                  Set ID {getSortIcon("set_id")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort("questionId")}
                >
                  Question ID {getSortIcon("questionId")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-left"
                  onClick={() => handleSort("type")}
                >
                  Type {getSortIcon("type")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort("topic")}
                >
                  Topic {getSortIcon("topic")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-left"
                  onClick={() => handleSort("contentDomain")}
                >
                  Content Domain {getSortIcon("contentDomain")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort("difficulty")}
                >
                  Difficulty {getSortIcon("difficulty")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => handleSort("level")}
                >
                  Level {getSortIcon("level")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-left"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At {getSortIcon("createdAt")}
                </div>
                <div
                  className="cursor-pointer flex items-center justify-left"
                  onClick={() => handleSort("source")}
                >
                  Source {getSortIcon("source")}
                </div>
                <div className="text-center">Actions</div>
              </div>
              {sortedQuestions.length > 0 ? (
                sortedQuestions.map((q, index) => (
                  <div
                    key={q.questionId}
                    className="grid grid-cols-1 md:grid-cols-[60px_60px_120px_140px_120px_110px_100px_80px_140px_120px_140px] px-4 py-3 border-b border-emerald-200 hover:bg-emerald-50 transition-colors text-sm"
                  >
                    <div className="flex items-center justify-center py-2 md:py-0">
                      <span className="font-medium text-emerald-100 bg-emerald-600 w-8 h-8 flex items-center justify-center rounded">
                        {getSerialNumber(index)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center py-2 md:py-0 font-mono text-sm">
                      {q.set_id || "N/A"}
                    </div>
                    <div className="flex items-center justify-center py-2 md:py-0">
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <span
                        className="font-medium truncate"
                        title={q.questionId}
                      >
                        {q.questionId}
                      </span>
                    </div>
                    <div className="flex items-center justify-left py-2 md:py-0 capitalize">
                      {getQuestionTypeIcon(q.type)}
                      <span className="truncate text-[14px]" title={q.type}>
                        {q.type}
                      </span>
                    </div>
                    <div className="flex items-center py-2 md:py-0 justify-center">
                      <span
                        className="truncate max-w-[100px] w-full text-center"
                        title={q.topic}
                      >
                        {q.topic || "N/A"}
                      </span>
                    </div>
                    <div
                      className="truncate py-2 md:py-0 flex items-center justify-left"
                      title={q.contentDomain}
                    >
                      {q.contentDomain || "N/A"}
                    </div>
                    <div className="py-2 md:py-0 flex items-center justify-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyClass(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty || "N/A"}
                      </span>
                    </div>
                    <div className="py-2 md:py-0 flex items-center justify-center font-medium">
                      {q.level?.toUpperCase() || "N/A"}
                    </div>
                    <div className="text-gray-500 py-2 md:py-0 flex items-center justify-left text-xs">
                      {q.metadata?.createdAt
                        ? new Intl.DateTimeFormat("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(q.metadata.createdAt))
                        : "N/A"}
                    </div>
                    <div className="py-2 md:py-0 flex items-center justify-left capitalize italic text-sm text-gray-600">
                      {q.metadata?.source || "N/A"}
                    </div>
                    <div className="flex gap-2 items-center py-2 md:py-0 justify-center">
                      <button
                        onClick={() => handleRegenerate(q.questionId)}
                        className="p-1.5 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                        title="Regenerate"
                        aria-label={`Regenerate question ${q.questionId}`}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          q.type === "Table Analysis"
                            ? handleTableAnalysisPreview(q.questionId)
                            : handlePreview(q.questionId)
                        }
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
        <QuestionPreviewModal
          selectedQuestion={selectedQuestion}
          closePreview={closePreview}
          questions={questions}
          setQuestions={setQuestions}
          getEndpoint={getEndpoint}
          API_URL={API_URL}
          showSnackbar={showSnackbar}
          fetchQuestions={fetchQuestions}
          difficultyOptions={difficultyOptions}
          levelOptions={levelOptions}
          contentDomainOptions={contentDomainOptions}
        />
      )}

      {/* Table Analysis Preview Modal */}
      {showTableAnalysisModal && tableAnalysisEditData && (
        <TableAnalysisPreviewModal
          question={tableAnalysisEditData}
          onClose={() => {
            setShowTableAnalysisModal(false);
            setTableAnalysisEditData(null);
          }}
          onUpdate={handleTableAnalysisUpdate}
          API_URL={API_URL}
          showSnackbar={showSnackbar}
        />
      )}
    </div>
  );
}
