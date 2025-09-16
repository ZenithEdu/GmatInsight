import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Database,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function QuestionVault() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const vaultOptions = [
    {
      id: 1,
      title: "Quantitative Vault",
      icon: BarChart3,
      route: "/quant",
      description: "All types of quantitative aptitude questions.",
      colors: {
        primary: "from-blue-600 to-cyan-600",
        secondary: "from-blue-50 to-blue-100",
        text: "text-blue-700",
        accent: "bg-blue-100",
        border: "border-blue-200",
        glow: "hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]",
      },
    },
    {
      id: 2,
      title: "Verbal Reasoning Vault",
      icon: BookOpen,
      route: "/verbal",
      description: "All types of verbal reasoning questions.",
      colors: {
        primary: "from-purple-600 to-violet-600",
        secondary: "from-violet-50 to-purple-100",
        text: "text-purple-700",
        accent: "bg-purple-100",
        border: "border-purple-200",
        glow: "hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]",
      },
    },
    {
      id: 3,
      title: "Data Insights Vault",
      icon: Database,
      route: "/data-insight",
      description: "All types of data insights questions.",
      colors: {
        primary: "from-emerald-600 to-teal-600",
        secondary: "from-emerald-50 to-emerald-100",
        text: "text-emerald-700",
        accent: "bg-emerald-100",
        border: "border-emerald-200",
        glow: "hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
      },
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>
        <div className="absolute top-10 sm:top-20 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full filter blur-2xl opacity-60 animate-pulse"></div>
      </div>

      {/* Header Section */}
      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="space-y-5 text-center md:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2">
              Question Vault
            </h1>
            <p className="text-base sm:text-lg text-blue-900 max-w-2xl mx-auto md:mx-0">
              Enhance the way you manage and access your questions in their
              respective vaults.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {vaultOptions.map((vault) => {
            const Icon = vault.icon;

            return (
              <div
                key={vault.id}
                onClick={() => navigate(vault.route)}
                onMouseEnter={() => setHoveredCard(vault.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
                  ${vault.colors.glow}`}
              >
                <div
                  className={`relative h-full bg-white rounded-xl border ${vault.colors.border} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${vault.colors.primary}`}
                  ></div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${vault.colors.secondary} opacity-0 group-hover:opacity-30 transition-all duration-300`}
                  ></div>

                  <div className="relative z-10 p-5 sm:p-6 lg:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-12 h-12 ${vault.colors.accent} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className={`w-6 h-6 ${vault.colors.text}`} />
                      </div>
                    </div>

                    <div className="flex-grow space-y-3 sm:space-y-4">
                      <div>
                        <h3
                          className={`text-lg sm:text-xl font-bold ${vault.colors.text} mb-2`}
                        >
                          {vault.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {vault.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-6 flex items-center text-sm font-medium ${vault.colors.text} group-hover:opacity-90 transition-all`}
                    >
                      <span>Access Vault</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
