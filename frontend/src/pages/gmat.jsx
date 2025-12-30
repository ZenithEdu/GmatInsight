import {
  Sparkles,
  Target,
  TrendingUp,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Layers, Clock } from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Navigate, useNavigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative  overflow-hidden pt-32 pb-20 bg-gray-900/95 backdrop-blur-sm">
      {/* Soft gradient accents */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div
        className="pointer-events-none absolute top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30 bg-gray-800/50 backdrop-blur mb-6 hover:bg-gray-700/50 transition-colors cursor-pointer text-blue-300">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>#1 GMAT Preparation Platform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight animate-fadeIn text-gray-100">
  Crack the{" "}
  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
    GMAT
  </span>{" "}
  with a{" "}
  <span className="relative inline-block px-1 text-slate-100 highlight-wrapper">
    Proven Study Plan
    <span className="absolute left-0 bottom-0 h-12 w-full -z-10 rounded-sm bg-blue-900/60 highlight-animate"></span>
  </span>

  {/* inline CSS */}
  <style>{`
    .highlight-animate {
      transform: scaleX(0);
      transform-origin: left;
      animation: highlightGrow 0.7s ease-out forwards;
      animation-delay: 0.5s;
    }

    @keyframes highlightGrow {
      to {
        transform: scaleX(1);
      }
    }
  `}</style>
</h1>


        <p
          className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          Join thousands of successful students who achieved their dream MBA
          admissions through expert instruction, adaptive learning, and proven
          strategies.
        </p>
        {/* Stats */}
        <div
          className="mt-12 flex justify-center animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-400 text-base">Successful Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-gray-400 text-base">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                750+
              </div>
              <div className="text-gray-400 text-base">Hours of Content</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400 mb-2">50+</div>
              <div className="text-gray-400 text-base">Expert Instructors</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
          }
          `}</style>
    </section>
  );
};

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const discount =
    course.originalPrice > course.price
      ? Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )
      : 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {course.isBestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-1 text-xs font-semibold text-black shadow">
            Bestseller
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <BookOpen className="h-4 w-4 shrink-0 text-blue-600" />
            <span>{course.lessons} lessons</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Layers className="h-4 w-4 shrink-0 text-purple-600" />
            <span>{course.modules} modules</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="h-4 w-4 shrink-0 text-green-600" />
            <span>{course.duration} mos</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div>
          <div className="mb-4 flex items-end gap-2">
            <span className="text-2xl font-bold text-blue-700">
              ₹{course.price.toLocaleString()}
            </span>

            {course.originalPrice > course.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{course.originalPrice.toLocaleString()}
                </span>

                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-600">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <button
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:outline-none  focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Add ${course.title} to cart`}
            onClick={() => navigate(`/gmat-course-page`)}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

const GmatCoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "GMAT Quantitative Reasoning",
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop&q=80",
      icon: TrendingUp,
      lessons: 45,
      modules: 8,
      duration: 4,
      price: 3499,
      originalPrice: 6999,
      isBestseller: false,
    },
    {
      id: 2,
      title: "GMAT Verbal Reasoning",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop&q=80",
      icon: BookOpen,
      lessons: 38,
      modules: 6,
      duration: 3,
      price: 3499,
      originalPrice: 6999,
      isBestseller: false,
    },
    {
      id: 3,
      title: "GMAT Complete Prep Course",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80",
      icon: GraduationCap,
      lessons: 75,
      modules: 12,
      duration: 6,
      price: 5999,
      originalPrice: 12999,
      isBestseller: true,
    },
    {
      id: 4,
      title: "GMAT Advanced Mastery Course",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&q=80",
      icon: Target,
      lessons: 75,
      modules: 12,
      duration: 6,
      price: 5999,
      originalPrice: 12999,
      isBestseller: false,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 py-15">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              <span className="text-slate-700">Most Popular </span>
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                GMAT Courses{" "}
                <Sparkles className="inline-block text-blue-500" size={36} />
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GmatCoursesSection;
