import React, { useState, useRef, useEffect } from "react";
import {
  Calculator,
  XCircle,
  Copy,
  Check,
  Search,
  BookOpen,
  Menu,
  PanelRightOpen,
  Hash,
  Plus,
  Type,
  Sigma,
  Triangle,
  BarChart3,
  Grid3X3,
  Layers,
} from "lucide-react";

import { InlineMath } from "react-katex";

const LatexGuide = ({ setShowGuide }) => {
  // ---- UI State ----
  const [activeCategory, setActiveCategory] = useState(
    () => localStorage.getItem("lg_active") || "basic"
  );
  const [copiedItem, setCopiedItem] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("lg_sidebar_collapsed") === "1"
  );
  const [showHelp, setShowHelp] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const contentRef = useRef(null);
  const searchRef = useRef(null);
  const helpCardRef = useRef(null);
  const sidebarRef = useRef(null);

  // Persist some UI choices
  useEffect(() => {
    localStorage.setItem("lg_active", activeCategory);
  }, [activeCategory]);
  useEffect(() => {
    localStorage.setItem("lg_sidebar_collapsed", sidebarCollapsed ? "1" : "0");
  }, [sidebarCollapsed]);

  // Scroll to top when category changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeCategory]);

  // Close suggestion dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestOpen(false);
        setHighlightIdx(-1);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close help on Esc / outside
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowHelp(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const copyToClipboard = (text) => {
    const readyText = `$$${text}$$`;
    navigator.clipboard
      .writeText(readyText)
      .then(() => {
        setCopiedItem(text);
        setTimeout(() => setCopiedItem(null), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const latexData = {
    basic: {
      title: "Basic Symbols",
      icon: Hash,
      color: "from-blue-600 to-blue-700",
      items: [
        { name: "Fraction", latex: "\\frac{a}{b}", desc: "Fraction a over b" },
        { name: "Square Root", latex: "\\sqrt{x}", desc: "Square root of x" },
        { name: "Nth Root", latex: "\\sqrt[n]{x}", desc: "Nth root of x" },
        { name: "Exponent", latex: "x^{2}", desc: "x to the power of 2" },
        { name: "Subscript", latex: "x_{1}", desc: "x with subscript 1" },
        { name: "Plus/Minus", latex: "\\pm", desc: "Plus or minus symbol" },
        { name: "Multiplication", latex: "\\times", desc: "Multiplication cross" },
        { name: "Division", latex: "\\div", desc: "Division symbol" },
        { name: "Not Equal", latex: "\\neq", desc: "Not equal to" },
        { name: "Approximately", latex: "\\approx", desc: "Approximately equal" },
        { name: "Less Equal", latex: "\\leq", desc: "Less than or equal" },
        { name: "Greater Equal", latex: "\\geq", desc: "Greater than or equal" },
        { name: "Infinity", latex: "\\infty", desc: "Infinity symbol" },
        { name: "Proportional", latex: "\\propto", desc: "Proportional to" },
        { name: "Therefore", latex: "\\therefore", desc: "Therefore symbol" },
        { name: "Because", latex: "\\because", desc: "Because symbol" },
      ],
    },
    operators: {
      title: "Operators",
      icon: Plus,
      color: "from-blue-500 to-blue-600",
      items: [
        { name: "Addition", latex: "+", desc: "Addition operator" },
        { name: "Subtraction", latex: "-", desc: "Subtraction operator" },
        { name: "Multiplication Dot", latex: "\\cdot", desc: "Multiplication dot" },
        { name: "Equal", latex: "=", desc: "Equals sign" },
        { name: "Not Equal", latex: "\\neq", desc: "Not equal operator" },
        { name: "Approximately", latex: "\\approx", desc: "Approximately equal" },
        { name: "Equivalent", latex: "\\equiv", desc: "Equivalent to" },
        { name: "Similar", latex: "\\sim", desc: "Similar to" },
        { name: "Congruent", latex: "\\cong", desc: "Congruent to" },
        { name: "Minus/Plus", latex: "\\mp", desc: "Minus or plus" },
        { name: "Asterisk", latex: "\\ast", desc: "Asterisk operator" },
        { name: "Circle", latex: "\\circ", desc: "Circle operator" },
      ],
    },
    greek: {
      title: "Greek Letters",
      icon: Type,
      color: "from-blue-700 to-blue-800",
      items: [
        { name: "Alpha", latex: "\\alpha", desc: "α - alpha" },
        { name: "Beta", latex: "\\beta", desc: "β - beta" },
        { name: "Gamma", latex: "\\gamma", desc: "γ - gamma" },
        { name: "Delta", latex: "\\delta", desc: "δ - delta" },
        { name: "Epsilon", latex: "\\epsilon", desc: "ε - epsilon" },
        { name: "Zeta", latex: "\\zeta", desc: "ζ - zeta" },
        { name: "Eta", latex: "\\eta", desc: "η - eta" },
        { name: "Theta", latex: "\\theta", desc: "θ - theta" },
        { name: "Lambda", latex: "\\lambda", desc: "λ - lambda" },
        { name: "Mu", latex: "\\mu", desc: "μ - mu" },
        { name: "Nu", latex: "\\nu", desc: "ν - nu" },
        { name: "Pi", latex: "\\pi", desc: "π - pi" },
        { name: "Rho", latex: "\\rho", desc: "ρ - rho" },
        { name: "Sigma", latex: "\\sigma", desc: "σ - sigma" },
        { name: "Tau", latex: "\\tau", desc: "τ - tau" },
        { name: "Phi", latex: "\\phi", desc: "φ - phi" },
        { name: "Chi", latex: "\\chi", desc: "χ - chi" },
        { name: "Psi", latex: "\\psi", desc: "ψ - psi" },
        { name: "Omega", latex: "\\omega", desc: "ω - omega" },
        { name: "Capital Gamma", latex: "\\Gamma", desc: "Γ - capital gamma" },
        { name: "Capital Delta", latex: "\\Delta", desc: "Δ - capital delta" },
        { name: "Capital Theta", latex: "\\Theta", desc: "Θ - capital theta" },
        { name: "Capital Lambda", latex: "\\Lambda", desc: "Λ - capital lambda" },
        { name: "Capital Pi", latex: "\\Pi", desc: "Π - capital pi" },
        { name: "Capital Sigma", latex: "\\Sigma", desc: "Σ - capital sigma" },
        { name: "Capital Omega", latex: "\\Omega", desc: "Ω - capital omega" },
      ],
    },
    calculus: {
      title: "Calculus",
      icon: Sigma,
      color: "from-blue-600 to-blue-700",
      items: [
        { name: "Summation", latex: "\\sum_{i=1}^{n} x_i", desc: "Sum from i=1 to n" },
        { name: "Product", latex: "\\prod_{i=1}^{n} x_i", desc: "Product from i=1 to n" },
        { name: "Integral", latex: "\\int_{a}^{b} f(x) dx", desc: "Definite integral from a to b" },
        { name: "Double Integral", latex: "\\iint_{D} f(x,y) dA", desc: "Double integral over region D" },
        { name: "Triple Integral", latex: "\\iiint_{V} f(x,y,z) dV", desc: "Triple integral over volume V" },
        { name: "Partial Derivative", latex: "\\frac{\\partial f}{\\partial x}", desc: "Partial derivative with respect to x" },
        { name: "Limit", latex: "\\lim_{x \\to a} f(x)", desc: "Limit as x approaches a" },
        { name: "Derivative", latex: "\\frac{d}{dx} f(x)", desc: "Derivative of f with respect to x" },
        { name: "Second Derivative", latex: "\\frac{d^2}{dx^2} f(x)", desc: "Second derivative of f" },
        { name: "Gradient", latex: "\\nabla f", desc: "Gradient operator" },
        { name: "Laplacian", latex: "\\nabla^2 f", desc: "Laplacian operator" },
        { name: "Line Integral", latex: "\\oint_{C} f ds", desc: "Line integral over curve C" },
      ],
    },
    geometry: {
      title: "Geometry",
      icon: Triangle,
      color: "from-blue-500 to-blue-600",
      items: [
        { name: "Circle Area", latex: "A = \\pi r^2", desc: "Area of a circle" },
        { name: "Circle Circumference", latex: "C = 2\\pi r", desc: "Circumference of a circle" },
        { name: "Triangle Area", latex: "A = \\frac{1}{2} b h", desc: "Area of a triangle" },
        { name: "Pythagorean Theorem", latex: "a^2 + b^2 = c^2", desc: "Right triangle relation" },
        { name: "Distance Formula", latex: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}", desc: "Distance between two points" },
        { name: "Sphere Volume", latex: "V = \\frac{4}{3}\\pi r^3", desc: "Volume of a sphere" },
        { name: "Cylinder Volume", latex: "V = \\pi r^2 h", desc: "Volume of a cylinder" },
        { name: "Cone Volume", latex: "V = \\frac{1}{3}\\pi r^2 h", desc: "Volume of a cone" },
        { name: "Trapezoid Area", latex: "A = \\frac{1}{2}(b_1 + b_2)h", desc: "Area of a trapezoid" },
        { name: "Law of Cosines", latex: "c^2 = a^2 + b^2 - 2ab\\cos(C)", desc: "Generalized Pythagorean theorem" },
        { name: "Law of Sines", latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}", desc: "Law of sines for triangles" },
        { name: "Ellipse Area", latex: "A = \\pi a b", desc: "Area of an ellipse" },
      ],
    },
    algebra: {
      title: "Algebra",
      icon: Calculator,
      color: "from-blue-600 to-blue-700",
      items: [
        { name: "Quadratic Formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}", desc: "Solution to quadratic equations" },
        { name: "Binomial Theorem", latex: "(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k", desc: "Binomial expansion formula" },
        { name: "Difference of Squares", latex: "a^2 - b^2 = (a+b)(a-b)", desc: "Factorization of difference of squares" },
        { name: "Perfect Square", latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2", desc: "Perfect square trinomial" },
        { name: "Logarithm Product", latex: "\\log(ab) = \\log(a) + \\log(b)", desc: "Logarithm of a product" },
        { name: "Change of Base", latex: "\\log_b(a) = \\frac{\\log_c(a)}{\\log_c(b)}", desc: "Change of base formula" },
        { name: "Arithmetic Sequence", latex: "a_n = a_1 + (n-1)d", desc: "nth term of arithmetic progression" },
        { name: "Geometric Sequence", latex: "a_n = a_1 \\cdot r^{n-1}", desc: "nth term of geometric progression" },
        { name: "Sum of AP", latex: "S_n = \\frac{n}{2}(2a + (n-1)d)", desc: "Sum of arithmetic series" },
        { name: "Sum of GP", latex: "S_n = a \\frac{1-r^n}{1-r}", desc: "Sum of geometric series" },
        { name: "Exponential Growth", latex: "A = Pe^{rt}", desc: "Continuous compound interest" },
        { name: "Factorial", latex: "n! = n \\cdot (n-1) \\cdot (n-2) \\cdots 1", desc: "Factorial of n" },
      ],
    },
    statistics: {
      title: "Statistics",
      icon: BarChart3,
      color: "from-blue-500 to-blue-600",
      items: [
        { name: "Mean", latex: "\\mu = \\frac{1}{N} \\sum_{i=1}^{N} x_i", desc: "Arithmetic mean (average)" },
        { name: "Standard Deviation", latex: "\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2}", desc: "Standard deviation formula" },
        { name: "Variance", latex: "\\sigma^2 = \\frac{1}{N} \\sum_{i=1}^{N} (x_i - \\mu)^2", desc: "Variance of a dataset" },
        { name: "Combination", latex: "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}", desc: "Ways to choose r items from n" },
        { name: "Permutation", latex: "P(n, r) = \\frac{n!}{(n-r)!}", desc: "Ways to arrange r items from n" },
        { name: "Basic Probability", latex: "P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}", desc: "Basic probability formula" },
        { name: "Conditional Probability", latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}", desc: "Probability of A given B" },
        { name: "Bayes Theorem", latex: "P(A|B) = \\frac{P(B|A) P(A)}{P(B)}", desc: "Bayes' theorem" },
        { name: "Normal Distribution", latex: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", desc: "PDF of normal distribution" },
        { name: "Z-Score", latex: "z = \\frac{x - \\mu}{\\sigma}", desc: "Standardized score" },
        { name: "Correlation", latex: "r = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i - \\bar{x})^2 \\sum(y_i - \\bar{y})^2}}", desc: "Pearson correlation coefficient" },
        { name: "Chi-Square", latex: "\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}", desc: "Chi-square test statistic" },
      ],
    },
    matrices: {
      title: "Matrices & Vectors",
      icon: Grid3X3,
      color: "from-blue-600 to-blue-700",
      items: [
        { name: "2x2 Matrix", latex: "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}", desc: "2 by 2 matrix" },
        { name: "3x3 Matrix", latex: "\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}", desc: "3 by 3 matrix" },
        { name: "Column Vector", latex: "\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}", desc: "Column vector notation" },
        { name: "Row Vector", latex: "\\begin{bmatrix} x & y & z \\end{bmatrix}", desc: "Row vector notation" },
        { name: "Determinant 2x2", latex: "\\det(A) = ad - bc", desc: "Determinant of 2x2 matrix" },
        { name: "Determinant 3x3", latex: "\\det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)", desc: "Determinant of 3x3 matrix" },
        { name: "Matrix Multiplication", latex: "(AB)_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}", desc: "Matrix multiplication formula" },
        { name: "Identity Matrix", latex: "I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}", desc: "2x2 identity matrix" },
        { name: "Matrix Transpose", latex: "A^T", desc: "Transpose of matrix A" },
        { name: "Matrix Inverse", latex: "A^{-1}", desc: "Inverse of matrix A" },
        { name: "Eigenvalue Equation", latex: "Av = \\lambda v", desc: "Eigenvalue-eigenvector equation" },
        { name: "Dot Product", latex: "\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta", desc: "Dot product of two vectors" },
      ],
    },
    sets: {
      title: "Set Theory",
      icon: Layers,
      color: "from-blue-500 to-blue-600",
      items: [
        { name: "Element of", latex: "x \\in A", desc: "x is an element of set A" },
        { name: "Not element of", latex: "x \\notin A", desc: "x is not an element of A" },
        { name: "Subset", latex: "A \\subseteq B", desc: "A is a subset of B" },
        { name: "Proper subset", latex: "A \\subset B", desc: "A is a proper subset of B" },
        { name: "Superset", latex: "A \\supseteq B", desc: "A is a superset of B" },
        { name: "Union", latex: "A \\cup B", desc: "Union of sets A and B" },
        { name: "Intersection", latex: "A \\cap B", desc: "Intersection of sets A and B" },
        { name: "Complement", latex: "A^c", desc: "Complement of set A" },
        { name: "Empty set", latex: "\\emptyset", desc: "Empty set (null set)" },
        { name: "Universal set", latex: "U", desc: "Universal set" },
        { name: "Set difference", latex: "A \\setminus B", desc: "Set A minus set B" },
        { name: "Symmetric difference", latex: "A \\triangle B", desc: "Symmetric difference of A and B" },
        { name: "Cartesian product", latex: "A \\times B", desc: "Cartesian product of A and B" },
        { name: "Power set", latex: "\\mathcal{P}(A)", desc: "Power set of A" },
        { name: "Cardinality", latex: "|A|", desc: "Cardinality (size) of set A" },
        { name: "Set builder", latex: "\\{x | P(x)\\}", desc: "Set builder notation" },
      ],
    },
  };

  const categories = Object.keys(latexData);

  // Global search across all categories
  const getFilteredResults = () => {
    if (!globalSearchTerm) {
      return latexData[activeCategory].items;
    }
    const searchLower = globalSearchTerm.toLowerCase();
    let allResults = [];
    categories.forEach((categoryKey) => {
      const categoryItems = latexData[categoryKey].items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.latex.toLowerCase().includes(searchLower) ||
          item.desc.toLowerCase().includes(searchLower)
      );
      if (categoryItems.length > 0) {
        allResults = [
          ...allResults,
          ...categoryItems.map((item) => ({
            ...item,
            category: latexData[categoryKey].title,
            categoryKey,
            categoryColor: latexData[categoryKey].color,
          })),
        ];
      }
    });
    return allResults;
  };

  const filteredItems = getFilteredResults();

  // Suggestions (top 8)
  const suggestions = globalSearchTerm
    ? filteredItems.slice(0, 8)
    : latexData[activeCategory].items.slice(0, 8);

  const onSelectSuggestion = (s) => {
    // Jump to the item's category if coming from global search
    if (s.categoryKey) setActiveCategory(s.categoryKey);
    setGlobalSearchTerm("");
    // smooth scroll to top where list starts
    if (contentRef.current) contentRef.current.scrollTop = 0;
    // briefly flash copy preview not needed; just focus content
  };

  // ---- JSX ----
  return (
    <div className="fixed inset-0 bg-blue-900/40 z-[100] flex">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-blue-50/100 backdrop-blur border-r border-blue-200 transition-all duration-300 ${
          sidebarCollapsed ? "w-14" : "w-72"
        } flex-shrink-0 shadow-sm`}
      >
        <div className="p-3 border-b border-blue-200 sticky top-0 bg-blue-400/10 backdrop-blur z-10">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 min-w-0 bg">
                <div className="truncate">
                  <h1 className="font-bold text-lg text-blue-800 truncate">
                    LaTeX Guide
                  </h1>
                  <p className="text-[14px] text-blue-700 truncate">
                    Mathematical Symbols
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="p-2 rounded-md hover:bg-blue-100 transition-colors border border-blue-300"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <Menu className="w-4 h-4 text-blue-700" />
              ) : (
                <PanelRightOpen className="w-4 h-4 text-blue-700" />
              )}
            </button>
          </div>
        </div>

        <nav
          className="p-2 overflow-y-auto h-[calc(100%-56px)]"
          role="listbox"
          aria-label="Categories"
          tabIndex={0}
          onKeyDown={(e) => {
            const idx = categories.indexOf(activeCategory);
            if (e.key === "ArrowDown") {
              const next = Math.min(categories.length - 1, idx + 1);
              setActiveCategory(categories[next]);
              e.preventDefault();
            }
            if (e.key === "ArrowUp") {
              const prev = Math.max(0, idx - 1);
              setActiveCategory(categories[prev]);
              e.preventDefault();
            }
          }}
        >
          {categories.map((categoryKey) => {
            const category = latexData[categoryKey];
            const IconComponent = category.icon;
            const isActive = activeCategory === categoryKey;
            return (
              <button
                key={categoryKey}
                onClick={() => setActiveCategory(categoryKey)}
                className={`w-full text-left px-2 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 text-blue-700"
                }`}
                role="option"
                aria-selected={isActive}
                title={sidebarCollapsed ? category.title : ""}
              >
                <span
                  className={`p-1 rounded-md ${
                    isActive ? "bg-blue-200/20" : "bg-blue-100"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : "text-blue-700"}`} />
                </span>
                {!sidebarCollapsed && (
                  <div className="min-w-0">
                    <span className="font-medium text-sm truncate">
                      {category.title}
                    </span>
                    <span className="ml-2 text-[11px] text-blue-500">
                      {category.items.length}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 bg-white">
        {/* Header */}
        <header className="bg-white border-b border-blue-200 px-3 sm:px-4 py-2 sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Left: section title */}
            <div className="flex items-center gap-2 min-w-[180px]">
              <div className={`p-2 rounded-lg bg-blue-600 text-white`}>
                {React.createElement(latexData[activeCategory].icon, {
                  className: "w-4 h-4",
                })}
              </div>
              <div className="leading-tight">
                <h2 className="text-base sm:text-lg font-semibold text-blue-900">
                  {globalSearchTerm ? "Results" : latexData[activeCategory].title}
                </h2>
                <p className="text-[11px] text-blue-500">
                  {globalSearchTerm
                    ? `${filteredItems.length} found`
                    : `${latexData[activeCategory].items.length} items`}
                </p>
              </div>
            </div>

            {/* Middle: search (fills available space up to Help button) */}
            <div className="relative flex-1 min-w-[200px]" ref={searchRef}>
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search symbols, LaTeX, descriptions…"
                value={globalSearchTerm}
                onChange={(e) => {
                  setGlobalSearchTerm(e.target.value);
                  setSuggestOpen(true);
                  setHighlightIdx(-1);
                }}
                onFocus={() => setSuggestOpen(true)}
                onKeyDown={(e) => {
                  if (!suggestOpen) return;
                  if (e.key === "ArrowDown") {
                    setHighlightIdx((i) =>
                      Math.min(suggestions.length - 1, i + 1)
                    );
                    e.preventDefault();
                  } else if (e.key === "ArrowUp") {
                    setHighlightIdx((i) => Math.max(0, i - 1));
                    e.preventDefault();
                  } else if (e.key === "Enter" && highlightIdx >= 0) {
                    const s = suggestions[highlightIdx];
                    onSelectSuggestion(s);
                    setSuggestOpen(false);
                  }
                }}
                className="w-full pl-8 pr-8 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-sm bg-white"
                aria-label="Search"
              />
              {globalSearchTerm && (
                <button
                  onClick={() => {
                    setGlobalSearchTerm("");
                    setSuggestOpen(false);
                  }}
                  className="absolute inset-y-0 right-2 flex items-center text-blue-400 hover:text-blue-600"
                  aria-label="Clear"
                  title="Clear search"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}

              {/* Suggestions dropdown */}
              {suggestOpen && suggestions.length > 0 && (
                <div className="absolute mt-1 left-0 right-0 bg-white border border-blue-200 rounded-md shadow-lg max-h-72 overflow-auto z-30">
                  {suggestions.map((s, i) => (
                    <button
                      key={`${s.name}-${i}`}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-blue-50 ${
                        i === highlightIdx ? "bg-blue-100" : ""
                      }`}
                      onMouseEnter={() => setHighlightIdx(i)}
                      onMouseLeave={() => setHighlightIdx(-1)}
                      onClick={() => {
                        onSelectSuggestion(s);
                        setSuggestOpen(false);
                      }}
                    >
                      <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {s.category || latexData[activeCategory].title}
                      </span>
                      <span className="text-sm text-blue-900 truncate">{s.name}</span>
                      <span className="ml-auto font-mono text-[11px] text-blue-500 truncate">
                        {s.latex}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Help (opens popup) + Close */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setShowHelp(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm"
                title="How to use"
                aria-haspopup="dialog"
                aria-expanded={showHelp}
              >
                <BookOpen className="w-4 h-4" />
                <span>How to use</span>
              </button>
              <button
                onClick={() => setShowGuide(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                title="Close LaTeX Guide"
              >
                <XCircle className="w-4 h-4" />
                <span>Close Guide</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="h-[calc(100vh-49px)] overflow-y-auto p-3 sm:p-4" ref={contentRef}>
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl p-8 border border-blue-200 max-w-md mx-auto">
                <Search className="w-12 h-12 mx-auto mb-3 text-blue-300" />
                <h3 className="text-lg font-semibold text-blue-800 mb-1">
                  No Results
                </h3>
                <p className="text-blue-500 text-sm">
                  Try a different keyword or browse categories.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredItems.map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white border border-blue-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm">
                    {globalSearchTerm && item.category && (
                      <div className={`px-2 py-1 bg-blue-600 text-white text-[11px] font-medium rounded-t-xl`}>
                        {item.category}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-blue-900 text-base truncate pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => copyToClipboard(item.latex)}
                          className={`p-2 rounded-md transition-colors border ${
                            copiedItem === item.latex
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-white hover:bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                          title="Copy ready-to-use LaTeX"
                        >
                          {copiedItem === item.latex ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-3 text-center min-h-[64px] flex items-center justify-center">
                        <InlineMath math={item.latex} />
                      </div>

                      <p className="text-[13px] text-blue-600 mb-3 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="bg-blue-600 text-white text-xs font-mono p-3 rounded-md overflow-x-auto border border-blue-700">
                        <span className=" mr-1">$$</span>
                        <span className="">{item.latex}</span>
                        <span className=" ml-1">$$</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Help Popup (BG blue/40) */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black/40 z-[120] flex items-center justify-center px-3"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // close when clicking on backdrop only
            if (e.target === e.currentTarget) setShowHelp(false);
          }}
        >
          <div
            ref={helpCardRef}
            className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-blue-200 p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    How to use this guide
                  </h3>
                  <p className="text-[12px] text-blue-500">
                    Quick tips to move faster
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 rounded-md hover:bg-blue-100 border border-blue-200 text-blue-700"
                aria-label="Close help"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  n: 1,
                  t: "Copy ready code",
                  d: "Use the copy button to copy with $ wrappers for Markdown/LaTeX.",
                },
                {
                  n: 2,
                  t: "Blazing search",
                  d: "Search across all categories; use ↑/↓ and Enter to pick suggestions.",
                },
                {
                  n: 3,
                  t: "Browse by topic",
                  d: "Use the left sidebar; Arrow keys also work when the list is focused.",
                },
                {
                  n: 4,
                  t: "Compact & responsive",
                  d: "Cards reflow on smaller screens. Collapse sidebar for more space.",
                },
                {
                  n: 5,
                  t: "Live preview",
                  d: "Every formula renders above its code snippet.",
                },
                {
                  n: 6,
                  t: "Pro tip",
                  d: "Clear search with the × icon or press Esc.",
                },
              ].map((it) => (
                <li key={it.n} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">
                    {it.n}
                  </span>
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">{it.t}</h4>
                    <p className="text-[12px] text-blue-600">{it.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatexGuide;