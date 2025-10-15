import { useState } from "react";

const MultiSourcePreview = ({ 
  dataSources, 
  statements, 
  setStatements, 
  statementsInstructions, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentSource = dataSources[activeTab];

  const renderInstructionsWithTable = (instructions, rows, tableTitle, image, imageTitle, tableFooterTitle) => {
    const parts = instructions.split('{table}');
    const beforeTable = parts[0]?.trim();
    const afterTable = parts[1]?.trim();

    return (
      <div className="space-y-4">
        {image && (
          <div>
            {imageTitle && (
              <h3 className="text-sm font-semibold text-gray-800 text-center mb-0">
                {imageTitle}
              </h3>
            )}
            <div className="w-full flex justify-center">
              <img src={image} alt="Uploaded content" className="max-w-full max-h-64 object-contain" />
            </div>
          </div>
        )}
        {beforeTable && (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {beforeTable}
          </p>
        )}
        {tableTitle && (
          <h3 className="text-sm font-semibold text-gray-800 text-center mb-0">
            {tableTitle}
          </h3>
        )}
        <div className="w-full flex justify-center">
          <table className="border border-gray-400 bg-white text-xs leading-tight">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-400 px-2 py-1 text-center"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {tableFooterTitle && (
          <h3 className="text-sm font-semibold text-gray-800 text-center -mt-5">
            {tableFooterTitle}
          </h3>
        )}
        {afterTable && (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {afterTable}
          </p>
        )}
      </div>
    );
  };

  const setAnswer = (id, answer) => {
    setStatements(prevStatements =>
      prevStatements.map((stmt) => (stmt.id === id ? { ...stmt, answer } : stmt))
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-2 bg-white">
      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          <div className="border-b border-gray-300">
            <div className="flex flex-wrap -mb-px">
              {dataSources.map((source, index) => (
                <button
                  key={source.id}
                  onClick={() => setActiveTab(index)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium mr-2 mb-2 ${
                    activeTab === index
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span>{source.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-96">
            {currentSource?.type === "instructions" && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {currentSource.content}
                </pre>
              </div>
            )}

            {currentSource?.type === "image" && (
              <div className="space-y-4">
                {currentSource.image && (
                  <div>
                    {currentSource.imageTitle && currentSource.title !== "Proposal 1" && (
                      <h3 className="text-sm font-semibold text-gray-800 text-center mb-0">
                        {currentSource.imageTitle}
                      </h3>
                    )}
                    <div className="w-full flex justify-center">
                      <img src={currentSource.image} alt="Uploaded content" className="max-w-full max-h-64 object-contain" />
                    </div>
                  </div>
                )}
                {currentSource.instructions && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentSource.instructions}
                  </p>
                )}
              </div>
            )}

            {currentSource?.type === "table" && (
              <div className="space-y-4">
                {currentSource.instructions && (
                  renderInstructionsWithTable(
                    currentSource.instructions, 
                    currentSource.rows, 
                    currentSource.tableTitle,
                    currentSource.image,
                    currentSource.imageTitle,
                    currentSource.tableFooterTitle
                  )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {statementsInstructions && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {statementsInstructions}
            </p>
          )}
          <div className="border border-gray-300 rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-20 text-center py-2 border-r border-gray-300 text-sm font-medium">
                    Could be true
                  </th>
                  <th className="w-20 text-center py-2 border-r border-gray-300 text-sm font-medium">
                    Could not be true
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

export default MultiSourcePreview;