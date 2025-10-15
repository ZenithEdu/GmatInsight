import { useState, useEffect } from "react";

const GMATTablePreview = ({ tableData, statements, setStatements, onBack }) => {
  const [sortBy, setSortBy] = useState(tableData.sortBy || tableData.headers[0] || "");

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

  const setAnswer = (id, answer) => {
    setStatements(prevStatements =>
      prevStatements.map((stmt) => (stmt.id === id ? { ...stmt, answer } : stmt))
    );
  };

  const sortedRows = sortTableRows(tableData.rows, sortBy);

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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
            <table className="border border-gray-400 bg-white text-xs leading-tight">
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
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
        >
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default GMATTablePreview;