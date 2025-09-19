import { useState, useEffect, useCallback } from "react";
import ContentDomainDialog from "../components/ContentDomainDialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Plus,
  Trash2,
  Play,
  Image,
  X,
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
import GraphicsInterpretationPreview from "./preview/GraphicsInterpretationPreview";
import { useSnackbar } from "../../components/SnackbarProvider";
import Loading from "../../components/Loading";

import GraphSample from "./GraphSample.json";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const GraphicsInterpretationStructure = () => {
  const initialQuestionData = {
    setId: "",
    topic: "",
    difficulty: "",
    level: "",
    graphUrl: "",
    graphDescription: "",
    instructionText: "",
    conclusionTemplate: "",
    dropdowns: [],
    contentDomain: "",
    explanation: "",
  };

  const [questionData, setQuestionData] = useState(initialQuestionData);
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
  const [setId, setSetId] = useState("");
  const [showDomainDialog, setShowDomainDialog] = useState(false);
  const [currentView, setCurrentView] = useState("input");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrorsState] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [activeHelp, setActiveHelp] = useState(null);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  // Debug formErrors updates
  const setFormErrors = (errors) => {
    console.log("Setting formErrors:", errors);
    setFormErrorsState(errors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field, value) => {
    setQuestionData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const sampleData = {
    setId: "2",
    topic: "Data Interpretation",
    difficulty: "medium",
    level: "L3",
    graphUrl: GraphSample.GraphSample || "",
    graphDescription:
      "The graph shows the percent of each type of employee at a certain medical clinic for the years 1970, 1980, and 2010. The total number of employees at the clinic in 2010 was exactly twice the number of employees at the clinic in 1970.",
    instructionText:
      "Based on the information provided, select an option from among the options given in each drop-down menu so that the selected options together create a ratio closest to the ratio described in the statement.",
    conclusionTemplate:
      "The ratio of the number of physicians employed at the clinic in 1970 to the number of physicians employed at the clinic in 2010 is approximately {dropdown1} to {dropdown2}.",
    dropdowns: [
      {
        id: 1,
        placeholder: "dropdown1",
        options: ["1", "2", "3", "4", "5"],
        selectedValue: "",
      },
      {
        id: 2,
        placeholder: "dropdown2",
        options: ["1", "2", "3", "4", "5"],
        selectedValue: "",
      },
    ],
    contentDomain: "",
    explanation: "Explanation for the correct answers...",
  };
  const validateForm = () => {
    const errors = {};
    if (!questionData.topic) errors.topic = "Topic is required";
    if (!questionData.difficulty) errors.difficulty = "Difficulty is required";
    if (!questionData.level) errors.level = "Level is required";
    if (!questionData.graphUrl) errors.graphUrl = "Graph image is required";
    if (!questionData.graphDescription.trim())
      errors.graphDescription = "Graph description is required";
    if (!questionData.instructionText.trim())
      errors.instructionText = "Instruction text is required";
    if (!questionData.conclusionTemplate.trim())
      errors.conclusionTemplate = "Conclusion template is required";
    if (questionData.dropdowns.length === 0)
      errors.dropdowns = "At least one dropdown is required";
    questionData.dropdowns.forEach((dropdown, index) => {
      if (dropdown.options.length === 0)
        errors[`dropdown${index}`] = "Each dropdown must have at least one option";
      if (!dropdown.placeholder.trim())
        errors[`dropdownPlaceholder${index}`] = "Placeholder name is required";
    });
    // Filter out empty or invalid error messages
    Object.keys(errors).forEach((key) => {
      if (!errors[key] || errors[key].trim() === "" || errors[key] === ".") {
        delete errors[key];
      }
    });
    console.log("Validation errors:", errors);
    return errors;
  };

  const loadSampleData = () => {
    setQuestionData(sampleData);
    setImageUploaded(true);
    setSetId(sampleData.setId || "");
    setError("");
    setFormErrors({});
    showSnackbar("Sample question loaded!", { type: "success" });
  };

  const clearForm = () => {
    setQuestionData(initialQuestionData);
    setImageUploaded(false);
    setSetId("");
    setError("");
    setFormErrors({});
    setShowDomainDialog(false);
    showSnackbar("Form cleared", { type: "info" });
  };

  const addDropdown = () => {
    const newId =
      questionData.dropdowns.length > 0
        ? Math.max(...questionData.dropdowns.map((d) => d.id)) + 1
        : 1;
    setQuestionData((prev) => ({
      ...prev,
      dropdowns: [
        ...prev.dropdowns,
        {
          id: newId,
          placeholder: `dropdown${newId}`,
          options: ["Option 1"],
          selectedValue: "",
        },
      ],
    }));
  };

  const removeDropdown = (id) => {
    if (questionData.dropdowns.length > 1) {
      if (window.confirm("Are you sure you want to remove this dropdown?")) {
        setQuestionData((prev) => ({
          ...prev,
          dropdowns: prev.dropdowns.filter((d) => d.id !== id),
        }));
        showSnackbar("Dropdown removed", { type: "info" });
      }
    }
  };

  const addOption = (dropdownId) => {
    setQuestionData((prev) => ({
      ...prev,
      dropdowns: prev.dropdowns.map((dropdown) =>
        dropdown.id === dropdownId
          ? {
              ...dropdown,
              options: [
                ...dropdown.options,
                `Option ${dropdown.options.length + 1}`,
              ],
            }
          : dropdown
      ),
    }));
  };

  const removeOption = (dropdownId, index) => {
    if (window.confirm("Are you sure you want to remove this option?")) {
      setQuestionData((prev) => ({
        ...prev,
        dropdowns: prev.dropdowns.map((dropdown) =>
          dropdown.id === dropdownId
            ? {
                ...dropdown,
                options: dropdown.options.filter((_, i) => i !== index),
                selectedValue: "",
              }
            : dropdown
        ),
      }));
      showSnackbar("Option removed", { type: "info" });
    }
  };

  const updateOption = (dropdownId, index, value) => {
    setQuestionData((prev) => ({
      ...prev,
      dropdowns: prev.dropdowns.map((dropdown) =>
        dropdown.id === dropdownId
          ? {
              ...dropdown,
              options: dropdown.options.map((opt, i) =>
                i === index ? value : opt
              ),
            }
          : dropdown
      ),
    }));
  };

  const setDropdownAnswer = (id, value) => {
    setQuestionData((prev) => ({
      ...prev,
      dropdowns: prev.dropdowns.map((dropdown) =>
        dropdown.id === id ? { ...dropdown, selectedValue: value } : dropdown
      ),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file (PNG, JPG, GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setQuestionData((prev) => ({ ...prev, graphUrl: event.target.result }));
        setImageUploaded(true);
        setError("");
        setFormErrors((prev) => ({ ...prev, graphUrl: "" }));
        showSnackbar("Image uploaded successfully", { type: "success" });
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const renderConclusionWithDropdowns = (
    template,
    dropdowns,
    isPreview = false
  ) => {
    if (!template) return template;
    if (!isPreview) {
      let result = template;
      dropdowns.forEach((dropdown) => {
        const placeholder = `{${dropdown.placeholder}}`;
        result = result.replace(placeholder, `[${dropdown.placeholder}]`);
      });
      return result;
    }
    const parts = [];
    let remainingText = template;
    dropdowns.forEach((dropdown) => {
      const placeholder = `{${dropdown.placeholder}}`;
      const placeholderIndex = remainingText.indexOf(placeholder);
      if (placeholderIndex !== -1) {
        if (placeholderIndex > 0) {
          parts.push(remainingText.substring(0, placeholderIndex));
        }
        parts.push(
          <select
            key={`dropdown-${dropdown.id}`}
            value={dropdown.selectedValue}
            onChange={(e) => setDropdownAnswer(dropdown.id, e.target.value)}
            className="mx-1 px-2 py-1 border rounded text-sm bg-white shadow-sm"
            aria-label={`Select option for ${dropdown.placeholder}`}
          >
            <option value="">Select...</option>
            {dropdown.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
        remainingText = remainingText.substring(
          placeholderIndex + placeholder.length
        );
      }
    });
    if (remainingText) parts.push(remainingText);
    if (parts.length === 0) return template;
    return (
      <span>
        {parts.map((part, index) =>
          typeof part === "string" ? (
            <span key={`text-${index}`}>{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleSaveQuestion = () => {

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowAllErrors(true);
      showSnackbar("Please fix all errors before saving", { type: "error" });
      return;
    }

    if (!questionData.contentDomain) {
      setShowDomainDialog(true);
      return;
    }

    saveToBackend(questionData.contentDomain);
  };

  const handleDomainConfirm = (domain) => {
    setShowDomainDialog(false);
    setQuestionData((prev) => ({ ...prev, contentDomain: domain }));
    saveToBackend(domain);
  };

  const saveToBackend = useCallback(
    async (domain) => {
      setLoading(true);
      try {
        const payload = {
          set_id: setId || null,
          topic: questionData.topic,
          difficulty: questionData.difficulty,
          level: questionData.level,
          graphUrl: questionData.graphUrl,
          graphDescription: questionData.graphDescription,
          instructionText: questionData.instructionText,
          conclusionTemplate: questionData.conclusionTemplate,
          dropdowns: questionData.dropdowns,
          contentDomain: domain,
          explanation: questionData.explanation,
          metadata: {
            source: "manual",
            createdAt: new Date().toISOString(),
          },
        };
        await axios.post(`${API_URL}/graphicsInterpretation/upload`, payload);
        showSnackbar("Question saved successfully!", { type: "success" });
        clearForm();
      } catch (err) {
        showSnackbar("Error saving question: " + err.message, { type: "error" });
      } finally {
        setLoading(false);
      }
    },
    [questionData, setId, showSnackbar, clearForm]
  );

  if (currentView === "preview") {
    return (
      <GraphicsInterpretationPreview
        questionData={questionData}
        setCurrentView={setCurrentView}
        setQuestionData={setQuestionData}
        renderConclusionWithDropdowns={renderConclusionWithDropdowns}
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
        onClose={() => {
          setShowDomainDialog(false);
        }}
        onConfirm={handleDomainConfirm}
      />
      {loading && <Loading overlay text="Saving question..." />}
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
              <PieChart className="w-6 h-6 text-emerald-600 mr-2" />
              Graph Interpretation Generator
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={loadSampleData}
              className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Load sample question"
            >
              <Play className="w-4 h-4" />
              Sample
            </button>
            <button
              onClick={handleSaveQuestion}
              className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Save question"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Clear all fields"
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
                    aria-label={
                      showAllErrors ? "Show fewer errors" : "Show all errors"
                    }
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
                    Set ID
                  </label>
                  <input
                    type="number"
                    value={questionData.setId}
                    onChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        setId: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="Enter numeric Set ID (optional)"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={questionData.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
                  >
                    <option value="">Select topic</option>
                    {topicsList.map((topic, index) => (
                      <option key={index} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  {formErrors.topic && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.topic}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Difficulty <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={questionData.difficulty}
                    onChange={(e) =>
                      handleInputChange("difficulty", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                    required
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
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleInputChange("level", level)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          questionData.level === level
                            ? "bg-emerald-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  {formErrors.level && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.level}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-emerald-800">
                    Upload Graph Image <span className="text-red-500">*</span>
                  </label>
                  {imageUploaded && (
                    <span className="text-emerald-600 text-sm flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Image uploaded
                    </span>
                  )}
                </div>
                {!questionData.graphUrl && (
                  <div className="border-2 border-dashed border-emerald-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors bg-white">
                    <label className="cursor-pointer flex flex-col items-center">
                      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                        <Image className="w-6 h-6 text-emerald-500" />
                      </div>
                      <span className="text-sm text-emerald-600 font-medium mb-1">
                        Click to upload graph image
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG, GIF (max 5MB)
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        onChange={handleImageUpload}
                        className="hidden"
                        aria-label="Upload graph image"
                      />
                    </label>
                  </div>
                )}
                {formErrors.graphUrl && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.graphUrl}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </p>
                )}
                {questionData.graphUrl && (
                  <div className="mt-4 relative group">
                    <img
                      src={questionData.graphUrl}
                      alt="Uploaded graph"
                      className="w-full h-auto border border-gray-300 rounded-xl shadow-sm"
                    />
                    <button
                      onClick={() =>
                        setQuestionData((prev) => ({ ...prev, graphUrl: "" }))
                      }
                      className="absolute top-2 right-2 text-red-500 hover:bg-red-100 p-2 rounded-full"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-semibold text-emerald-800">
                      Graph Description <span className="text-red-500">*</span>
                    </label>
                    <button
                      onMouseEnter={() => setActiveHelp("graphDescription")}
                      onMouseLeave={() => setActiveHelp(null)}
                      className="text-emerald-500"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                    {activeHelp === "graphDescription" && (
                      <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                        Describe what the graph shows in detail. Include
                        information about axes, data trends, and any important
                        notes.
                      </div>
                    )}
                  </div>
                  <textarea
                    value={questionData.graphDescription}
                    onChange={(e) =>
                      setQuestionData((prev) => ({
                        ...prev,
                        graphDescription: e.target.value,
                      }))
                    }
                    rows={4}
                    className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-blue-400 transition-all duration-200 ${
                      formErrors.graphDescription
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe what the graph shows (e.g., 'The graph shows the percent of each type of employee...')"
                    aria-label="Graph description"
                  />
                  {formErrors.graphDescription && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.graphDescription}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-semibold text-blue-800">
                    Instruction Text <span className="text-red-500">*</span>
                  </label>
                  <button
                    onMouseEnter={() => setActiveHelp("instructionText")}
                    onMouseLeave={() => setActiveHelp(null)}
                    className="text-blue-500"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {activeHelp === "instructionText" && (
                    <div className="absolute mt-8 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                      Provide clear instructions for the student on what they
                      need to do with the dropdowns.
                    </div>
                  )}
                </div>
                <textarea
                  value={questionData.instructionText}
                  onChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      instructionText: e.target.value,
                    }))
                  }
                  rows={3}
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-blue-400 transition-all duration-200 ${
                    formErrors.instructionText
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Instructions for the student (e.g., 'Based on the information provided, select an option...')"
                  aria-label="Instruction text"
                />
                {formErrors.instructionText && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.instructionText}
                  </p>
                )}
              </div>
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 transition-all duration-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Explanation
                </h3>
                <textarea
                  value={questionData.explanation}
                  onChange={(e) => handleInputChange("explanation", e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm hover:border-purple-400 transition-all duration-200"
                  placeholder="Enter explanation..."
                  aria-label="Question explanation"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 p-5 rounded-xl relative">
                <div className="flex items-center gap-2 mb-3">
                  <label className="block text-sm font-semibold text-purple-800">
                    Conclusion Template <span className="text-red-500">*</span>
                  </label>
                  <button
                    onMouseEnter={() => setActiveHelp("conclusionTemplate")}
                    onMouseLeave={() => setActiveHelp(null)}
                    className="text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  {activeHelp === "conclusionTemplate" && (
                    <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-gray-800 text-white text-xs rounded-lg z-10 shadow-lg">
                      Use placeholders like <code>{`{dropdown1}`}</code>,{" "}
                      <code>{`{dropdown2}`}</code> where you want dropdowns to
                      appear.
                    </div>
                  )}
                </div>

                <textarea
                  value={questionData.conclusionTemplate}
                  onChange={(e) =>
                    setQuestionData((prev) => ({
                      ...prev,
                      conclusionTemplate: e.target.value,
                    }))
                  }
                  rows={4}
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-y min-h-[100px] hover:border-purple-400 transition-all duration-200 ${
                    formErrors.conclusionTemplate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Write your conclusion with {dropdown1}, {dropdown2}, etc."
                />

                {formErrors.conclusionTemplate && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {formErrors.conclusionTemplate}
                  </p>
                )}

                {questionData.conclusionTemplate && (
                  <div className="mt-2 bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      Template Preview
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {renderConclusionWithDropdowns(
                        questionData.conclusionTemplate,
                        questionData.dropdowns,
                        true
                      )}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-600 mt-2 flex items-center">
                  <span className="mr-1">💡</span>
                  Use placeholders like <code>{`{dropdown1}`}</code>,{" "}
                  <code>{`{dropdown2}`}</code> for dropdown placement.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl space-y-4 relative">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-purple-800">
                      Configure Dropdowns
                    </h4>
                    <button
                      onMouseEnter={() => setActiveHelp("dropdowns")}
                      onMouseLeave={() => setActiveHelp(null)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                    {activeHelp === "dropdowns" && (
                      <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
                        Add dropdown menus with options. Set the correct answer
                        for each.
                      </div>
                    )}
                  </div>
                  {formErrors.dropdowns && (
                    <span className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.dropdowns}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questionData.dropdowns.map((dropdown, idx) => (
                    <div
                      key={dropdown.id}
                      className="border border-purple-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-semibold text-purple-700">
                          Placeholder: <code>{`{dropdown${idx + 1}}`}</code>
                        </p>
                        <button
                          onClick={() => removeDropdown(dropdown.id)}
                          disabled={questionData.dropdowns.length <= 1}
                          className={`p-2 rounded-lg ${
                            questionData.dropdowns.length <= 1
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-xs font-semibold text-purple-700">
                            Options
                          </label>
                          <span className="text-xs text-gray-500">
                            {dropdown.options.length}/10
                          </span>
                        </div>

                        {dropdown.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(dropdown.id, index, e.target.value)
                              }
                              className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                              placeholder={`Option ${index + 1}`}
                            />
                            <button
                              onClick={() => removeOption(dropdown.id, index)}
                              disabled={dropdown.options.length <= 1}
                              className={`p-2 rounded-lg ${
                                dropdown.options.length <= 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-500 hover:bg-red-50"
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => addOption(dropdown.id)}
                          disabled={dropdown.options.length >= 10}
                          className={`w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-2 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors ${
                            dropdown.options.length >= 10
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Option
                        </button>
                      </div>

                      <div className="mt-4">
                        <label className="block text-xs font-semibold text-purple-700 mb-1">
                          Correct Answer (Preview)
                        </label>
                        <select
                          value={dropdown.selectedValue}
                          onChange={(e) =>
                            setDropdownAnswer(dropdown.id, e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select...</option>
                          {dropdown.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addDropdown}
                  disabled={questionData.dropdowns.length >= 4}
                  className={`w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-3 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors ${
                    questionData.dropdowns.length >= 4
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Dropdown {questionData.dropdowns.length >= 4 && "(Max 4)"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentView("preview")}
              disabled={
                !questionData.graphUrl ||
                !questionData.conclusionTemplate.trim() ||
                questionData.dropdowns.length === 0 ||
                questionData.dropdowns.some(
                  (dropdown) => dropdown.options.length === 0
                )
              }
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-all ${
                !questionData.graphUrl ||
                !questionData.conclusionTemplate.trim() ||
                questionData.dropdowns.length === 0 ||
                questionData.dropdowns.some(
                  (dropdown) => dropdown.options.length === 0
                )
                  ? "bg-gray-300 cursor-not-allowed text-gray-600"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
              aria-label="Preview question"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Question</span>
            </button>
          </div>

          {(!questionData.graphUrl ||
            !questionData.conclusionTemplate.trim() ||
            questionData.dropdowns.length === 0 ||
            questionData.dropdowns.some(
              (dropdown) => dropdown.options.length === 0
            )) && (
            <div className="text-center text-red-500 text-sm mt-3 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {!questionData.graphUrl
                ? "Please upload a graph image."
                : !questionData.conclusionTemplate.trim()
                ? "Please add a conclusion template."
                : questionData.dropdowns.length === 0
                ? "Please add at least one dropdown."
                : questionData.dropdowns.some(
                    (dropdown) => dropdown.options.length === 0
                  )
                ? "Please add at least one option to each dropdown."
                : "Please complete all required fields."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphicsInterpretationStructure;