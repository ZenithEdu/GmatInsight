import  { useState, useEffect } from "react";
import { Plus, Trash2, Play, Download } from "lucide-react";

const TwoPartAnalysisStructure = () => {
  const [questionData, setQuestionData] = useState({
    contextText: "",
    instructionText: "",
    tableHeaders: ["Option 1", "Option 2"],
    tableRows: ["Row 1"],
    tableValues: ["Value 1"],
    correctAnswers: {},
  });
  const [currentView, setCurrentView] = useState("input");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleData = {
    contextText: `A committee recently held a planning meeting for a craft fair. The committee decided that the fair would occur on a Tuesday and that a public discussion about the fair would be held sometime after, also on a Tuesday.`,
    instructionText: `In the table, select for Fair a number of days between the planning meeting and the fair and select for Discussion a number of days between the planning meeting and the public discussion that would be jointly consistent with the given information. Make only two selections, one in each column.`,
    tableHeaders: ["Fair", "Discussion"],
    tableRows: ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"],
    tableValues: ["260", "271", "296", "306", "311"],
    correctAnswers: {},
  };

  const loadSampleData = () => {
    setQuestionData(sampleData);
    setError("");
  };

  const addTableHeader = () => {
    setQuestionData((prev) => ({
      ...prev,
      tableHeaders: [
        ...prev.tableHeaders,
        `Option ${prev.tableHeaders.length + 1}`,
      ],
    }));
  };

  const removeTableHeader = (index) => {
    if (questionData.tableHeaders.length > 1) {
      const newHeaders = questionData.tableHeaders.filter(
        (_, i) => i !== index
      );
      const newAnswers = { ...questionData.correctAnswers };

      // Remove answers for the deleted column
      Object.keys(newAnswers).forEach((key) => {
        if (key.includes(`-${index}`)) {
          delete newAnswers[key];
        }
      });

      setQuestionData((prev) => ({
        ...prev,
        tableHeaders: newHeaders,
        correctAnswers: newAnswers,
      }));
    }
  };

  const updateTableHeader = (index, value) => {
    setQuestionData((prev) => ({
      ...prev,
      tableHeaders: prev.tableHeaders.map((header, i) =>
        i === index ? value : header
      ),
    }));
  };

  const addTableRow = () => {
    setQuestionData((prev) => ({
      ...prev,
      tableRows: [...prev.tableRows, `Row ${prev.tableRows.length + 1}`],
      tableValues: [
        ...prev.tableValues,
        `Value ${prev.tableValues.length + 1}`,
      ],
    }));
  };

  const removeTableRow = (index) => {
    if (questionData.tableRows.length > 1) {
      const newRows = questionData.tableRows.filter((_, i) => i !== index);
      const newValues = questionData.tableValues.filter((_, i) => i !== index);
      const newAnswers = { ...questionData.correctAnswers };

      // Remove answers for the deleted row
      Object.keys(newAnswers).forEach((key) => {
        if (key.startsWith(`${index}-`)) {
          delete newAnswers[key];
        }
      });

      setQuestionData((prev) => ({
        ...prev,
        tableRows: newRows,
        tableValues: newValues,
        correctAnswers: newAnswers,
      }));
    }
  };

  const updateTableRow = (index, value) => {
    setQuestionData((prev) => ({
      ...prev,
      tableRows: prev.tableRows.map((row, i) => (i === index ? value : row)),
    }));
  };

  const updateTableValue = (index, value) => {
    setQuestionData((prev) => ({
      ...prev,
      tableValues: prev.tableValues.map((val, i) =>
        i === index ? value : val
      ),
    }));
  };

  const setCorrectAnswer = (rowIndex, colIndex) => {
    // For radio button behavior - only one selection per column
    const newAnswers = { ...questionData.correctAnswers };

    // Remove any existing selection in this column
    Object.keys(newAnswers).forEach((key) => {
      if (key.endsWith(`-${colIndex}`)) {
        delete newAnswers[key];
      }
    });

    // Add the new selection
    newAnswers[`${rowIndex}-${colIndex}`] = true;

    setQuestionData((prev) => ({
      ...prev,
      correctAnswers: newAnswers,
    }));
  };

  const exportQuestion = () => {
    const questionJson = JSON.stringify(questionData, null, 2);
    const blob = new Blob([questionJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table_question.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (currentView === "preview") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="space-y-6">
          {questionData.contextText && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {questionData.contextText}
            </p>
          )}

          {questionData.instructionText && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {questionData.instructionText}
            </p>
          )}

          <div className="flex justify-start">
            <table className="border-collapse border border-gray-400">
              <thead>
                <tr>
                  {questionData.tableHeaders.map((header, colIndex) => (
                    <th
                      key={colIndex}
                      className="border border-gray-400 p-3 bg-gray-50 font-medium text-sm"
                    >
                      {header}
                    </th>
                  ))}
                  <th className="border border-gray-400 p-3 bg-gray-50 font-medium text-sm">
                    Values
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionData.tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {questionData.tableHeaders.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-400 p-3 text-center"
                      >
                        <input
                          type="radio"
                          name={`column-${colIndex}`}
                          checked={
                            !!questionData.correctAnswers[
                              `${rowIndex}-${colIndex}`
                            ]
                          }
                          onChange={() => setCorrectAnswer(rowIndex, colIndex)}
                          className="w-4 h-4"
                          aria-label={`Select ${questionData.tableHeaders[colIndex]} for ${questionData.tableValues[rowIndex]}`}
                        />
                      </td>
                    ))}
                    <td className="border border-gray-400 p-3 text-center font-medium">
                      {questionData.tableValues[rowIndex]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setCurrentView("input");
              setQuestionData((prev) => ({
                ...prev,
                correctAnswers: {},
              }));
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
            aria-label="Back to editor"
          >
            Back to Editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-green-50 border-b border-green-200 p-4 flex justify-between items-center shadow-sm">
        <div>
          <h3 className="font-semibold text-green-800">
            Table Question Generator
          </h3>
          <p className="text-green-700 text-sm">
            Create GMAT questions with text sections and radio button tables.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            aria-label="Load sample question"
          >
            Load Sample Question
          </button>
          <button
            onClick={exportQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center"
            aria-label="Export question"
          >
            <Download className="w-4 h-4 mr-1" />
            Export Question
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Text Configuration
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Context Text
              </label>
              <textarea
                value={questionData.contextText}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    contextText: e.target.value,
                  }))
                }
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Enter the context or background information for the question..."
                aria-label="Context text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instruction Text
              </label>
              <textarea
                value={questionData.instructionText}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    instructionText: e.target.value,
                  }))
                }
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Instructions for the student (e.g., 'In the table, select...')"
                aria-label="Instruction text"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
                Table Configuration
              </h3>
              <p className="text-purple-700 text-sm">
                Configure the table headers, rows, and values
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Table Headers (Columns)
                </label>
                <button
                  onClick={addTableHeader}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  aria-label="Add table header"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Header
                </button>
              </div>
              <div className="space-y-2">
                {questionData.tableHeaders.map((header, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateTableHeader(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-300"
                      placeholder={`Header ${index + 1}`}
                      aria-label={`Table header ${index + 1}`}
                    />
                    <button
                      onClick={() => removeTableHeader(index)}
                      disabled={questionData.tableHeaders.length <= 1}
                      className={`p-1 ${
                        questionData.tableHeaders.length <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      aria-label={`Remove header ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Table Rows & Values
                </label>
                <button
                  onClick={addTableRow}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  aria-label="Add table row"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Row
                </button>
              </div>
              <div className="space-y-2">
                {questionData.tableRows.map((row, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={row}
                      onChange={(e) => updateTableRow(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-300"
                      placeholder={`Row ${index + 1} Label`}
                      aria-label={`Row ${index + 1} label`}
                    />
                    <input
                      type="text"
                      value={questionData.tableValues[index]}
                      onChange={(e) => updateTableValue(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-purple-300"
                      placeholder={`Value ${index + 1}`}
                      aria-label={`Row ${index + 1} value`}
                    />
                    <button
                      onClick={() => removeTableRow(index)}
                      disabled={questionData.tableRows.length <= 1}
                      className={`p-1 ${
                        questionData.tableRows.length <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      aria-label={`Remove row ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {questionData.tableHeaders.length > 0 &&
          questionData.tableRows.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-3">Table Preview:</h4>
              <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 mx-auto">
                  <thead>
                    <tr>
                      {questionData.tableHeaders.map((header, colIndex) => (
                        <th
                          key={colIndex}
                          className="border border-gray-400 p-2 bg-gray-50 text-sm font-medium"
                        >
                          {header}
                        </th>
                      ))}
                      <th className="border border-gray-400 p-2 bg-gray-50 text-sm font-medium">
                        Values
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionData.tableRows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {questionData.tableHeaders.map((_, colIndex) => (
                          <td
                            key={colIndex}
                            className="border border-gray-400 p-2 text-center"
                          >
                            <input
                              type="radio"
                              name={`preview-column-${colIndex}`}
                              checked={
                                !!questionData.correctAnswers[
                                  `${rowIndex}-${colIndex}`
                                ]
                              }
                              onChange={() =>
                                setCorrectAnswer(rowIndex, colIndex)
                              }
                              className="w-4 h-4"
                              aria-label={`Select ${questionData.tableHeaders[colIndex]} for ${questionData.tableValues[rowIndex]}`}
                            />
                          </td>
                        ))}
                        <td className="border border-gray-400 p-2 text-center text-sm">
                          {questionData.tableValues[rowIndex]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setCurrentView("preview")}
            disabled={
              !questionData.contextText.trim() ||
              !questionData.instructionText.trim() ||
              questionData.tableHeaders.length === 0 ||
              questionData.tableRows.length === 0
            }
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              !questionData.contextText.trim() ||
              !questionData.instructionText.trim() ||
              questionData.tableHeaders.length === 0 ||
              questionData.tableRows.length === 0
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            aria-label="Preview question"
          >
            <Play className="w-4 h-4" />
            <span>Preview Question</span>
          </button>
        </div>

        {(!questionData.contextText.trim() ||
          !questionData.instructionText.trim() ||
          questionData.tableHeaders.length === 0 ||
          questionData.tableRows.length === 0) && (
          <div className="text-center text-red-500 text-sm mt-2">
            {!questionData.contextText.trim()
              ? "Please add context text."
              : !questionData.instructionText.trim()
              ? "Please add instruction text."
              : questionData.tableHeaders.length === 0
              ? "Please add at least one table header."
              : questionData.tableRows.length === 0
              ? "Please add at least one table row."
              : "Please complete all required fields."}
          </div>
        )}
      </div>
    </>
  );
};

export default TwoPartAnalysisStructure;
