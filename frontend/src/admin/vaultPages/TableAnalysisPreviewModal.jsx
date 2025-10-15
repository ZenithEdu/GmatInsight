import React, { useState } from "react";
import { X, Save, Edit2, Trash2, Plus } from "lucide-react";

export default function TableAnalysisPreviewModal({
  question,
  onClose,
  onUpdate,
  API_URL,
  showSnackbar,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...question });
  const [loading, setLoading] = useState(false);

  // Table cell edit
  const handleCellChange = (rowIdx, colIdx, value) => {
    setEditData((prev) => ({
      ...prev,
      rows: prev.rows.map((row, r) =>
        r === rowIdx
          ? row.map((cell, c) => (c === colIdx ? value : cell))
          : row
      ),
    }));
  };

  // Add/remove row/column
  const addRow = () => {
    setEditData((prev) => ({
      ...prev,
      rows: [...prev.rows, new Array(prev.headers.length).fill("")],
    }));
  };
  const removeRow = (rowIdx) => {
    setEditData((prev) => ({
      ...prev,
      rows: prev.rows.filter((_, idx) => idx !== rowIdx),
    }));
  };
  const addCol = () => {
    setEditData((prev) => ({
      ...prev,
      headers: [...prev.headers, `Column ${prev.headers.length + 1}`],
      rows: prev.rows.map((row) => [...row, ""]),
    }));
  };
  const removeCol = (colIdx) => {
    setEditData((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, idx) => idx !== colIdx),
      rows: prev.rows.map((row) => row.filter((_, idx) => idx !== colIdx)),
    }));
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatementChange = (idx, field, value) => {
    setEditData((prev) => ({
      ...prev,
      statements: prev.statements.map((s, i) =>
        i === idx ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdate(editData);
      setIsEditing(false);
    } catch (err) {
      showSnackbar("Update failed", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-3 border-b bg-gradient-to-r from-emerald-50 to-emerald-100">
          <h3 className="text-lg font-bold text-emerald-800">
            Table Analysis Preview
          </h3>
          <button
            onClick={onClose}
            className="text-emerald-500 hover:text-emerald-700 p-1 hover:bg-white/50 rounded"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto p-3"
          style={{ maxHeight: "70vh" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-emerald-700 mb-1">
                  Topic
                </label>
                {isEditing ? (
                  <input
                    className="w-full px-2 py-1 border border-emerald-200 rounded text-xs"
                    value={editData.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                  />
                ) : (
                  <span className="text-xs font-medium text-emerald-800">
                    {question.topic}
                  </span>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-emerald-700 mb-1">
                  Difficulty
                </label>
                {isEditing ? (
                  <select
                    className="w-full px-2 py-1 border border-emerald-200 rounded text-xs"
                    value={editData.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                ) : (
                  <span className="text-xs font-medium text-emerald-800">
                    {question.difficulty}
                  </span>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-emerald-700 mb-1">
                  Level
                </label>
                {isEditing ? (
                  <select
                    className="w-full px-2 py-1 border border-emerald-200 rounded text-xs"
                    value={editData.level}
                    onChange={(e) => handleChange("level", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="L4">L4</option>
                    <option value="L5">L5</option>
                  </select>
                ) : (
                  <span className="text-xs font-medium text-emerald-800">
                    {question.level}
                  </span>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-emerald-700 mb-1">
                  Instructions
                </label>
                {isEditing ? (
                  <textarea
                    className="w-full px-2 py-1 border border-emerald-200 rounded text-xs"
                    value={editData.instructions}
                    onChange={(e) => handleChange("instructions", e.target.value)}
                    rows={2}
                  />
                ) : (
                  <span className="text-xs text-emerald-700">
                    {question.instructions}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-700 mb-1">
                Table
              </label>
              <div className="overflow-x-auto">
                <table className="border border-gray-300 bg-white text-xs leading-tight w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      {isEditing
                        ? editData.headers.map((header, idx) => (
                            <th
                              key={idx}
                              className="border border-gray-300 px-2 py-1 font-bold text-left"
                            >
                              <div className="flex items-center">
                                <input
                                  className="w-full px-1 py-0.5 border border-gray-200 rounded text-xs"
                                  value={header}
                                  onChange={(e) => {
                                    setEditData((prev) => ({
                                      ...prev,
                                      headers: prev.headers.map((h, i) =>
                                        i === idx ? e.target.value : h
                                      ),
                                    }));
                                  }}
                                />
                                {editData.headers.length > 1 && (
                                  <button
                                    className="ml-1 text-red-500"
                                    onClick={() => removeCol(idx)}
                                    title="Remove column"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </th>
                          ))
                        : question.headers.map((header, idx) => (
                            <th
                              key={idx}
                              className="border border-gray-300 px-2 py-1 font-bold text-left"
                            >
                              {header}
                            </th>
                          ))}
                      {isEditing && (
                        <th className="border border-gray-300 px-2 py-1">
                          <button
                            className="text-green-600"
                            onClick={addCol}
                            title="Add column"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(isEditing ? editData.rows : question.rows).map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {(isEditing ? editData.headers : question.headers).map((_, colIdx) => (
                          <td key={colIdx} className="border border-gray-300 px-2 py-1">
                            {isEditing ? (
                              <input
                                className="w-full px-1 py-0.5 border border-gray-200 rounded text-xs"
                                value={row[colIdx]}
                                onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                              />
                            ) : (
                              row[colIdx]
                            )}
                          </td>
                        ))}
                        {isEditing && (
                          <td className="border border-gray-300 px-2 py-1">
                            {editData.rows.length > 1 && (
                              <button
                                className="text-red-500"
                                onClick={() => removeRow(rowIdx)}
                                title="Remove row"
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
                          colSpan={editData.headers.length + 1}
                          className="border border-gray-300 px-2 py-1"
                        >
                          <button
                            className="text-green-600"
                            onClick={addRow}
                            title="Add row"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Row
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-xs font-medium text-emerald-700 mb-1">
              Statements
            </label>
            {(isEditing ? editData.statements : question.statements)?.map((stmt, idx) => (
              <div key={idx} className="mb-1 flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      className="flex-1 px-2 py-1 border border-emerald-200 rounded text-xs"
                      value={editData.statements[idx]?.text || ""}
                      onChange={(e) => handleStatementChange(idx, "text", e.target.value)}
                    />
                    <select
                      className="px-2 py-1 border border-emerald-200 rounded text-xs"
                      value={editData.statements[idx]?.answer || ""}
                      onChange={(e) => handleStatementChange(idx, "answer", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="yes">True</option>
                      <option value="no">False</option>
                    </select>
                  </>
                ) : (
                  <>
                    <span className="flex-1 font-medium">{stmt.text}</span>
                    <span className="ml-2 text-xs text-emerald-700">
                      {stmt.answer === "yes" ? "True" : stmt.answer === "no" ? "False" : ""}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <label className="block text-xs font-medium text-emerald-700 mb-1">
              Explanation
            </label>
            {isEditing ? (
              <textarea
                className="w-full px-2 py-1 border border-emerald-200 rounded text-xs"
                value={editData.explanation}
                onChange={(e) => handleChange("explanation", e.target.value)}
                rows={2}
              />
            ) : (
              <span className="text-xs text-emerald-700">
                {question.explanation}
              </span>
            )}
          </div>
        </div>
        <div className="border-t bg-emerald-50 p-3 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-xs bg-gray-200 text-emerald-700 rounded hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                <Edit2 className="w-3 h-3 mr-1 inline" />
                Edit
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
