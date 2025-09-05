import React, { useState, useRef } from 'react';
import { Upload, Plus, FileText, Calculator, BookOpen, Eye, Save, Trash2, X, Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import * as XLSX from "xlsx";
import Snackbar from "../../components/Snackbar";
import Loading from "../../components/Loading";

const QuantitativeUploadPage = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [singleQuestion, setSingleQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    difficulty: 'medium',
    topic: '',
    type: '',
    level: ''
  });
  const [excelFile, setExcelFile] = useState(null);
  const [showEquationBuilder, setShowEquationBuilder] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [previewLatex, setPreviewLatex] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [activeField, setActiveField] = useState(null);
  const [showMoreEquations, setShowMoreEquations] = useState(false);
  const [showCustomLatexPopup, setShowCustomLatexPopup] = useState(false);
  const [customLatex, setCustomLatex] = useState('');
  const [setId, setSetId] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const basicEquations = [
    { name: 'Fraction', latex: '\\frac{a}{b}' },
    { name: 'Square Root', latex: '\\sqrt{x}' },
    { name: 'Exponent', latex: 'x^{2}' },
    { name: 'Subscript', latex: 'x_{1}' },
    { name: 'Summation', latex: '\\sum_{i=1}^{n}' },
    { name: 'Product', latex: '\\prod_{i=1}^{n}' },
    { name: 'Integral', latex: '\\int_{a}^{b}' },
    { name: 'Limit', latex: '\\lim_{x \\to \\infty}' }
  ];

  const advancedEquations = [
    { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
    { name: 'Distance Formula', latex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}' },
    { name: 'Compound Interest', latex: 'A = P(1 + \\frac{r}{n})^{nt}' },
    { name: 'Probability', latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)' },
    { name: 'Percentage', latex: '\\text{Percentage} = \\frac{\\text{Part}}{\\text{Whole}} \\times 100\\%' },
    { name: 'Simple Interest', latex: 'SI = \\frac{P \\times R \\times T}{100}' },
    { name: 'Area of Circle', latex: 'A = \\pi r^2' },
    { name: 'Pythagorean Theorem', latex: 'a^2 + b^2 = c^2' },
    { name: 'Binomial Theorem', latex: '(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k' },
    { name: 'Logarithm', latex: '\\log_{b}(a) = \\frac{\\log_{c}(a)}{\\log_{c}(b)}' },
    { name: 'Matrix', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
    { name: 'Derivative', latex: '\\frac{dy}{dx} = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}' }
  ];

  const gmatEquations = [
    { name: 'Combination', latex: '\\binom{n}{r} = \\frac{n!}{r!(n-r)!}' },
    { name: 'Permutation', latex: 'P(n, r) = \\frac{n!}{(n-r)!}' },
    { name: 'Standard Deviation', latex: '\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}' },
    { name: 'Mean', latex: '\\mu = \\frac{1}{N} \\sum_{i=1}^{N} x_i' },
    { name: 'Quadratic Equation', latex: 'ax^2 + bx + c = 0' },
    { name: 'Line Equation', latex: 'y = mx + b' },
    { name: 'Slope', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' },
    { name: 'Distance', latex: 'd = rt' },
    { name: 'Work', latex: 'Work = Rate \\times Time' },
    { name: 'Mixture', latex: 'C_{final} = \\frac{C_1 \\cdot V_1 + C_2 \\cdot V_2}{V_1 + V_2}' },
    { name: 'Probability of Event', latex: 'P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}' },
    { name: 'Exponential Growth', latex: 'A = P(1 + r)^t' }
  ];

  const allEquations = [...basicEquations, ...advancedEquations, ...gmatEquations];

  const topicsList = [
    'Algebra', 'Geometry', 'Arithmetic', 'Probability', 
    'Statistics', 'Profit & Loss', 'Time & Work', 
    'Speed & Distance', 'Permutation & Combination', 'Number System'
  ];

  const questionTypes = [
    'Problem Solving', 'Data Sufficiency', 'Quantitative Comparison'
  ];

  const levels = ['L1', 'L2', 'L3', 'L4', 'L5'];

  const handleSingleQuestionChange = (field, value) => {
    setSingleQuestion(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...singleQuestion.options];
    newOptions[index] = value;
    setSingleQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addEquationToField = (latex) => {
    const equation = `$$${latex}$$`;
    
    if (activeField === 'question') {
      setSingleQuestion(prev => ({
        ...prev,
        question: prev.question + ' ' + equation
      }));
    } else if (activeField && activeField.startsWith('option')) {
      const index = parseInt(activeField.replace('option', ''));
      const newOptions = [...singleQuestion.options];
      newOptions[index] = newOptions[index] + ' ' + equation;
      setSingleQuestion(prev => ({
        ...prev,
        options: newOptions
      }));
    } else if (activeField === 'explanation') {
      setSingleQuestion(prev => ({
        ...prev,
        explanation: prev.explanation + ' ' + equation
      }));
    }
    
    setPreviewLatex('');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel') {
        setExcelFile(file);
        setUploadStatus('File selected successfully!');
      } else {
        setUploadStatus('Please select a valid Excel file (.xlsx or .xls)');
        setExcelFile(null);
      }
    }
  };

  // Single question save (POST to backend)
  const saveQuestion = async () => {
    if (!setId.trim()) {
      alert('Please enter Set ID');
      return;
    }
    if (!singleQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }
    if (!singleQuestion.correctAnswer) {
      alert('Please select the correct answer');
      return;
    }
    setLoading(true);
    try {
      // Map correctAnswer (A/B/C/D) to option value
      const answerIdx = ['A', 'B', 'C', 'D'].indexOf(singleQuestion.correctAnswer);
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
      setSnackbar({ open: true, message: "Question saved successfully!", type: "success" });
      clearForm();
      setSetId('');
    } catch (err) {
      setSnackbar({ open: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Bulk Excel upload
  const processExcelFile = async () => {
    if (!excelFile) {
      setUploadStatus('Please select a file first');
      return;
    }
    setLoading(true);
    setUploadStatus('Processing file...');
    try {
      const data = await excelFile.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Expected columns: set_id, question, optionA, optionB, optionC, optionD, answer, topic, type, difficulty, explanation
      const headers = jsonData[0].map(h => h.toLowerCase());
      const requiredHeaders = ["set_id", "question", "optiona", "optionb", "optionc", "optiond", "answer", "topic", "type", "difficulty"];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        setUploadStatus(`Missing required columns: ${missingHeaders.join(", ")}`);
        setLoading(false);
        setSnackbar({ open: true, message: `Missing required columns: ${missingHeaders.join(", ")}`, type: "error" });
        return;
      }

      const processedQuestions = jsonData.slice(1).map((row, idx) => {
        const rowObj = headers.reduce((obj, header, i) => {
          obj[header] = row[i];
          return obj;
        }, {});
        const options = [
          rowObj.optiona || "",
          rowObj.optionb || "",
          rowObj.optionc || "",
          rowObj.optiond || "",
        ];
        const answerIdx = ['A', 'B', 'C', 'D'].indexOf((rowObj.answer || '').toUpperCase());
        return {
          set_id: rowObj.set_id || "",
          topic: rowObj.topic || "",
          type: rowObj.type || "",
          question: rowObj.question || "",
          options,
          answer: options[answerIdx] || options[0],
          difficulty: rowObj.difficulty || "medium",
          level: rowObj.level || "",
          explanation: rowObj.explanation || "",
        };
      }).filter(q => q.question && q.options.length >= 2);

      if (processedQuestions.length === 0) {
        setUploadStatus("No valid questions found in file.");
        setLoading(false);
        setSnackbar({ open: true, message: "No valid questions found in file.", type: "error" });
        return;
      }

      // POST to backend
      const res = await fetch(`${API_URL}/quantVault/QuantVaultQuestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedQuestions),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Bulk upload failed");
      }
      setUploadStatus('File processed successfully! Questions uploaded.');
      setSnackbar({ open: true, message: "Bulk upload successful!", type: "success" });
      setExcelFile(null);
    } catch (err) {
      setUploadStatus('Error processing file.');
      setSnackbar({ open: true, message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSingleQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      difficulty: 'medium',
      topic: '',
      type: '',
      level: ''
    });
    setActiveField(null);
  };

  const renderTextWithLatex = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(\$\$.*?\$\$)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const latexContent = part.slice(2, -2);
        return <InlineMath key={index} math={latexContent} />;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('LaTeX code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleCustomLatexAdd = () => {
    if (customLatex.trim()) {
      addEquationToField(customLatex);
      setCustomLatex('');
      setShowCustomLatexPopup(false);
    }
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuide(false)}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
            Quantitative Vault
          </h1>
        </div>
        <button 
          onClick={() => setShowGuide(true)}
          className="bg-indigo-600 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm md:text-base"
        >
          <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
          LaTeX Guide
        </button>
      </div>
    </header>
  );

  if (showGuide) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">LaTeX Equation Guide</h1>
                  <p className="text-gray-600">Complete reference for mathematical equations</p>
                </div>
                <button 
                  onClick={() => setShowGuide(false)}
                  className="bg-gray-500 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Close Guide
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Basic Symbols
                  </h2>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\frac{a}{b}" />
                      </div>
                      <span className="text-sm text-gray-700">Fraction: a/b</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\sqrt{x}" />
                      </div>
                      <span className="text-sm text-gray-700">Square root</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="x^2" />
                      </div>
                      <span className="text-sm text-gray-700">Superscript (power)</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="x_1" />
                      </div>
                      <span className="text-sm text-gray-700">Subscript</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\pm" />
                      </div>
                      <span className="text-sm text-gray-700">Plus/minus ±</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\times" />
                      </div>
                      <span className="text-sm text-gray-700">Multiplication ×</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\div" />
                      </div>
                      <span className="text-sm text-gray-700">Division ÷</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\leq" />
                      </div>
                      <span className="text-sm text-gray-700">Less than or equal to ≤</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\geq" />
                      </div>
                      <span className="text-sm text-gray-700">Greater than or equal to ≥</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-2 md:p-3 bg-white rounded-lg gap-2">
                      <div className="font-mono text-xs md:text-sm bg-gray-100 px-2 py-1 rounded">
                        <InlineMath math="\neq" />
                      </div>
                      <span className="text-sm text-gray-700">Not equal to ≠</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Common Formulas
                  </h2>
                  <div className="space-y-2 md:space-y-3">
                    {allEquations.slice(0, 8).map((eq, index) => (
                      <div key={index} className="p-2 md:p-3 bg-white rounded-lg">
                        <div className="font-semibold text-gray-700 mb-1 text-sm">{eq.name}</div>
                        <div className="text-xs text-gray-600 break-all">
                          <InlineMath math={eq.latex} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Greek Letters</h2>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\alpha" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\beta" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\gamma" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\delta" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\theta" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\lambda" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\mu" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\pi" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\sigma" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\omega" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\Omega" /></div>
                    </div>
                    <div className="p-2 bg-white rounded text-center">
                      <div className="font-mono text-sm"><InlineMath math="\infty" /></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Quantitative Topics</h2>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {topicsList.map((topic, index) => (
                      <div key={index} className="p-2 md:p-3 bg-white rounded-lg text-center text-sm font-medium text-gray-700">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Usage Tips:</h3>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• Wrap equations in double dollar signs: $$equation$$</li>
                  <li>• Use curly braces for grouping</li>
                  <li>• For fractions use backslash frac</li>
                  <li>• For square roots use backslash sqrt</li>
                  <li>• Separate multiple equations with spaces</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Header />
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      {loading && <Loading />}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Quantitative Questions Upload</h1>
              <p className="text-gray-600 text-sm md:text-base">Create and manage quantitative questions with LaTeX support</p>
            </div>
          </div>

          <div className="flex justify-center space-x-2 md:space-x-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('single')}
              className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap text-sm md:text-base ${
                activeTab === 'single' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Single Question
            </button>
            <button 
              onClick={() => setActiveTab('bulk')}
              className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap text-sm md:text-base ${
                activeTab === 'bulk' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Upload className="w-4 h-4 md:w-5 md:h-5" />
              Bulk Upload
            </button>
            <button 
              onClick={() => setShowCustomLatexPopup(true)}
              className="bg-blue-600 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap text-sm md:text-base hover:bg-blue-700"
            >
              <Calculator className="w-4 h-4 md:w-5 md:h-5" />
              Custom LaTeX
            </button>
          </div>
        </div>

        {showCustomLatexPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Custom LaTeX Equation</h3>
                <button 
                  onClick={() => setShowCustomLatexPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter LaTeX Code</label>
                <textarea
                  value={customLatex}
                  onChange={(e) => setCustomLatex(e.target.value)}
                  placeholder="Enter your LaTeX equation"
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm font-mono"
                />
              </div>
              
              {customLatex && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">Preview:</div>
                  <div className="text-sm">
                    {renderTextWithLatex(`$$${customLatex}$$`)}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => copyToClipboard(customLatex)}
                  disabled={!customLatex.trim()}
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Copy className="w-4 h-4" />
                  Copy Code
                </button>
                <button
                  onClick={handleCustomLatexAdd}
                  disabled={!customLatex.trim()}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  Add to {activeField === 'question' ? 'Question' : 
                          activeField && activeField.startsWith('option') ? `Option ${activeField.replace('option', '')}` : 
                          activeField === 'explanation' ? 'Explanation' : 'Field'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'single' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Create New Question</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Set ID *</label>
                <input
                  type="text"
                  value={setId}
                  onChange={e => setSetId(e.target.value)}
                  placeholder="Enter Set ID"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm mb-2"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Question *</label>
                <div className="relative">
                  <textarea 
                    value={singleQuestion.question}
                    onChange={(e) => handleSingleQuestionChange('question', e.target.value)}
                    onFocus={() => setActiveField('question')}
                    placeholder="Enter your question here. Use $$equation$$ for LaTeX equations"
                    className={`w-full h-32 p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm ${
                      activeField === 'question' ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  <button 
                    onClick={() => setShowEquationBuilder(!showEquationBuilder)}
                    className="absolute top-2 right-2 bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 transition-colors"
                    title="Equation Builder"
                  >
                    <Calculator className="w-4 h-4" />
                  </button>
                </div>
                {singleQuestion.question && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="text-sm font-medium text-gray-700 mb-2">Preview:</div>
                    <div className="text-sm leading-relaxed">
                      {renderTextWithLatex(singleQuestion.question)}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Answer Options *</label>
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
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          onFocus={() => setActiveField(`option${index}`)}
                          placeholder={`Enter option ${String.fromCharCode(65 + index)} (use $$formula$$ for equations)`}
                          className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                            activeField === `option${index}` ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'
                          }`}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Answer *</label>
                  <select 
                    value={singleQuestion.correctAnswer}
                    onChange={(e) => handleSingleQuestionChange('correctAnswer', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                    required
                  >
                    <option value="">Select correct answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                  <select
                    value={singleQuestion.topic}
                    onChange={(e) => handleSingleQuestionChange('topic', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="">Select topic</option>
                    {topicsList.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={singleQuestion.type}
                    onChange={(e) => handleSingleQuestionChange('type', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="">Select type</option>
                    {questionTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                  <select 
                    value={singleQuestion.difficulty}
                    onChange={(e) => handleSingleQuestionChange('difficulty', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                  <select 
                    value={singleQuestion.level}
                    onChange={(e) => handleSingleQuestionChange('level', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Solution Explanation</label>
                <textarea
                  value={singleQuestion.explanation}
                  onChange={(e) => handleSingleQuestionChange('explanation', e.target.value)}
                  onFocus={() => setActiveField('explanation')}
                  placeholder="Explain the solution step by step (supports LaTeX)"
                  className={`w-full h-24 p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 resize-none text-sm ${
                    activeField === 'explanation' ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'
                  }`}
                />
                {singleQuestion.explanation && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Explanation Preview:</div>
                    <div className="text-sm">
                      {renderTextWithLatex(singleQuestion.explanation)}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={saveQuestion}
                  className="bg-green-600 text-white px-5 md:px-6 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  Save Question
                </button>
                <button 
                  onClick={clearForm}
                  className="bg-gray-200 text-gray-700 px-5 md:px-6 py-2 rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                  Clear Form
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 sticky bottom-0 self-end" style={{ height: 'auto' }}>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Quick Equations
                {activeField && (
                  <span className="text-xs font-normal bg-purple-100 text-purple-800 px-2 py-1 rounded-full ml-auto">
                    Active: {activeField === 'question' ? 'Question' : 
                            activeField.startsWith('option') ? `Option ${activeField.replace('option', '')}` : 
                            activeField === 'explanation' ? 'Explanation' : 'Field'}
                  </span>
                )}
              </h3>
              
              <div className="space-y-2 md:space-y-3">
                {allEquations.slice(0, showMoreEquations ? allEquations.length : 8).map((eq, index) => (
                  <button
                    key={index}
                    onClick={() => addEquationToField(eq.latex)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <div className="font-medium text-gray-800 mb-1 text-sm">{eq.name}</div>
                    <div className="text-xs font-mono text-gray-600 break-all">
                      <InlineMath math={eq.latex} />
                    </div>
                  </button>
                ))}
              </div>
              
              {allEquations.length > 8 && (
                <button
                  onClick={() => setShowMoreEquations(!showMoreEquations)}
                  className="w-full flex items-center justify-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium py-2"
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
            </div>
          </div>
        )}

        {activeTab === 'bulk' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Bulk Upload from Excel</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 md:p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="w-12 md:w-16 h-12 md:h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Upload Excel File</h3>
                  <p className="text-gray-500 mb-4 text-sm">Drag and drop or click to select (.xlsx, .xls)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="excel-upload"
                  />
                  <label
                    htmlFor="excel-upload"
                    className="bg-purple-600 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block text-sm md:text-base"
                  >
                    Choose File
                  </label>
                  {excelFile && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 font-medium flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" />
                        {excelFile.name}
                      </p>
                    </div>
                  )}
                  {uploadStatus && (
                    <div className={`mt-4 p-3 rounded-lg text-sm ${
                      uploadStatus.includes('success') ? 'bg-green-50 text-green-700' : 
                      uploadStatus.includes('error') || uploadStatus.includes('Please select') ? 'bg-red-50 text-red-700' : 
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {uploadStatus}
                    </div>
                  )}
                </div>

                <button 
                  onClick={processExcelFile}
                  disabled={!excelFile}
                  className="w-full mt-6 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Process Excel File
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Excel Format Requirements
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      A
                    </div>
                    <span className="text-sm text-gray-700">Question (use $$formula$$ for LaTeX)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      B
                    </div>
                    <span className="text-sm text-gray-700">Option A</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      C
                    </div>
                    <span className="text-sm text-gray-700">Option B</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      D
                    </div>
                    <span className="text-sm text-gray-700">Option C</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      E
                    </div>
                    <span className="text-sm text-gray-700">Option D</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      F
                    </div>
                    <span className="text-sm text-gray-700">Correct Answer (A/B/C/D)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      G
                    </div>
                    <span className="text-sm text-gray-700">Topic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      H
                    </div>
                    <span className="text-sm text-gray-700">Type</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      I
                    </div>
                    <span className="text-sm text-gray-700">Difficulty (Easy/Medium/Hard)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-sm font-bold flex-shrink-0">
                      J
                    </div>
                    <span className="text-sm text-gray-700">Explanation (optional)</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 text-sm md:text-base">LaTeX Examples in Excel:</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-700">
                      <span className="font-medium">Question:</span> What is the solution to $$ax^2 + bx + c = 0$$?
                    </div>
                    <div className="text-sm text-blue-700">
                      <span className="font-medium">Option A:</span> {`$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$`}
                    </div>
                    <div className="text-sm text-blue-700">
                      <span className="font-medium">Explanation:</span> Use the quadratic formula {`$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$`}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 text-sm md:text-base">Important Notes:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• First row should contain column headers</li>
                    <li>• Each question should be in a separate row</li>
                    <li>• LaTeX equations must be wrapped in double dollar signs</li>
                    <li>• Correct answer must be exactly A, B, C, or D</li>
                    <li>• File size limit: 10MB</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Sample Excel Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 p-2 text-left">A - Question</th>
                      <th className="border border-gray-300 p-2 text-left">B - Option A</th>
                      <th className="border border-gray-300 p-2 text-left">C - Option B</th>
                      <th className="border border-gray-300 p-2 text-left">D - Option C</th>
                      <th className="border border-gray-300 p-2 text-left">E - Option D</th>
                      <th className="border border-gray-300 p-2 text-left">F - Answer</th>
                      <th className="border border-gray-300 p-2 text-left">G - Topic</th>
                      <th className="border border-gray-300 p-2 text-left">H - Type</th>
                      <th className="border border-gray-300 p-2 text-left">I - Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-2">Solve: $$x^2 - 5x + 6 = 0$$</td>
                      <td className="border border-gray-300 p-2">$$x = 2, 3$$</td>
                      <td className="border border-gray-300 p-2">$$x = 1, 6$$</td>
                      <td className="border border-gray-300 p-2">$$x = -2, -3$$</td>
                      <td className="border border-gray-300 p-2">$$x = 0, 5$$</td>
                      <td className="border border-gray-300 p-2">A</td>
                      <td className="border border-gray-300 p-2">Algebra</td>
                      <td className="border border-gray-300 p-2">Problem Solving</td>
                      <td className="border border-gray-300 p-2">Medium</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-2">Area of circle with radius r?</td>
                      <td className="border border-gray-300 p-2">$$\pi r$$</td>
                      <td className="border border-gray-300 p-2">$$\pi r^2$$</td>
                      <td className="border border-gray-300 p-2">$$2\pi r$$</td>
                      <td className="border border-gray-300 p-2">$$\pi r^3$$</td>
                      <td className="border border-gray-300 p-2">B</td>
                      <td className="border border-gray-300 p-2">Geometry</td>
                      <td className="border border-gray-300 p-2">Problem Solving</td>
                      <td className="border border-gray-300 p-2">Easy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition-colors text-sm md:text-base">
                Download Excel Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantitativeUploadPage;