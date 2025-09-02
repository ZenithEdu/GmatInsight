import { useState, useEffect } from "react";
import { Table, Upload, Plus, Trash2, Play, Download } from "lucide-react";

const GMATTableAnalyzer = () => {
  const [tableData, setTableData] = useState({
    instructions: "",
    headers: [],
    rows: [],
    sortBy: "", // Default to empty string to select first column
  });

  const [statements, setStatements] = useState([
    { id: 1, text: "", answer: null },
  ]);

  const [currentView, setCurrentView] = useState("input"); // 'input' or 'preview'
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  // Sample data
  const sampleData = {
    instructions:
      "The table lists data on each of 8 items advertised by an Internet retailer on a single web page as part of a one-day sale. The term customer refers to anyone who viewed that web page on that day. For each item, the page placement denotes the quadrant of the page on which the item's advertisement appeared; the mean eye time is the average (arithmetic mean) number of seconds that each customer spent viewing the item's advertisement; the infoclick percentage is the percentage of all customers who clicked a button for more information; and the sales rank is the item's ranking based on sales, where a lesser number denotes greater sales.",
    headers: [
      "Item",
      "Page placement",
      "Mean eye time (seconds)",
      "Infoclick percentage",
      "Sales rank",
    ],
    rows: [
      ["A", "upper left", "8.20", "35%", "2"],
      ["B", "upper left", "7.15", "67%", "3"],
      ["C", "upper left", "7.25", "22%", "8"],
      ["D", "upper left", "8.35", "52%", "1"],
      ["E", "upper left", "8.42", "74%", "7"],
      ["F", "upper right", "7.35", "18%", "4"],
      ["G", "lower left", "6.55", "5%", "6"],
      ["H", "lower right", "6.87", "22%", "5"],
    ],
    sortBy: "Item", // Default to first column for sample data
  };

  const sampleStatements = [
    "Infoclick percentage is directly proportional to mean eye time.",
    "The 2 items having the greatest sales were advertised in the upper part of the web page.",
    "Mean eye time was greatest for the item having the greatest infoclick percentage and least for the item having the least infoclick percentage.",
  ];

  const loadSampleData = () => {
    setTableData(sampleData);
    setStatements(
      sampleStatements.map((text, index) => ({
        id: index + 1,
        text,
        answer: null,
      }))
    );
  };

  const addStatement = () => {
    setStatements([
      ...statements,
      {
        id: statements.length > 0 ? Math.max(...statements.map((s) => s.id)) + 1 : 1,
        text: "",
        answer: null,
      },
    ]);
  };

  const removeStatement = (id) => {
    if (statements.length > 1) {
      setStatements(statements.filter((stmt) => stmt.id !== id));
    }
  };

  const updateStatement = (id, text) => {
    setStatements(
      statements.map((stmt) => (stmt.id === id ? { ...stmt, text } : stmt))
    );
  };

  const setAnswer = (id, answer) => {
    setStatements(
      statements.map((stmt) => (stmt.id === id ? { ...stmt, answer } : stmt))
    );
  };

  const addTableRow = () => {
    const newRow = new Array(tableData.headers.length).fill("");
    setTableData({
      ...tableData,
      rows: [...tableData.rows, newRow],
    });
  };

  const removeTableRow = (rowIndex) => {
    if (tableData.rows.length > 1) {
      const newRows = [...tableData.rows];
      newRows.splice(rowIndex, 1);
      setTableData({
        ...tableData,
        rows: newRows,
      });
    }
  };

  const updateTableCell = (rowIndex, colIndex, value) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };

  const addTableColumn = () => {
    setTableData({
      ...tableData,
      headers: [...tableData.headers, `Column ${tableData.headers.length + 1}`],
      rows: tableData.rows.map((row) => [...row, ""]),
      sortBy: tableData.sortBy || `Column ${tableData.headers.length + 1}`,
    });
  };

  const removeTableColumn = (colIndex) => {
    if (tableData.headers.length > 1) {
      const newHeaders = [...tableData.headers];
      newHeaders.splice(colIndex, 1);

      const newRows = tableData.rows.map((row) => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });

      const newSortBy = tableData.sortBy === tableData.headers[colIndex] ? (newHeaders[0] || "") : tableData.sortBy;

      setTableData({
        ...tableData,
        headers: newHeaders,
        rows: newRows,
        sortBy: newSortBy,
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target.result;
          const lines = content.split("\n");
          const headers = lines[0].split(",");
          const rows = lines.slice(1).map((line) => line.split(","));

          setTableData({
            ...tableData,
            headers,
            rows,
            sortBy: headers[0] || "",
          });
          setFileUploaded(true);
        } catch (error) {
          alert("Error parsing file. Please check the format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const exportToCSV = () => {
    const { headers, rows } = tableData;
    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent += headers.join(",") + "\r\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gmat_table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sorting function
  const sortTableRows = (rows, sortBy) => {
    if (!sortBy || !tableData.headers.includes(sortBy)) return rows;

    const colIndex = tableData.headers.indexOf(sortBy);
    if (colIndex === -1) return rows;

    return [...rows].sort((a, b) => {
      let valA = a[colIndex];
      let valB = b[colIndex];

      // Handle specific columns
      if (sortBy === "Mean eye time (seconds)") {
        valA = parseFloat(valA) || 0;
        valB = parseFloat(valB) || 0;
      } else if (sortBy === "Infoclick percentage") {
        valA = parseFloat(valA.replace("%", "")) || 0;
        valB = parseFloat(valB.replace("%", "")) || 0;
      } else if (sortBy === "Sales rank") {
        valA = parseInt(valA) || 0;
        valB = parseInt(valB) || 0;
      } else {
        // String comparison for other columns
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  };

  if (currentView === "preview") {
    const sortedRows = sortTableRows(tableData.rows, tableData.sortBy);

    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Left Panel - Table and Instructions */}
          <div className="space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {tableData.instructions}
            </p>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm">Sort by:</span>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300"
                value={tableData.sortBy}
                onChange={(e) =>
                  setTableData({ ...tableData, sortBy: e.target.value })
                }
              >
                {tableData.headers.map((header, index) => (
                  <option key={index} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Table - Fully Visible */}
            <div className="w-full">
              <table className=" border border-gray-400 bg-white text-xs leading-tight">
                <thead>
                  <tr className="bg-gray-100">
                    {tableData.headers.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-400 px-1 py-0.5 font-bold text-left"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-400 px-1 py-0.5"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel - Statements */}
          <div className="space-y-4">
            <p className="text-sm font-medium">
              For each of the following statements about this data, select{" "}
              <strong>Yes</strong> if the statement can be inferred from the
              given information. Otherwise, select <strong>No</strong>.
            </p>

            <div className="border border-gray-300 rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="w-16 text-center py-2 border-r border-gray-300 text-sm font-medium">
                      Yes
                    </th>
                    <th className="w-16 text-center py-2 border-r border-gray-300 text-sm font-medium">
                      No
                    </th>
                    <th className="px-3 py-2 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {statements.map((statement) => (
                    <tr
                      key={statement.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="text-center py-3 border-r border-gray-300">
                        <input
                          type="radio"
                          name={`statement-${statement.id}`}
                          checked={statement.answer === "yes"}
                          onChange={() => setAnswer(statement.id, "yes")}
                          className="w-4 h-4 cursor-pointer focus:ring-blue-300"
                        />
                      </td>
                      <td className="text-center py-3 border-r border-gray-300">
                        <input
                          type="radio"
                          name={`statement-${statement.id}`}
                          checked={statement.answer === "no"}
                          onChange={() => setAnswer(statement.id, "no")}
                          className="w-4 h-4 cursor-pointer focus:ring-blue-300"
                        />
                      </td>
                      <td className="px-3 py-3 text-sm">{statement.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Back to Editor Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentView("input")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          >
            Back to Editor
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Quick Start Sticky Header */}
      <div className="sticky top-0 z-10 bg-green-50 border-b border-green-200 p-4 flex justify-between items-center shadow-sm">
        <div>
          <h3 className="font-semibold text-green-800">
            GMAT Data Preview & Actions
          </h3>
          <p className="text-green-700 text-sm">
            Load a sample GMAT question or export the current table structure.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Load Sample GMAT Question
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Export Table Structure
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table Input Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Table className="w-5 h-5 mr-2" />
                Table Configuration
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea
                value={tableData.instructions}
                onChange={(e) =>
                  setTableData({ ...tableData, instructions: e.target.value })
                }
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Provide instructions and context for the table analysis..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Table Data (Excel-style editing)
                </label>
                <div className="flex space-x-2">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm flex items-center">
                    <Upload className="w-4 h-4 mr-1" />
                    Import Table Structure
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {fileUploaded && (
                    <span className="text-green-600 text-sm flex items-center">
                      ✓ File uploaded
                    </span>
                  )}
                </div>
              </div>

              <div className="border-2 border-gray-300 rounded-lg overflow-x-auto bg-white">
                <div className="flex min-w-[600px]">
                  <div className="w-8 h-8 bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-xs font-medium text-gray-500"></div>
                  {tableData.headers.map((header, index) => (
                    <div
                      key={index}
                      className="min-w-24 h-8 bg-gray-100 border-r border-b border-gray-300 flex items-center justify-between text-xs font-medium text-gray-500"
                    >
                      <span className="px-1">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {tableData.headers.length > 1 && (
                        <button
                          onClick={() => removeTableColumn(index)}
                          className="text-red-500 hover:text-red-700 text-xs pr-1"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-gray-100 border-b border-gray-300 flex items-center justify-center">
                    <button
                      onClick={addTableColumn}
                      className="text-green-600 hover:text-green-800 text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex min-w-[600px]">
                  <div className="w-8 h-10 bg-gray-50 border-r border-b border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                    H
                  </div>
                  {tableData.headers.map((header, index) => (
                    <div
                      key={index}
                      className="min-w-24 h-10 border-r border-b border-gray-300 bg-blue-50"
                    >
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => {
                          const newHeaders = [...tableData.headers];
                          newHeaders[index] = e.target.value;
                          setTableData({ ...tableData, headers: newHeaders });
                        }}
                        className="w-full h-full px-2 text-xs font-medium bg-transparent border-none outline-none focus:bg-blue-100"
                        placeholder={`Header ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {tableData.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex min-w-[600px]">
                    <div className="w-8 h-8 bg-gray-50 border-r border-b border-gray-300 flex items-center justify-between text-xs font-medium text-gray-600">
                      <span>{rowIndex + 1}</span>
                      {tableData.rows.length > 1 && (
                        <button
                          onClick={() => removeTableRow(rowIndex)}
                          className="text-red-500 hover:text-red-700 text-xs pr-1"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className="min-w-24 h-8 border-r border-b border-gray-300"
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            updateTableCell(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full h-full px-2 text-xs border-none outline-none hover:bg-gray-50 focus:bg-yellow-50 focus:ring-1 focus:ring-blue-300"
                          placeholder=""
                        />
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex min-w-[600px]">
                  <div className="w-8 h-8 bg-gray-50 border-r border-gray-300 flex items-center justify-center">
                    <button
                      onClick={addTableRow}
                      className="text-green-600 hover:text-green-800 text-xs"
                    >
                      +
                    </button>
                  </div>
                  {tableData.headers.map((_, index) => (
                    <div
                      key={index}
                      className="min-w-24 h-8 border-r border-gray-300 bg-gray-25"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex space-x-4 text-xs text-gray-600">
                <span>💡 Click any cell to edit directly</span>
                <span>• Use + buttons to add rows/columns</span>
                <span>• Use × buttons to remove rows/columns</span>
              </div>
            </div>
          </div>

          {/* Statements Section */}
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                Verification Statements
              </h3>
              <p className="text-purple-700 text-sm">
                Add statements that users will verify as Yes or No
              </p>
            </div>

            <div className="space-y-3">
              {statements.map((statement) => (
                <div
                  key={statement.id}
                  className="border border-gray-300 rounded-lg p-3 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={statement.text}
                        onChange={(e) =>
                          updateStatement(statement.id, e.target.value)
                        }
                        rows={2}
                        className="w-full p-2 border border-gray-200 rounded text-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-200"
                        placeholder={`Statement ${statement.id}...`}
                      />
                      <div className="mt-2 flex space-x-4">
                        <label className="flex items-center space-x-1">
                          <input
                            type="radio"
                            name={`input-statement-${statement.id}`}
                            checked={statement.answer === "yes"}
                            onChange={() => setAnswer(statement.id, "yes")}
                            className="w-4 h-4 cursor-pointer focus:ring-purple-300"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="radio"
                            name={`input-statement-${statement.id}`}
                            checked={statement.answer === "no"}
                            onChange={() => setAnswer(statement.id, "no")}
                            className="w-4 h-4 cursor-pointer focus:ring-purple-300"
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => removeStatement(statement.id)}
                      disabled={statements.length <= 1}
                      className={`p-1 ${
                        statements.length <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addStatement}
              className="w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Statement
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setCurrentView("preview")}
            disabled={
              !tableData.headers.length ||
              !tableData.rows.length ||
              !statements.some((s) => s.text)
            }
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              !tableData.headers.length ||
              !tableData.rows.length ||
              !statements.some((s) => s.text)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Preview Table Structure</span>
          </button>
        </div>

        {/* Validation Message */}
        {(!tableData.headers.length ||
          !tableData.rows.length ||
          !statements.some((s) => s.text)) && (
          <div className="text-center text-red-500 text-sm mt-2">
            {!tableData.headers.length || !tableData.rows.length
              ? "Please add at least one column and one row to the table."
              : "Please add at least one statement with text."}
          </div>
        )}
      </div>
    </>
  );
};

export default GMATTableAnalyzer;