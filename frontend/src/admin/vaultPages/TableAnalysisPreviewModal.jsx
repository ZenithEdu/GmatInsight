import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  X,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Edit2,
  Table as TableIcon,
  Check,
} from "lucide-react";

export default function TableAnalysisPreviewModal({
  question,
  onClose,
  onUpdate,
  showSnackbar,
  difficultyOptions = [],
  levelOptions = [],
  contentDomainOptions = [],
}) {
  // ===== STATE HOOKS (ALL AT TOP) =====
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showTable, setShowTable] = useState(true);
  const [showStatements, setShowStatements] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const initialQuestionRef = useRef(null);

  // ===== INITIALIZE ON MOUNT =====
  useEffect(() => {
    if (!question) return;

    const safeQuestion = {
      questionId: question.questionId || question._id || "",
      set_id: question.setId || question.set_id || "",
      topic: question.topic || question.topic || "",
      difficulty: question.difficulty || "",
      level: question.level || "",
      contentDomain: question.contentDomain || "",
      metadata: question.metadata || {},
      instructions: question.instructions || "",
      explanation: question.explanation || "",
      headers: Array.isArray(question.headers) ? question.headers : [],
      rows: Array.isArray(question.rows)
        ? question.rows.map((r) => (Array.isArray(r) ? r : []))
        : [],
      statements: Array.isArray(question.statements)
        ? question.statements.map((s, i) => ({
            id: s.id || s._id || `stmt-${Date.now()}-${i}`,
            text: s.text || "",
            answer: s.answer || null,
          }))
        : [],
      statementTypes:
        Array.isArray(question.statementTypes) && question.statementTypes.length >= 2
          ? question.statementTypes
          : ["Yes", "No"],
      sortBy: question.sortBy || "",
      statementsPrompt: question.statementsPrompt || "", // added mapping
    };

    initialQuestionRef.current = safeQuestion;
    setEditedQuestion(safeQuestion);
    setSortBy(safeQuestion.sortBy || (safeQuestion.headers[0] || ""));
    setIsEditing(false);
    setHasUnsavedChanges(false);
    setFormErrors({});
  }, [question]);

  // ===== CALLBACKS =====
  const handleEditChange = useCallback((key, value) => {
    setEditedQuestion((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
    setFormErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const handleHeaderChange = useCallback((index, value) => {
    setEditedQuestion((prev) => {
      const newHeaders = [...prev.headers];
      newHeaders[index] = value;
      return { ...prev, headers: newHeaders };
    });
    setHasUnsavedChanges(true);
  }, []);

  const addHeader = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      headers: [...prev.headers, `Col ${prev.headers.length + 1}`],
      rows: prev.rows.map((row) => [...row, ""]),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeHeader = useCallback(
    (index) => {
      if (editedQuestion.headers?.length <= 1) {
        showSnackbar?.("At least one column is required", { type: "warning" });
        return;
      }
      setEditedQuestion((prev) => ({
        ...prev,
        headers: prev.headers.filter((_, i) => i !== index),
        rows: prev.rows.map((row) => row.filter((_, i) => i !== index)),
      }));
      setHasUnsavedChanges(true);
    },
    [editedQuestion.headers, showSnackbar]
  );

  const handleCellChange = useCallback((rowIdx, colIdx, value) => {
    setEditedQuestion((prev) => {
      const newRows = [...prev.rows];
      newRows[rowIdx] = [...newRows[rowIdx]];
      newRows[rowIdx][colIdx] = value;
      return { ...prev, rows: newRows };
    });
    setHasUnsavedChanges(true);
  }, []);

  const addRow = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      rows: [...prev.rows, Array(prev.headers.length).fill("")],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeRow = useCallback(
    (rowIdx) => {
      if (editedQuestion.rows?.length <= 1) {
        showSnackbar?.("At least one row is required", { type: "warning" });
        return;
      }
      setEditedQuestion((prev) => ({
        ...prev,
        rows: prev.rows.filter((_, i) => i !== rowIdx),
      }));
      setHasUnsavedChanges(true);
    },
    [editedQuestion.rows, showSnackbar]
  );

  const handleStatementTextChange = useCallback((stmtId, text) => {
    setEditedQuestion((prev) => ({
      ...prev,
      statements: prev.statements.map((s) =>
        s.id === stmtId ? { ...s, text } : s
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const addStatement = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      statements: [
        ...prev.statements,
        {
          id: `stmt-${Date.now()}`,
          text: "",
          answer: null,
        },
      ],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeStatement = useCallback(
    (stmtId) => {
      if (editedQuestion.statements?.length <= 1) {
        showSnackbar?.("At least one statement is required", { type: "warning" });
        return;
      }
      setEditedQuestion((prev) => ({
        ...prev,
        statements: prev.statements.filter((s) => s.id !== stmtId),
      }));
      setHasUnsavedChanges(true);
    },
    [editedQuestion.statements, showSnackbar]
  );

  const setAnswer = useCallback((stmtId, type) => {
    setEditedQuestion((prev) => ({
      ...prev,
      statements: prev.statements.map((s) =>
        s.id === stmtId ? { ...s, answer: type } : s
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const addStatementType = useCallback(() => {
    setEditedQuestion((prev) => ({
      ...prev,
      statementTypes: [...prev.statementTypes, `Type ${prev.statementTypes.length + 1}`],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const renameStatementType = useCallback((idx, value) => {
    setEditedQuestion((prev) => {
      const newTypes = [...prev.statementTypes];
      newTypes[idx] = value;
      return { ...prev, statementTypes: newTypes };
    });
    setHasUnsavedChanges(true);
  }, []);

  const removeStatementType = useCallback(
    (idx) => {
      if (editedQuestion.statementTypes?.length <= 2) {
        showSnackbar?.("At least 2 response types required", { type: "warning" });
        return;
      }
      const removed = editedQuestion.statementTypes[idx];
      setEditedQuestion((prev) => ({
        ...prev,
        statementTypes: prev.statementTypes.filter((_, i) => i !== idx),
        statements: prev.statements.map((s) => ({
          ...s,
          answer: s.answer === removed ? null : s.answer,
        })),
      }));
      setHasUnsavedChanges(true);
    },
    [editedQuestion.statementTypes, showSnackbar]
  );

  // ===== SORTED ROWS (MEMOIZED) =====
  const sortedRows = useMemo(() => {
    const rows = isEditing ? editedQuestion.rows || [] : question?.rows || [];
    const headers = isEditing ? editedQuestion.headers || [] : question?.headers || [];
    const currentSortBy = isEditing ? editedQuestion.sortBy : question?.sortBy;

    if (!currentSortBy || !headers.includes(currentSortBy)) return rows;

    const colIdx = headers.indexOf(currentSortBy);
    if (colIdx === -1) return rows;

    return [...rows].sort((a, b) => {
      const valA = a[colIdx] ?? "";
      const valB = b[colIdx] ?? "";
      const numA = parseFloat(String(valA).replace(/[^0-9.-]+/g, ""));
      const numB = parseFloat(String(valB).replace(/[^0-9.-]+/g, ""));
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return String(valA).localeCompare(String(valB));
    });
  }, [
    isEditing,
    editedQuestion.rows,
    editedQuestion.headers,
    editedQuestion.sortBy,
    question?.rows,
    question?.headers,
    question?.sortBy,
  ]);

  // ===== VALIDATION =====
  const validateForm = useCallback(() => {
    const errors = {};

    if (!editedQuestion.set_id?.trim()) errors.set_id = "Set ID is required";
    if (!editedQuestion.topic?.trim()) errors.topic = "Topic is required";
    if (!editedQuestion.difficulty) errors.difficulty = "Difficulty is required";
    if (!editedQuestion.level) errors.level = "Level is required";
    if (!editedQuestion.contentDomain) errors.contentDomain = "Content domain is required";
    if (!editedQuestion.headers?.length) errors.headers = "At least one column is required";
    if (editedQuestion.rows?.some((r) => r.some((c) => !String(c).trim())))
      errors.rows = "All table cells must be filled";
    if (!editedQuestion.statements?.length) errors.statements = "At least one statement is required";
    else if (editedQuestion.statements.some((s) => !s.text?.trim()))
      errors.statements = "All statements must have text";
    if (!editedQuestion.instructions?.trim()) errors.instructions = "Instructions are required";
    // statementsPrompt is optional; no validation error here

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [editedQuestion]);

  // ===== SAVE HANDLER =====
  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      showSnackbar?.("Please fix the errors before saving.", { type: "error" });
      return;
    }

    try {
      const payload = {
        set_id: editedQuestion.set_id,
        topic: editedQuestion.topic,
        difficulty: editedQuestion.difficulty,
        level: editedQuestion.level,
        contentDomain: editedQuestion.contentDomain,
        instructions: editedQuestion.instructions,
        headers: editedQuestion.headers,
        rows: editedQuestion.rows,
        sortBy: editedQuestion.sortBy || "",
        explanation: editedQuestion.explanation || "",
        statementsPrompt: editedQuestion.statementsPrompt || "", // include prompt
        statementTypes: editedQuestion.statementTypes,
        statements: editedQuestion.statements.map((s) => ({
          id: s.id,
          text: s.text,
          answer: s.answer,
        })),
        metadata: {
          source: editedQuestion.metadata?.source || "manual",
          createdAt: editedQuestion.metadata?.createdAt || new Date().toISOString(),
        },
      };

      await onUpdate(payload);
      initialQuestionRef.current = { ...editedQuestion, sortBy: editedQuestion.sortBy };
      setIsEditing(false);
      setHasUnsavedChanges(false);
      showSnackbar?.("Table Analysis updated successfully!", { type: "success" });
    } catch (err) {
      showSnackbar?.(`Error: ${err.message || "Save failed"}`, { type: "error" });
    }
  }, [editedQuestion, validateForm, onUpdate, showSnackbar]);

  // ===== CANCEL EDITING =====
  const cancelEditing = useCallback(() => {
    if (hasUnsavedChanges && !window.confirm("Discard unsaved changes?")) return;
    setEditedQuestion(initialQuestionRef.current || {});
    setSortBy(initialQuestionRef.current?.sortBy || "");
    setIsEditing(false);
    setHasUnsavedChanges(false);
    setFormErrors({});
  }, [hasUnsavedChanges]);

  // ===== EARLY RETURN =====
  if (!question || !editedQuestion.questionId) return null;

  const headers = isEditing ? editedQuestion.headers || [] : question.headers || [];
  const rows = sortedRows;
  const statements = isEditing ? editedQuestion.statements || [] : question.statements || [];
  const statementTypes = isEditing
    ? editedQuestion.statementTypes || ["Yes", "No"]
    : question.statementTypes || ["Yes", "No"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <TableIcon className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {editedQuestion.questionId} - Table Analysis
              </h3>
              <p className="text-sm text-gray-600">{editedQuestion.topic || "N/A"}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isEditing && hasUnsavedChanges && !window.confirm("Discard changes?")) return;
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-white/50 rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["set_id", "difficulty", "level", "contentDomain", "topic"].map((field) => (
              <div key={field} className="bg-gray-50 p-3 rounded-md">
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  {field === "set_id" ? "Set ID" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {isEditing ? (
                  field === "difficulty" ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
                      value={editedQuestion[field] || ""}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    >
                      <option value="">Select</option>
                      {difficultyOptions
                        .filter((o) => o !== "All")
                        .map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                  ) : field === "level" ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
                      value={editedQuestion[field] || ""}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    >
                      <option value="">Select</option>
                      {levelOptions
                        .filter((o) => o !== "All")
                        .map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                  ) : field === "contentDomain" ? (
                    <select
                      className={`w-full px-2 py-1 border rounded text-sm ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
                      value={editedQuestion[field] || ""}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    >
                      <option value="">Select</option>
                      {contentDomainOptions
                        .filter((o) => o !== "All")
                        .map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                  ) : (
                    <input
                      className={`w-full px-2 py-1 border rounded text-sm ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
                      value={editedQuestion[field] || ""}
                      onChange={(e) => handleEditChange(field, e.target.value)}
                    />
                  )
                ) : (
                  <span className="text-sm font-medium text-gray-800">
                    {field === "difficulty" ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          {
                            easy: "bg-green-100 text-green-700",
                            medium: "bg-yellow-100 text-yellow-700",
                            hard: "bg-red-100 text-red-700",
                          }[String(question[field]).toLowerCase()] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {question[field] || "N/A"}
                      </span>
                    ) : (
                      question[field] || "N/A"
                    )}
                  </span>
                )}
                {formErrors[field] && <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
            <h4 className="font-medium text-blue-800 mb-2">Instructions</h4>
            {isEditing ? (
              <textarea
                className={`w-full px-3 py-2 border rounded text-sm resize-vertical ${formErrors.instructions ? "border-red-500" : "border-gray-300"}`}
                value={editedQuestion.instructions || ""}
                onChange={(e) => handleEditChange("instructions", e.target.value)}
                rows={3}
                placeholder="Enter instructions..."
              />
            ) : (
              <p className="text-sm text-gray-700">{question.instructions || "No instructions."}</p>
            )}
            {formErrors.instructions && <p className="text-red-500 text-xs mt-1">{formErrors.instructions}</p>}
          </div>

          {/* Sort By */}
          {headers.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  const val = e.target.value;
                  setSortBy(val);
                  if (isEditing) handleEditChange("sortBy", val);
                }}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="">None</option>
                {headers.map((h, i) => (
                  <option key={i} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Table & Statements */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Table */}
            <div>
              <button
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg border mb-2 transition-colors"
                onClick={() => setShowTable(!showTable)}
                type="button"
              >
                <h4 className="font-medium flex items-center">
                  <ChevronRight
                    className={`w-4 h-4 mr-2 transition-transform ${showTable ? "rotate-90" : ""}`}
                  />
                  Data Table
                </h4>
                <span className="text-xs text-gray-500">
                  {headers.length} cols × {rows.length} rows
                </span>
              </button>
              {showTable && (
                <div className="border rounded-lg overflow-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-emerald-50 sticky top-0">
                      <tr>
                        {headers.map((h, i) => (
                          <th
                            key={i}
                            className="px-3 py-2 text-left font-bold text-emerald-800 border-r last:border-r-0"
                          >
                            {isEditing ? (
                              <div className="flex items-center gap-1">
                                <input
                                  className="w-full px-1 py-0.5 text-xs border rounded"
                                  value={h}
                                  onChange={(e) => handleHeaderChange(i, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {headers.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeHeader(i);
                                    }}
                                    className="text-red-600 hover:bg-red-50 p-0.5 rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            ) : (
                              h
                            )}
                          </th>
                        ))}
                        {isEditing && (
                          <th className="w-10 p-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addHeader();
                              }}
                              className="text-emerald-600 hover:bg-emerald-50 p-1 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-gray-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-2 py-1 border-r last:border-r-0">
                              {isEditing ? (
                                <input
                                  className="w-full px-1 py-0.5 text-xs border rounded"
                                  value={cell || ""}
                                  onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ) : (
                                <span className="block truncate">{cell}</span>
                              )}
                            </td>
                          ))}
                          {isEditing && (
                            <td className="text-center p-1">
                              {rows.length > 1 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeRow(rIdx);
                                  }}
                                  className="text-red-600 hover:bg-red-50 p-0.5 rounded"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                    {isEditing && (
                      <tfoot>
                        <tr>
                          <td
                            colSpan={headers.length + 1}
                            className="p-2 text-center bg-gray-50"
                          >
                            <button
                              onClick={addRow}
                              className="text-emerald-600 text-sm flex items-center gap-1 mx-auto hover:underline"
                            >
                              <Plus className="w-4 h-4" /> Add Row
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              )}
              {formErrors.rows && <p className="text-red-500 text-xs mt-1">{formErrors.rows}</p>}
            </div>

            {/* Statements */}
            <div>
              <button
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg border mb-2 transition-colors"
                onClick={() => setShowStatements(!showStatements)}
                type="button"
              >
                <h4 className="font-medium flex items-center">
                  <ChevronRight
                    className={`w-4 h-4 mr-2 transition-transform ${showStatements ? "rotate-90" : ""}`}
                  />
                  Statements
                </h4>
                <span className="text-xs text-gray-500">{statements.length} items</span>
              </button>
              {showStatements && (
                <div className="border rounded-lg p-3 space-y-3">
                  {isEditing && (
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statements Prompt</label>
                      <input
                        type="text"
                        value={editedQuestion.statementsPrompt || ""}
                        onChange={(e) => handleEditChange("statementsPrompt", e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder="Prompt shown above statements in preview"
                      />
                    </div>
                  )}
                  {!isEditing && editedQuestion.statementsPrompt && (
                    <p className="text-sm text-gray-600 mb-2">{editedQuestion.statementsPrompt}</p>
                  )}
                  {statements.map((stmt) => (
                    <div key={stmt.id} className="border rounded p-3 bg-white">
                      {isEditing ? (
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            className="flex-1 px-2 py-1 text-sm border rounded border-gray-300"
                            value={stmt.text || ""}
                            onChange={(e) => handleStatementTextChange(stmt.id, e.target.value)}
                            placeholder="Statement text"
                            onClick={(e) => e.stopPropagation()}
                          />
                          {statements.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStatement(stmt.id);
                              }}
                              className="text-red-600 hover:bg-red-50 p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm font-medium mb-2">{stmt.text || "—"}</p>
                      )}
                      <div className="flex gap-2 justify-center flex-wrap">
                        {statementTypes.map((type) => {
                          const isSelected = stmt.answer === type;
                          return (
                            <label
                              key={type}
                              className={`flex items-center gap-1 px-3 py-1 rounded text-xs cursor-pointer transition-colors ${
                                isSelected ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500" : "bg-gray-100 hover:bg-gray-200"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`stmt-${stmt.id}`}
                                checked={isSelected}
                                onChange={() => setAnswer(stmt.id, type)}
                                disabled={!isEditing}
                                className="sr-only"
                              />
                              <span>{type}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={addStatement}
                      className="text-sm text-emerald-600 flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Add Statement
                    </button>
                  )}
                  {formErrors.statements && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.statements}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 rounded-lg border p-3">
            <h4 className="font-medium text-gray-700 mb-2">Explanation</h4>
            {isEditing ? (
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-vertical"
                value={editedQuestion.explanation || ""}
                onChange={(e) => handleEditChange("explanation", e.target.value)}
                rows={4}
                placeholder="Enter explanation..."
              />
            ) : (
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {question.explanation || "No explanation provided."}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}