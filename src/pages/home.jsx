import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import GMATCourseFeatures from '../components/gmatcoursesfeature';
import Reviews from '../components/reviews';
import GMATInterface from '../components/gmatInterface';
import Footer from '../components/footer';
import CoursesSection from '../components/courses';
import Stats from '../components/stats';
import FoundersComponent from '../components/founders';
// import GMATTestimonialsBanner from '../components/testimonials';
import WhatWeOffer from '../components/whatweoffer';
import TestimonialCarousel from '../components/testcarousel';






// Demo Component with dummy content
const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      
      {/* Hero Section */}
      <Hero />

      {/* What we offer */}
      <WhatWeOffer/>
    

      {/* Testimonials */}
      <TestimonialCarousel/>

      {/* Features Section */}
      <GMATCourseFeatures/>

      {/* Reviews */}
      <Reviews/>

      {/* Gmat Interface */}
      <GMATInterface/>

      {/* stats  */}
      <Stats/>

      {/* Courses Section */}
      <CoursesSection/>
      

      {/* founders Section */}
      <FoundersComponent/>
      

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;