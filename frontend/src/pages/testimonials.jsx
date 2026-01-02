import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Quote, X, Sparkles, TrendingUp, CheckCircle2, BookOpen } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-200/30"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + "s",
          }}
        />
      ))}
    </div>
  );
};

const TestimonialsPage = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 const themes = {
  indigo: {
    wrapper: 'shadow-lg shadow-indigo-200/50 border-2 border-indigo-300 bg-indigo-50/10',
    accent: 'text-indigo-700',
    gradient: 'from-indigo-700 to-blue-700',
    bgAccent: 'bg-indigo-100',
    button: 'bg-indigo-700 text-white hover:bg-indigo-800',
  },

  emerald: {
    wrapper: 'shadow-lg shadow-emerald-200/50 border-2 border-emerald-300 bg-emerald-50/10',
    accent: 'text-emerald-700',
    gradient: 'from-emerald-700 to-teal-700',
    bgAccent: 'bg-emerald-100',
    button: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },

  rose: {
    wrapper: 'shadow-lg shadow-rose-200/50 border-2 border-rose-300 bg-rose-50/10',
    accent: 'text-rose-700',
    gradient: 'from-rose-700 to-pink-700',
    bgAccent: 'bg-rose-100',
    button: 'bg-rose-700 text-white hover:bg-rose-800',
  },

  amber: {
    wrapper: 'shadow-lg shadow-amber-200/50 border-2 border-amber-300 bg-amber-50/10',
    accent: 'text-amber-700',
    gradient: 'from-amber-700 to-orange-700',
    bgAccent: 'bg-amber-100',
    button: 'bg-amber-700 text-white hover:bg-amber-800',
  },

  cyan: {
    wrapper: 'shadow-lg shadow-cyan-200/50 border-2 border-cyan-300 bg-cyan-50/10',
    accent: 'text-cyan-700',
    gradient: 'from-cyan-700 to-blue-700',
    bgAccent: 'bg-cyan-100',
    button: 'bg-cyan-700 text-white hover:bg-cyan-800',
  },

  violet: {
    wrapper: 'shadow-lg shadow-violet-200/50 border-2 border-violet-300 bg-violet-50/10',
    accent: 'text-violet-700',
    gradient: 'from-violet-700 to-purple-700',
    bgAccent: 'bg-violet-100',
    button: 'bg-violet-700 text-white hover:bg-violet-800',
  },
};

  const testimonials = [
    {
      name: "James Carter",
      rating: 715,
      theme: themes.indigo,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "This platform is fantastic! The study materials are well-structured. I've improved my quantitative score by 10 points in just two months."
    },
    {
      name: "Sarah Williams",
      rating: 735,
      theme: themes.emerald,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The verbal section strategies are game-changing. The adaptive practice tests mirror the real exam perfectly, providing a level of realism I couldn't find elsewhere."
    },
    {
      name: "Emily Zhang",
      rating: 785,
      theme: themes.rose,
      featured: true,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Transformed my preparation. The analytical writing feedback is detailed, and the adaptive plan fits my crazy schedule. My confidence has skyrocketed!"
    },
    {
      name: "Rahul Mehta",
      rating: 751,
      theme: themes.amber,
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "The bite-sized lessons helped me identify weak areas quickly. I was scoring 650 on practice tests before joining; the growth has been exponential."
    },
    {
      name: "Liam Johnson",
      rating: 786,
      theme: themes.cyan,
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "Excellent resource! The data sufficiency strategies are brilliant, and the question bank is massive. The mobile app lets me study during my commute."
    },
    {
      name: "Aisha Khan",
      rating: 742,
      theme: themes.violet,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      content: "From basic concepts to advanced strategies, this GMAT prep has everything. The sentence correction modules are particularly outstanding."
    }
  ];

  const stats = [
    { icon: TrendingUp, label: 'Avg. Improvement', value: '+110' },
    { icon: CheckCircle2, label: 'Success Rate', value: '94%' },
    { icon: BookOpen, label: 'Practice Questions', value: '5,000+' },
    { icon: Star, label: 'Student Rating', value: '4.9/5' },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 font-sans text-slate-900 selection:bg-blue-200 overflow-hidden relative">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-gray-900/95 backdrop-blur-sm">
        {/* Soft gradient accents */}
        <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl animate-pulse" style={{animationDelay: "1s"}} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30 bg-gray-800/50 backdrop-blur mb-6 hover:bg-gray-700/50 transition-colors cursor-pointer text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Proven Results from Top Scorers</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight animate-fadeIn text-gray-100">
            Success Stories of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 inline-flex items-center gap-2">
               our top performers
              <Sparkles className="inline-block text-blue-400" size={32} />
            </span>
          </h1>
          
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-fadeIn" style={{animationDelay: "0.2s"}}>
            Hear from our top performers who aced the GMAT with our prep. Their stories will inspire your journey to success.
          </p>

        </div>
      </section>

      {/* Main Grid */}
      <main className="relative z-20 mt-10 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                onClick={() => setSelectedTestimonial(testimonial)}
                className={`break-inside-avoid group cursor-pointer relative rounded-3xl transition-all duration-300 hover:-translate-y-2
                  bg-white/30 backdrop-blur-xl p-8 overflow-hidden border
                  ${testimonial.theme.wrapper} 
                `}
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${testimonial.theme.gradient}`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-1 rounded-full bg-gradient-to-br ${testimonial.theme.gradient}`}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r ${testimonial.theme.gradient}`}>
                          {testimonial.name}
                        </h4>
                        <div className="mt-1">
                          <span className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${testimonial.theme.gradient} block`}>
                            {testimonial.rating}
                          </span>
                          <div className="flex text-amber-400 mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Quote className={`w-8 h-8 opacity-50 ${testimonial.theme.accent}`} />
                  </div>

                  <p className="text-slate-800 leading-relaxed mb-8 font-medium line-clamp-4">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-end pt-6 border-t border-slate-900/5">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${testimonial.theme.button}`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-100/30 backdrop-blur-sm transition-all">
          <div className={`bg-white/70 border border-white/60 backdrop-blur-2xl rounded-[2.5rem] max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-300 bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden`}>
            
            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${selectedTestimonial.theme.gradient} opacity-5 pointer-events-none`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/10 via-transparent to-transparent" />

            <button 
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 shadow-sm border border-slate-100"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>

            <div className="w-full md:w-2/5 bg-white/40 p-12 text-slate-900 flex flex-col justify-between relative overflow-hidden border-r border-white/50">
              <div className="relative z-10">
                <div className={`p-1.5 inline-block rounded-full bg-gradient-to-br ${selectedTestimonial.theme.gradient} mb-6 shadow-lg`}>
                  <img 
                    src={selectedTestimonial.image} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-white" 
                    alt=""
                  />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-slate-900">{selectedTestimonial.name}</h3>
                <div className="mb-8">
                  <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${selectedTestimonial.theme.gradient} block`}>
                    {selectedTestimonial.rating}
                  </span>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-12 flex flex-col justify-center relative z-10">
              <Quote className={`w-16 h-16 opacity-20 mb-8 ${selectedTestimonial.theme.accent}`} />
              <p className="text-2xl text-slate-800 leading-relaxed italic font-medium mb-10">
                "{selectedTestimonial.content}"
              </p>
              <div className="absolute bottom-4 right-4 opacity-20">
                <Sparkles className={`w-8 h-8 ${selectedTestimonial.theme.accent} animate-pulse`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default TestimonialsPage;