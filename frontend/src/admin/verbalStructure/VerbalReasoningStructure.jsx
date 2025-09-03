import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import VerbalUploadPage from "../uploadInterface/VerbalUploadPage";
import Snackbar from "../../components/Snackbar";

const VerbalReasoningStructure = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentView, setCurrentView] = useState("upload");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [layouts, setLayouts] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const API_URL = import.meta.env.VITE_API_URL;

  const defaultTypes = [
    "reading_comprehension",
    "critical_reasoning",
    "sentence_correction",
    "vocabulary",
    "para_completion",
  ];
  const defaultTopics = [
    "science_passage",
    "business_passage",
    "history_passage",
    "logic",
    "grammar",
  ];
  const defaultLevels = ["l1", "l2", "l3", "l4", "l5"];
  const defaultDifficulties = ["easy", "medium", "hard"];

  const [types, setTypes] = useState(defaultTypes);
  const [topics, setTopics] = useState(defaultTopics);
  const [levels, setLevels] = useState(defaultLevels);
  const [difficulties] = useState(defaultDifficulties);

  const addType = () => {
    const newType = prompt("Enter new type:");
    if (newType && !types.includes(newType)) setTypes([...types, newType]);
  };
  const addTopic = () => {
    const newTopic = prompt("Enter new topic:");
    if (newTopic && !topics.includes(newTopic))
      setTopics([...topics, newTopic]);
  };
  const addLevel = () => {
    const newLevel = prompt("Enter new level (l1-l5):");
    if (newLevel && !levels.includes(newLevel))
      setLevels([...levels, newLevel]);
  };

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

  useEffect(() => {
    // Reset state when navigating to upload view
    if (currentView === "upload") {
      setQuestions([]);
      setLayouts({});
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
    }
  }, [currentView]);

  const handleFileUpload = (processedQuestions) => {
    setQuestions(processedQuestions);
    setLayouts(
      processedQuestions.reduce(
        (acc, q) => ({
          ...acc,
          [q.id]:
            q.layout && (q.layout === "double" || q.layout === "single")
              ? q.layout
              : "single",
        }),
        {}
      )
    );
    setCurrentView("preview");
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setSnackbar({ open: true, message: "Questions added successfully!", type: "success" });
  };

  const handleLoadSampleData = () => {
    setQuestions(sampleData);
    setLayouts(
      sampleData.reduce(
        (acc, q) => ({
          ...acc,
          [q.id]:
            q.layout && (q.layout === "double" || q.layout === "single")
              ? q.layout
              : "single",
        }),
        {}
      )
    );
    setCurrentView("preview");
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
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
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: newOptions,
    };
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
      id:
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1,
      set_id: "",
      type: types[0] || "",
      topic: topics[0] || "",
      level: levels[0] || "",
      difficulty: difficulties[0] || "",
      passage: "",
      question: "",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      layout: "single",
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

  const uploadQuestionsToServer = async () => {
    setUploadError("");
    setUploadSuccess("");
    setSnackbar({ open: false, message: "", type: "success" });
    if (!questions || questions.length === 0) {
      setSnackbar({ open: true, message: "No questions to upload.", type: "error" });
      return;
    }
    // Validate required fields for each question
    const requiredFields = [
      "set_id",
      "type",
      "topic",
      "question",
      "passage",
      "options",
      "difficulty",
      "level",
      "layout",
    ];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      for (const field of requiredFields) {
        if (
          (field === "options" &&
            (!Array.isArray(q.options) || q.options.length < 2)) ||
          (field !== "options" &&
            (!q[field] || q[field].toString().trim() === ""))
        ) {
          setUploadError(
            `Question ${i + 1} is missing required field: ${field}`
          );
          return;
        }
      }
      // Also check correctAnswer index
      if (
        typeof q.correctAnswer !== "number" ||
        q.correctAnswer < 0 ||
        q.correctAnswer >= q.options.length
      ) {
        setUploadError(
          `Question ${i + 1} has an invalid correct answer index.`
        );
        return;
      }
    }
    setUploading(true);
    try {
      // Transform questions for backend schema (do NOT send questionId)
      const payload = questions.map((q, idx) => ({
        set_id: q.set_id || `SET_${idx + 1}`,
        type: q.type || "Reading Comprehension",
        topic: q.topic || "Reading Comprehension",
        question: q.question,
        passage: q.passage,
        options: q.options,
        answer: q.options[q.correctAnswer],
        difficulty: q.difficulty || "easy",
        level: q.level || "verbal",
        layout: q.layout || layouts[q.id] || "single",
        metadata: { createdAt: new Date() },
      }));
      const res = await fetch(`${API_URL}/verbalVault/VerbalVaultQuestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }
      setSnackbar({ open: true, message: "Questions uploaded to server successfully!", type: "success" });
      setTimeout(() => {
        setQuestions([]);
        setLayouts({});
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setCurrentView("upload");
        setSnackbar({ open: false, message: "", type: "success" });
      }, 2000);
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to upload questions: " + err.message, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  if (currentView === "upload") {
    return (
      <VerbalUploadPage
        onFileUpload={handleFileUpload}
        onCreate={handleCreate}
      />
    );
  }

  if (currentView === "preview") {
    const previewLayout =
      currentQuestion &&
      currentQuestion.layout &&
      (currentQuestion.layout === "double" ||
        currentQuestion.layout === "single")
        ? currentQuestion.layout
        : layouts[currentQuestion?.id] || "single";

    return (
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Question Preview
              </h2>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={uploadQuestionsToServer}
                disabled={uploading || questions.length === 0}
                className={`bg-green-600 hover:bg-green-700 text-white px-6 py-1.5 rounded text-lg font-semibold flex items-center justify-center ${
                  uploading || questions.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload Question(s)"
                )}
              </button>
              <button
                onClick={() => setCurrentView("edit")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm flex items-center space-x-2"
              >
                <span>Back to Edit</span>
              </button>
            </div>
          </div>
        </div>

        {currentQuestion && (
          <div className="space-y-6">
            {previewLayout === "double" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {currentQuestion.passage}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm text-gray-900">
                    {currentQuestion.question}
                  </h3>
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
                          checked={
                            selectedAnswers[currentQuestion.id] === index
                          }
                          onChange={() =>
                            handleAnswerSelect(currentQuestion.id, index)
                          }
                          className="mt-1"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAnswers[currentQuestion.id] !== undefined &&
                    selectedAnswers[currentQuestion.id] !==
                      currentQuestion.correctAnswer && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">
                          Incorrect Answer
                        </h4>
                        <p className="text-red-700 text-sm">
                          The correct answer is option{" "}
                          {currentQuestion.correctAnswer + 1}.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="prose max-w-none">
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {currentQuestion.passage}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm text-gray-900">
                    {currentQuestion.question}
                  </h3>
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
                          checked={
                            selectedAnswers[currentQuestion.id] === index
                          }
                          onChange={() =>
                            handleAnswerSelect(currentQuestion.id, index)
                          }
                          className="mt-1"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedAnswers[currentQuestion.id] !== undefined &&
                    selectedAnswers[currentQuestion.id] !==
                      currentQuestion.correctAnswer && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-800 mb-2">
                          Incorrect Answer
                        </h4>
                        <p className="text-red-700 text-sm">
                          The correct answer is option{" "}
                          {currentQuestion.correctAnswer + 1}.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() =>
                  setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
                }
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
                  setCurrentQuestionIndex(
                    Math.min(questions.length - 1, currentQuestionIndex + 1)
                  )
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
        <div className="flex justify-center mt-8 flex-col items-center space-y-4">
          <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          />
        </div>
      </div>
    );
  }

  // Edit view
  return (
    <>
      <div className="sticky top-0 z-10 bg-blue-50 border-b border-blue-200 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-blue-800">
              GMAT Verbal Question Editor
            </h3>
            <p className="text-blue-700 text-sm">
              Edit your questions and preview them. {questions.length}{" "}
              question(s) loaded.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {questions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No Questions Loaded
            </h3>
            <p className="text-gray-600 mb-4">
              Create a new question, load sample data, or upload an Excel file
              to get started.
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
                    onClick={() =>
                      setCurrentQuestionIndex(
                        Math.max(0, currentQuestionIndex - 1)
                      )
                    }
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
                      setCurrentQuestionIndex(
                        Math.min(questions.length - 1, currentQuestionIndex + 1)
                      )
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
                    {/* Set ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Set ID
                      </label>
                      <input
                        type="text"
                        value={currentQuestion.set_id || ""}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "set_id",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Enter set ID"
                      />
                    </div>
                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={currentQuestion.type || ""}
                          onChange={(e) =>
                            updateQuestion(
                              currentQuestionIndex,
                              "type",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        >
                          {types.map((type) => (
                            <option key={type} value={type}>
                              {type.replace("_", " ").toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={addType}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {/* Topic */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Topic
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={currentQuestion.topic || ""}
                          onChange={(e) =>
                            updateQuestion(
                              currentQuestionIndex,
                              "topic",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        >
                          {topics.map((topic) => (
                            <option key={topic} value={topic}>
                              {topic}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={addTopic}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {/* Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={currentQuestion.level || ""}
                          onChange={(e) =>
                            updateQuestion(
                              currentQuestionIndex,
                              "level",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        >
                          {levels.map((level) => (
                            <option key={level} value={level}>
                              {level.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={addLevel}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {/* Difficulty */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty
                      </label>
                      <select
                        value={currentQuestion.difficulty || ""}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "difficulty",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                      >
                        {difficulties.map((diff) => (
                          <option key={diff} value={diff}>
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Passage */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passage
                      </label>
                      <textarea
                        value={currentQuestion.passage}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "passage",
                            e.target.value
                          )
                        }
                        rows={12}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Enter the reading comprehension passage here..."
                      />
                    </div>
                    {/* Question */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <textarea
                        value={currentQuestion.question}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "question",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                        placeholder="Enter the question here..."
                      />
                    </div>
                    {/* Layout */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Layout
                      </label>
                      <select
                        value={layouts[currentQuestion.id] || "single"}
                        onChange={(e) =>
                          setQuestionLayout(currentQuestion.id, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 text-sm"
                      >
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Answer Options
                      </h4>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name={`correct-${currentQuestionIndex}`}
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() =>
                                updateQuestion(
                                  currentQuestionIndex,
                                  "correctAnswer",
                                  index
                                )
                              }
                              className="mt-1"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(
                                  currentQuestionIndex,
                                  index,
                                  e.target.value
                                )
                              }
                              className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-300"
                              placeholder={`Option ${index + 1}`}
                            />
                            <button
                              onClick={() =>
                                removeOption(currentQuestionIndex, index)
                              }
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
                          currentQuestion.options.length >= 6
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </button>

                      <p className="text-xs text-gray-500 mt-2">
                        Select the radio button next to the correct answer
                        option.
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