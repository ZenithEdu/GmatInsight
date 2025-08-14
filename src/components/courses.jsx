import React from 'react';
import { Clock, BookOpen, Users, Star, Award } from 'lucide-react';

const CourseCard = ({ course }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-blue-500 text-blue-500' 
            : i < rating 
            ? 'fill-blue-300 text-blue-300' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg border-2 border-dashed border-gray-300 p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative mb-4">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <Award className="w-5 h-5 text-blue-500" />
        </div>
      </div>

      {/* Rating and Price */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(course.rating)}</div>
          <span className="text-gray-600 text-sm">{course.rating}</span>
        </div>
        <span className="text-2xl font-bold text-blue-600">${course.price}</span>
      </div>

      {/* Course Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{course.title}</h3>

      {/* Course Stats */}
      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{course.lessons} Lessons</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{course.modules} Modules</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{course.duration} Months</span>
        </div>
      </div>

      {/* Course Description */}
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {course.description}
      </p>

      {/* Credential */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Credential</h4>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">{course.credential}</span>
        </div>
      </div>

      {/* Enroll Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
        <span>Enroll</span>
        <div className="bg-blue-600 rounded-full p-1">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );
};

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.5,
      price: 350,
      lessons: 25,
      modules: 5,
      duration: 3,
      description: "Master the fundamentals of Search Engine Optimization (SEO) to improve website rankings.",
      credential: "Global E-Learning Academy (GELA)"
    },
    {
      id: 2,
      title: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      rating: 4.7,
      price: 450,
      lessons: 35,
      modules: 7,
      duration: 6,
      description: "Learn the fundamentals of UI and UX design, including user research, wireframing, and prototyping.",
      credential: "Global E-Learning Academy (GELA)"
    },
    {
      id: 3,
      title: "Web Development",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
      rating: 4.5,
      price: 390,
      lessons: 24,
      modules: 4,
      duration: 3,
      description: "Learn to build web pages using HTML and style them with CSS from scratch.",
      credential: "Global E-Learning Academy (GELA)"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-20 ">
      {/* Header */}
      <div className="mb-8">
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-semibold text-gray-800">
            Most <span className="text-blue-600">Popular Courses</span>
          </h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <span>All Courses</span>
            <div className="bg-blue-600 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
        <p className="text-gray-600 text-m">
          Master in-demand skills through EduVoyage's top, expertly crafted courses—all at your pace!
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;