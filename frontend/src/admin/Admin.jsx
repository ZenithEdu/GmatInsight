import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  ArrowRight,
  BookOpen,
  Star,
  Users,
  Settings,
  LogOut,
  UserCircle,
  Archive,
  ClipboardCheck,
  Bell,
  Menu,
  X,
  TrendingUp,
  Activity,
} from 'lucide-react';
import Footer from '../components/footer';

// Simple Card Components
const Card = ({ className = '', children }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className = '', children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className = '', children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ className = '', children }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ className = '', children }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Simple Button Component
const Button = ({ className = '', variant = 'default', size = 'default', children, onClick }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Simple Avatar Component
const Avatar = ({ className = '', children }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt = '' }) => (
  <img src={src} alt={alt} className="aspect-square h-full w-full" />
);

const AvatarFallback = ({ children }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
    {children}
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('content');
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check if welcome banner has been dismissed
  useEffect(() => {
    const shown = localStorage.getItem('welcomeBannerShown');
    setShowWelcomeBanner(!shown);
  }, []);

  // Page load complete
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Auto-dismiss banner after 5 seconds
  useEffect(() => {
    if (showWelcomeBanner && !isLoading) {
      const timer = setTimeout(() => {
        dismissWelcomeBanner();
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showWelcomeBanner, isLoading]);

  // Handle banner dismissal
  const dismissWelcomeBanner = () => {
    setShowWelcomeBanner(false);
    localStorage.setItem('welcomeBannerShown', 'true');
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Admin sections data
  const adminCategories = [
    {
      id: 'content',
      title: 'Content',
      icon: FileText,
      description: 'Manage all learning materials',
      items: [
        {
          title: 'Assessment Manager',
          description: 'Create and manage assessments',
          icon: ClipboardCheck,
          color: 'blue',
          path: '/assessment-manager',
          features: ['Analytics', 'Performance', 'Custom Parameters']
        },
        {
          title: 'Question Vault',
          description: 'Library of questions & templates',
          icon: Archive,
          color: 'emerald',
          path: '/question-vault',
          features: ['Smart Categorization', 'Difficulty Filters', 'Multi-format']
        },
        {
          title: 'Course Creator',
          description: 'Design comprehensive courses',
          icon: BookOpen,
          color: 'violet',
          path: '/course-creator',
          features: ['Multimedia', 'Progress Tracking', 'Certification']
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      description: 'User interactions & feedback',
      items: [
        {
          title: 'Testimonials',
          description: 'Manage user reviews',
          icon: Star,
          color: 'amber',
          path: '/testimonials',
          features: ['Approval Workflow', 'Featured Reviews', 'Responses']
        },
        {
          title: 'User Management',
          description: 'Administer accounts & roles',
          icon: Users,
          color: 'cyan',
          path: '/user-management',
          features: ['Role Control', 'Activity Logs', 'Access Levels']
        },
      ]
    },
    {
      id: 'administration',
      title: 'Settings',
      icon: Settings,
      description: 'System configuration',
      items: [
        {
          title: 'Admin Profile',
          description: 'Personal settings & security',
          icon: UserCircle,
          color: 'indigo',
          path: '/admin-profile',
          features: ['Personal Info', 'Security', 'Preferences']
        },
        {
          title: 'System Settings',
          description: 'Global application config',
          icon: Settings,
          color: 'slate',
          path: '/settings',
          features: ['Appearance', 'Notifications', 'Integrations']
        },
      ]
    }
  ];

  // Color mapping for sophisticated UI
  const getColorStyles = (color) => {
    const maps = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', iconBg: 'bg-blue-100', gradient: 'from-blue-600 to-blue-400', dot: 'bg-blue-500', accentLight: 'bg-blue-400/10', hover: 'hover:shadow-blue-200' },
      emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconBg: 'bg-emerald-100', gradient: 'from-emerald-600 to-emerald-400', dot: 'bg-emerald-500', accentLight: 'bg-emerald-400/10', hover: 'hover:shadow-emerald-200' },
      violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', iconBg: 'bg-violet-100', gradient: 'from-violet-600 to-violet-400', dot: 'bg-violet-500', accentLight: 'bg-violet-400/10', hover: 'hover:shadow-violet-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', iconBg: 'bg-amber-100', gradient: 'from-amber-600 to-amber-400', dot: 'bg-amber-500', accentLight: 'bg-amber-400/10', hover: 'hover:shadow-amber-200' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', iconBg: 'bg-cyan-100', gradient: 'from-cyan-600 to-cyan-400', dot: 'bg-cyan-500', accentLight: 'bg-cyan-400/10', hover: 'hover:shadow-cyan-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', iconBg: 'bg-indigo-100', gradient: 'from-indigo-600 to-indigo-400', dot: 'bg-indigo-500', accentLight: 'bg-indigo-400/10', hover: 'hover:shadow-indigo-200' },
      slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', iconBg: 'bg-slate-100', gradient: 'from-slate-600 to-slate-400', dot: 'bg-slate-500', accentLight: 'bg-slate-400/10', hover: 'hover:shadow-slate-200' },
    };
    return maps[color] || maps.blue;
  };

  const activeCategoryData = adminCategories.find(c => c.id === activeCategory);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col lg:flex-row font-sans text-slate-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-lg border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg animate-pulse-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GMATInsight</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:rotate-90 transition-transform duration-300">
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      {(isSidebarOpen || !isMobile) && (
        <aside 
          className={`fixed lg:sticky top-0 h-screen w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200 z-40 flex flex-col shadow-2xl lg:shadow-none transition-all duration-500 ${
            isMobile ? 'top-[65px] h-[calc(100vh-65px)]' : ''
          } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          {/* Logo Area */}
          <div className="hidden lg:flex items-center gap-3 p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg animate-pulse-glow hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GMATInsight</h1>
              <p className="text-xs text-gray-500 font-medium">Admin Workspace</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Modules</p>
              {adminCategories.map((category, idx) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      if(isMobile) setIsSidebarOpen(false);
                    }}
                    style={{ animationDelay: `${idx * 100}ms` }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' 
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-gray-900 hover:scale-105'
                    }`}
                  >
                    <category.icon className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:scale-110 '}`} />
                    {category.title}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Access</p>
             
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-gray-900 transition-all duration-300 group hover:scale-105">
                <LogOut className="h-4 w-4 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                Logout
              </button>
            </div>
          </nav>

          {/* User Profile */}
          {/* <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg">
              <Avatar className="h-9 w-9 border-2 border-blue-200 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@gmatinsight.com</p>
              </div>
              <Settings className="h-4 w-4 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div> */}
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
  {activeCategoryData?.title}
</h2>

            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block mt-1">
              {activeCategoryData?.description}
            </p>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          
          {/* Welcome Banner - Only shows once */}
          {!isLoading && showWelcomeBanner && (
            <div className="rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm p-4 sm:p-5 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <button
                onClick={dismissWelcomeBanner}
                className="absolute top-3 right-3 z-20 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 group/close"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4 text-gray-400 group-hover/close:text-gray-600" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 pr-8">
                    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Welcome back, Admin
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      You have <span className="font-semibold text-blue-600">3 pending approvals</span> in Community and <span className="font-semibold text-indigo-600">5 new assessments</span> created on December 23, 2025. System performance is optimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {activeCategoryData?.items.map((item, index) => {
              const styles = getColorStyles(item.color);
              const isHovered = hoveredCard === item.title;
              
              return (
                <div
                  key={item.title}
                  style={{ animationDelay: `${index * 1000}ms` }}
                  onMouseEnter={() => setHoveredCard(item.title)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="transform transition-all duration-15000 hover:scale-105 hover:-translate-y-2"
                >
                   <Card className={`h-full border-4 ${styles.border} shadow-xl hover:shadow-2xl transition-all duration-1000 group overflow-hidden relative bg-white rounded-2xl ${styles.hover}`}>
                    
                    {/* Gradient Header Background */}
                    <div
  className={`absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[20%]
  bg-gradient-to-br ${styles.gradient} opacity-[0.1]`}
></div>


                    
                    {/* Animated Orbs */}
                    <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl ${styles.accentLight} opacity-5 group-hover:opacity-75 transition-all duration-100 animate-blob`}></div>
                    <div className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl ${styles.accentLight} opacity-5 group-hover:opacity-75 transition-all duration-100 animate-blob animation-delay-2000`}></div>
                    
                    {/* Shimmer Effect */}
                    <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-500"></div>

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`p-4 rounded-2xl shadow-xl flex-shrink-0 ${styles.bg} border border-gray-100 transform transition-all duration-500  group-hover:shadow-2xl`}>
                          <item.icon className={`h-8 w-8 ${styles.text} transition-transform duration-500`} />
                        </div>
                      </div>
                      <CardTitle className="mt-6 text-xl font-bold text-gray-900 transition-all duration-300">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-2 text-sm leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 flex flex-col">
                      <div className="space-y-3 mb-8 flex-grow">
                        {item.features.map((feature, i) => (
                          <div 
                            key={i}
                            style={{ transitionDelay: `${i * 50}ms` }}
                            className="flex items-center text-sm text-gray-700 font-medium"
                          >
                            <div className={`w-2.5 h-2.5 rounded-full mr-3 ${styles.dot}`}></div>
                            <span className="">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer w-full font-semibold py-3 px-4 transition-all duration-500 text-white shadow-xl bg-gradient-to-r ${styles.gradient} hover:shadow-2xl rounded-xl text-base transform hover:scale-105 group-hover:animate-pulse-glow relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Manage {item.title.split(' ')[0]}
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>

  );
}