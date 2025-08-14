import React, { useState, useEffect } from "react";
import {  Play, Download } from "lucide-react";

const DataSufficiencyStructure = () => {
  const [questionData, setQuestionData] = useState({
    contextText: "",
    statement1: "",
    statement2: "",
    correctAnswer: null,
  });

  const [currentView, setCurrentView] = useState("input");
  const [error, setError] = useState("");
  const answerChoices = [
    "Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.",
    "Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.",
    "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
    "EACH statement ALONE is sufficient.",
    "Statements (1) and (2) TOGETHER are NOT sufficient.",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleData = {
    contextText:
      "Last week a certain comedian had an audience of 120 people for each of the afternoon performances and 195 people for each of the evening performances. What was the average (arithmetic mean) number of people in an audience if the comedian gave only afternoon and evening performances last week?",
    statement1:
      "Last week the comedian gave 3 more evening performances than afternoon performances.",
    statement2:
      "Last week the comedian gave twice as many evening performances as afternoon performances.",
    correctAnswer: 0,
  };

  const loadSampleData = () => {
    setQuestionData(sampleData);
    setError("");
  };

  const handleInputChange = (field, value) => {
    setQuestionData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setCorrectAnswer = (index) => {
    setQuestionData((prev) => ({
      ...prev,
      correctAnswer: index,
    }));
  };

  const exportQuestion = () => {
    const questionJson = JSON.stringify(questionData, null, 2);
    const blob = new Blob([questionJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_sufficiency_question.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (currentView === "preview") {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white">
        <div className="space-y-6">
          {questionData.contextText && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {questionData.contextText}
            </p>
          )}

          <div className="space-y-3">
            <p className="font-medium">(1) {questionData.statement1}</p>
            <p className="font-medium">(2) {questionData.statement2}</p>
          </div>

          <div className="space-y-3">
            {answerChoices.map((choice, index) => (
              <div key={index} className="flex items-start">
                <input
                  type="radio"
                  name="answer-preview"
                  checked={questionData.correctAnswer === index}
                  readOnly
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-700">{choice}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
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
            Data Sufficiency Question Generator
          </h3>
          <p className="text-green-700 text-sm">
            Create GMAT data sufficiency questions with statements and answer
            choices.
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={loadSampleData}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Load Sample Question
          </button>
          <button
            onClick={exportQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Export Question
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {error && (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Question Configuration
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Context
            </label>
            <textarea
              value={questionData.contextText}
              onChange={(e) => handleInputChange("contextText", e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
              placeholder="Enter the main question text..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statement (1)
              </label>
              <input
                type="text"
                value={questionData.statement1}
                onChange={(e) =>
                  handleInputChange("statement1", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Enter first statement..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statement (2)
              </label>
              <input
                type="text"
                value={questionData.statement2}
                onChange={(e) =>
                  handleInputChange("statement2", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300"
                placeholder="Enter second statement..."
              />
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">
              Answer Choices
            </h3>
            <p className="text-purple-700 text-sm">
              Select the correct answer choice
            </p>
          </div>

          <div className="space-y-3">
            {answerChoices.map((choice, index) => (
              <div key={index} className="flex items-start">
                <input
                  type="radio"
                  name="answer-choices"
                  checked={questionData.correctAnswer === index}
                  onChange={() => setCorrectAnswer(index)}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-700">{choice}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => setCurrentView("preview")}
            disabled={
              !questionData.contextText.trim() ||
              !questionData.statement1.trim() ||
              !questionData.statement2.trim() ||
              questionData.correctAnswer === null
            }
            className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
              !questionData.contextText.trim() ||
              !questionData.statement1.trim() ||
              !questionData.statement2.trim() ||
              questionData.correctAnswer === null
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Preview Question</span>
          </button>
        </div>

        {(!questionData.contextText.trim() ||
          !questionData.statement1.trim() ||
          !questionData.statement2.trim() ||
          questionData.correctAnswer === null) && (
          <div className="text-center text-red-500 text-sm mt-2">
            {!questionData.contextText.trim()
              ? "Please add question context."
              : !questionData.statement1.trim()
              ? "Please add statement (1)."
              : !questionData.statement2.trim()
              ? "Please add statement (2)."
              : "Please select the correct answer choice."}
          </div>
        )}
      </div>
    </>
  );
};

export default DataSufficiencyStructure;
