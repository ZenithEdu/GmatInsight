import React from "react";

const DataSufficiencyPreview = ({ questionData, answerChoices, setCurrentView }) => {
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
};

export default DataSufficiencyPreview;