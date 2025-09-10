import { useState, useRef } from "react";
import {
  Upload,
  Plus,
  FileText,
  Calculator,
  BookOpen,
  Save,
  Trash2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ArrowLeft,
  BarChart3,
  Play,
  Hash,
  Type,
  Star,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import Loading from "../../../components/Loading";
import LatexGuide from "../../components/LatexGuide";
import QuantBulkUpload from "./QuantBulkUpload"; // Import the new component
import { useSnackbar } from "../../../components/SnackbarProvider";


const QuantitativeUploadPage = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [singleQuestion, setSingleQuestion] = useState({
    question: "",
    options: ["", "", "", "", ""],
    correctAnswer: "",
    explanation: "",
    difficulty: "medium",
    topic: "",
    type: "",
    level: "",
  });
  const [showEquationBuilder, setShowEquationBuilder] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [previewLatex, setPreviewLatex] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [showMoreEquations, setShowMoreEquations] = useState(false);
  const [showCustomLatexPopup, setShowCustomLatexPopup] = useState(false);
  const [customLatex, setCustomLatex] = useState("");
  const [setId, setSetId] = useState("");
  const [loading, setLoading] = useState(false);
  const showSnackbar = useSnackbar();
  const [showFieldSelectionHint, setShowFieldSelectionHint] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const basicEquations = [
    {
      name: "Fraction",
      latex: "\\frac{a}{b}",
      icon: <div className="text-lg">a/b</div>,
    },
    {
      name: "Square Root",
      latex: "\\sqrt{x}",
      icon: <div className="text-lg">√x</div>,
    },
    {
      name: "Exponent",
      latex: "x^{2}",
      icon: <div className="text-lg">x²</div>,
    },
    {
      name: "Subscript",
      latex: "x_{1}",
      icon: <div className="text-lg">x₁</div>,
    },
    {
      name: "Summation",
      latex: "\\sum_{i=1}^{n}",
      icon: <div className="text-lg">∑</div>,
    },
    {
      name: "Product",
      latex: "\\prod_{i=1}^{n}",
      icon: <div className="text-lg">∏</div>,
    },
    {
      name: "Integral",
      latex: "\\int_{a}^{b}",
      icon: <div className="text-lg">∫</div>,
    },
    {
      name: "Limit",
      latex: "\\lim_{x \\to \\infty}",
      icon: <div className="text-lg">lim</div>,
    },
  ];

  const advancedEquations = [
    {
      name: "Quadratic Formula",
      latex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}",
      icon: <div className="text-lg">x=(-b±√)</div>,
    },
    {
      name: "Distance Formula",
      latex: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
      icon: <div className="text-lg">d=√(Δx²+Δy²)</div>,
    },
    {
      name: "Compound Interest",
      latex: "A = P(1 + \\frac{r}{n})^{nt}",
      icon: <div className="text-lg">A=P(1+r/n)ⁿᵗ</div>,
    },
    {
      name: "Probability",
      latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      icon: <div className="text-lg">P(A∪B)</div>,
    },
    {
      name: "Percentage",
      latex:
        "\\text{Percentage} = \\frac{\\text{Part}}{\\text{Whole}} \\times 100\\%",
      icon: <div className="text-lg">%</div>,
    },
    {
      name: "Simple Interest",
      latex: "SI = \\frac{P \\times R \\times T}{100}",
      icon: <div className="text-lg">SI=PRT/100</div>,
    },
    {
      name: "Area of Circle",
      latex: "A = \\pi r^2",
      icon: <div className="text-lg">A=πr²</div>,
    },
    {
      name: "Pythagorean Theorem",
      latex: "a^2 + b^2 = c^2",
      icon: <div className="text-lg">a²+b²=c²</div>,
    },
    {
      name: "Binomial Theorem",
      latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k",
      icon: <div className="text-lg">(a+b)ⁿ</div>,
    },
    {
      name: "Logarithm",
      latex: "\\log_{b}(a) = \\frac{\\log_{c}(a)}{\\log_{c}(b)}",
      icon: <div className="text-lg">logₐb</div>,
    },
    {
      name: "Matrix",
      latex: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
      icon: <div className="text-lg">[a b; c d]</div>,
    },
    {
      name: "Derivative",
      latex: "\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}",
      icon: <div className="text-lg">dy/dx</div>,
    },
  ];

  const gmatEquations = [
    {
      name: "Combination",
      latex: "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}",
      icon: <div className="text-lg">C(n,r)</div>,
    },
    {
      name: "Permutation",
      latex: "P(n, r) = \\frac{n!}{(n-r)!}",
      icon: <div className="text-lg">P(n,r)</div>,
    },
    {
      name: "Standard Deviation",
      latex: "\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}",
      icon: <div className="text-lg">σ</div>,
    },
    {
      name: "Mean",
      latex: "\\mu = \\frac{1}{N} \\sum_{i=1}^{N} x_i",
      icon: <div className="text-lg">μ</div>,
    },
    {
      name: "Quadratic Equation",
      latex: "ax^2 + bx + c = 0",
      icon: <div className="text-lg">ax²+bx+c=0</div>,
    },
    {
      name: "Line Equation",
      latex: "y = mx + b",
      icon: <div className="text-lg">y=mx+b</div>,
    },
    {
      name: "Slope",
      latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      icon: <div className="text-lg">m=Δy/Δx</div>,
    },
    {
      name: "Distance",
      latex: "d = rt",
      icon: <div className="text-lg">d=rt</div>,
    },
    {
      name: "Work",
      latex: "Work = Rate \\times Time",
      icon: <div className="text-lg">W=R×T</div>,
    },
    {
      name: "Mixture",
      latex: "C_{final} = \\frac{C_1 \\cdot V_1 + C_2 \\cdot V_2}{V_1 + V_2}",
      icon: <div className="text-lg">Cₘᵢₓ</div>,
    },
    {
      name: "Probability of Event",
      latex:
        "P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}",
      icon: <div className="text-lg">P(E)</div>,
    },
    {
      name: "Exponential Growth",
      latex: "A = P(1 + r)^t",
      icon: <div className="text-lg">A=P(1+r)ᵗ</div>,
    },
  ];

  const allEquations = [
    ...basicEquations,
    ...advancedEquations,
    ...gmatEquations,
  ];

  const topicsList = [
    "Algebra",
    "Geometry",
    "Arithmetic",
    "Probability",
    "Statistics",
    "Profit & Loss",
    "Time & Work",
    "Speed & Distance",
    "Permutation & Combination",
    "Number System",
  ];

  const questionTypes = [
    "Problem Solving",
    "Data Sufficiency",
    "Quantitative Comparison",
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

  const addEquationToField = (latex) => {
    const equation = `$$${latex}$$`;

    if (activeField === "question") {
      setSingleQuestion((prev) => ({
        ...prev,
        question: prev.question + " " + equation,
      }));
    } else if (activeField && activeField.startsWith("option")) {
      const index = parseInt(activeField.replace("option", ""));
      const newOptions = [...singleQuestion.options];
      newOptions[index] = newOptions[index] + " " + equation;
      setSingleQuestion((prev) => ({
        ...prev,
        options: newOptions,
      }));
    } else if (activeField === "explanation") {
      setSingleQuestion((prev) => ({
        ...prev,
        explanation: prev.explanation + " " + equation,
      }));
    }

    setPreviewLatex("");
  };

  // Single question save (POST to backend)
  const saveQuestion = async () => {
    if (!setId.trim()) {
      showSnackbar("Please enter a Set ID", { type: "error" });
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
        options: singleQuestion.options,
        answer: singleQuestion.options[answerIdx],
        difficulty: singleQuestion.difficulty,
        level: singleQuestion.level,
        explanation: singleQuestion.explanation || "",
      };
      const res = await fetch(`${API_URL}/quantVault/QuantVaultQuestions`, {
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
      difficulty: "medium",
      topic: "",
      type: "",
      level: "",
    });
    setActiveField(null);
    setSetId("");
    showSnackbar("Form cleared", { type: "info" });
  };

  const addSampleData = () => {
    setSetId("1");
    setSingleQuestion({
      question: "What is the solution to the equation $$x^2 - 5x + 6 = 0$$?",
      options: [
        "$$x = 2, 3$$",
        "$$x = 1, 6$$",
        "$$x = -2, -3$$",
        "$$x = 0, 5$$",
        "No real solutions",
      ],
      correctAnswer: "A",
      explanation:
        "Factor the quadratic equation: $$(x-2)(x-3)=0$$, so the solutions are $$x=2$$ and $$x=3$$.",
      difficulty: "medium",
      topic: "Algebra",
      type: "Problem Solving",
      level: "L2",
    });
    showSnackbar("Sample data loaded", { type: "success" });
  };

  const renderTextWithLatex = (text) => {
    if (!text) return null;

    const parts = text.split(/(\$\$.*?\$\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        const latexContent = part.slice(2, -2);
        return <InlineMath key={index} math={latexContent} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showSnackbar("Copied to clipboard", { type: "success" });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showSnackbar("Failed to copy to clipboard", { type: "error" });
      });
  };

  const handleCustomLatexAdd = () => {
    if (customLatex.trim()) {
      addEquationToField(customLatex);
      setCustomLatex("");
      setShowCustomLatexPopup(false);
    }
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
            title="Back to Quantitative Vault"
            aria-label="Back to Quantitative Vault"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
            <h1 className="text-2xl font-bold text-blue-800 flex items-center">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
              Quantitative Vault
            </h1>
        </div>
        {!showGuide && (
          <button
            onClick={() => setShowGuide(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <BookOpen className="w-5 h-5" />
            LaTeX Guide
          </button>
        )}
      </div>
    </header>
  );

  if (showGuide) {
    return (
      <>
        <Header />
        <LatexGuide setShowGuide={setShowGuide} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      {loading && <Loading overlay text="Uploading question..." />}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Left Side: Upload Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:mr-[22rem]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Quantitative Questions
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Create and manage quantitative questions with LaTeX support
                </p>
              </div>

              {activeTab === "single" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={addSampleData}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
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
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="w-4 h-4" />
                Single Question
                {activeTab === "single" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-4 py-2 font-medium text-sm md:text-base relative flex items-center gap-2 ${
                  activeTab === "bulk"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Upload className="w-4 h-4" />
                Bulk Upload
                {activeTab === "bulk" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
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
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
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
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
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
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
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
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
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

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Question <span className="text-red-500">*</span>
                    </label>
                    {!showFieldSelectionHint && (
                      <button
                        onClick={() => setShowFieldSelectionHint(true)}
                        className="text-blue-600 text-xs flex items-center gap-1 hover:underline"
                        title="How to use equations"
                      >
                        <HelpCircle className="w-3 h-3" />
                        Need help with equations?
                      </button>
                    )}
                    
                  </div>

                  <div className="relative">
                    <textarea
                      value={singleQuestion.question}
                      onChange={(e) =>
                        handleSingleQuestionChange("question", e.target.value)
                      }
                      onFocus={() => setActiveField("question")}
                      placeholder="Enter your question here. Use $$equation$$ for LaTeX equations"
                      className={`w-full h-32 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm ${
                        activeField === "question"
                          ? "border-blue-500 ring-1 ring-blue-500"
                          : "border-gray-300"
                      }`}
                      required
                    />
                    <button
                      onClick={() =>
                        setShowEquationBuilder(!showEquationBuilder)
                      }
                      className="absolute top-2 right-2 bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors shadow-sm"
                      title="Equation Builder"
                    >
                      <Calculator className="w-4 h-4" />
                    </button>
                  </div>
                  {singleQuestion.question && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Preview:
                      </div>
                      <div className="text-sm leading-relaxed">
                        {renderTextWithLatex(singleQuestion.question)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer Options <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {singleQuestion.options.map((option, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            onFocus={() => setActiveField(`option${index}`)}
                            placeholder={`Enter option ${String.fromCharCode(
                              65 + index
                            )}${
                              index === 4 ? " (optional)" : ""
                            } (use $$formula$$ for equations)`}
                            className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                              activeField === `option${index}`
                                ? "border-blue-500 ring-1 ring-blue-500"
                                : "border-gray-300"
                            }`}
                            required={index < 4}
                          />
                        </div>
                        {option && (
                          <div className="mt-2 ml-11 p-2 bg-gray-50 rounded text-sm">
                            <span className="text-gray-600">Preview: </span>
                            {renderTextWithLatex(option)}
                          </div>
                        )}
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
                    onFocus={() => setActiveField("explanation")}
                    placeholder="Explain the solution step by step (supports LaTeX)"
                    className={`w-full h-24 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none text-sm ${
                      activeField === "explanation"
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-gray-300"
                    }`}
                  />
                  {singleQuestion.explanation && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Explanation Preview:
                      </div>
                      <div className="text-sm">
                        {renderTextWithLatex(singleQuestion.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "bulk" && (
              <QuantBulkUpload
                API_URL={API_URL}
                showSnackbar={showSnackbar}
                loading={loading}
                setLoading={setLoading}
                renderTextWithLatex={renderTextWithLatex}
              />
            )}
          </div>

          {/* Right Side: Quick Equations */}
<div className="fixed z-10 bg-white rounded-2xl shadow-xl p-4 md:p-5 h-full-screen top-16 sm:top-20 md:top-24 right-2 sm:right-4 md:right-8 w-[95%] sm:w-80">
  {!activeField && showFieldSelectionHint ? (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <HelpCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <h3 className="font-bold text-blue-800 mb-2">How to use equations</h3>
        <p className="text-sm text-blue-700">
          First select any field where you want to add an equation - question, option, or explanation. Then you can choose from these quick equations.
        </p>
      </div>
      <button 
        onClick={() => setShowFieldSelectionHint(false)}
        className="text-grey-900 text-sm hover:underline cursor-pointer"
      >
        Got it, don't show again
      </button>
    </div>
  ) : activeField ? (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Quick Equations
        </h3>
        <button
          onClick={() => setShowCustomLatexPopup(true)}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          title="Custom LaTeX"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200 text-sm font-medium text-blue-800">
        Active:{" "}
        {activeField === "question"
          ? "Question"
          : activeField.startsWith("option")
          ? `Option ${activeField.replace("option", "")}`
          : activeField === "explanation"
          ? "Explanation"
          : "Field"}
      </div>

      <div className="space-y-2 h-[20rem] overflow-y-auto pr-2">
        {allEquations
          .slice(0, showMoreEquations ? allEquations.length : 8)
          .map((eq, index) => (
            <button
              key={index}
              onClick={() => addEquationToField(eq.latex)}
              className="w-full p-2.5 text-left border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-start gap-2.5"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 text-sm truncate">
                  {eq.name}
                </div>
                <div className="text-xs font-mono text-gray-600 break-all">
                  <InlineMath math={eq.latex} />
                </div>
              </div>
            </button>
          ))}
      </div>

      {allEquations.length > 8 && (
        <button
          onClick={() => setShowMoreEquations(!showMoreEquations)}
          className="w-full flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium py-2 mt-2 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          {showMoreEquations ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More ({allEquations.length - 8} more)
            </>
          )}
        </button>
      )}
    </>
  ) : (
    <div className="h-full flex items-center justify-center">
      <p className="text-gray-500 text-center p-4">
        Select a field to enable equations
        <br />
        <button 
          onClick={() => setShowFieldSelectionHint(true)}
          className="text-blue-600 text-sm hover:underline cursor-pointer mt-2"
        >
          Show instructions again
        </button>
      </p>
    </div>
  )}
</div>
        </div>

        {showCustomLatexPopup && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Custom LaTeX Equation
                </h3>
                <button
                  onClick={() => setShowCustomLatexPopup(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter LaTeX Code
                </label>
                <textarea
                  value={customLatex}
                  onChange={(e) => setCustomLatex(e.target.value)}
                  placeholder="Enter your LaTeX equation"
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm font-mono"
                />
              </div>

              {customLatex && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Preview:
                  </div>
                  <div className="text-sm">
                    {renderTextWithLatex(`$$${customLatex}$$`)}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => copyToClipboard(customLatex)}
                  disabled={!customLatex.trim()}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Code
                </button>
                <button
                  onClick={handleCustomLatexAdd}
                  disabled={!customLatex.trim()}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Check className="w-4 h-4" />
                  Add to{" "}
                  {activeField === "question"
                    ? "Question"
                    : activeField && activeField.startsWith("option")
                    ? `Option ${activeField.replace("option", "")}`
                    : activeField === "explanation"
                    ? "Explanation"
                    : "Field"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantitativeUploadPage;
