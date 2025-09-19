import React, { useState, useCallback } from "react";
import { FileText, X, ChevronRight } from "lucide-react";

export default function QuestionPreviewModal({
  selectedQuestion,
  closePreview,
  questions,
  setQuestions,
  getEndpoint,
  API_URL,
  showSnackbar,
  fetchQuestions,
  difficultyOptions,
  levelOptions,
  contentDomainOptions,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({
    ...selectedQuestion,
    statements: selectedQuestion.statements || [],
    options: selectedQuestion.options || [],
    tableHeaders: selectedQuestion.tableHeaders || [],
    tableValues: selectedQuestion.tableValues || [],
    answers: selectedQuestion.answers || [],
    dropdowns: selectedQuestion.dropdowns || [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [showStatements, setShowStatements] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  const handleTableHeaderChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newTableHeaders = [...prev.tableHeaders];
      newTableHeaders[index] = value;
      return { ...prev, tableHeaders: newTableHeaders };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, tableHeaders: "" }));
  }, []);

  const addTableHeader = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      tableHeaders: [...prev.tableHeaders, ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeTableHeader = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newTableHeaders = prev.tableHeaders.filter((_, i) => i !== index);
      return { ...prev, tableHeaders: newTableHeaders };
    });
    setHasUnsavedChanges(true);
  }, []);

  const handleTableValueChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newTableValues = [...prev.tableValues];
      newTableValues[index] = value;
      return { ...prev, tableValues: newTableValues };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, tableValues: "" }));
  }, []);

  const addTableValue = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      tableValues: [...prev.tableValues, ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeTableValue = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newTableValues = prev.tableValues.filter((_, i) => i !== index);
      return { ...prev, tableValues: newTableValues };
    });
    setHasUnsavedChanges(true);
  }, []);

  const handleAnswerChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index] = value;
      return { ...prev, answers: newAnswers };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, answers: "" }));
  }, []);

  const addAnswer = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      answers: [...prev.answers, ""],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeAnswer = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newAnswers = prev.answers.filter((_, i) => i !== index);
      return { ...prev, answers: newAnswers };
    });
    setHasUnsavedChanges(true);
  }, []);

  const handleDropdownChange = useCallback((dropdownIndex, key, value) => {
    setEditedQuestion((prev) => {
      const newDropdowns = [...prev.dropdowns];
      newDropdowns[dropdownIndex] = { ...newDropdowns[dropdownIndex], [key]: value };
      return { ...prev, dropdowns: newDropdowns };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, dropdowns: "" }));
  }, []);

  const addDropdown = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      dropdowns: [...prev.dropdowns, { id: prev.dropdowns.length + 1, placeholder: "", options: [""], selectedValue: "" }],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeDropdown = useCallback((index) => {
    setEditedQuestion((prev) => {
      const newDropdowns = prev.dropdowns.filter((_, i) => i !== index);
      return { ...prev, dropdowns: newDropdowns };
    });
    setHasUnsavedChanges(true);
  }, []);

  const handleDropdownOptionChange = useCallback((dropdownIndex, optionIndex, value) => {
    setEditedQuestion((prev) => {
      const newDropdowns = [...prev.dropdowns];
      newDropdowns[dropdownIndex].options[optionIndex] = value;
      return { ...prev, dropdowns: newDropdowns };
    });
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, dropdowns: "" }));
  }, []);

  const addDropdownOption = useCallback((dropdownIndex) => {
    setEditedQuestion((prev) => {
      const newDropdowns = [...prev.dropdowns];
      newDropdowns[dropdownIndex].options.push("");
      return { ...prev, dropdowns: newDropdowns };
    });
    setHasUnsavedChanges(true);
  }, []);

  const removeDropdownOption = useCallback((dropdownIndex, optionIndex) => {
    setEditedQuestion((prev) => {
      const newDropdowns = [...prev.dropdowns];
      newDropdowns[dropdownIndex].options = newDropdowns[dropdownIndex].options.filter(
        (_, i) => i !== optionIndex
      );
      return { ...prev, dropdowns: newDropdowns };
    });
    setHasUnsavedChanges(true);
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    const { type } = editedQuestion;

    // Common fields validation
    if (!editedQuestion.set_id) errors.set_id = "Set ID is required";
    if (!editedQuestion.topic) errors.topic = "Topic is required";
    if (!editedQuestion.difficulty) errors.difficulty = "Difficulty is required";
    if (!editedQuestion.level) errors.level = "Level is required";
    if (!editedQuestion.contentDomain) errors.contentDomain = "Content domain is required";

    if (type === "Data Sufficiency") {
      if (!editedQuestion.contextText) errors.contextText = "Context text is required";
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
    } else if (type === "Two-part Analysis") {
      if (!editedQuestion.contextText) errors.contextText = "Context text is required";
      if (!editedQuestion.instructionText) errors.instructionText = "Instruction text is required";
      if (!editedQuestion.tableHeaders || editedQuestion.tableHeaders.length < 1) {
        errors.tableHeaders = "At least 1 table header is required";
      } else if (editedQuestion.tableHeaders.some((header) => !header)) {
        errors.tableHeaders = "All table headers must be filled";
      }
      if (!editedQuestion.tableValues || editedQuestion.tableValues.length < 1) {
        errors.tableValues = "At least 1 table value is required";
      } else if (editedQuestion.tableValues.some((value) => !value)) {
        errors.tableValues = "All table values must be filled";
      }
      if (!editedQuestion.answers || editedQuestion.answers.length < 1) {
        errors.answers = "At least 1 answer is required";
      } else if (editedQuestion.answers.some((ans) => !ans)) {
        errors.answers = "All answers must be filled";
      }
    } else if (type === "Graphics Interpretation") {
      if (!editedQuestion.graphUrl) errors.graphUrl = "Graph URL is required";
      if (!editedQuestion.graphDescription) errors.graphDescription = "Graph description is required";
      if (!editedQuestion.instructionText) errors.instructionText = "Instruction text is required";
      if (!editedQuestion.conclusionTemplate) errors.conclusionTemplate = "Conclusion template is required";
      if (!editedQuestion.dropdowns || editedQuestion.dropdowns.length < 1) {
        errors.dropdowns = "At least 1 dropdown is required";
      } else if (
        editedQuestion.dropdowns.some(
          (dropdown) => !dropdown.placeholder || dropdown.options.some((opt) => !opt) || !dropdown.selectedValue
        )
      ) {
        errors.dropdowns = "All dropdown fields must be filled";
      }
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
      let payload;
      if (editedQuestion.type === "Data Sufficiency") {
        payload = {
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
      } else if (editedQuestion.type === "Two-part Analysis") {
        payload = {
          set_id: editedQuestion.set_id,
          type: editedQuestion.type,
          topic: editedQuestion.topic,
          contextText: editedQuestion.contextText,
          instructionText: editedQuestion.instructionText,
          tableHeaders: editedQuestion.tableHeaders.filter((h) => h.trim()),
          tableValues: editedQuestion.tableValues.filter((v) => v.trim()),
          answers: editedQuestion.answers.filter((a) => a.trim()),
          difficulty: editedQuestion.difficulty,
          level: editedQuestion.level,
          contentDomain: editedQuestion.contentDomain,
          explanation: editedQuestion.explanation || "",
          metadata: {
            source: editedQuestion.metadata?.source || "manual",
            createdAt: editedQuestion.metadata?.createdAt || new Date(),
          },
        };
      } else if (editedQuestion.type === "Graphics Interpretation") {
        payload = {
          set_id: editedQuestion.set_id,
          type: editedQuestion.type,
          topic: editedQuestion.topic,
          difficulty: editedQuestion.difficulty,
          level: editedQuestion.level,
          contentDomain: editedQuestion.contentDomain,
          graphUrl: editedQuestion.graphUrl,
          graphDescription: editedQuestion.graphDescription,
          instructionText: editedQuestion.instructionText,
          conclusionTemplate: editedQuestion.conclusionTemplate,
          dropdowns: editedQuestion.dropdowns.map((dropdown) => ({
            id: dropdown.id,
            placeholder: dropdown.placeholder,
            options: dropdown.options.filter((o) => o.trim()),
            selectedValue: dropdown.selectedValue,
          })),
          explanation: editedQuestion.explanation || "",
          metadata: {
            source: editedQuestion.metadata?.source || "manual",
            createdAt: editedQuestion.metadata?.createdAt || new Date(),
          },
        };
      }
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
      setEditedQuestion(updatedQuestion);
      setIsEditing(false);
      setHasUnsavedChanges(false);
      showSnackbar("Question updated successfully!", { type: "success" });
    } catch (err) {
      showSnackbar(`Error: ${err.message}`, { type: "error" });
    }
  }, [editedQuestion, validateForm, getEndpoint, API_URL, showSnackbar, setQuestions]);

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
              Headers: {question.tableHeaders?.length || 0}, Values: {question.tableValues?.length || 0}
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
              Graph URL: <a href={question.graphUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Graph</a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
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
            onClick={() => {
              if (isEditing && hasUnsavedChanges) {
                if (
                  !window.confirm(
                    "You have unsaved changes. Are you sure you want to close?"
                  )
                ) {
                  return;
                }
              }
              closePreview();
            }}
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
                    formErrors.set_id ? "border-red-500" : "focus:ring-emerald-500"
                  }`}
                  value={editedQuestion.set_id || ""}
                  onChange={(e) => handleEditChange("set_id", e.target.value)}
                />
              ) : (
                <span className="text-sm font-medium text-gray-800">
                  {selectedQuestion.set_id || "N/A"}
                </span>
              )}
              {formErrors.set_id && (
                <p className="text-red-500 text-xs mt-1">{formErrors.set_id}</p>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Difficulty
              </label>
              {isEditing ? (
                <select
                  className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                    formErrors.difficulty ? "border-red-500" : "focus:ring-emerald-500"
                  }`}
                  value={editedQuestion.difficulty || ""}
                  onChange={(e) => handleEditChange("difficulty", e.target.value)}
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
                  className={`px-2 py-1 rounded text-xs font-medium ${({
                    easy: "bg-green-100 text-green-700",
                    medium: "bg-yellow-100 text-yellow-700",
                    hard: "bg-red-100 text-red-700",
                  })[selectedQuestion.difficulty?.toLowerCase()] || "bg-gray-100 text-gray-700"}`}
                >
                  {selectedQuestion.difficulty || "N/A"}
                </span>
              )}
              {formErrors.difficulty && (
                <p className="text-red-500 text-xs mt-1">{formErrors.difficulty}</p>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Level
              </label>
              {isEditing ? (
                <select
                  className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                    formErrors.level ? "border-red-500" : "focus:ring-emerald-500"
                  }`}
                  value={editedQuestion.level || ""}
                  onChange={(e) => handleEditChange("level", e.target.value)}
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
                <p className="text-red-500 text-xs mt-1">{formErrors.level}</p>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Content Domain
              </label>
              {isEditing ? (
                <select
                  className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                    formErrors.contentDomain ? "border-red-500" : "focus:ring-emerald-500"
                  }`}
                  value={editedQuestion.contentDomain || ""}
                  onChange={(e) => handleEditChange("contentDomain", e.target.value)}
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
                <p className="text-red-500 text-xs mt-1">{formErrors.contentDomain}</p>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <label className="text-xs font-medium text-gray-600 mb-1 block">
                Topic
              </label>
              {isEditing ? (
                <input
                  className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                    formErrors.topic ? "border-red-500" : "focus:ring-emerald-500"
                  }`}
                  value={editedQuestion.topic || ""}
                  onChange={(e) => handleEditChange("topic", e.target.value)}
                />
              ) : (
                <span className="text-sm font-medium text-gray-800">
                  {selectedQuestion.topic || "N/A"}
                </span>
              )}
              {formErrors.topic && (
                <p className="text-red-500 text-xs mt-1">{formErrors.topic}</p>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Context Text (Data Sufficiency, Two-part Analysis) */}
              {(selectedQuestion.type === "Data Sufficiency" || selectedQuestion.type === "Two-part Analysis") && (
                <div className="bg-blue-50 rounded-lg border border-blue-200">
                  <div className="p-3">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Context Text
                    </h4>
                    {isEditing ? (
                      <textarea
                        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                          formErrors.contextText ? "border-red-500" : "focus:ring-blue-500"
                        }`}
                        value={editedQuestion.contextText || ""}
                        onChange={(e) => handleEditChange("contextText", e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {selectedQuestion.contextText || "No context available."}
                      </p>
                    )}
                    {formErrors.contextText && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.contextText}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Graph URL and Description (Graphics Interpretation) */}
              {selectedQuestion.type === "Graphics Interpretation" && (
                <div className="bg-blue-50 rounded-lg border border-blue-200">
                  <div className="p-3 space-y-4">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">
                        Graph URL
                      </h4>
                      {isEditing ? (
                        <input
                          className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                            formErrors.graphUrl ? "border-red-500" : "focus:ring-blue-500"
                          }`}
                          value={editedQuestion.graphUrl || ""}
                          onChange={(e) => handleEditChange("graphUrl", e.target.value)}
                        />
                      ) : (
                        selectedQuestion.graphUrl && selectedQuestion.graphUrl.startsWith("data:image/") ? (
                          <img
                            src={selectedQuestion.graphUrl}
                            alt="Graph Preview"
                            style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, border: '1px solid #ddd', marginBottom: 8 }}
                          />
                        ) : selectedQuestion.graphUrl ? (
                          <a
                            href={selectedQuestion.graphUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {selectedQuestion.graphUrl}
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">No URL provided</span>
                        )
                      )}
                      {formErrors.graphUrl && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.graphUrl}</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">
                        Graph Description
                      </h4>
                      {isEditing ? (
                        <textarea
                          className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                            formErrors.graphDescription ? "border-red-500" : "focus:ring-blue-500"
                          }`}
                          value={editedQuestion.graphDescription || ""}
                          onChange={(e) => handleEditChange("graphDescription", e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {selectedQuestion.graphDescription || "No description available."}
                        </p>
                      )}
                      {formErrors.graphDescription && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.graphDescription}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Instruction Text (Two-part Analysis, Graphics Interpretation) */}
              {(selectedQuestion.type === "Two-part Analysis" || selectedQuestion.type === "Graphics Interpretation") && (
                <div className="bg-blue-50 rounded-lg border border-blue-200">
                  <div className="p-3">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Instruction Text
                    </h4>
                    {isEditing ? (
                      <textarea
                        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                          formErrors.instructionText ? "border-red-500" : "focus:ring-blue-500"
                        }`}
                        value={editedQuestion.instructionText || ""}
                        onChange={(e) => handleEditChange("instructionText", e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {selectedQuestion.instructionText || "No instruction text available."}
                      </p>
                    )}
                    {formErrors.instructionText && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.instructionText}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Statements - Collapsible (Data Sufficiency) */}
              {selectedQuestion.type === "Data Sufficiency" && selectedQuestion.statements && (
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
                          {editedQuestion.statements?.map((statement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">
                                Statement {index + 1}
                              </span>
                              <input
                                className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                value={statement || ""}
                                onChange={(e) => handleStatementChange(index, e.target.value)}
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
                          ))}
                          <button
                            onClick={addStatement}
                            className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                          >
                            + Add Statement
                          </button>
                        </>
                      ) : (
                        <div className="space-y-1">
                          {selectedQuestion.statements?.map((statement, index) => (
                            <div
                              key={index}
                              className="bg-white p-2 rounded border border-gray-200"
                            >
                              <span className="text-sm font-medium text-gray-700">
                                Statement {index + 1}:
                              </span>{" "}
                              <span className="text-sm text-gray-800">{statement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {formErrors.statements && (
                        <p className="text-red-500 text-xs mt-2">{formErrors.statements}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Table Headers and Values (Two-part Analysis) */}
              {selectedQuestion.type === "Two-part Analysis" && (
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
                      Table Content
                    </h4>
                    <span className="text-xs text-gray-500">
                      {selectedQuestion.tableHeaders?.length || 0} headers,{" "}
                      {selectedQuestion.tableValues?.length || 0} values
                    </span>
                  </button>
                  {showStatements && (
                    <div className="px-3 pb-3 space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Table Headers</h5>
                        {isEditing ? (
                          <>
                            {editedQuestion.tableHeaders?.map((header, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Header {index + 1}
                                </span>
                                <input
                                  className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  value={header || ""}
                                  onChange={(e) => handleTableHeaderChange(index, e.target.value)}
                                />
                                {editedQuestion.tableHeaders.length > 1 && (
                                  <button
                                    onClick={() => removeTableHeader(index)}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={addTableHeader}
                              className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                            >
                              + Add Header
                            </button>
                          </>
                        ) : (
                          <div className="space-y-1">
                            {selectedQuestion.tableHeaders?.map((header, index) => (
                              <div
                                key={index}
                                className="bg-white p-2 rounded border border-gray-200"
                              >
                                <span className="text-sm font-medium text-gray-700">
                                  Header {index + 1}:
                                </span>{" "}
                                <span className="text-sm text-gray-800">{header}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {formErrors.tableHeaders && (
                          <p className="text-red-500 text-xs mt-2">{formErrors.tableHeaders}</p>
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Table Values</h5>
                        {isEditing ? (
                          <>
                            {editedQuestion.tableValues?.map((value, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Value {index + 1}
                                </span>
                                <input
                                  className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  value={value || ""}
                                  onChange={(e) => handleTableValueChange(index, e.target.value)}
                                />
                                {editedQuestion.tableValues.length > 1 && (
                                  <button
                                    onClick={() => removeTableValue(index)}
                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              onClick={addTableValue}
                              className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                            >
                              + Add Value
                            </button>
                          </>
                        ) : (
                          <div className="space-y-1">
                            {selectedQuestion.tableValues?.map((value, index) => (
                              <div
                                key={index}
                                className="bg-white p-2 rounded border border-gray-200"
                              >
                                <span className="text-sm font-medium text-gray-700">
                                  Value {index + 1}:
                                </span>{" "}
                                <span className="text-sm text-gray-800">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {formErrors.tableValues && (
                          <p className="text-red-500 text-xs mt-2">{formErrors.tableValues}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dropdowns (Graphics Interpretation) */}
              {selectedQuestion.type === "Graphics Interpretation" && (
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
                      Dropdowns
                    </h4>
                    <span className="text-xs text-gray-500">
                      {selectedQuestion.dropdowns?.length || 0} dropdowns
                    </span>
                  </button>
                  {showStatements && (
                    <div className="px-3 pb-3 space-y-4">
                      {isEditing ? (
                        <>
                          {editedQuestion.dropdowns?.map((dropdown, dropdownIndex) => (
                            <div key={dropdownIndex} className="border p-3 rounded">
                              <h5 className="font-medium text-gray-700 mb-2">
                                Dropdown {dropdownIndex + 1}
                              </h5>
                              <div className="space-y-2">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">
                                    Placeholder
                                  </label>
                                  <input
                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    value={dropdown.placeholder || ""}
                                    onChange={(e) =>
                                      handleDropdownChange(dropdownIndex, "placeholder", e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">
                                    Options
                                  </label>
                                  {dropdown.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center gap-2">
                                      <input
                                        className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        value={option || ""}
                                        onChange={(e) =>
                                          handleDropdownOptionChange(dropdownIndex, optionIndex, e.target.value)
                                        }
                                      />
                                      {dropdown.options.length > 1 && (
                                        <button
                                          onClick={() => removeDropdownOption(dropdownIndex, optionIndex)}
                                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => addDropdownOption(dropdownIndex)}
                                    className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                                  >
                                    + Add Option
                                  </button>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">
                                    Selected Value
                                  </label>
                                  <select
                                    className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    value={dropdown.selectedValue || ""}
                                    onChange={(e) =>
                                      handleDropdownChange(dropdownIndex, "selectedValue", e.target.value)
                                    }
                                  >
                                    <option value="">Select</option>
                                    {dropdown.options.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {editedQuestion.dropdowns.length > 1 && (
                                  <button
                                    onClick={() => removeDropdown(dropdownIndex)}
                                    className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                  >
                                    Remove Dropdown
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={addDropdown}
                            className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                          >
                            + Add Dropdown
                          </button>
                        </>
                      ) : (
                        <div className="space-y-2">
                          {selectedQuestion.dropdowns?.map((dropdown, index) => (
                            <div
                              key={index}
                              className="bg-white p-2 rounded border border-gray-200"
                            >
                              <p className="text-sm font-medium text-gray-700">
                                Dropdown {index + 1} (ID: {dropdown.id})
                              </p>
                              <p className="text-sm text-gray-800">
                                Placeholder: {dropdown.placeholder}
                              </p>
                              <p className="text-sm text-gray-800">
                                Options: {dropdown.options.join(", ")}
                              </p>
                              <p className="text-sm text-gray-800">
                                Selected: {dropdown.selectedValue}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {formErrors.dropdowns && (
                        <p className="text-red-500 text-xs mt-2">{formErrors.dropdowns}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Options (Data Sufficiency) */}
              {selectedQuestion.type === "Data Sufficiency" && (
                <div className="bg-green-50 rounded-lg border border-green-200">
                  <div className="p-3">
                    <h4 className="font-medium text-green-800 mb-2">
                      Answer Options
                    </h4>
                    {isEditing ? (
                      <div className="space-y-2">
                        {editedQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <input
                              className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                              value={option || ""}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
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
                        <div className="mt-4">
                          <h4 className="font-medium text-green-800 mb-2">
                            Correct Answer
                          </h4>
                          <select
                            className={`w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 ${
                              formErrors.answer ? "border-red-500" : "focus:ring-green-500"
                            }`}
                            value={editedQuestion.answer || ""}
                            onChange={(e) => handleEditChange("answer", e.target.value)}
                          >
                            <option value="">Select</option>
                            {["A", "B", "C", "D", "E"].map((letter) => (
                              <option key={letter} value={letter}>
                                {letter}
                              </option>
                            ))}
                          </select>
                          {formErrors.answer && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.answer}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {selectedQuestion.options?.map((option, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-2 p-2 rounded ${
                              selectedQuestion.answer === String.fromCharCode(65 + index)
                                ? "bg-green-200 border border-green-300"
                                : "bg-white border border-gray-200"
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                selectedQuestion.answer === String.fromCharCode(65 + index)
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span
                              className={`text-sm ${
                                selectedQuestion.answer === String.fromCharCode(65 + index)
                                  ? "font-semibold text-gray-800"
                                  : "text-gray-700"
                              }`}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                        <p className="text-sm text-gray-700 mt-2">
                          <span className="font-medium">Correct Answer:</span>{" "}
                          {selectedQuestion.answer}
                        </p>
                      </div>
                    )}
                    {formErrors.options && (
                      <p className="text-red-500 text-xs mt-2">{formErrors.options}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Answers (Two-part Analysis) */}
              {selectedQuestion.type === "Two-part Analysis" && (
                <div className="bg-green-50 rounded-lg border border-green-200">
                  <div className="p-3">
                    <h4 className="font-medium text-green-800 mb-2">Answers</h4>
                    {isEditing ? (
                      <div className="space-y-2">
                        {editedQuestion.answers?.map((answer, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              Answer {index + 1}
                            </span>
                            <input
                              className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                              value={answer || ""}
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                            {editedQuestion.answers.length > 1 && (
                              <button
                                onClick={() => removeAnswer(index)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addAnswer}
                          className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          + Add Answer
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {selectedQuestion.answers?.map((answer, index) => (
                          <div
                            key={index}
                            className="bg-white p-2 rounded border border-gray-200"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              Answer {index + 1}:
                            </span>{" "}
                            <span className="text-sm text-gray-800">{answer}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {formErrors.answers && (
                      <p className="text-red-500 text-xs mt-2">{formErrors.answers}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Conclusion Template (Graphics Interpretation) */}
              {selectedQuestion.type === "Graphics Interpretation" && (
                <div className="bg-blue-50 rounded-lg border border-blue-200">
                  <div className="p-3">
                    <h4 className="font-medium text-blue-800 mb-2">
                      Conclusion Template
                    </h4>
                    {isEditing ? (
                      <textarea
                        className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 ${
                          formErrors.conclusionTemplate ? "border-red-500" : "focus:ring-blue-500"
                        }`}
                        value={editedQuestion.conclusionTemplate || ""}
                        onChange={(e) => handleEditChange("conclusionTemplate", e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {selectedQuestion.conclusionTemplate || "No conclusion template available."}
                      </p>
                    )}
                    {formErrors.conclusionTemplate && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.conclusionTemplate}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="bg-gray-50 rounded-lg border border-gray-200">
                <div className="p-3">
                  <h4 className="font-medium text-gray-700 mb-2">Explanation</h4>
                  {isEditing ? (
                    <textarea
                      className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      value={editedQuestion.explanation || ""}
                      onChange={(e) => handleEditChange("explanation", e.target.value)}
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {selectedQuestion.explanation || "No explanation provided."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  if (hasUnsavedChanges) {
                    if (
                      !window.confirm(
                        "You have unsaved changes. Are you sure you want to cancel?"
                      )
                    ) {
                      return;
                    }
                  }
                  setIsEditing(false);
                  setEditedQuestion({
                    ...selectedQuestion,
                    statements: selectedQuestion.statements || [],
                    options: selectedQuestion.options || [],
                    tableHeaders: selectedQuestion.tableHeaders || [],
                    tableValues: selectedQuestion.tableValues || [],
                    answers: selectedQuestion.answers || [],
                    dropdowns: selectedQuestion.dropdowns || [],
                  });
                  setFormErrors({});
                  setHasUnsavedChanges(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}