import {
  GraduationCap,
  FileText,
  Mic,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  MapPin,
  MessageCircle,
  Globe,
} from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

/* Floating background particles */
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-blue-200/30"
        style={{
          width: Math.random() * 6 + 2,
          height: Math.random() * 6 + 2,
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
        }}
      />
    ))}
  </div>
);

const Mba = () => {
  const stats = [
    {
      icon: Users,
      label: "Students Admitted",
      value: "500+",
      color: "text-cyan-400",
    },
    {
      icon: Clock,
      label: "Avg Processing Time",
      value: "< 6 Months",
      color: "text-violet-400",
    },
    {
      icon: CheckCircle2,
      label: "Success Rate",
      value: "98%",
      color: "text-emerald-400",
    },
  ];

  const features = [
    {
      icon: GraduationCap,
      title: "Profile Evaluation",
      description:
        "In-depth assessment of your academic, professional, and extracurricular profile to shortlist the right MBA programs.",
      accent: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: FileText,
      title: "Essays & SOP Strategy",
      description:
        "Structured storytelling support to craft impactful essays, SOPs, and LORs aligned with top B-school expectations.",
      accent: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      icon: Mic,
      title: "Interview Preparation",
      description:
        "Mock interviews and expert feedback to confidently handle admissions, alumni, and visa interviews.",
      accent: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ];

  const schools = [
    "Harvard Business School",
    "Stanford GSB",
    "Wharton School",
    "INSEAD",
    "London Business School",
    "MIT Sloan",
    "Chicago Booth",
    "Oxford Saïd",
  ];

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-gradient-to-br from-gray-50/50 via-blue-50/50 to-purple-50/50 overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-10px);
            }
            75% {
              transform: translateY(-15px) translateX(5px);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>

        <FloatingParticles />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 bg-gray-900/95 backdrop-blur-sm">
          {/* Soft gradient accents */}
          <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div
            className="pointer-events-none absolute top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30 bg-gray-800/50 backdrop-blur mb-6 hover:bg-gray-700/50 transition-colors cursor-pointer text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Powered by GMAT Insight | Admit Sure Unit
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight animate-fadeIn text-gray-100">
              Secure Your Global{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 inline-flex items-center gap-2">
                MBA Seat
                <Sparkles className="inline-block text-blue-400" size={32} />
              </span>
            </h1>

            <p
              className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Expert international admissions consulting for top MBA programs
              worldwide. From profile building to visa success, we guide you
              every step to your dream university.
            </p>

            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <stat.icon
                    className={`mx-auto mb-2 ${stat.color}`}
                    size={24}
                  />
                  <p className="text-2xl font-bold text-gray-100">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold">
              ADMIT SURE × GMAT INSIGHT
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              International MBA{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admissions Support
              </span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Personalized admissions consulting for the world’s top business
              schools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`h-14 w-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6`}
                >
                  <feature.icon className={`${feature.accent}`} size={26} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle underline hover */}
                <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-12 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* TOP SCHOOLS */}
        <section className="relative max-w-6xl mx-auto px-4 pb-24">
          {/* Soft background */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-70" />

          <div className="relative bg-blue-50 backdrop-blur border-2 border-blue-200 rounded-3xl p-10 md:p-14 shadow-md">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Admitted to the World’s Top B-Schools
              </h3>
              <p className="text-gray-600 text-lg">
                Our students have secured admits at the most competitive and
                prestigious MBA programs worldwide.
              </p>
            </div>

            {/* Schools */}
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {schools.map((school, idx) => {
                const colorStyles = [
                  "bg-blue-50 border-2 border-blue-200 text-blue-800 hover:bg-blue-100",
                  "bg-purple-50 border-2 border-purple-200 text-purple-800 hover:bg-purple-100",
                  "bg-indigo-50 border-2 border-indigo-200 text-indigo-800 hover:bg-indigo-100",
                ];

                return (
                  <div
                    key={idx}
                    className={`px-5 py-3 rounded-full text-sm font-medium shadow-sm
          transition-all duration-300 hover:shadow-md
          ${colorStyles[idx % colorStyles.length]}`}
                  >
                    {school}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA – Dark (Clean BG, Strong CTA) */}
        <section className="bg-[#0a1a2f] text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-xl 
                    bg-white/5 border border-white/10 mb-8"
            >
              <Globe className="text-blue-400" size={36} />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Ready to Go{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Global
              </span>
              ?
            </h2>

            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Speak with our experts and get a clear, personalized MBA
              admissions roadmap tailored to your global goals.
            </p>

            {/* CTA Button */}
            <button
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl
                 bg-gradient-to-r from-blue-500 to-purple-500
                 font-semibold text-white shadow-xl
                 hover:shadow-[0_16px_48px_rgba(99,102,241,0.4)]
                 transition"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />
              <MessageCircle size={20} />
              Book Free Consultation
            </button>

            {/* Meta */}
            <div className="mt-10 flex justify-center gap-10 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" /> Delhi | Virtual
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-purple-400" /> Response &lt;
                24h
              </span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Mba;
