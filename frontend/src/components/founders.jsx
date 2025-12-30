import React, { useState } from "react";
import {
  Linkedin,
  Mail,
  Phone,
  Star,
  ExternalLink,
  MapPin,
  Award,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const FoundersComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const founders = [
    {
      id: 1,
      name: "Dr. Sushma Jha",
      title: "CEO & Co-Founder",
      image:
        "https://media.licdn.com/dms/image/v2/C4E03AQFVjqnWL2euJg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1531793304213?e=1757548800&v=beta&t=aTEqRaz9eGkn2VnwOJo5sfBlY5U_QZ3sBZNoxMTJlUs",
      description:
        "With 15+ years in tech leadership and a passion for innovation, Sarah drives our vision to revolutionize digital experiences. She has successfully scaled multiple startups from concept to IPO.",
      rating: 5.0,
      linkedin: "https://linkedin.com/in/sarahjohnson",
      email: "sarah@company.com",
      phone: "+1 (555) 123-4567",
      location: "San, CA",
      achievements: [
        "Forbes 30 Under 30",
        "Tech Innovation Award 2023",
        "Startup of the Year",
      ],
      experience: "15+ Years",
      teamSize: "200+",
    },
    {
      id: 2,
      name: "Bhoopendra Singh",
      title: "CTO & Co-Founder",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQHeYfPTggF_7g/profile-displayphoto-shrink_800_800/B56ZR_V0BWHsAc-/0/1737303212598?e=1757548800&v=beta&t=ppIwbv3zUQ1E6hjsi5sTrHmZ4vY5MICxFqlzBZKInzw",
      description:
        "A full-stack engineer with expertise in AI/ML and cloud architecture, Michael leads our technical strategy. His innovative solutions have powered millions of users worldwide.",
      rating: 5.0,
      linkedin: "https://linkedin.com/in/michaelchen",
      email: "michael@company.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      achievements: [
        "MIT Technology Review 35",
        "Cloud Architecture Expert",
        "AI Innovation Leader",
      ],
      experience: "12+ Years",
      teamSize: "150+",
    },
  ];

  return (
    <div className="bg-black min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
            <Sparkles size={14} className="text-blue-200" />
            <span className="text-blue-200 text-sm font-medium">
              Leadership Excellence
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Meet Our
            <span className="block mt-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Visionary Founders
            </span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Pioneering the future of technology with unmatched expertise,
            innovative thinking, and a relentless drive to create extraordinary
            digital experiences.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(founder.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Border Container */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`}
              ></div>

              {/* Card */}
              <div className="relative bg-zinc-900 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 group-hover:border-transparent transition-all duration-500 h-full">
                {/* Profile Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-md opacity-50"></div>
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="relative w-28 h-28 rounded-2xl object-cover border-2 border-zinc-800 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-full shadow-xl border-2 border-black">
                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-white"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-blue-400 font-semibold text-lg mb-4">
                      {founder.title}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                        <MapPin size={14} className="text-blue-400" />
                        {founder.location}
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                        <Award size={14} className="text-purple-400" />
                        {founder.experience}
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
                        <Users size={14} className="text-cyan-400" />
                        {founder.teamSize}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 leading-relaxed mb-8 text-base">
                  {founder.description}
                </p>

                {/* Achievements */}
                <div className="mb-8">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                    <Award size={18} className="text-yellow-400" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {founder.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-blue-300 px-4 py-2 rounded-xl text-sm border border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/20 transition-all duration-300 font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Button */}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-300 group/link shadow-md hover:shadow-lg text-white font-medium text-sm"
                >
                  <Linkedin size={16} className="text-white" />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover/link:text-white group-hover/link:translate-x-1 transition-all duration-300"
                  />
                </a>

                {/* Hover Glow Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl pointer-events-none transition-opacity duration-500 ${
                    hoveredCard === founder.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative max-w-5xl mx-auto">
          {/* Outer soft growing glow (NO rotation) */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl 
    bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-purple-500/20
    animate-[pulse_7s_ease-in-out_infinite]"
          />

          {/* Static gradient border */}
          <div
            className="relative rounded-3xl p-[1.5px] 
    bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-purple-500/40"
          >
            {/* Main card */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-10 border border-zinc-800 overflow-hidden">
              {/* Top right blob – slow grow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl 
        animate-[pulse_9s_ease-in-out_infinite]"
              />

              {/* Bottom left blob – slower grow */}
              <div
                className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl 
        animate-[pulse_11s_ease-in-out_infinite]"
              />

              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to Build Something
                  <span className="block mt-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Extraordinary?
                  </span>
                </h3>

                <p className="text-zinc-400 mb-8 text-base max-w-2xl mx-auto leading-relaxed">
                  Our founders are always excited to discuss new opportunities,
                  partnerships, and innovative projects. Let's create the future
                  together.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-500 hover:to-purple-500
            text-white px-6 py-3 rounded-xl font-semibold text-sm
            transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    Schedule a Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersComponent;
