import React from "react";

const TwoPartAnalysisPreview = ({ questionData, onBackToEditor }) => {
  const setCorrectAnswer = (rowIndex, colIndex) => {
    // This is a placeholder function since the actual state management
    // would be handled by the parent component
    console.log(`Selected row ${rowIndex}, column ${colIndex}`);
  };

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
          onClick={onBackToEditor}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          aria-label="Back to editor"
        >
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default TwoPartAnalysisPreview;