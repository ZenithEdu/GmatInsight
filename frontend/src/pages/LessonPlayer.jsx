import React, { useState, useEffect } from "react";
import {
  Menu,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  FileText,
  Clock,
  BookOpen,
  Check,
  Play,
  Folder,
  FolderOpen,
  Sun,
  Moon,
  Award,
  X,
  ArrowRight,
} from "lucide-react";

const LessonPlayer = ({ selectedLesson, onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
          videoId: "dQw4w9WgXcQ",
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
          videoId: "G3kavpMlhKM",
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

  // Helper function to get styles based on theme
  const getThemeStyles = {
    // Background colors
    bgPrimary: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    bgSecondary: isDarkMode ? "bg-gray-800" : "bg-white",
    bgCard: isDarkMode ? "bg-gray-800" : "bg-white",
    bgSidebar: isDarkMode ? "bg-gray-800" : "bg-white",
    bgHeader: isDarkMode ? "bg-gray-800" : "bg-white",
    
    // Text colors
    textPrimary: isDarkMode ? "text-gray-100" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    textMuted: isDarkMode ? "text-gray-500" : "text-gray-500",
    
    // Border colors
    borderPrimary: isDarkMode ? "border-gray-700" : "border-gray-200",
    borderSecondary: isDarkMode ? "border-gray-600" : "border-gray-300",
    
    // Icon colors
    iconPrimary: isDarkMode ? "text-gray-300" : "text-gray-700",
    iconSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    iconBlue: isDarkMode ? "text-blue-400" : "text-blue-700",
    iconGreen: isDarkMode ? "text-green-400" : "text-green-700",
    iconAmber: isDarkMode ? "text-amber-400" : "text-amber-700",
    
    // Button backgrounds
    btnBg: isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200",
    btnBgAlt: isDarkMode ? "bg-gray-700/50 hover:bg-gray-600/50" : "bg-gray-50 hover:bg-gray-100",
    
    // Special colors
    progressBg: isDarkMode ? "bg-gray-700" : "bg-blue-50",
    activeBg: isDarkMode ? "bg-gray-700" : "bg-blue-50",
    scrollbarThumb: isDarkMode ? "scrollbar-thumb-gray-600" : "scrollbar-thumb-gray-300"
  };

  const getLessonIcon = (topic) => {
    if (topic.type === "assignment") {
      return (
        <FileText className={`w-4 h-4 ${getThemeStyles.iconAmber}`} />
      );
    }
    return <Play className={`w-4 h-4 ${getThemeStyles.iconBlue}`} />;
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${getThemeStyles.bgPrimary} transition-colors duration-300`}
    >
      {/* Top Header */}
      <div
        className={`h-16 border-b ${getThemeStyles.bgHeader} ${getThemeStyles.borderPrimary} flex items-center px-6 justify-between shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors lg:hidden ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            aria-label="Toggle sidebar"
          >
            <Menu className={`w-5 h-5 ${getThemeStyles.iconPrimary}`} />
          </button>

          <h1 className={`text-lg font-bold ${getThemeStyles.textPrimary}`}>
            GMAT Quant Master Course
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl transition-all ${getThemeStyles.btnBg}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className={`w-5 h-5 ${getThemeStyles.iconPrimary}`} />
            )}
          </button>

          <button
            onClick={onClose}
            className={`p-3 rounded-xl transition-all ${getThemeStyles.btnBg}`}
            aria-label="Close lesson player"
          >
            <X className={`w-5 h-5 ${getThemeStyles.iconPrimary}`} />
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "w-96" : "w-0"
          } transition-all duration-300 ${getThemeStyles.bgSidebar} border-r ${getThemeStyles.borderPrimary} overflow-hidden flex flex-col`}
        >
          <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded ${getThemeStyles.scrollbarThumb}`}>
            {/* Progress */}
            <div className={`p-6 border-b ${getThemeStyles.borderPrimary}`}>
              <div
                className={`w-full ${getThemeStyles.progressBg} rounded-full h-2.5 mb-3`}
              >
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <p className={`text-sm font-semibold ${getThemeStyles.textSecondary}`}>
                <span className="text-blue-700 font-bold">
                  {calculateProgress()}%
                </span>{" "}
                completed •{" "}
                <span className={getThemeStyles.textPrimary}>
                  67h 29m
                </span>
              </p>
            </div>

            {/* Discussions */}
            <div className={`p-4 border-b ${getThemeStyles.borderPrimary}`}>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${getThemeStyles.btnBgAlt}`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className={`w-5 h-5 ${getThemeStyles.iconBlue}`} />
                  <span className={`font-semibold ${getThemeStyles.textPrimary}`}>
                    Course Discussions
                  </span>
                </div>
                <ExternalLink className={`w-4 h-4 ${getThemeStyles.iconSecondary}`} />
              </button>
            </div>

            {/* Modules & Lessons */}
            <div className="p-4 space-y-1">
              {modules.map((module) => {
                const isExpanded = expandedModule === module.id;
                const isActiveModule = module.topics.some(
                  (t) => t.id === localSelectedLesson?.id
                );

                return (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={`w-full flex items-center gap-2 p-2.5 rounded-lg transition-all group ${
                        isActiveModule
                          ? isDarkMode
                            ? "bg-gray-700/50"
                            : "bg-blue-50 border border-blue-100"
                          : getThemeStyles.btnBgAlt
                      }`}
                    >
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform flex-shrink-0 ${
                          isExpanded
                            ? "rotate-90 text-blue-700"
                            : getThemeStyles.textSecondary
                        }`}
                      />
                      {isExpanded ? (
                        <FolderOpen className={`w-4 h-4 ${getThemeStyles.iconBlue} flex-shrink-0`} />
                      ) : (
                        <Folder className={`w-4 h-4 ${getThemeStyles.iconSecondary} flex-shrink-0`} />
                      )}
                      <span
                        className={`font-medium text-sm truncate flex-1 text-left ${getThemeStyles.textPrimary}`}
                      >
                        {module.title}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-[600px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-5 space-y-0.5 mt-0.5">
                        {module.topics.map((topic) => {
                          const isActive = localSelectedLesson?.id === topic.id;
                          const isCompleted = isLessonCompleted(topic.id);

                          return (
                            <button
                              key={topic.id}
                              onClick={() => setLocalSelectedLesson(topic)}
                              className={`w-full flex items-center gap-2 p-2.5 rounded-lg text-left transition-all group ${
                                isActive
                                  ? isDarkMode
                                    ? "bg-gray-700"
                                    : "bg-blue-50 border border-blue-100"
                                  : getThemeStyles.btnBgAlt
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {getLessonIcon(topic)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-normal truncate ${
                                    isCompleted
                                      ? "text-gray-500"
                                      : isActive
                                      ? "text-blue-800 font-medium"
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
                                    ? "border-gray-600 hover:border-gray-500"
                                    : "border-gray-400 hover:border-gray-500"
                                }`}
                              >
                                {isCompleted && (
                                  <Check className="w-3 h-3 text-white stroke-[3]" />
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
            <div className={`p-4 border-t ${getThemeStyles.borderPrimary}`}>
              <button
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${getThemeStyles.btnBgAlt}`}
              >
                <Award className={`w-5 h-5 ${getThemeStyles.iconBlue}`} />
                <span className={`font-semibold ${getThemeStyles.textPrimary}`}>
                  Certificate of Completion
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-y-auto transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-900 to-gray-800"
              : "bg-gradient-to-br from-gray-50 to-gray-100"
          }`}
        >
          {localSelectedLesson.type === "video" ? (
            <div className="p-8 max-w-6xl mx-auto w-full">
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
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

              <div
                className={`${getThemeStyles.bgCard} rounded-2xl shadow-lg p-8 border ${getThemeStyles.borderPrimary}`}
              >
                <div className="mb-8">
                  <h2 className={`text-3xl font-bold ${getThemeStyles.textPrimary} mb-4`}>
                    {localSelectedLesson.name}
                  </h2>
                  <div className="flex items-center gap-6 text-sm">
                    <span className={`flex items-center gap-2 ${getThemeStyles.textSecondary}`}>
                      <Clock className={`w-4 h-4 ${getThemeStyles.iconSecondary}`} />{" "}
                      {localSelectedLesson.duration}
                    </span>
                    <span className={`flex items-center gap-2 ${getThemeStyles.textSecondary}`}>
                      <BookOpen className={`w-4 h-4 ${getThemeStyles.iconSecondary}`} /> Module{" "}
                      {modules.findIndex((m) =>
                        m.topics.some((t) => t.id === localSelectedLesson.id)
                      ) + 1}
                    </span>
                  </div>
                </div>

                <div className={`flex gap-1 border-b ${getThemeStyles.borderSecondary} mb-8`}>
                  {["Overview", "Resources", "Notes"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-semibold transition-all relative ${
                        activeTab === tab
                          ? "text-blue-800"
                          : `${getThemeStyles.textSecondary} hover:${getThemeStyles.textPrimary}`
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
                    <div className="max-w-none">
                      <h3 className={`text-xl font-semibold mb-4 ${getThemeStyles.textPrimary}`}>
                        About this lesson
                      </h3>
                      <p className={`leading-relaxed mb-8 ${getThemeStyles.textSecondary}`}>
                        This comprehensive video lesson covers essential
                        concepts and problem-solving techniques. Follow along
                        with detailed examples and practice problems to master
                        the material.
                      </p>
                      <h3 className={`text-xl font-semibold mb-4 ${getThemeStyles.textPrimary}`}>
                        What you'll learn
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Core concepts and fundamental principles",
                          "Step-by-step problem solving strategies",
                          "Common mistakes and how to avoid them",
                          "Practice problems with detailed solutions",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 ${getThemeStyles.iconGreen} flex-shrink-0 mt-0.5`} />
                            <span className={getThemeStyles.textSecondary}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === "Resources" && (
                    <div>
                      <h3 className={`text-xl font-semibold mb-6 ${getThemeStyles.textPrimary}`}>
                        Lesson Resources
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <button
                          className={`p-6 rounded-2xl shadow-md transition-all group border ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                              : "bg-white hover:bg-blue-50 border-gray-200"
                          }`}
                        >
                          <div className={`p-4 inline-flex ${
                            isDarkMode ? "bg-blue-900/50" : "bg-blue-50"
                          } rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                            <FileText className={`w-8 h-8 ${getThemeStyles.iconBlue}`} />
                          </div>
                          <p className={`font-semibold text-lg ${getThemeStyles.textPrimary}`}>
                            Download Notes
                          </p>
                          <p className={`text-sm mt-1 ${getThemeStyles.textSecondary}`}>
                            Comprehensive PDF summary with key formulas and
                            examples
                          </p>
                        </button>

                        <button
                          className={`p-6 rounded-2xl shadow-md transition-all group border ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 border-gray-600"
                              : "bg-white hover:bg-blue-50 border-gray-200"
                          }`}
                        >
                          <div className={`p-4 inline-flex ${
                            isDarkMode ? "bg-purple-900/50" : "bg-purple-50"
                          } rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                            <BookOpen className="w-8 h-8 text-purple-700" />
                          </div>
                          <p className={`font-semibold text-lg ${getThemeStyles.textPrimary}`}>
                            Practice Quiz
                          </p>
                          <p className={`text-sm mt-1 ${getThemeStyles.textSecondary}`}>
                            20+ adaptive questions to test your understanding
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "Notes" && (
                    <div>
                      <h3 className={`text-xl font-semibold mb-6 ${getThemeStyles.textPrimary} flex items-center gap-3`}>
                        <FileText className={`w-6 h-6 ${getThemeStyles.iconBlue}`} />
                        My Notes
                      </h3>
                      <textarea
                        placeholder="Start typing your notes here...\n\n• Use bullet points for key takeaways\n• Jot down formulas and shortcuts\n• Add your own examples"
                        className={`w-full min-h-96 px-5 py-4 rounded-xl border-2 transition-all resize-none focus:outline-none focus:ring-4 focus:border-transparent ${
                          isDarkMode
                            ? "bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-500 focus:ring-blue-900/50 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/20 focus:border-blue-500"
                        }`}
                        defaultValue=""
                      />
                      <div className="mt-4">
                        <p className={`text-sm ${getThemeStyles.textMuted}`}>
                          Your notes are saved automatically
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : localSelectedLesson.type === "assignment" ? (
            <div className="p-8 max-w-6xl mx-auto w-full">
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

                return (
                  <div className="relative">
                    <div
                      className={`${getThemeStyles.bgCard} rounded-2xl shadow-lg overflow-hidden border ${getThemeStyles.borderPrimary}`}
                    >
                      <div className={`px-10 pt-10 pb-6 border-b ${getThemeStyles.borderPrimary}`}>
                        <p className={`text-sm font-medium ${getThemeStyles.textSecondary}`}>
                          Question {currentQuestionIndex + 1} of{" "}
                          {problems.length}
                        </p>
                        <h2 className={`mt-4 text-3xl font-bold ${getThemeStyles.textPrimary}`}>
                          {localSelectedLesson.assignmentContent?.title}
                        </h2>
                        <p className={`mt-3 text-lg ${getThemeStyles.textSecondary}`}>
                          {localSelectedLesson.assignmentContent?.description}
                        </p>
                      </div>

                      <div className="p-10">
                        <h3 className={`text-2xl font-semibold mb-10 leading-relaxed ${getThemeStyles.textPrimary}`}>
                          {currentProblem.question}
                        </h3>

                        <div className="space-y-6">
                          {currentProblem.options.map((option, optIdx) => {
                            const isSelected = selectedOption === optIdx;
                            return (
                              <label
                                key={optIdx}
                                className="flex items-start gap-5 cursor-pointer group transition-all"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                      isSelected
                                        ? "border-blue-700 bg-blue-700"
                                        : isDarkMode
                                        ? "border-gray-500 group-hover:border-gray-400"
                                        : "border-gray-500 group-hover:border-gray-600"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div
                                        className={`w-3 h-3 rounded-full ${
                                          isDarkMode
                                            ? "bg-gray-900"
                                            : "bg-white"
                                        }`}
                                      />
                                    )}
                                  </div>
                                </div>
                                <span
                                  className={`text-lg leading-relaxed transition-all ${
                                    isSelected
                                      ? "text-blue-800 font-medium"
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
                          <div className="mt-16 flex justify-center">
                            <button className="px-12 py-4 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all">
                              Submit Assignment
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handlePrevious}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                          isDarkMode
                            ? "bg-gray-800/95 hover:bg-gray-700 text-gray-200 border border-gray-700"
                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
                        }`}
                        aria-label="Previous question"
                      >
                        <ArrowRight className="w-7 h-7 rotate-180" />
                      </button>
                    )}

                    {!isLastQuestion && selectedOption !== undefined && (
                      <button
                        onClick={() =>
                          setCurrentQuestionIndex(currentQuestionIndex + 1)
                        }
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                          isDarkMode
                            ? "bg-gray-800/95 hover:bg-gray-700 text-gray-200 border border-gray-700"
                            : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
                        }`}
                        aria-label="Next question"
                      >
                        <ArrowRight className="w-7 h-7" />
                      </button>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="text-center max-w-md">
                <BookOpen
                  className={`w-20 h-20 mx-auto mb-6 ${getThemeStyles.textMuted}`}
                />
                <h2 className={`text-3xl font-bold mb-3 ${getThemeStyles.textPrimary}`}>
                  Select a lesson to begin
                </h2>
                <p className={`text-lg ${getThemeStyles.textSecondary}`}>
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