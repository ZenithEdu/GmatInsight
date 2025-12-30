import React, { useState } from "react";
import { Star, Award } from "lucide-react";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative h-[90vh] min-h-[400px] w-full overflow-hidden">
      {/* Fallback background while video loads */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 z-0"></div>

      {/* Video Background */}
      <video
        className={`absolute inset-0 w-full h-full object-cover brightness-125 contrast-110 saturate-125 transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        loading="lazy"
        onLoadedData={handleVideoLoaded}
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10"></div>

      {/* Content Overlay */}
      <div className="relative z-20 flex h-full items-center justify-center px-4 text-center text-white">
        <div className="mx-auto max-w-[90%] sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl space-y-4">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 text-[0.65rem] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 will-change-transform"
            role="status"
            aria-label="Tailored for the Latest GMAT Focus and GRE Adaptive Edition"
          >
            <Award className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            <span>Tailored for GMAT Focus/GRE Adaptive</span>
            <Award className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight">
            Premier GMAT & GRE Coaching for Aspiring Global Leaders
          </h1>

          {/* Subheading with Stars */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-1" aria-label="5-star rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-md text-blue-100 font-semibold">
              The Gold Standard in AI-Driven GMAT & GRE Prep
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center">
            <a
              href="#"
              className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent will-change-transform"
              aria-label="Start 2 Days of Free Full Access"
            >
              Get 2 Days of Full Access — Free
            </a>
            <p className="text-sm text-gray-300 mt-2">No automatic billing</p>
          </div>

          {/* Score Guarantee */}
          <div className="border-gray-700 w-full flex justify-center">
            <p className="text-sm">
              <strong>GUARANTEED</strong> SCORE IMPROVEMENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
