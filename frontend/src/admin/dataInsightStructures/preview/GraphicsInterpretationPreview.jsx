import { Play } from "lucide-react";

const QuestionPreview = ({
  questionData,
  setCurrentView,
  setQuestionData,
  renderConclusionWithDropdowns,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white">
      <div className="space-y-6">
        {questionData.graphUrl && (
          <div className="flex justify-center">
            <img
              src={questionData.graphUrl}
              alt="Question Graph"
              className="w-full sm:w-3/4 md:w-1/2 lg:w-[45%] max-w-xl h-auto border border-gray-300 rounded shadow-sm"
            />
          </div>
        )}

        {questionData.graphDescription && (
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {questionData.graphDescription}
          </p>
        )}

        {questionData.instructionText && (
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {questionData.instructionText}
          </p>
        )}

        {questionData.conclusionTemplate && (
          <div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded flex items-center justify-center mx-auto"
          aria-label="Back to editor"
        >
          <Play className="w-4 h-4 mr-2" />
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default QuestionPreview;
