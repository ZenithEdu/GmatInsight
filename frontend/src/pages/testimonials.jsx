import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const TestimonialsPage = () => {
  const profileImages = [
    {
      name: "Emily Patel",
      role: "Marketing Manager",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Liam Nguyen", 
      role: "College Student",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Rachel Brooks",
      role: "HR Specialist", 
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

const testimonials = [
    {
      name: "James Carter",
      role: "MBA Candidate",
      rating: 715,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "This GMAT prep platform is fantastic! The study materials are well-structured, with comprehensive practice questions and clear explanations. I've improved my quantitative score by 10 points in just two months. Definitely worth checking out for anyone serious about business school!"
    },
    {
      name: "Sarah Williams",
      role: "Business Consultant",
      rating: 735,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "I'm really impressed with this GMAT program. The verbal section strategies are game-changing, and the interface makes it easy to track my progress. The adaptive practice tests mirror the real exam perfectly. It's ideal for working professionals preparing for the GMAT."
    },
    {
      name: "Rahul Mehta",
      role: "Finance Professional",
      rating: 751,
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The integrated reasoning section preparation is outstanding here. The bite-sized lessons and real GMAT-style questions helped me identify my weak areas quickly. I was scoring 650 on practice tests before joining, now consistently hitting 700+!"
    },
    {
      name: "Emily Zhang",
      role: "Investment Banking Analyst",
      rating: 785,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "This platform transformed my GMAT preparation. The analytical writing assessment feedback is incredibly detailed and helpful. I love how the study plan adapts to my schedule and performance. My confidence for test day has skyrocketed!"
    },
    {
      name: "Liam Johnson",
      role: "Entrepreneur",
      rating: 786,
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Excellent GMAT resource! The data sufficiency strategies are brilliant, and the question bank is massive. The mobile app lets me study during my commute. Went from 80th to 95th percentile in quant in six weeks!"
    },
    {
      name: "Aisha Khan",
      role: "Corporate Strategist",
      rating: 742,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "From basic concepts to advanced strategies, this GMAT prep has everything. The sentence correction modules are particularly outstanding. I've already recommended it to all my colleagues applying to top business schools!"
    }
];

  return (
    <>
      <Navbar/>
      
      {/* Hero Section */}
      <section className="relative h-116 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url("https://media.licdn.com/dms/image/v2/C4E12AQG4ezFwi02Teg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1594835242711?e=1757548800&v=beta&t=apcRC3_XJEo0T0rI4MQDjysA69MCPUyq3_TvE6jRZlA")'
      }}>
        {/* Improved Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-semibold text-gray-200 mb-6 leading-tight">
              Success Stories from Our Students
            </h1>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Discover how thousands of learners have transformed their careers and achieved their goals through our comprehensive online courses.
            </p>
            <div className="flex items-center justify-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-current text-yellow-400" />
                <span className="text-2xl font-semibold">4.9</span>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-lg">
                <span className="font-semibold">10,000+</span> Happy Students
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-16">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-sm font-medium text-blue-600 mb-4 tracking-wide uppercase">
                Testimonials
              </h2>
              <h1 className="text-5xl lg:text-5xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-6">
                What Our Students Think
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hear from real students who've transformed their skills and lives with our courses. 
                Their stories inspire us, and we're proud to be part of their journey.
              </p>
            </div>
            
            {/* Profile Images Carousel */}
            <div className="lg:w-1/2 lg:pl-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profileImages.map((profile, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-blue-600 text-lg">{profile.name}</h3>
                    <p className="text-gray-600">{profile.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
  {testimonials.map((testimonial, index) => (
    <div key={index} className="relative">
      {/* Dashed Border Card - Fixed Height */}
      <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-shadow duration-300 h-80">
        {/* Card Content */}
        <div className="flex items-start gap-6 h-full">
          {/* Profile Image - Left Side */}
          <div className="flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          
          {/* Content - Right Side */}
          <div className="flex-1 flex flex-col h-full">
            {/* Name and Role */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.role}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
                <span className="font-semibold">{testimonial.rating}</span>
                
              </div>
            </div>
            
            {/* Quote - Takes remaining space */}
            <div className="relative flex-1">
              <div className="text-4xl text-blue-200 absolute -top-2 -left-2">
                "
              </div>
              <p className="text-gray-700 leading-relaxed pl-6 overflow-hidden">
                {testimonial.content}
              </p>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
       </div>

          {/* View All Button */}
          <div className="text-center">
            <a href="/user1"><button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              View all
              <ArrowRight className="w-5 h-5" />
            </button>
            </a>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default TestimonialsPage;