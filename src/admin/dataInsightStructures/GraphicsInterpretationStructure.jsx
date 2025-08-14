import { useState, useEffect } from "react";
import {
  BarChart,
  
  Plus,
  Trash2,
  Play,
  Download,
  Image,
  X,
} from "lucide-react";
import graphSample from "./graphSample.png";

const GraphicsInterpretationStructure = () => {
  const [questionData, setQuestionData] = useState({
    graphUrl: "",
    graphDescription: "",
    instructionText: "",
    conclusionTemplate: "",
    dropdowns: [],
  });
  const [currentView, setCurrentView] = useState("input");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleData = {
    graphUrl: graphSample,
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
  };

  const loadSampleData = () => {
    setQuestionData(sampleData);
    setImageUploaded(true);
    setError("");
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
      setQuestionData((prev) => ({
        ...prev,
        dropdowns: prev.dropdowns.filter((d) => d.id !== id),
      }));
    }
  };

  const updateDropdownOptions = (id, newOptions) => {
    setQuestionData((prev) => ({
      ...prev,
      dropdowns: prev.dropdowns.map((dropdown) =>
        dropdown.id === id
          ? {
              ...dropdown,
              options: newOptions.filter((opt) => opt.trim() !== ""),
              selectedValue: "",
            }
          : dropdown
      ),
    }));
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
        setQuestionData((prev) => ({
          ...prev,
          graphUrl: event.target.result,
        }));
        setImageUploaded(true);
        setError("");
      };
      reader.onerror = () => {
        setError("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
  };

  const exportQuestion = () => {
    const questionJson = JSON.stringify(questionData, null, 2);
    const blob = new Blob([questionJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gmat_graph_question.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            className="mx-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-300 bg-white"
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

    if (remainingText) {
      parts.push(remainingText);
    }

    if (parts.length === 0) {
      return template;
    }

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

  if (currentView === "preview") {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <div className="space-y-6">
          {questionData.graphUrl && (
            <div className="flex justify-center">
              <img
                src={questionData.graphUrl}
                alt="Question Graph"
                className="max-w-2xl max-h-96 h-auto border border-gray-300 rounded shadow-sm"
              />
            </div>
          )}

          {questionData.graphDescription && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {questionData.graphDescription}
            </p>
          )}

          {questionData.instructionText && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {questionData.instructionText}
            </p>
          )}

          {questionData.conclusionTemplate && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-800">
                {renderConclusionWithDropdowns(
                  questionData.conclusionTemplate,
                  questionData.dropdowns,
                  true
                )}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setCurrentView("input");
              setQuestionData((prev) => ({
                ...prev,
                dropdowns: prev.dropdowns.map((d) => ({
                  ...d,
                  selectedValue: "",
                })),
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
            GMAT Graph Question Generator
          </h3>
          <p className="text-green-700 text-sm">
            Create GMAT questions with graphs and dropdown answer choices.
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
                <BarChart className="w-5 h-5 mr-2" />
                Graph Configuration
              </h3>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Graph Image
                </label>
                {imageUploaded && (
                  <span className="text-green-600 text-sm flex items-center">
                    ✓ Image uploaded
                  </span>
                )}
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <label className="cursor-pointer">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload graph image (PNG, JPG, GIF)
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
              {questionData.graphUrl && (
                <div className="mt-4">
                  <img
                    src={questionData.graphUrl}
                    alt="Uploaded graph"
                    className="max-w-md max-h-64 h-auto border border-gray-300 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Graph Description
              </label>
              <textarea
                value={questionData.graphDescription}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    graphDescription: e.target.value,
                  }))
                }
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Describe what the graph shows (e.g., 'The graph shows the percent of each type of employee...')"
                aria-label="Graph description"
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
                placeholder="Instructions for the student (e.g., 'Based on the information provided, select an option...')"
                aria-label="Instruction text"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                Conclusion Template & Dropdowns
              </h3>
              <p className="text-purple-700 text-sm">
                Create the conclusion sentence with dropdown placeholders
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conclusion Template
              </label>
              <textarea
                value={questionData.conclusionTemplate}
                onChange={(e) =>
                  setQuestionData((prev) => ({
                    ...prev,
                    conclusionTemplate: e.target.value,
                  }))
                }
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300"
                placeholder="Write your conclusion with {dropdown1}, {dropdown2}, etc. placeholders"
                aria-label="Conclusion template"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use placeholders like {"{dropdown1}"}, {"{dropdown2}"} where you
                want dropdowns to appear
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">Configure Dropdowns</h4>
              {questionData.dropdowns.map((dropdown) => (
                <div
                  key={dropdown.id}
                  className="border border-gray-300 rounded-lg p-3 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Placeholder Name
                        </label>
                        <input
                          type="text"
                          value={dropdown.placeholder}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
                              ...prev,
                              dropdowns: prev.dropdowns.map((d) =>
                                d.id === dropdown.id
                                  ? { ...d, placeholder: e.target.value }
                                  : d
                              ),
                            }))
                          }
                          className="w-full p-2 border border-gray-200 rounded text-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-200"
                          placeholder={`dropdown${dropdown.id}`}
                          aria-label={`Placeholder name for dropdown ${dropdown.id}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Options
                        </label>
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
                              className="flex-1 p-2 border border-gray-200 rounded text-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-200"
                              placeholder={`Option ${index + 1}`}
                              aria-label={`Option ${index + 1} for dropdown ${
                                dropdown.id
                              }`}
                            />
                            <button
                              onClick={() => removeOption(dropdown.id, index)}
                              disabled={dropdown.options.length <= 1}
                              className={`p-1 ${
                                dropdown.options.length <= 1
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-500 hover:text-red-700"
                              }`}
                              aria-label={`Remove option ${
                                index + 1
                              } from dropdown ${dropdown.id}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(dropdown.id)}
                          disabled={dropdown.options.length >= 10}
                          className={`w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors ${
                            dropdown.options.length >= 10
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label={`Add new option to dropdown ${dropdown.id}`}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Option
                        </button>
                        {dropdown.options.length === 0 && (
                          <p className="text-red-500 text-xs mt-1">
                            At least one option is required.
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Correct Answer (Preview)
                        </label>
                        <select
                          value={dropdown.selectedValue}
                          onChange={(e) =>
                            setDropdownAnswer(dropdown.id, e.target.value)
                          }
                          className="w-full p-2 border border-gray-200 rounded text-sm focus:border-purple-300 focus:ring-1 focus:ring-purple-200"
                          aria-label={`Correct answer for dropdown ${dropdown.id}`}
                        >
                          <option value="">Select correct answer...</option>
                          {dropdown.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDropdown(dropdown.id)}
                      disabled={questionData.dropdowns.length <= 1}
                      className={`p-1 ${
                        questionData.dropdowns.length <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-500 hover:text-red-700"
                      }`}
                      aria-label={`Remove dropdown ${dropdown.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addDropdown}
              className="w-full text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors"
              aria-label="Add new dropdown"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Dropdown
            </button>
          </div>
        </div>

        {questionData.conclusionTemplate && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">
              Template Preview:
            </h4>
            <p className="text-sm text-gray-700">
              {renderConclusionWithDropdowns(
                questionData.conclusionTemplate,
                questionData.dropdowns,
                false
              )}
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4 pt-4">
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
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              !questionData.graphUrl ||
              !questionData.conclusionTemplate.trim() ||
              questionData.dropdowns.length === 0 ||
              questionData.dropdowns.some(
                (dropdown) => dropdown.options.length === 0
              )
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            aria-label="Preview question"
          >
            <Play className="w-4 h-4" />
            <span>Preview Question</span>
          </button>
        </div>

        {(!questionData.graphUrl ||
          !questionData.conclusionTemplate.trim() ||
          questionData.dropdowns.length === 0 ||
          questionData.dropdowns.some(
            (dropdown) => dropdown.options.length === 0
          )) && (
          <div className="text-center text-red-500 text-sm mt-2">
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
    </>
  );
};

export default GraphicsInterpretationStructure;
