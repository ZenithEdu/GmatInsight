import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
  const StarRating = ({ count = 5, score = null }) => (
    <div className="flex items-center gap-1 mt-2">
      <div className="flex">
        {[...Array(count)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      {score && (
        <span className="text-xs font-medium text-gray-500 ml-2">{score}</span>
      )}
    </div>
  );

  const recognitions = [
    {
      logo: "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/recognitions/gmat_club@2x.webp",
      alt: "GMAT Club",
      title: "Legendary expert on GMATCLUB with 15k+ Kudos",
      description: "On GMAT Club",
      stars: 5,
      score: "700+ Reviews",
    },
    {
      logo: "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/recognitions/poets_quants@2x.webp",
      alt: "Poets & Quants",
      title: "5-Star rated admission and GMAT support services",
      description: "For making difficult concepts clear",
      stars: 5,
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
      alt: "Google Reviews",
      title:
        "Dwarka New Delhi: Top-rated GMAT Prep services with 20 years of experience",
      description: "2019 - 2024 on MBA Insight",
      stars: 5,
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
      alt: "Google Reviews",
      title:
        "Malviya Nagar, New Delhi: Top-rated GMAT Prep services with 20 years of experience",
      description: "2019 - 2024 on MBA Insight",
      stars: 5,
    },
  ];

  const Card = ({ children }) => (
    <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
      {children}
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">

          <div className="md:col-span-2 md:row-span-2">
            <div
              className="relative h-full overflow-hidden rounded-xl flex items-center border border-white/10"
              style={{ backgroundColor: "#050b1a" }}
            >
              {/* World Map – higher visibility */}
              <div
                className="absolute inset-0 mix-blend-screen"
                style={{
                  backgroundImage: `url(global3.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.55,
                  filter: "brightness(1.8) contrast(1.2)",
                }}
              />

              {/* Softer dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/80 via-[#020617]/65 to-[#0a1b3f]/50" />

              {/* Subtle tech glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/25 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/25 blur-[110px]" />

              {/* Content */}
              <div className="relative z-10 p-10">
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 text-gray-100">
                  A{" "}
                  <span className="text-cyan-400 drop-shadow-[0_0_14px_rgba(34,211,238,0.7)]">
                    globally recognized
                  </span>{" "}
                  GMAT course powered by AI
                </h2>

             <div className="border-l-4 border-red-500 pl-4 text-white font-medium">
  TRY THE COURSE FOR FREE
</div>

              </div>
            </div>
          </div>

          {/* Recognition Cards */}
          {recognitions.map((rec, idx) => (
            <Card key={idx}>
              <div className="flex items-center mb-4">
                <img
                  src={rec.logo}
                  alt={rec.alt}
                  className="h-12 w-auto object-contain"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {rec.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {rec.description}
              </p>
              <StarRating count={rec.stars} score={rec.score} />
            </Card>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 lg:hidden flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition">
            TRY THE COURSE FOR FREE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;