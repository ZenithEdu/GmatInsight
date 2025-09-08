import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Database,
  ChevronRight,
} from "lucide-react";
import AdminHeader from "../components/AdminHeader";

export default function QuestionVault() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Quantitative Vault",
      icon: BarChart3,
      route: "/quant",
      description: "Manage statistical models and quantitative assessments",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      gradient: "from-blue-500 to-blue-600",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Verbal Reasoning Vault",
      icon: BookOpen,
      route: "/verbal",
      description: "Manage reading comprehension and verbal content",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      gradient: "from-purple-500 to-purple-600",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Data Insights Vault",
      icon: Database,
      route: "/data-insight",
      description: "Analyze performance metrics and generate reports",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      gradient: "from-emerald-500 to-emerald-600",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
      iconBg: "bg-emerald-500/10",
    },
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                Question Vault
              </h1>
              <p className="text-blue-900 max-w-2xl mx-auto">
                Select a section to manage your question bank and assessment content
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.title}
                    onClick={() => navigate(opt.route)}
                    className={`group relative rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${opt.glow}
                    bg-white shadow-sm hover:shadow-md border border-gray-100 hover:border-transparent overflow-hidden`}
                  >
                    {/* Top accent bar */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 group-hover:h-1.5 bg-gradient-to-r ${opt.gradient} transition-all duration-300`}
                    />

                    {/* Background pattern */}
                    <div
                      className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${opt.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    {/* Icon */}
                    <div
                      className={`relative z-10 w-14 h-14 rounded-lg ${opt.bgColor} ${opt.textColor} flex items-center justify-center mb-6 transition-all duration-300 group-hover:rotate-6`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h2 className={`text-xl font-bold ${opt.textColor} mb-2`}>
                        {opt.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors mb-4">
                        {opt.description}
                      </p>
                    </div>

                    {/* Footer link */}
                    <div
                      className={`relative z-10 mt-4 inline-flex items-center text-sm font-medium ${opt.textColor} group-hover:opacity-90 transition-all`}
                    >
                      <span>Manage Section</span>
                      <ChevronRight className="w-4 h-4 ml-1 relative top-[1.5px] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
