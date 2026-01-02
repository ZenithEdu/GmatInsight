import { useState, useEffect } from "react";
import {
  Award,
  Users,
  Trophy,
  Star,
  Globe,
  Rocket,
  Sparkles,
  Target,
  UserCheck,
  Brain,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FoundersComponent from "../components/founders";
import Stats from "../components/stats";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-200/30"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + "s",
          }}
        />
      ))}
    </div>
  );
};

const HeroHeader = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-gray-900/95">
      {/* Soft gradient accents */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div
        className="pointer-events-none absolute top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-indigo-500/30 bg-gray-800/50 backdrop-blur mb-6 hover:bg-gray-700/50 transition-colors cursor-pointer text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span>Our Story of Excellence</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight animate-fadeIn text-gray-100">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 inline-flex items-center gap-2">
            us
            <Sparkles className="inline-block text-blue-400" size={32} />
          </span>
        </h1>

        <p
          className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Discover our journey from a bold vision to a global leader in GMAT
          preparation, empowering thousands to achieve their dreams.
        </p>
      </div>
    </section>
  );
};

const OurJourneyTimeline = () => {
  const timeline = [
    {
      year: "2015",
      title: "The Idea",
      description:
        "Identified the need for focused, personalized GMAT preparation.",
      icon: Star,
    },
    {
      year: "2016",
      title: "Founded",
      description:
        "GMATMaster launched as a results-driven tutoring initiative.",
      icon: Rocket,
    },
    {
      year: "2018",
      title: "1,000+ Students",
      description: "Delivered consistent 700+ GMAT outcomes.",
      icon: Users,
    },
    {
      year: "2020",
      title: "Technology Platform",
      description: "Introduced adaptive learning and performance analytics.",
      icon: Trophy,
    },
    {
      year: "2022",
      title: "Global Reach",
      description: "Expanded to learners across 25+ countries.",
      icon: Globe,
    },
    {
      year: "2025",
      title: "Industry Leadership",
      description: "Established as a trusted, outcome-focused GMAT brand.",
      icon: Award,
    },
  ];

  const topRow = timeline.slice(0, 3);
  const bottomRow = timeline.slice(3).reverse();

  return (
    <section className="py-16 px-4 bg-gray-50 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER (UNCHANGED) ================= */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-300 text-blue-900 px-4 py-1 text-xs font-semibold tracking-widest mb-4">
            <Star className="w-3 h-3" />
            OUR JOURNEY
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            A Decade of Progress{" "}
            <span className="text-blue-800">(2015–2025)</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Ten years of disciplined growth, measurable outcomes, and global
            impact.
          </p>
        </div>

        {/* =====================================================
            MOBILE TIMELINE
        ===================================================== */}
        <div className="md:hidden relative max-w-xl mx-auto">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === timeline.length - 1;

            return (
              <div
                key={item.year}
                className="relative flex items-start gap-7 pb-14"
              >
                {/* Mobile line (starts higher now) */}
                {!isLast && (
                  <div className="absolute left-[28px] top-[55px] h-full w-[3px] bg-blue-900/30 rounded-full" />
                )}

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-900 text-white shadow-lg ring-4 ring-blue-100 shrink-0">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="bg-blue-50/60 rounded-lg px-5 py-4 space-y-1">
                  <span className="text-base font-semibold text-blue-900">
                    {item.year}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            DESKTOP TIMELINE (zig-zag)
        ===================================================== */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          {/* Vertical connector (now touches bottom row) */}
          <div className="absolute right-[1%] top-[32px] h-[325px] w-[3px] bg-blue-900/80 rounded-full" />

          {/* ================= TOP ROW ================= */}
          <div className="relative grid grid-cols-3 gap-0 mb-36">
            <div className="absolute top-[32px] left-[16%] right-[1%] h-[3px] bg-blue-900/70 rounded-full" />

            {topRow.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.year}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 text-white shadow-lg ring-4 ring-blue-100 z-10">
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="mt-6 space-y-1">
                    <span className="text-sm font-semibold text-blue-900">
                      {item.year}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= BOTTOM ROW ================= */}
          <div className="relative grid grid-cols-3 gap-0">
            <div className="absolute top-[32px] left-[16%] right-[1%] h-[3px] bg-blue-900/70 rounded-full" />

            {bottomRow.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.year}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-900 text-white shadow-lg ring-4 ring-blue-100 z-10">
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="mt-6 space-y-1">
                    <span className="text-sm font-semibold text-blue-900">
                      {item.year}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const themes = [
    {
      name: "indigo",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-slate-700 to-indigo-900",
      bgAccent: "bg-slate-200",
      button: "bg-indigo-800 text-white hover:bg-indigo-900",
    },
    {
      name: "emerald",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-slate-800 to-emerald-800",
      bgAccent: "bg-slate-200",
      button: "bg-emerald-800 text-white hover:bg-emerald-900",
    },
    {
      name: "rose",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-rose-800 to-red-900",
      bgAccent: "bg-slate-200",
      button: "bg-red-800 text-white hover:bg-red-900",
    },
    {
      name: "amber",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-amber-800 to-orange-900",
      bgAccent: "bg-slate-200",
      button: "bg-amber-800 text-white hover:bg-orange-900",
    },
    {
      name: "cyan",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-cyan-800 to-blue-900",
      bgAccent: "bg-slate-200",
      button: "bg-cyan-800 text-white hover:bg-blue-900",
    },
    {
      name: "violet",
      wrapper: "shadow-2xl border-2 border-slate-700/30 bg-slate-50/90",
      accent: "text-slate-900",
      gradient: "from-violet-800 to-purple-900",
      bgAccent: "bg-slate-200",
      button: "bg-violet-800 text-white hover:bg-purple-900",
    },
  ];

  const services = [
    {
      icon: Target,
      title: "Comprehensive GMAT",
      description:
        "Complete preparation covering all sections with personalized study plans",
      features: [
        "Quantitative Reasoning",
        "Verbal Reasoning",
        "Analytical Writing",
        "Integrated Reasoning",
      ],
    },
    {
      icon: UserCheck,
      title: "Expert Mentorship",
      description:
        "One-on-one guidance from 700+ GMAT scorers and top MBA graduates",
      features: [
        "1-on-1 Coaching",
        "Strategy Sessions",
        "Mock Interviews",
        "Application Review",
      ],
    },
    {
      icon: Trophy,
      title: "Practice Tests",
      description:
        "Extensive practice materials with detailed performance analytics",
      features: [
        "Adaptive Practice Tests",
        "Performance Analytics",
        "Weakness Identification",
        "Progress Tracking",
      ],
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with fellow GMAT aspirants and alumni worldwide",
      features: [
        "Study Groups",
        "Alumni Network",
        "Success Stories",
        "Peer Support",
      ],
    },
    {
      icon: Brain,
      title: "Expert Mentorship",
      description:
        "Get personalized guidance from GMAT experts with proven track records",
      features: [
        "Personal Study Plans",
        "Weekly Progress Reviews",
        "Mock Test Analysis",
        "Strategy Sessions",
      ],
    },
    {
      icon: Cpu,
      title: "Smart Analytics",
      description:
        "Track your progress with AI-powered insights and performance analytics",
      features: [
        "Performance Tracking",
        "Weakness Analysis",
        "Progress Reports",
        "Adaptive Learning",
      ],
    },
  ];

  return (
    <section className="relative py-18 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      <FloatingParticles />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-300 text-blue-900 px-4 py-1 text-xs font-semibold tracking-widest mb-4">
            <Star className="w-3 h-3" />
            OUR SERVICES
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Services{" "}
            <span className="text-blue-800">(Unlock Your Potential)</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 mt-3 max-w-xl mx-auto leading-relaxed">
            Comprehensive services designed to elevate your GMAT preparation and
            results.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const theme = themes[index % themes.length];

            return (
              <div
                key={index}
                className={`break-inside-avoid group relative rounded-2xl transition-all duration-300 overflow-hidden
                  ${theme.wrapper} p-8`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${theme.gradient}`}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full bg-gradient-to-br ${theme.gradient} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3
                          className={`font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}
                        >
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-800 leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className={`w-5 h-5 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-md`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-700 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 font-sans text-slate-900 selection:bg-blue-200 overflow-hidden relative">
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

        <HeroHeader />
        <OurJourneyTimeline />
        <Stats theme="light" />
        <ServicesSection />
        <FoundersComponent/>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
