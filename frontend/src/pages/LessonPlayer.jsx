import React, { useState, useEffect } from "react";
import {
  Menu,
  ChevronRight,
  FileText,
  Clock,
  BookOpen,
  Play,
  Folder,
  FolderOpen,
  Sun,
  Moon,
  Award,
  X,
  ArrowRight,
  Check,
} from "lucide-react";
const LessonPlayer = ({ selectedLesson, onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [localSelectedLesson, setLocalSelectedLesson] = useState(null);
  const modules = [
    {
      id: 1,
      title: "Arithmetic Fundamentals",
      icon: "Calculator",
      lessons: 12,
      duration: "4h 29m",
      completed: 12,
      level: "Beginner",
      topics: [
        {
          id: 1,
          name: "Number Properties & Operations",
          duration: "45 min",
          completed: true,
          type: "video",
          videoId: "G3kavpMlhKM",
        },
        {
          id: 2,
          name: "Fractions, Decimals & Percentages",
          duration: "60 min",
          completed: true,
          type: "video",
          videoId: "jNQXAC9IVRw",
        },
        {
          id: 3,
          name: "Ratios and Proportions",
          duration: "35 min",
          completed: true,
          type: "video",
          videoId: "9bZkp7q19f0",
        },
        {
          id: 4,
          name: "Word Problems & Applications",
          duration: "40 min",
          completed: true,
          type: "video",
          videoId: "dQw4w9WgXcQ",
        },
      ],
    },
    {
      id: 2,
      title: "Algebra Mastery",
      icon: "Target",
      lessons: 15,
      duration: "6h 15m",
      completed: 10,
      level: "Intermediate",
      topics: [
        {
          id: 5,
          name: "Linear Equations & Inequalities",
          duration: "90 min",
          completed: true,
          type: "video",
          videoId: "L_LUpnjgPso",
        },
        {
          id: 6,
          name: "Quadratic Equations",
          duration: "75 min",
          completed: true,
          type: "video",
          videoId: "YQHsXMglC9A",
        },
        {
          id: 7,
          name: "Systems of Equations",
          duration: "60 min",
          completed: false,
          type: "video",
          videoId: "ZZ5LpwO-An4",
        },
        {
          id: 8,
          name: "Functions & Coordinate Geometry",
          duration: "105 min",
          completed: false,
          type: "video",
          videoId: "2Vhx1Ea6PNo",
        },
        {
          id: 9,
          name: "Week 1 - Practice Problems",
          duration: "30 min",
          completed: false,
          type: "assignment",
          assignmentContent: {
            title: "Week 1 Practice Problems",
            description:
              "Complete the following problems to test your understanding of linear and quadratic equations.",
            problems: [
              {
                question: "Solve for x: 3x + 7 = 22",
                options: ["x = 5", "x = 7", "x = 3", "x = 15"],
                answer: "x = 5",
              },
              {
                question: "If 2x - 5 = 3x + 10, what is the value of x?",
                options: ["x = -15", "x = 15", "x = 5", "x = -5"],
                answer: "x = -15",
              },
              {
                question: "Solve: x² - 5x + 6 = 0",
                options: [
                  "x = 2 or x = 3",
                  "x = -2 or x = -3",
                  "x = 1 or x = 6",
                  "x = -1 or x = -6",
                ],
                answer: "x = 2 or x = 3",
              },
            ],
          },
        },
      ],
    },
    {
      id: 3,
      title: "Geometry Concepts",
      icon: "PieChart",
      lessons: 10,
      duration: "3h 30m",
      completed: 0,
      level: "Intermediate",
      topics: [
        {
          id: 10,
          name: "Lines, Angles & Triangles",
          duration: "50 min",
          completed: false,
          type: "video",
          videoId: "3AtDnEC4zak",
        },
        {
          id: 11,
          name: "Quadrilaterals & Polygons",
          duration: "45 min",
          completed: false,
          type: "video",
          videoId: "fJ9rUzIMcZQ",
        },
        {
          id: 12,
          name: "Circles & Arc Length",
          duration: "55 min",
          completed: false,
          type: "video",
          videoId: "kXpzp4FozA4",
        },
        {
          id: 13,
          name: "3D Geometry & Volume",
          duration: "60 min",
          completed: false,
          type: "video",
          videoId: "FTl0tl9BGdc",
        },
      ],
    },
    {
      id: 4,
      title: "Data Analysis & Statistics",
      icon: "BarChart",
      lessons: 8,
      duration: "3h 00m",
      completed: 0,
      level: "Advanced",
      topics: [
        {
          id: 14,
          name: "Statistics & Probability",
          duration: "70 min",
          completed: false,
          type: "video",
          videoId: "uhxtUt_-GyM",
        },
        {
          id: 15,
          name: "Data Interpretation",
          duration: "45 min",
          completed: false,
          type: "video",
          videoId: "bkNTGzE7JSc",
        },
        {
          id: 16,
          name: "Graphs & Charts",
          duration: "35 min",
          completed: false,
          type: "video",
          videoId: "5c5pOnjbF7U",
        },
        {
          id: 17,
          name: "Week 2 - Assignments",
          duration: "30 min",
          completed: false,
          type: "assignment",
          assignmentContent: {
            title: "Week 2 Data Analysis Assignment",
            description:
              "Apply your knowledge of statistics and probability to solve these problems.",
            problems: [
              {
                question:
                  "What is the mean of the following data set: 4, 8, 6, 5, 3, 7?",
                options: ["5.5", "6", "5", "6.5"],
                answer: "5.5",
              },
              {
                question:
                  "If you flip a fair coin twice, what is the probability of getting heads both times?",
                options: ["1/2", "1/4", "1/3", "1/8"],
                answer: "1/4",
              },
              {
                question: "What is the median of: 12, 15, 18, 20, 22, 25?",
                options: ["18", "19", "20", "18.5"],
                answer: "19",
              },
            ],
          },
        },
      ],
    },
  ];
  useEffect(() => {
    if (selectedLesson) {
      for (const module of modules) {
        const lesson = module.topics.find((t) => t.id === selectedLesson.id);
        if (lesson) {
          setLocalSelectedLesson(lesson);
          setExpandedModule(module.id);
          break;
        }
      }
    } else {
      const firstLesson = modules[0].topics[0];
      setLocalSelectedLesson(firstLesson);
      setExpandedModule(modules[0].id);
    }
  }, [selectedLesson]);
  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to light mode
      setIsDarkMode(false);
    }
  }, []);
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  const calculateProgress = () => {
    const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons, 0);
    const completedLessonsFromModules = modules.reduce(
      (acc, mod) => acc + mod.completed,
      0
    );
    const userCompletedCount = completedLessons.size;
    const totalProgress =
      (completedLessonsFromModules + userCompletedCount) / 2;
    return Math.round((totalProgress / totalLessons) * 100);
  };
  const toggleLessonComplete = (topicId) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };
  const isLessonCompleted = (topicId) => completedLessons.has(topicId);
  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };
  if (!localSelectedLesson) return null;
  const getThemeStyles = {
    /* ---------- Backgrounds ---------- */
    bgPrimary: isDarkMode ? "bg-neutral-900" : "bg-slate-100",
    bgSecondary: isDarkMode ? "bg-neutral-800" : "bg-slate-50",
    bgCard: isDarkMode
      ? "bg-neutral-800/90 backdrop-blur"
      : "bg-white/90 backdrop-blur shadow-sm",
    bgSidebar: isDarkMode
      ? "bg-neutral-800 border-r border-neutral-700"
      : "bg-slate-50 border-r border-slate-200",
    bgHeader: isDarkMode
      ? "bg-neutral-800/80 backdrop-blur-md border-b border-neutral-700"
      : "bg-white/70 backdrop-blur-md border-b border-slate-200",
    contentBg: isDarkMode
      ? "bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800"
      : "bg-gradient-to-br from-white via-slate-50 to-slate-100",
    /* ---------- Text (reduced glare) ---------- */
    textPrimary: isDarkMode ? "text-neutral-100" : "text-slate-900",
    textSecondary: isDarkMode ? "text-slate-300" : "text-slate-600",
    textMuted: isDarkMode ? "text-neutral-500" : "text-slate-400",
    /* ---------- Borders (soft) ---------- */
    borderPrimary: isDarkMode ? "border-neutral-700" : "border-slate-200",
    borderSecondary: isDarkMode ? "border-neutral-500" : "border-blue-300",
    /* ---------- Icons (not too sharp) ---------- */
    iconPrimary: isDarkMode ? "text-neutral-300" : "text-slate-700",
    iconSecondary: isDarkMode ? "text-neutral-400" : "text-slate-500",
    iconBlue: isDarkMode ? "text-blue-400" : "text-blue-600",
    iconGreen: isDarkMode ? "text-emerald-400" : "text-emerald-600",
    iconAmber: isDarkMode ? "text-red-400" : "text-red-600",
    iconPurple: isDarkMode ? "text-purple-400" : "text-purple-700",
    /* ---------- Buttons ---------- */
    btnBg: isDarkMode
      ? "bg-neutral-700/70 hover:bg-neutral-600/80 border border-neutral-600"
      : "bg-white/80 hover:bg-slate-100 border border-slate-300 shadow-sm",
    btnBgAlt: isDarkMode
      ? "bg-neutral-700/40 hover:bg-neutral-600/50"
      : "bg-slate-50 hover:bg-slate-100",
    /* ---------- States ---------- */
    progressBg: isDarkMode ? "bg-neutral-700" : "bg-slate-200",
    activeBg: isDarkMode ? "bg-neutral-700/60" : "bg-blue-50",
    /* ---------- Hovers ---------- */
    hoverBg: isDarkMode ? "hover:bg-neutral-700" : "hover:bg-slate-100",
    /* ---------- Scrollbar ---------- */
    scrollbarThumb: isDarkMode
      ? "scrollbar-thumb-neutral-600 scrollbar-track-neutral-800"
      : "scrollbar-thumb-slate-400 scrollbar-track-slate-200",
    /* ---------- Premium Shadows ---------- */
    shadowSm: isDarkMode
      ? "shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
      : "shadow-[0_2px_6px_rgba(15,23,42,0.08)]",

    shadowMd: isDarkMode
      ? "shadow-[0_8px_20px_rgba(0,0,0,0.55)]"
      : "shadow-[0_6px_16px_rgba(15,23,42,0.10)]",

    shadowLg: isDarkMode
      ? "shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
      : "shadow-[0_12px_30px_rgba(15,23,42,0.12)]",

    shadowXl: isDarkMode
      ? "shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
      : "shadow-[0_20px_40px_rgba(15,23,42,0.14)]",

    shadow2Xl: isDarkMode
      ? "shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
      : "shadow-[0_30px_60px_rgba(15,23,42,0.16)]",
  };

  const getLessonIcon = (topic) => {
    if (topic.type === "assignment") {
      return <FileText className={`w-4 h-4 ${getThemeStyles.iconGreen}`} />;
    }
    return <Play className={`w-4 h-4 ${getThemeStyles.iconAmber}`} />;
  };
  const blueAccent = isDarkMode ? "text-blue-400" : "text-blue-700";
  const blueActiveText = isDarkMode ? "text-blue-300" : "text-blue-800";
  const activeTabBg = isDarkMode ? "bg-neutral-900/30" : "bg-blue-50/50";
  const moduleActiveBg = isDarkMode
    ? "bg-neutral-700/50 border border-blue-500/30"
    : "bg-blue-50/50 border border-blue-200";
  const lessonActiveBg = isDarkMode
    ? "bg-neutral-600 border-l-2 border-blue-600"
    : "bg-blue-50 border-l-2 border-blue-600";
  return (
    <div
      className={`fixed inset-0 z-50 ${getThemeStyles.bgPrimary} transition-colors duration-300 flex flex-col`}
    >
      {/* Top Header */}
      <div
        className={`h-14 sm:h-16 ${getThemeStyles.bgHeader} ${getThemeStyles.borderPrimary} flex items-center px-3 sm:px-6 justify-between ${getThemeStyles.shadowMd}`}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 md:hidden hover:${
              isDarkMode ? "bg-neutral-700" : "bg-slate-100"
            }`}
            aria-label="Toggle sidebar"
          >
            <Menu className={`w-4 h-4 sm:w-5 sm:h-5 ${getThemeStyles.iconPrimary}`} />
          </button>
          <h1 className={`text-sm sm:text-lg font-bold ${getThemeStyles.textPrimary} truncate`}>
            GMAT Quant Master
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
      ${getThemeStyles.btnBg}
      hover:scale-[1.02] active:scale-[0.98]`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-yellow-400 hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className={`w-3 h-3 sm:w-4 sm:h-4 ${getThemeStyles.iconPrimary}`} />
                <span className={`${getThemeStyles.textPrimary} hidden sm:inline`}>Dark</span>
              </>
            )}
          </button>

          {/* Mobile Theme Toggle Icon */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`sm:hidden p-2 rounded-lg transition-all ${getThemeStyles.btnBg}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className={`w-4 h-4 ${getThemeStyles.iconPrimary}`} />
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
      ${getThemeStyles.btnBg}
      hover:scale-[1.02] active:scale-[0.98]`}
            aria-label="Close player"
          >
            <X className={`w-3 h-3 sm:w-4 sm:h-4 ${getThemeStyles.iconPrimary}`} />
            <span className={`${getThemeStyles.textPrimary} hidden sm:inline`}>Close</span>
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className={`sm:hidden p-2 rounded-lg transition-all ${getThemeStyles.btnBg}`}
            aria-label="Close player"
          >
            <X className={`w-4 h-4 ${getThemeStyles.iconPrimary}`} />
          </button>
        </div>
      </div>
      <div className="flex flex-1 h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static inset-y-14 sm:inset-y-16 left-0 ${
            sidebarOpen ? "w-64 sm:w-72 md:w-88" : "w-0 md:w-0"
          } transition-all duration-300 ${getThemeStyles.bgSidebar} border-r ${
            getThemeStyles.borderPrimary
          } overflow-hidden flex flex-col z-40 md:z-0 ${getThemeStyles.shadowXl}`}
        >
          <div
            className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full ${getThemeStyles.scrollbarThumb}`}
          >
            {/* Progress */}
            <div className={`p-4 sm:p-6 border-b ${getThemeStyles.borderPrimary}`}>
              <div
                className={`w-full ${getThemeStyles.progressBg} rounded-full h-2.5 mb-3 ${getThemeStyles.shadowSm}`}
              >
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-700 shadow-md"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <p
                className={`text-xs sm:text-sm font-semibold ${getThemeStyles.textSecondary}`}
              >
                <span className={`${blueAccent} font-bold`}>
                  {calculateProgress()}%
                </span>{" "}
                completed •{" "}
                <span className={getThemeStyles.textPrimary}>67h 29m</span>
              </p>
            </div>
            {/* Modules & Lessons */}
            <div className="p-3 sm:p-4 space-y-1">
              {modules.map((module) => {
                const isExpanded = expandedModule === module.id;
                const isActiveModule = module.topics.some(
                  (t) => t.id === localSelectedLesson?.id
                );
                const totalTopics = module.topics.length;
                const completedTopics = module.topics.filter((t) =>
                  isLessonCompleted(t.id)
                ).length;
                return (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-lg transition-all group ${
                        isActiveModule
                          ? moduleActiveBg
                          : getThemeStyles.btnBgAlt
                      } ${getThemeStyles.shadowSm}`}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <ChevronRight
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform flex-shrink-0 ${
                            isExpanded
                              ? `rotate-90 ${blueAccent}`
                              : getThemeStyles.iconSecondary
                          }`}
                        />
                        {isExpanded ? (
                          <FolderOpen
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${getThemeStyles.iconSecondary} flex-shrink-0`}
                          />
                        ) : (
                          <Folder
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${getThemeStyles.iconBlue} flex-shrink-0`}
                          />
                        )}
                        <span
                          className={`font-medium text-xs sm:text-sm truncate ${getThemeStyles.textPrimary}`}
                        >
                          {module.title}
                        </span>
                      </div>
                      <span
                        className={`text-xs ${getThemeStyles.textSecondary} flex-shrink-0 ml-2`}
                      >
                        {completedTopics}/{totalTopics}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-[600px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div
                        className={`ml-4 sm:ml-5 space-y-0.5 mt-0.5 border-l ${getThemeStyles.borderSecondary} pl-3 sm:pl-4`}
                      >
                        {module.topics.map((topic) => {
                          const isActive = localSelectedLesson?.id === topic.id;
                          const isCompleted = isLessonCompleted(topic.id);
                          return (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setLocalSelectedLesson(topic);
                                if (window.innerWidth < 768) setSidebarOpen(false);
                              }}
                              className={`w-full flex items-center gap-2 p-2 sm:p-2.5 rounded-lg text-left transition-all group ${
                                isActive
                                  ? lessonActiveBg
                                  : getThemeStyles.btnBgAlt
                              } ${getThemeStyles.shadowSm}`}
                            >
                              <div className="flex-shrink-0">
                                {getLessonIcon(topic)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-xs sm:text-sm font-normal truncate ${
                                    isCompleted
                                      ? getThemeStyles.textMuted
                                      : isActive
                                      ? `${blueActiveText} font-medium`
                                      : getThemeStyles.textSecondary
                                  } transition-colors`}
                                >
                                  {topic.name}
                                </p>
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLessonComplete(topic.id);
                                }}
                                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${
                                  isCompleted
                                    ? "bg-green-600 border-green-600"
                                    : isDarkMode
                                    ? "border-neutral-600 hover:border-neutral-500"
                                    : "border-slate-400 hover:border-slate-500"
                                }`}
                              >
                                {isCompleted && (
                                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Certificate */}
            <div className={`p-3 sm:p-4 border-t ${getThemeStyles.borderPrimary}`}>
              <button
                className={`w-full flex items-center gap-3 p-2 sm:p-3 rounded-lg transition-colors ${getThemeStyles.btnBgAlt} ${getThemeStyles.shadowSm}`}
              >
                <Award className={`w-4 h-4 sm:w-5 sm:h-5 ${getThemeStyles.iconBlue} flex-shrink-0`} />
                <span className={`font-semibold text-xs sm:text-sm ${getThemeStyles.textPrimary}`}>
                  Certificate
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-y-auto transition-colors duration-300 scrollbar-thin scrollbar-thumb-rounded-full ${getThemeStyles.scrollbarThumb} ${getThemeStyles.contentBg}`}
        >
          {localSelectedLesson.type === "video" ? (
            <div className="p-4 sm:p-6 md:p-8 w-full">
              <div className="max-w-full lg:max-w-6xl mx-auto">
                <div
                  className={`relative bg-black rounded-lg sm:rounded-2xl overflow-hidden ${getThemeStyles.shadow2Xl} mb-6 sm:mb-8`}
                >
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${localSelectedLesson.videoId}?autoplay=0&rel=0`}
                      title={localSelectedLesson.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="space-y-6 sm:space-y-8">
                  <div className="mb-6 sm:mb-8">
                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl font-bold ${getThemeStyles.textPrimary} mb-3 sm:mb-4`}
                    >
                      {localSelectedLesson.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
                      <span
                        className={`flex items-center gap-2 ${getThemeStyles.textSecondary}`}
                      >
                        <Clock
                          className={`w-4 h-4 flex-shrink-0 ${getThemeStyles.iconSecondary}`}
                        />{" "}
                        {localSelectedLesson.duration}
                      </span>
                      <span
                        className={`flex items-center gap-2 ${getThemeStyles.textSecondary}`}
                      >
                        <BookOpen
                          className={`w-4 h-4 flex-shrink-0 ${getThemeStyles.iconSecondary}`}
                        />{" "}
                        Module{" "}
                        {modules.findIndex((m) =>
                          m.topics.some((t) => t.id === localSelectedLesson.id)
                        ) + 1}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex gap-1 border-b ${getThemeStyles.borderSecondary} mb-6 sm:mb-8 pb-2 overflow-x-auto`}
                  >
                    {["Overview", "Resources", "Notes"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all relative shadow-sm rounded-t-lg text-xs sm:text-base whitespace-nowrap ${
                          activeTab === tab
                            ? `${blueActiveText} ${activeTabBg}`
                            : `${getThemeStyles.textSecondary} hover:${getThemeStyles.textPrimary} ${getThemeStyles.hoverBg}`
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="min-h-96">
                    {activeTab === "Overview" && (
                      <div className="max-w-none space-y-4 sm:space-y-6">
                        <h3
                          className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${getThemeStyles.textPrimary}`}
                        >
                          About this lesson
                        </h3>
                        <p
                          className={`text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${getThemeStyles.textSecondary}`}
                        >
                          This comprehensive video lesson covers essential
                          concepts and problem-solving techniques. Follow along
                          with detailed examples and practice problems to master
                          the material.
                        </p>
                        <h3
                          className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${getThemeStyles.textPrimary}`}
                        >
                          What you'll learn
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                          { [
  "Core concepts and fundamental principles",
  "Step-by-step problem solving strategies",
  "Common mistakes and how to avoid them",
  "Practice problems with detailed solutions",
].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <Check
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${getThemeStyles.iconGreen} flex-shrink-0 mt-0.5`}
                              />
                              <span className={`text-sm sm:text-base ${getThemeStyles.textSecondary}`}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTab === "Resources" && (
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${getThemeStyles.textPrimary}`}
                        >
                          Lesson Resources
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                          <button
                            className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all group border ${
                              isDarkMode
                                ? "bg-neutral-700 hover:bg-neutral-600 border-neutral-600"
                                : "bg-white hover:bg-blue-50 border-slate-200"
                            } ${getThemeStyles.shadowMd}`}
                          >
                            <div
                              className={`p-3 sm:p-4 inline-flex ${
                                isDarkMode ? "bg-blue-900/50" : "bg-blue-50"
                              } rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                            >
                              <FileText
                                className={`w-6 h-6 sm:w-8 sm:h-8 ${getThemeStyles.iconBlue}`}
                              />
                            </div>
                            <p
                              className={`font-semibold text-base sm:text-lg ${getThemeStyles.textPrimary}`}
                            >
                              Download Notes
                            </p>
                            <p
                              className={`text-xs sm:text-sm mt-1 ${getThemeStyles.textSecondary}`}
                            >
                              Comprehensive PDF summary with key formulas and
                              examples
                            </p>
                          </button>
                          <button
                            className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all group border ${
                              isDarkMode
                                ? "bg-neutral-700 hover:bg-neutral-600 border-neutral-600"
                                : "bg-white hover:bg-blue-50 border-slate-200"
                            } ${getThemeStyles.shadowMd}`}
                          >
                            <div
                              className={`p-3 sm:p-4 inline-flex ${
                                isDarkMode ? "bg-purple-900/50" : "bg-purple-50"
                              } rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                            >
                              <BookOpen
                                className={`w-6 h-6 sm:w-8 sm:h-8 ${getThemeStyles.iconPurple}`}
                              />
                            </div>
                            <p
                              className={`font-semibold text-base sm:text-lg ${getThemeStyles.textPrimary}`}
                            >
                              Practice Quiz
                            </p>
                            <p
                              className={`text-xs sm:text-sm mt-1 ${getThemeStyles.textSecondary}`}
                            >
                              20+ adaptive questions to test your understanding
                            </p>
                          </button>
                        </div>
                      </div>
                    )}
                    {activeTab === "Notes" && (
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${getThemeStyles.textPrimary} flex items-center gap-3`}
                        >
                          <FileText
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${getThemeStyles.iconBlue}`}
                          />
                          My Notes
                        </h3>
                        <textarea
                          placeholder="Start typing your notes here...\n\n• Use bullet points for key takeaways\n• Jot down formulas and shortcuts\n• Add your own examples"
                          className={`w-full min-h-64 sm:min-h-96 px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 transition-all resize-none focus:outline-none focus:ring-4 focus:border-transparent text-sm sm:text-base ${
                            isDarkMode
                              ? "bg-neutral-900 border-neutral-600 text-neutral-100 placeholder-neutral-500 focus:ring-blue-900/50 focus:border-blue-500"
                              : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:ring-blue-500/20 focus:border-blue-500"
                          } ${getThemeStyles.shadowMd}`}
                          defaultValue=""
                        />
                        <div className="mt-4">
                          <p className={`text-xs sm:text-sm ${getThemeStyles.textMuted}`}>
                            Your notes are saved automatically
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : localSelectedLesson.type === "assignment" ? (
            <div className="p-4 sm:p-6 md:p-8 w-full">
              <div className="max-w-full lg:max-w-6xl mx-auto">
                {(() => {
                  const problems =
                    localSelectedLesson.assignmentContent?.problems || [];
                  if (problems.length === 0) {
                    return (
                      <div className="text-center py-20">
                        <p className={getThemeStyles.textMuted}>
                          No questions available.
                        </p>
                      </div>
                    );
                  }
                  const currentProblem = problems[currentQuestionIndex];
                  const selectedOption = answers[currentQuestionIndex];
                  const handleSelectOption = (optionIndex) => {
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestionIndex]: optionIndex,
                    }));
                  };
                  const handlePrevious = () => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                    }
                  };
                  const isLastQuestion =
                    currentQuestionIndex === problems.length - 1;
                  const navBtnClasses = isDarkMode
                    ? "bg-neutral-800/95 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                    : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300";
                  return (
                    <div className="relative">
                      <div
                        className={`${getThemeStyles.bgCard} rounded-lg sm:rounded-2xl ${getThemeStyles.shadowXl} overflow-hidden border ${getThemeStyles.borderPrimary}`}
                      >
                        <div
                          className={`px-4 sm:px-10 pt-6 sm:pt-10 pb-4 sm:pb-6 border-b ${getThemeStyles.borderPrimary}`}
                        >
                          <p
                            className={`text-xs sm:text-sm font-medium ${getThemeStyles.textSecondary}`}
                          >
                            Question {currentQuestionIndex + 1} of{" "}
                            {problems.length}
                          </p>
                          <h2
                            className={`mt-3 sm:mt-4 text-xl sm:text-3xl font-bold ${getThemeStyles.textPrimary}`}
                          >
                            {localSelectedLesson.assignmentContent?.title}
                          </h2>
                          <p
                            className={`mt-2 sm:mt-3 text-sm sm:text-lg ${getThemeStyles.textSecondary}`}
                          >
                            {localSelectedLesson.assignmentContent?.description}
                          </p>
                        </div>
                        <div className="p-4 sm:p-10">
                          <h3
                            className={`text-lg sm:text-2xl font-semibold mb-6 sm:mb-10 leading-relaxed ${getThemeStyles.textPrimary}`}
                          >
                            {currentProblem.question}
                          </h3>
                          <div className="space-y-4 sm:space-y-6">
                            {currentProblem.options.map((option, optIdx) => {
                              const isSelected = selectedOption === optIdx;
                              return (
                                <label
                                  key={optIdx}
                                  className="flex items-start gap-3 sm:gap-5 cursor-pointer group transition-all p-2 sm:p-3 rounded-lg hover:bg-opacity-50"
                                >
                                  <div className="flex-shrink-0 mt-1">
                                    <div
                                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                                        isSelected
                                          ? "border-blue-700 bg-blue-700"
                                          : isDarkMode
                                          ? "border-neutral-500 group-hover:border-neutral-400"
                                          : "border-slate-500 group-hover:border-slate-600"
                                      }`}
                                    >
                                      {isSelected && (
                                        <div
                                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                                            isDarkMode
                                              ? "bg-neutral-900"
                                              : "bg-white"
                                          }`}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <span
                                    className={`text-sm sm:text-lg leading-relaxed transition-all ${
                                      isSelected
                                        ? `${blueActiveText} font-medium`
                                        : getThemeStyles.textSecondary
                                    } group-hover:${getThemeStyles.textPrimary}`}
                                  >
                                    {option}
                                  </span>
                                  <input
                                    type="radio"
                                    name="current-question"
                                    value={optIdx}
                                    checked={isSelected}
                                    onChange={() => handleSelectOption(optIdx)}
                                    className="sr-only"
                                  />
                                </label>
                              );
                            })}
                          </div>
                          {isLastQuestion && (
                            <div className="mt-10 sm:mt-16 flex justify-center">
                              <button
                                className={`px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-sm sm:text-lg rounded-lg sm:rounded-xl ${getThemeStyles.shadowXl} transition-all active:scale-95`}
                              >
                                Submit Assignment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {currentQuestionIndex > 0 && (
                        <button
                          onClick={handlePrevious}
                          className={`absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-1/2
  w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all
  ${navBtnClasses}
  ${getThemeStyles.shadow2Xl} active:scale-95`}
                          aria-label="Previous question"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 rotate-180" />
                        </button>
                      )}
                      {!isLastQuestion && selectedOption !== undefined && (
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex(currentQuestionIndex + 1)
                          }
                          className={`absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${navBtnClasses} ${getThemeStyles.shadow2Xl} active:scale-95`}
                          aria-label="Next question"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
              <div className="text-center max-w-md">
                <BookOpen
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 ${getThemeStyles.textMuted}`}
                />
                <h2
                  className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 ${getThemeStyles.textPrimary}`}
                >
                  Select a lesson to begin
                </h2>
                <p className={`text-base sm:text-lg ${getThemeStyles.textSecondary}`}>
                  Choose a video lesson or assignment from the sidebar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LessonPlayer;