import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TOP_TESTIMONIALS = [
  {
    name: "Sarah Chen",
    score: 750,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    content:
      "The comprehensive study materials and practice tests were game-changers for my GMAT prep. Improved my score by 120 points in just 3 months!",
  },
  {
    name: "Michael Rodriguez",
    score: 720,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "Outstanding platform with detailed explanations for every question. The adaptive learning system helped me focus on my weak areas effectively.",
  },
  {
    name: "Priya Patel",
    score: 740,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "The mock tests were incredibly realistic and helped build my confidence. The analytics dashboard showed exactly where I needed improvement.",
  },
];

const TestimonialSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Success Stories from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {" "}
              GMATInsight
            </span>
          </h2>
          <p className="text-blue-200/80 text-base sm:text-lg">
            Hear from students who achieved their dream scores
          </p>
        </header>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {TOP_TESTIMONIALS.map((testimonial, index) => (
            <article
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20
              shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1
              min-h-[320px] flex flex-col"
            >
              {/* Profile */}
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
                  loading="lazy"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <div>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {testimonial.score}
                    </span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-blue-100 text-sm sm:text-base leading-relaxed italic">
                “{testimonial.content}”
              </blockquote>

              {/* Bottom Divider */}
              <div className="mt-auto pt-6">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/testimonials")}
            className="group inline-flex items-center gap-2
            bg-gradient-to-r from-cyan-500 to-blue-600
            hover:from-cyan-600 hover:to-blue-700
            text-white font-semibold
            py-3 px-6 rounded-full
            shadow-md hover:shadow-lg
            transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Success Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-blue-200/60 text-sm mt-3">
            Discover more inspiring stories from our successful students
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
