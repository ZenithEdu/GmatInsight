import { useState } from "react";
import { FileText, Eye, ChevronLeft, ChevronRight, BookOpen, Trash2, Plus, X } from "lucide-react";
import VerbalUploadPage from "../uploadInterface/VerbalUploadPage";

const VerbalReasoningStructure = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentView, setCurrentView] = useState("upload");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [layouts, setLayouts] = useState({});

  const sampleData = [
    {
      id: 1,
      passage:
        'A major focus of modern evolutionary ecology is the study of coevolution: investigating interactions between organisms in nature and analyzing how interacting pairs of organisms influence one another as they evolve. One of the most remarkable coevolutionary interactions is between various species of Heliconius butterflies and various species of Passiflora vines. Heliconius butterflies lay their eggs only on Passiflora vines and select only the newest, most tender shoots for the newly hatched Heliconius caterpillars to feed on. The effect of this parasitism is that caterpillars, either by defoliating a juvenile vine or devouring new shoots on a mature vine, prevent the vine from reproducing. In response, Passiflora vines have developed defenses against Heliconius butterflies.\n\nOne of the factors Heliconius butterflies take into account when deciding where to lay eggs is the shape of the leaves of the potential host plant. However, the leaves of some Passiflora species have gradually come to resemble the leaves of several nonhost plants closely, and from seedling to maturity, the shape of Passiflora leaves undergoes dramatic changes. A butterfly\'s ability to recognize the shape of Passiflora leaves reduces the reproductive potential of the plant, and scientists have hypothesized that varying their leaf shapes is a mechanism that has evolved in Passiflora vines under the pressure of Heliconius parasitism. This has not been an entirely successful strategy for the plants, however, since Heliconius butterflies have developed the ability to recognize other Passiflora characteristics, including leaf chemistry, in locating Passiflora vines, and variations in leaf shape have not been sufficient to deter the butterflies from laying eggs.\n\nBecause the caterpillars of some Heliconius species eat the eggs of other Heliconius species, the presence of an egg on a leaf can cause a female to reject a plant as a potential egg-laying site. Recent field studies have discovered further evidence of a possible coevolutionary relationship: some species of Passiflora vines have developed yellow spots identical in color and shape to Heliconius eggs. Subsequent studies of "egg-mimicry" reveal that it has been found in only some two percent of the 500 known Passiflora species, indicating that it probably evolved relatively recently, but where it does occur, it has been a successful deterrent to Heliconius egg-laying.',
      question:
        "Passiflora leaf chemistry is mentioned in the passage as a characteristic that",
      options: [
        "deters Heliconius butterflies from laying eggs on Passiflora vines",
        "developed relatively recently as a result of coevolution",
        "represents a successful adaptive strategy on the part of Passiflora vines",
        "is likely to change over time in response to changes in habitat",
        "helps Heliconius butterflies locate Passiflora vines",
      ],
      correctAnswer: 4,
    },
    {
      id: 2,
      passage:
        'A major focus of modern evolutionary ecology is the study of coevolution: investigating interactions between organisms in nature and analyzing how interacting pairs of organisms influence one another as they evolve. One of the most remarkable coevolutionary interactions is between various species of Heliconius butterflies and various species of Passiflora vines. Heliconius butterflies lay their eggs only on Passiflora vines and select only the newest, most tender shoots for the newly hatched Heliconius caterpillars to feed on. The effect of this parasitism is that caterpillars, either by defoliating a juvenile vine or devouring new shoots on a mature vine, prevent the vine from reproducing. In response, Passiflora vines have developed defenses against Heliconius butterflies.\n\nOne of the factors Heliconius butterflies take into account when deciding where to lay eggs is the shape of the leaves of the potential host plant. However, the leaves of some Passiflora species have gradually come to resemble the leaves of several nonhost plants closely, and from seedling to maturity, the shape of Passiflora leaves undergoes dramatic changes. A butterfly\'s ability to recognize the shape of Passiflora leaves reduces the reproductive potential of the plant, and scientists have hypothesized that varying their leaf shapes is a mechanism that has evolved in Passiflora vines under the pressure of Heliconius parasitism. This has not been an entirely successful strategy for the plants, however, since Heliconius butterflies have developed the ability to recognize other Passiflora characteristics, including leaf chemistry, in locating Passiflora vines, and variations in leaf shape have not been sufficient to deter the butterflies from laying eggs.\n\nBecause the caterpillars of some Heliconius species eat the eggs of other Heliconius species, the presence of an egg on a leaf can cause a female to reject a plant as a potential egg-laying site. Recent field studies have discovered further evidence of a possible coevolutionary relationship: some species of Passiflora vines have developed yellow spots identical in color and shape to Heliconius eggs. Subsequent studies of "egg-mimicry" reveal that it has been found in only some two percent of the 500 known Passiflora species, indicating that it probably evolved relatively recently, but where it does occur, it has been a successful deterrent to Heliconius egg-laying.',
      question:
        "With which of the following statements about the coevolutionary relationship between Passiflora vines and Heliconius butterflies would the author of the passage be most likely to agree?",
      options: [
        "It will eventually result in a decrease in the number of Passiflora species.",
        "It has ensured that Passiflora species will survive longer than Heliconius species.",
        "It will probably end because the development of egg-mimicry by Passiflora vines will force Heliconius butterflies to find other host plants.",
        "It has been more thoroughly studied than any other coevolutionary relationship in nature.",
        "It is a dynamic, continuing process that may produce further variations in the plants and butterflies.",
      ],
      correctAnswer: 4,
    },
  ];

  const handleFileUpload = (processedQuestions) => {
    setQuestions(processedQuestions);
    setLayouts(processedQuestions.reduce((acc, q) => ({ ...acc, [q.id]: q.layout || "single" }), {}));
    setCurrentView("edit");
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleLoadSampleData = () => {
    setQuestions(sampleData);
    setLayouts(sampleData.reduce((acc, q) => ({ ...acc, [q.id]: "single" }), {}));
    setCurrentView("edit");
    setSelectedAnswers({});
  };

  const handleCreate = () => {
    setQuestions([]);
    setLayouts({});
    setCurrentView("edit");
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    const newOptions = [...updatedQuestions[questionIndex].options];
    newOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options: newOptions };
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length < 6) {
      updatedQuestions[questionIndex].options.push(
        `Option ${updatedQuestions[questionIndex].options.length + 1}`
      );
      setQuestions(updatedQuestions);
    }
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      if (updatedQuestions[questionIndex].correctAnswer >= optionIndex) {
        updatedQuestions[questionIndex].correctAnswer = Math.max(
          0,
          updatedQuestions[questionIndex].correctAnswer - 1
        );
      }
      setQuestions(updatedQuestions);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1,
      passage: "",
      question: "",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
    setLayouts({ ...layouts, [newQuestion.id]: "single" });
    setCurrentQuestionIndex(questions.length);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      const updatedLayouts = { ...layouts };
      delete updatedLayouts[questions[index].id];
      setQuestions(updatedQuestions);
      setLayouts(updatedLayouts);
      if (currentQuestionIndex >= updatedQuestions.length) {
        setCurrentQuestionIndex(Math.max(0, updatedQuestions.length - 1));
      }
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const setQuestionLayout = (questionId, layout) => {
    setLayouts((prev) => ({ ...prev, [questionId]: layout }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentView === "upload") {
    return (
      <VerbalUploadPage
        onFileUpload={handleFileUpload}
        onCreate={handleCreate}
      />
    );
  }

  if (currentView === "preview") {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Question Preview</h2>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <button
              onClick={() => setCurrentView("edit")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
            >
              <span>Back to Edit</span>
            </button>
          </div>
        </div>

        {currentQuestion && (
          <div className="space-y-6">
            {layouts[currentQuestion.id] === "double" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {currentQuestion.passage}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">{currentQuestion.question}</h3>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedAnswers[currentQuestion.id] === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={selectedAnswers[currentQuestion.id] === index}
                          onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                          className="mt-1"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAnswers[currentQuestion.id] !== undefined &&
                    selectedAnswers[currentQuestion.id] !== currentQuestion.correctAnswer && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Incorrect Answer</h4>
                        <p className="text-red-700 text-sm">
                          The correct answer is option {currentQuestion.correctAnswer + 1}.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="prose max-w-none">
                    <p className="text-md leading-relaxed whitespace-pre-line">
                      {currentQuestion.passage}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm text-gray-900">{currentQuestion.question}</h3>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-start space-x-3 cursor-pointer transition-colors ${
                          selectedAnswers[currentQuestion.id] === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          value={index}
                          checked={selectedAnswers[currentQuestion.id] === index}
                          onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                          className="mt-1"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAnswers[currentQuestion.id] !== undefined &&
                    selectedAnswers[currentQuestion.id] !== currentQuestion.correctAnswer && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">Incorrect Answer</h4>
                        <p className="text-red-700 text-sm">
                          The correct answer is option {currentQuestion.correctAnswer + 1}.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded cursor-pointer ${
                  currentQuestionIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1} / {questions.length}
              </span>

              <button
                onClick={() =>
                  setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
                }
                disabled={currentQuestionIndex === questions.length - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded cursor-pointer ${
                  currentQuestionIndex === questions.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Edit view
  return (
    <>
      <div className="sticky top-0 z-10 bg-blue-50 border-b border-blue-200 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-blue-800">GMAT Verbal Question Editor</h3>
            <p className="text-blue-700 text-sm">
              Edit your questions and preview them. {questions.length} question(s) loaded.
            </p>
          </div>
          <button
            onClick={() => setCurrentView("upload")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
          >
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {questions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Questions Loaded</h3>
            <p className="text-gray-600 mb-4">
              Create a new question, load sample data, or upload an Excel file to get started.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={addQuestion}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Question</span>
              </button>
              <button
                onClick={handleLoadSampleData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Load Sample Data</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h4 className="text-lg font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className={`p-2 rounded cursor-pointer ${
                      currentQuestionIndex === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
                    }
                    disabled={currentQuestionIndex === questions.length - 1}
                    className={`p-2 rounded cursor-pointer ${
                      currentQuestionIndex === questions.length - 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={addQuestion}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
                <button
                  onClick={() => removeQuestion(currentQuestionIndex)}
                  disabled={questions.length <= 1}
                  className={`px-4 py-2 rounded text-sm flex items-center space-x-2 ${
                    questions.length <= 1
                      ? "bg-gray-400 cursor-not-allowed text-gray-600"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Question</span>
                </button>
              </div>
            </div>

            {currentQuestion && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passage</label>
                      <textarea
                        value={currentQuestion.passage}
                        onChange={(e) => updateQuestion(currentQuestionIndex, "passage", e.target.value)}
                        rows={12}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Enter the reading comprehension passage here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                      <textarea
                        value={currentQuestion.question}
                        onChange={(e) => updateQuestion(currentQuestionIndex, "question", e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Enter the question here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                      <select
                        value={layouts[currentQuestion.id] || "single"}
                        onChange={(e) => setQuestionLayout(currentQuestion.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                      >
                        <option value="single">Single Column</option>
                        <option value="double">Double Column</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Answer Options</h4>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`correct-${currentQuestionIndex}`}
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() => updateQuestion(currentQuestionIndex, "correctAnswer", index)}
                              className="mt-1"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(currentQuestionIndex, index, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-300"
                              placeholder={`Option ${index + 1}`}
                            />
                            <button
                              onClick={() => removeOption(currentQuestionIndex, index)}
                              disabled={currentQuestion.options.length <= 2}
                              className={`p-1 cursor-pointer ${
                                currentQuestion.options.length <= 2
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-500 hover:text-red-700"
                              }`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => addOption(currentQuestionIndex)}
                        disabled={currentQuestion.options.length >= 6}
                        className={`w-full mt-3 text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors ${
                          currentQuestion.options.length >= 6 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </button>

                      <p className="text-xs text-gray-500 mt-2">
                        Select the radio button next to the correct answer option.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentView("preview")}
                    disabled={questions.length === 0}
                    className={`px-4 py-2 rounded text-sm flex items-center space-x-2 ${
                      questions.length === 0
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Questions</span>
                  </button>
                  <button
                    onClick={handleLoadSampleData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Load Sample Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VerbalReasoningStructure;