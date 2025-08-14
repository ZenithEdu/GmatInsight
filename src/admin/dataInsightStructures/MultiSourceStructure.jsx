import { useState, useEffect } from "react";
import {  Plus, Trash2, Play, Download, Database } from "lucide-react";

const MultiSourceStructure = () => {
  const [currentView, setCurrentView] = useState("input");
  const [activeTab, setActiveTab] = useState(0);
  
  const [dataSources, setDataSources] = useState([
    {
      id: 1,
      title: "Customer Identifiers",
      type: "table",
      instructions: `To comply with laws regarding the use of personally identifiable information, a certain company must adopt a new way of determining its customer identification numbers (CIDs) in its customer records database. Proposals are being considered on the basis of the following principles:

{table}

• Error Checking: There must be some mechanism for determining if a CID could be valid without checking the database.
• Meaningful: Each CID must reflect some information about the customer to which it is assigned.
Whichever proposal is adopted, the new CIDs will be issued to all former customers currently in the database.`,
      tableTitle: "Allowable Alphanumeric Characters",
      tableFooterTitle: "Allowable Alphanumeric Characters",
      headers: ["", "", "", "", "", ""],
      rows: [
        ["a", "b", "c", "d", "e", "f"],
        ["g", "h", "i", "j", "k", "l"],
        ["m", "n", "o", "p", "q", "r"],
        ["s", "t", "u", "v", "w", "x"],
        ["y", "z", "0", "1", "2", "3"],
        ["4", "5", "6", "7", "8", "9"]
      ],
      isActive: true,
      image: null,
      imageTitle: ""
    },
    {
      id: 2,
      title: "Proposal 1",
      type: "image",
      instructions: "This proposal satisfies database constraints and produces meaningful CIDs by using the first three allowable alphanumeric characters from the customer's email address followed by a portion of the timestamp of her first purchase.",
      image: null,
      imageTitle: ""
    },
    {
      id: 3,
      title: "Proposal 2", 
      type: "table",
      instructions: `This proposal is an extension of Proposal 1. Under this proposal, a customer's CID will consist of three parts:

{table}

1) Four randomly generated digits, 2) The CID generated as in Proposal 1 after being transformed per the Character Transformation Table, 3) A single check digit equal to the units digit of the sum of all numeric characters in the first two parts.`,
      tableTitle: "Character Transformation Table",
      tableFooterTitle: "Character Transformation Table",
      headers: [],
      rows: [
        ["0151", "ra9094237", "se9094237", "1", "0151se90942371"],
        ["1039", "str012916", "str012916", "6", "1039str0129166"]
      ],
      isActive: false,
      image: null,
      imageTitle: "Proposal 2 Image"
    }
  ]);

  const [statements, setStatements] = useState([
    { id: 1, text: "", answer: null },
  ]);

  const [statementsInstructions, setStatementsInstructions] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadSampleData = () => {
    const sampleSources = [
      {
        id: 1,
        title: "Customer Identifiers",
        type: "table",
        instructions: `To comply with laws regarding the use of personally identifiable information, a certain company must adopt a new way of determining its customer identification numbers (CIDs) in its customer records database. Proposals are being considered on the basis of the following principles:

{table}

• Error Checking: There must be some mechanism for determining if a CID could be valid without checking the database.
• Meaningful: Each CID must reflect some information about the customer to which it is assigned.
Whichever proposal is adopted, the new CIDs will be issued to all former customers currently in the database.`,
        tableTitle: "Allowable Alphanumeric Characters",
        tableFooterTitle: "Allowable Alphanumeric Characters",
        headers: [],
        rows: [
          ["a", "b", "c", "d", "e", "f"],
          ["g", "h", "i", "j", "k", "l"],
          ["m", "n", "o", "p", "q", "r"],
          ["s", "t", "u", "v", "w", "x"],
          ["y", "z", "0", "1", "2", "3"],
          ["4", "5", "6", "7", "8", "9"]
        ],
        isActive: true,
        image: null,
        imageTitle: ""
      },
      {
        id: 2,
        title: "Proposal 1",
        type: "image",
        instructions: "This proposal satisfies database constraints and produces meaningful CIDs by using the first three allowable alphanumeric characters from the customer's email address followed by a portion of the timestamp of her first purchase.",
        image: "https://via.placeholder.com/300x200?text=Proposal+1+Image",
        imageTitle: ""
      },
      {
        id: 3,
        title: "Proposal 2",
        type: "table", 
        instructions: `This proposal is an extension of Proposal 1. Under this proposal, a customer's CID will consist of three parts:

{table}

1) Four randomly generated digits, 2) The CID generated as in Proposal 1 after being transformed per the Character Transformation Table, 3) A single check digit equal to the units digit of the sum of all numeric characters in the first two parts.`,
        tableTitle: "Character Transformation Table",
        tableFooterTitle: "Character Transformation Table",
        headers: [],
        rows: [
          ["0151", "ra9094237", "se9094237", "1", "0151se90942371"],
          ["1039", "str012916", "str012916", "6", "1039str0129166"]
        ],
        isActive: false,
        image: "https://via.placeholder.com/300x200?text=Proposal+2+Image",
        imageTitle: "Proposal 2 Image"
      }
    ];

    setDataSources(sampleSources);
    
    const sampleStatements = [
      "Suppose that Proposal 2 has been adopted and that a customer has been issued a CID of 1039str0129016. The customer's email was str@example.com.",
      "The customer began shopping at 10:39 in the evening on the day before the first purchase.", 
      "The customer's first purchase was made 16 seconds after 1:29:00 in the morning."
    ];

    setStatements(
      sampleStatements.map((text, index) => ({
        id: index + 1,
        text,
        answer: null,
      }))
    );

    setStatementsInstructions("For each of the following statements about this customer, select Could be true if, in light of the given information, the statement could be true. Otherwise, select Could not be true.");
  };

  const addDataSource = () => {
    const newId = Math.max(...dataSources.map(s => s.id)) + 1;
    setDataSources([
      ...dataSources,
      {
        id: newId,
        title: `Source ${newId}`,
        type: "instructions",
        content: "",
        isActive: false,
        image: null,
        imageTitle: "",
        tableFooterTitle: ""
      }
    ]);
  };

  const removeDataSource = (id) => {
    if (dataSources.length > 1) {
      const newSources = dataSources.filter(source => source.id !== id);
      setDataSources(newSources);
      if (activeTab >= newSources.length) {
        setActiveTab(Math.max(0, newSources.length - 1));
      }
    }
  };

  const updateDataSource = (id, updates) => {
    setDataSources(dataSources.map(source => 
      source.id === id ? { ...source, ...updates } : source
    ));
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

  const addTableRow = (sourceId) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      const newRow = new Array(source.headers.length || source.rows[0]?.length || 0).fill("");
      updateDataSource(sourceId, {
        rows: [...source.rows, newRow]
      });
    }
  };

  const removeTableRow = (sourceId, rowIndex) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table' && source.rows.length > 1) {
      const newRows = [...source.rows];
      newRows.splice(rowIndex, 1);
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const updateTableCell = (sourceId, rowIndex, colIndex, value) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      const newRows = [...source.rows];
      newRows[rowIndex][colIndex] = value;
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const addTableColumn = (sourceId) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table') {
      updateDataSource(sourceId, {
        rows: source.rows.map(row => [...row, ""])
      });
    }
  };

  const removeTableColumn = (sourceId, colIndex) => {
    const source = dataSources.find(s => s.id === sourceId);
    if (source && source.type === 'table' && source.rows[0].length > 1) {
      const newRows = source.rows.map(row => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });
      updateDataSource(sourceId, { rows: newRows });
    }
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateDataSource(id, { image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  const exportToCSV = () => {
    const allTablesData = dataSources.filter(source => source.type === 'table');
    if (allTablesData.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    
    allTablesData.forEach((source, index) => {
      csvContent += `\n=== ${source.title} ===\n`;
      csvContent += source.rows.map(row => row.join(",")).join("\r\n");
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "multi_source_gmat_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const currentSource = dataSources[activeTab];

  if (currentView === "preview") {
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
      <div className="sticky top-0 z-10 bg-green-50 border-b border-green-200 p-4 flex justify-between items-center shadow-sm">
        <div>
          <h3 className="font-semibold text-green-800">
            Multi-Source GMAT Analyzer
          </h3>
          <p className="text-green-700 text-sm">
            Create multi-source data analysis with tabbed interface and verification statements.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Load Sample Multi-Source Question
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Export All Data
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Multi-Source Data Configuration
              </h3>
              <p className="text-purple-700 text-sm">
                Create multiple data sources with different content types (instructions, tables, images)
              </p>
            </div>

            <div className="border-b border-gray-300">
              <div className="flex flex-wrap -mb-px">
                {dataSources.map((source, index) => (
                  <button
                    key={source.id}
                    onClick={() => setActiveTab(index)}
                    className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium mr-2 mb-1 ${
                      activeTab === index
                        ? 'border-purple-500 text-purple-600 bg-purple-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{source.title}</span>
                    {dataSources.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDataSource(source.id);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      >
                        ×
                      </button>
                    )}
                  </button>
                ))}
                <button
                  onClick={addDataSource}
                  className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Source
                </button>
              </div>
            </div>

            {currentSource && (
              <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source Title
                    </label>
                    <input
                      type="text"
                      value={currentSource.title}
                      onChange={(e) => updateDataSource(currentSource.id, { title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                      placeholder="Enter source title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content Type
                    </label>
                    <select
                      value={currentSource.type}
                      onChange={(e) => updateDataSource(currentSource.id, { 
                        type: e.target.value,
                        ...(e.target.value === 'table' ? { headers: [], rows: [], tableTitle: "", tableFooterTitle: "" } : {}),
                        ...(e.target.value === 'instructions' ? { content: "" } : {}),
                        ...(e.target.value === 'image' ? { instructions: "", image: null, imageTitle: e.target.value === 'image' && currentSource.title === "Proposal 1" ? "" : currentSource.imageTitle } : {})
                      })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                    >
                      <option value="instructions">Instructions/Text</option>
                      <option value="table">Data Table</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                </div>

                {(currentSource.type === 'instructions' || currentSource.type === 'image' || currentSource.type === 'table') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={currentSource.instructions || ''}
                      onChange={(e) => updateDataSource(currentSource.id, { instructions: e.target.value })}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                      placeholder={currentSource.type === 'table' ? "Describe what this table represents (use {table} to indicate table position)..." : "Enter description or instructions..."}
                    />
                  </div>
                )}

                {(currentSource.type === 'image' || currentSource.type === 'table') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={currentSource.title === "Proposal 1" ? "" : currentSource.imageTitle || ''}
                      onChange={(e) => updateDataSource(currentSource.id, { imageTitle: currentSource.title === "Proposal 1" ? "" : e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                      placeholder="Enter image title..."
                      disabled={currentSource.title === "Proposal 1"}
                    />
                  </div>
                )}

                {(currentSource.type === 'image' || currentSource.type === 'table') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(currentSource.id, e)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                    />
                    {currentSource.image && (
                      <div className="mt-2">
                        <img src={currentSource.image} alt="Preview" className="max-w-full max-h-32 object-contain" />
                      </div>
                    )}
                  </div>
                )}

                {currentSource.type === 'table' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Table Title
                      </label>
                      <input
                        type="text"
                        value={currentSource.tableTitle || ''}
                        onChange={(e) => updateDataSource(currentSource.id, { tableTitle: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter table title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Table Footer Title
                      </label>
                      <input
                        type="text"
                        value={currentSource.tableFooterTitle || ''}
                        onChange={(e) => updateDataSource(currentSource.id, { tableFooterTitle: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter table footer title..."
                      />
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg overflow-x-auto bg-white">
                      <div className="flex min-w-[600px]">
                        <div className="w-8 h-8 bg-gray-100 border-r border-b border-gray-300 flex items-center justify-center text-xs font-medium text-gray-500"></div>
                        {currentSource.rows[0]?.map((_, index) => (
                          <div
                            key={index}
                            className="min-w-24 h-8 bg-gray-100 border-r border-b border-gray-300 flex items-center justify-between text-xs font-medium text-gray-500"
                          >
                            <span className="px-1">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {currentSource.rows[0].length > 1 && (
                              <button
                                onClick={() => removeTableColumn(currentSource.id, index)}
                                className="text-red-500 hover:text-red-700 text-xs pr-1"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <div className="w-8 h-8 bg-gray-100 border-b border-gray-300 flex items-center justify-center">
                          <button
                            onClick={() => addTableColumn(currentSource.id)}
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {currentSource.rows?.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex min-w-[600px]">
                          <div className="w-8 h-8 bg-gray-50 border-r border-b border-gray-300 flex items-center justify-between text-xs font-medium text-gray-600">
                            <span>{rowIndex + 1}</span>
                            {currentSource.rows.length > 1 && (
                              <button
                                onClick={() => removeTableRow(currentSource.id, rowIndex)}
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
                                onChange={(e) => updateTableCell(currentSource.id, rowIndex, colIndex, e.target.value)}
                                className="w-full h-full px-2 text-xs border-none outline-none hover:bg-gray-50 focus:bg-yellow-50 focus:ring-1 focus:ring-purple-300"
                                placeholder=""
                              />
                            </div>
                          ))}
                        </div>
                      ))}

                      {currentSource.rows.length > 0 && (
                        <div className="flex min-w-[600px]">
                          <div className="w-8 h-8 bg-gray-50 border-r border-gray-300 flex items-center justify-center">
                            <button
                              onClick={() => addTableRow(currentSource.id)}
                              className="text-green-600 hover:text-green-800 text-xs"
                            >
                              +
                            </button>
                          </div>
                          {currentSource.rows[0]?.map((_, index) => (
                            <div
                              key={index}
                              className="min-w-24 h-8 border-r border-gray-300 bg-gray-25"
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex space-x-4 text-xs text-gray-600">
                      <span>💡 Click any cell to edit directly</span>
                      <span>• Use + buttons to add rows/columns</span>
                      <span>• Use × buttons to remove rows/columns</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">
                Verification Statements
              </h3>
              <p className="text-orange-700 text-sm">
                Add statements that users will verify as "Could be true" or "Could not be true"
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statements Instructions
              </label>
              <textarea
                value={statementsInstructions}
                onChange={(e) => setStatementsInstructions(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-300"
                placeholder="Provide instructions for the verification statements..."
              />
            </div>
            <div className="space-y-3">
              {statements.map((statement) => (
                <div
                  key={statement.id}
                  className="border border-gray-300 rounded-lg p-3 hover:border-orange-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={statement.text}
                        onChange={(e) => updateStatement(statement.id, e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-200 rounded text-sm focus:border-orange-300 focus:ring-1 focus:ring-orange-200"
                        placeholder={`Statement ${statement.id}...`}
                      />
                      <div className="mt-2 flex space-x-4">
                        <label className="flex items-center space-x-1">
                          <input
                            type="radio"
                            name={`input-statement-${statement.id}`}
                            checked={statement.answer === "yes"}
                            onChange={() => setAnswer(statement.id, "yes")}
                            className="w-4 h-4 cursor-pointer focus:ring-orange-300"
                          />
                          <span className="text-sm">Could be true</span>
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="radio"
                            name={`input-statement-${statement.id}`}
                            checked={statement.answer === "no"}
                            onChange={() => setAnswer(statement.id, "no")}
                            className="w-4 h-4 cursor-pointer focus:ring-orange-300"
                          />
                          <span className="text-sm">Could not be true</span>
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

        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setCurrentView("preview")}
            disabled={
              dataSources.length === 0 ||
              !dataSources.some(s => 
                (s.type === 'instructions' && s.content) ||
                (s.type === 'table' && s.rows?.length > 0) ||
                (s.type === 'image' && (s.image || s.instructions))
              ) ||
              !statements.some((s) => s.text)
            }
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              dataSources.length === 0 ||
              !dataSources.some(s => 
                (s.type === 'instructions' && s.content) ||
                (s.type === 'table' && s.rows?.length > 0) ||
                (s.type === 'image' && (s.image || s.instructions))
              ) ||
              !statements.some((s) => s.text)
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Preview Multi-Source Analysis</span>
          </button>
        </div>

        {(dataSources.length === 0 ||
          !dataSources.some(s => 
            (s.type === 'instructions' && s.content) ||
            (s.type === 'table' && s.rows?.length > 0) ||
            (s.type === 'image' && (s.image || s.instructions))
          ) ||
          !statements.some((s) => s.text)) && (
          <div className="text-center text-red-500 text-sm mt-2">
            {dataSources.length === 0
              ? "Please add at least one data source."
              : !dataSources.some(s => 
                  (s.type === 'instructions' && s.content) ||
                  (s.type === 'table' && s.rows?.length > 0) ||
                  (s.type === 'image' && (s.image || s.instructions))
                )
              ? "Please add content to at least one data source."
              : "Please add at least one statement with text."}
          </div>
        )}
      </div>
    </>
  );
};

export default MultiSourceStructure;