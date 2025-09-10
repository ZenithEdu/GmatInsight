import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  BookOpen,
  Save,
  Trash2,
  ArrowLeft,
  Play,
  Hash,
  Type,
  Star,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import Loading from "../../components/Loading";
import VerbalBulkUpload from "./VerbalBulkUpload";
import { useSnackbar } from "../../components/SnackbarProvider";

const VerbalUploadPage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [singleQuestion, setSingleQuestion] = useState({
    question: "",
    options: ["", "", "", "", ""],
    correctAnswer: "",
    explanation: "",
    difficulty: "easy",
    topic: "",
    type: "",
    level: "",
    passage: "",
    layout: "single",
  });
  const [setId, setSetId] = useState("");
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const topicsList = [
    "Reading Comprehension",
    "Critical Reasoning",
    "Sentence Correction",
    "Grammar",
    "Vocabulary",
    "Logic",
    "Rhetoric",
  ];

  const questionTypes = [
    "Main Idea",
    "Detail",
    "Inference",
    "Purpose",
    "Strengthen",
    "Weaken",
    "Assumption",
    "Evaluate",
    "Complete Passage",
    "Sentence Correction",
  ];
  const levels = ["L1", "L2", "L3", "L4", "L5"];


  const handleSingleQuestionChange = (field, value) => {
    setSingleQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...singleQuestion.options];
    newOptions[index] = value;
    setSingleQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  // Single question save (POST to backend)
  const saveQuestion = async () => {
    if (!setId.trim()) {
      showSnackbar("Please enter Set ID", { type: "error" });

      return;
    }
    if (!singleQuestion.question.trim()) {
      showSnackbar("Please enter a question", { type: "error" });
      return;
    }
    if (!singleQuestion.correctAnswer) {
      showSnackbar("Please select the correct answer", { type: "error" });
      return;
    }
    if (!singleQuestion.topic) {
      showSnackbar("Please select a topic", { type: "error" });
      return;
    }
    if (!singleQuestion.type) {
      showSnackbar("Please select a question type", { type: "error" });
      return;
    }
    if (!singleQuestion.type) {
      showSnackbar("Please select a question type", { type: "error" });
      return;
    }
    if (!singleQuestion.level) {
      showSnackbar("Please select a level", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      // Map correctAnswer (A/B/C/D/E) to option value
      const answerIdx = ["A", "B", "C", "D", "E"].indexOf(
        singleQuestion.correctAnswer
      );

      const payload = {
        set_id: setId,
        topic: singleQuestion.topic,
        type: singleQuestion.type,
        question: singleQuestion.question,
        passage: singleQuestion.passage || "",
        options: singleQuestion.options,
        answer: singleQuestion.options[answerIdx],
        difficulty: singleQuestion.difficulty,
        level: singleQuestion.level,
        layout: singleQuestion.layout,
        explanation: singleQuestion.explanation || "",
      };
      const res = await fetch(`${API_URL}/verbalVault/VerbalVaultQuestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save question");
      }
      showSnackbar("Question saved successfully", { type: "success" });
      clearForm();
      setSetId("");
    } catch (err) {
      showSnackbar(err.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSingleQuestion({
      question: "",
      options: ["", "", "", "", ""],
      correctAnswer: "",
      explanation: "",
      difficulty: "easy",
      topic: "",
      type: "",
      level: "",
      passage: "",
      layout: "single",
    });
    setSetId("");
showSnackbar("Form cleared", { type: "info" });
  };

  const addSampleData = () => {
    setSetId("1");
    setSingleQuestion({
      question: "Which of the following best describes the main idea of the passage?",
      options: [
        "The economic implications of climate change policies",
        "The historical development of environmental regulations",
        "The conflict between economic growth and environmental protection",
        "The role of technology in solving environmental problems",
        "The psychological impact of environmental degradation"
      ],
      correctAnswer: "C",
      explanation: "The passage primarily discusses the tension between economic development and environmental conservation, citing several examples where these interests conflict.",
      difficulty: "easy",
      topic: "Reading Comprehension",
      type: "Main Idea",
      level: "L2",
      passage: "In recent decades, the tension between economic development and environmental protection has become increasingly apparent. While industries argue for fewer restrictions to promote growth, environmentalists point to the irreversible damage caused by unchecked industrialization...",
      layout: "single",
    });
    showSnackbar("Sample data loaded", { type: "success" });
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50"
            title="Back to Verbal Vault"
            aria-label="Back to Verbal Vault"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-purple-800 flex items-center">
            <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
            Verbal Reasoning Vault
          </h1>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />
      
      {loading && <Loading />}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left Side: Upload Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:mr-[22rem]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Verbal Questions
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Create and manage verbal reasoning questions
                </p>
              </div>

              {activeTab === "single" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={addSampleData}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    <Play className="w-4 h-4" />
                    Sample
                  </button>
                  <button
                    onClick={saveQuestion}
                    className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                    disabled={loading}
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={clearForm}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-4 py-2 font-medium text-sm md:text-base relative flex items-center gap-2 ${
                  activeTab === "single"
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="w-4 h-4" />
                Single Question
                {activeTab === "single" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-4 py-2 font-medium text-sm md:text-base relative flex items-center gap-2 ${
                  activeTab === "bulk"
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Upload className="w-4 h-4" />
                Bulk Upload
                {activeTab === "bulk" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
            </div>

            {activeTab === "single" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Set ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={setId}
                      onChange={(e) =>
                        setSetId(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter numeric Set ID"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={singleQuestion.topic}
                      onChange={(e) =>
                        handleSingleQuestionChange("topic", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                      required
                    >
                      <option value="">Select topic</option>
                      {topicsList.map((topic, index) => (
                        <option key={index} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={singleQuestion.type}
                      onChange={(e) =>
                        handleSingleQuestionChange("type", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                      required
                    >
                      <option value="">Select type</option>
                      {questionTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Difficulty <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={singleQuestion.difficulty}
                      onChange={(e) =>
                        handleSingleQuestionChange("difficulty", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                      required
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
 <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Level <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() =>
                          handleSingleQuestionChange("level", level)
                        }
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          singleQuestion.level === level
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Layout (column)
                    </label>
                    <select
                      value={singleQuestion.layout}
                      onChange={(e) =>
                        handleSingleQuestionChange("layout", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                    >
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                    </select>
                  </div>
                </div>

                {singleQuestion.layout === "double" && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Passage
                    </label>
                    <textarea
                      value={singleQuestion.passage}
                      onChange={(e) =>
                        handleSingleQuestionChange("passage", e.target.value)
                      }
                      placeholder="Enter the reading passage here"
                      className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={singleQuestion.question}
                    onChange={(e) =>
                      handleSingleQuestionChange("question", e.target.value)
                    }
                    placeholder="Enter your question here"
                    className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer Options <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {singleQuestion.options.map((option, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            placeholder={`Enter option ${String.fromCharCode(
                              65 + index
                            )}${
                              index === 4 ? " (optional)" : ""
                            }`}
                            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            required={index < 4}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correct Answer <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["A", "B", "C", "D", "E"].map((answer) => (
                      <button
                        key={answer}
                        type="button"
                        onClick={() =>
                          handleSingleQuestionChange("correctAnswer", answer)
                        }
                        className={`py-2 rounded-lg text-sm font-medium transition-all ${
                          singleQuestion.correctAnswer === answer
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Option {answer}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Solution Explanation
                  </label>
                  <textarea
                    value={singleQuestion.explanation}
                    onChange={(e) =>
                      handleSingleQuestionChange("explanation", e.target.value)
                    }
                    placeholder="Explain the solution step by step"
                    className="w-full h-24 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "bulk" && (
              <VerbalBulkUpload
                API_URL={API_URL}
                showSnackbar={showSnackbar}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </div>

          {/* Right Side: Instructions */}
          <div className="fixed z-10 bg-white rounded-2xl shadow-xl p-4 md:p-5 h-full-screen top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-8 w-[95%] sm:w-80">
            <div className="h-full flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5" />
                Instructions
              </h3>

              <div className="space-y-4 overflow-y-auto pr-2">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 text-sm mb-2">Set ID</h4>
                  <p className="text-xs text-blue-700">
                    Enter a numeric Set ID to group related questions together.
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 text-sm mb-2">Question Types</h4>
                  <p className="text-xs text-purple-700">
                    Select the appropriate question type based on the verbal reasoning skill being tested.
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 text-sm mb-2">Layout Options</h4>
                  <p className="text-xs text-green-700">
                    Choose "Single" for single column layout or "Double" for double column layout.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800 text-sm mb-2">Answer Options</h4>
                  <p className="text-xs text-amber-700">
                    Provide at least 4 options. Option E is optional. Select the correct answer by clicking on the corresponding button.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbalUploadPage;