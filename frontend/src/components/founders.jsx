import React, { useState } from 'react';
import { Linkedin, Mail, Phone, Star, ExternalLink, MapPin, Award, Users } from 'lucide-react';

const FoundersComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sample founder data - you can replace this with your actual data
  const founders = [
    {
      id: 1,
      name: "Dr. Sushma Jha",
      title: "CEO & Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQFVjqnWL2euJg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1531793304213?e=1757548800&v=beta&t=aTEqRaz9eGkn2VnwOJo5sfBlY5U_QZ3sBZNoxMTJlUs",
      description: "With 15+ years in tech leadership and a passion for innovation, Sarah drives our vision to revolutionize digital experiences. She has successfully scaled multiple startups from concept to IPO.",
      rating: 5.0,
      linkedin: "https://linkedin.com/in/sarahjohnson",
      email: "sarah@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      achievements: ["Forbes 30 Under 30", "Tech Innovation Award 2023", "Startup of the Year"],
      experience: "15+ Years",
      teamSize: "200+"
    },
    {
      id: 2,
      name: "Bhoopendra Singh",
      title: "CTO & Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHeYfPTggF_7g/profile-displayphoto-shrink_800_800/B56ZR_V0BWHsAc-/0/1737303212598?e=1757548800&v=beta&t=ppIwbv3zUQ1E6hjsi5sTrHmZ4vY5MICxFqlzBZKInzw",
      description: "A full-stack engineer with expertise in AI/ML and cloud architecture, Michael leads our technical strategy. His innovative solutions have powered millions of users worldwide.",
      rating: 5.0,
      linkedin: "https://linkedin.com/in/michaelchen",
      email: "michael@company.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      achievements: ["MIT Technology Review 35", "Cloud Architecture Expert", "AI Innovation Leader"],
      experience: "12+ Years",
      teamSize: "150+"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
              ✨ Leadership Excellence
            </div>
          </div> */}
          <h1 className="text-5xl md:text-5xl font-semibold text-white mb-8 leading-tight">
            Meet Our 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              {" "}Visionary{" "}
            </span>
            Founders
          </h1>
          <p className="text-m text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Pioneering the future of technology with unmatched expertise, innovative thinking, 
            and a relentless drive to create extraordinary digital experiences.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <div 
              key={founder.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(founder.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background with Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl"></div>
              
              {/* Main Card Content */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform ">
                
                {/* Profile Section */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="relative w-20 h-20 rounded-2xl object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-all duration-300"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-blue-500 p-1.5 rounded-full shadow-lg">
                      <Star size={12} fill="currentColor" className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-3">{founder.title}</p>
                    
                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {founder.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        {founder.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {founder.teamSize}
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star size={12} fill="currentColor" />
                    <span className="text-sm font-bold">{founder.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                  {founder.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Award size={16} className="text-yellow-400" />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.achievements.map((achievement, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  {/* LinkedIn */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 justify-end "
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Linkedin size={18} className="text-white" />
                    </div>
                    <span className="text-blue-300 font-medium group-hover/link:text-blue-200 transition-colors duration-300">
                      Connect on LinkedIn
                    </span>
                    <ExternalLink size={16} className="text-blue-400" />
                  </a>

                  {/* Email & Phone Row */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={`mailto:${founder.email}`}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-600/20 to-gray-700/20 hover:from-gray-600/30 hover:to-gray-700/30 rounded-xl border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 group/link transform hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Mail size={18} className="text-white" />
                      </div>
                      <span className="text-gray-300 font-medium group-hover/link:text-gray-200 transition-colors duration-300 text-sm">
                        Email
                      </span>
                    </a>

                    <a
                      href={`tel:${founder.phone}`}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-600/20 to-green-700/20 hover:from-green-600/30 hover:to-green-700/30 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group/link transform hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Phone size={18} className="text-white" />
                      </div>
                      <span className="text-green-300 font-medium group-hover/link:text-green-200 transition-colors duration-300 text-sm">
                        Call
                      </span>
                    </a>
                  </div> */}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl transition-opacity duration-500 ${
                  hoveredCard === founder.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur"></div>
            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 max-w-4xl mx-auto">
              <h3 className="text-4xl font-semibold text-white mb-4">
                Ready to Build Something 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Extraordinary?
                </span>
              </h3>
              <p className="text-gray-300 mb-8 text-m">
                Our founders are always excited to discuss new opportunities, partnerships, and innovative projects. 
                Let's create the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform ">
                  Schedule a Meeting
                </button>
                <button className="border border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform">
                  View Our Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersComponent;