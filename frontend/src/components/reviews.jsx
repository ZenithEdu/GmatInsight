import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
  const StarRating = ({ count = 5, score = null }) => (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(count)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      {score && <span className="text-sm text-gray-600 ml-2">{score}</span>}
    </div>
  );

  const recognitions = [
  
    {
      logo: "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/recognitions/gmat_club@2x.webp",
      alt: "GMAT Club",
      title: "Legendary expert on GMATCLUB with 15k+ Kudos",
      description: "On GMAT Club",
      stars: 5,
      score: "700+ Reviews"
    },
     {
      logo: "https://d6mmsse0kchai.cloudfront.net/standalone/20250702/images/recognitions/poets_quants@2x.webp",
      alt: "Poets & Quants",
      title: "5-Star rated admission and GMAT support services",
      description: "For making difficult concepts clear",
      stars: 5
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
      alt: "Google Reviews",
      title: "Dwarka New Delhi: Top-rated GMAT Prep services with 20 years of experience",
      description: "2019 - 2024 on MBA Insight",
      stars: 5
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
      alt: "Google Reviews",
      title: "Malviya Nagar, New Delhi: Top-rated GMAT Prep services with 20 years of experience",
      description: "2019 - 2024 on MBA Insight",
      stars: 5
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 columns x 3 rows grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          
          {/* Main heading section - spans 2 rows x 2 columns */}
          <div className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2">
            <div 
              className="bg-transparent  p-8 h-full flex flex-col justify-center relative overflow-hidden"
              style={{
                backgroundImage: `url(global3.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-blue bg-opacity-20 rounded-lg"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                  A <span className="font-semibold">globally recognized</span> GMAT course powered by AI
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 w-fit">
                  TRY THE COURSE FOR FREE
                </button>
              </div>
            </div>
          </div>

          {/* Row 1 - Morningstar */}
          <div className="bg-transparent rounded-lg p-6  flex flex-col h-full">
            <div className="flex items-center mb-4">
              <img
                src={recognitions[0].logo}
                alt={recognitions[0].alt}
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {recognitions[0].title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {recognitions[0].description}
              </p>
              <StarRating count={recognitions[0].stars} score={recognitions[0].score} />
            </div>
          </div>

          {/* Row 1 - GMAT Club */}
          <div className="bg-transparent rounded-lg p-6  flex flex-col h-full">
            <div className="flex items-center mb-4">
              <img
                src={recognitions[1].logo}
                alt={recognitions[1].alt}
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {recognitions[1].title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {recognitions[1].description}
              </p>
              <StarRating count={recognitions[1].stars} score={recognitions[1].score} />
            </div>
          </div>

          {/* Row 2 - MBA Insight */}
          <div className="bg-transparent rounded-lg p-6  flex flex-col h-full">
            <div className="flex items-center mb-4">
              <img
                src={recognitions[2].logo}
                alt={recognitions[2].alt}
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {recognitions[2].title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {recognitions[2].description}
              </p>
              <StarRating count={recognitions[2].stars} score={recognitions[2].score} />
            </div>
          </div>

          {/* Row 2 - Beat GMAT */}
          <div className="bg-transparent rounded-lg p-6  flex flex-col h-full">
            <div className="flex items-center mb-4">
              <img
                src={recognitions[3].logo}
                alt={recognitions[3].alt}
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {recognitions[3].title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {recognitions[3].description}
              </p>
              <StarRating count={recognitions[3].stars} score={recognitions[3].score} />
            </div>
          </div>

          {/* Row 3 - All 4 Poets & Quants */}
          {recognitions.slice(4).map((recognition, index) => (
            <div key={index + 4} className="bg-transparent rounded-lg p-6  flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img
                  src={recognition.logo}
                  alt={recognition.alt}
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recognition.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {recognition.description}
                </p>
                <StarRating count={recognition.stars} score={recognition.score} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA Button */}
        <div className="mt-8 lg:hidden flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200">
            TRY THE COURSE FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;