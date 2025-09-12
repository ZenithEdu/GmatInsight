import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Star,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  UserCircle,
  Archive,
  ClipboardCheck
} from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on all screens
  const [activeCategory, setActiveCategory] = useState('content');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On larger screens, keep sidebar open by default, but allow toggle
      if (!mobile && sidebarOpen === false) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking on a link on mobile, and handle body overflow
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sidebarOpen, isMobile]);

  // Admin sections data - easily expandable
  const adminCategories = [
    {
      id: 'content',
      title: 'Content Management',
      icon: FileText,
      description: 'Manage all content types',
      color: 'blue',
      items: [
        {
          title: 'Assessment Manager',
          description: 'Create, update and manage assessments',
          icon: ClipboardCheck,
          color: 'blue',
          path: '/assessment-manager',
          features: ['Analytics & insights', 'Performance tracking', 'Customizable parameters']
        },
        {
          title: 'Question Vault',
          description: 'Manage question library',
          icon: Archive,
          color: 'emerald',
          path: '/question-vault',
          features: ['Smart categorization', 'Difficulty filtering', 'Multiple formats']
        },
        {
          title: 'Course Creator',
          description: 'Design and publish courses',
          icon: BookOpen,
          color: 'purple',
          path: '/course-creator',
          features: ['Multimedia content', 'Progress tracking', 'Certification']
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      description: 'Manage user interactions',
      color: 'amber',
      items: [
        {
          title: 'Testimonials',
          description: 'Manage user testimonials',
          icon: Star,
          color: 'amber',
          path: '/testimonials',
          features: ['Approve submissions', 'Featured reviews', 'Response management']
        },
        {
          title: 'User Management',
          description: 'Administer user accounts',
          icon: Users,
          color: 'cyan',
          path: '/user-management',
          features: ['Role management', 'Activity monitoring', 'Access controls']
        },

      ]
    },
    {
      id: 'administration',
      title: 'Administration',
      icon: Settings,
      description: 'Configure application',
      color: 'indigo',
      items: [
        {
          title: 'Admin Profile',
          description: 'Update admin information',
          icon: UserCircle,
          color: 'indigo',
          path: '/admin-profile',
          features: ['Update personal info', 'Change password', 'Manage preferences']
        },
        {
          title: 'System Settings',
          description: 'Configure application settings',
          icon: Settings,
          color: 'violet',
          path: '/settings',
          features: ['Appearance', 'Notifications', 'Integration']
        },
        
      ]
    }
  ];

  // Color classes mapping - updated for more professional colorful scheme
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100',
      button: 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
      dot: 'bg-blue-500',
      text: 'text-blue-600',
      lightBg: 'bg-blue-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    emerald: {
      bg: 'from-emerald-500 to-emerald-700',
      iconBg: 'bg-emerald-100',
      button: 'from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800',
      dot: 'bg-emerald-500',
      text: 'text-emerald-600',
      lightBg: 'bg-emerald-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    purple: {
      bg: 'from-purple-500 to-purple-700',
      iconBg: 'bg-purple-100',
      button: 'from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
      dot: 'bg-purple-500',
      text: 'text-purple-600',
      lightBg: 'bg-purple-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    amber: {
      bg: 'from-amber-400 to-amber-600',
      iconBg: 'bg-amber-100',
      button: 'from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700',
      dot: 'bg-amber-400',
      text: 'text-amber-500',
      lightBg: 'bg-amber-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    cyan: {
      bg: 'from-cyan-400 to-cyan-600',
      iconBg: 'bg-cyan-100',
      button: 'from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700',
      dot: 'bg-cyan-400',
      text: 'text-cyan-500',
      lightBg: 'bg-cyan-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    gray: {
      bg: 'from-gray-400 to-gray-600',
      iconBg: 'bg-gray-100',
      button: 'from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700',
      dot: 'bg-gray-400',
      text: 'text-gray-500',
      lightBg: 'bg-gray-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    indigo: {
      bg: 'from-indigo-500 to-indigo-700',
      iconBg: 'bg-indigo-100',
      button: 'from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800',
      dot: 'bg-indigo-500',
      text: 'text-indigo-600',
      lightBg: 'bg-indigo-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    green: {
      bg: 'from-green-500 to-green-700',
      iconBg: 'bg-green-100',
      button: 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
      dot: 'bg-green-500',
      text: 'text-green-600',
      lightBg: 'bg-green-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    rose: {
      bg: 'from-rose-400 to-rose-600',
      iconBg: 'bg-rose-100',
      button: 'from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700',
      dot: 'bg-rose-400',
      text: 'text-rose-500',
      lightBg: 'bg-rose-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    },
    violet: {
      bg: 'from-violet-500 to-violet-700',
      iconBg: 'bg-violet-100',
      button: 'from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800',
      dot: 'bg-violet-500',
      text: 'text-violet-600',
      lightBg: 'bg-violet-50',
      sidebarActive: 'bg-gray-50 text-gray-900'
    }
  };

  const getDescriptionText = (title) => {
    const descriptions = {
      'Assessment Manager': 'All assessments are created and managed here.',
      'Question Vault': 'All question vaults and templates are stored here.',
      'Course Creator': 'Design and publish engaging learning experiences.',
      'Testimonials': 'All user testimonials are managed here.',
      'User Management': 'Administer user accounts, roles and permissions.',
      'System Settings': 'Configure application settings and preferences.',
      'Admin Profile': 'Update your admin profile and settings.',
    };
    return descriptions[title] || 'Manage this section efficiently.';
  };

  const AdminCard = ({ title, description, icon: Icon, color, features, path }) => {
    const colors = colorClasses[color];
    
    return (
      <div className="group h-80"> {/* Fixed height for all cards */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden h-full flex flex-col">
          {/* Card Header - Reduced padding and font sizes */}
          <div className={`bg-gradient-to-r ${colors.bg} p-4 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className=" bg-opacity-20 rounded-md backdrop-blur-sm">
                  <Icon className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{title}</h3>
              <p className="text-white text-opacity-90 text-xs">{description}</p>
            </div>
          </div>

          {/* Card Body - Adjusted spacing */}
          <div className="p-4 flex-1 flex flex-col">
            <p className="text-gray-600 mb-4 text-xs leading-relaxed">
              {getDescriptionText(title)}
            </p>

            {/* Features - Smaller text */}
            <div className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></div>
                  <span className="text-gray-700 text-xs">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(path)}
              className={`mt-auto w-full bg-gradient-to-r ${colors.button} text-white py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md cursor-pointer group text-sm`}
            >
              <span className="leading-none">Open {title}</span>
              <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const activeCategoryData = adminCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Fixed and toggleable on all screens */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out h-screen flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header - Reduced size */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-500">
          <div className="flex items-center space-x-2">
            <div className=" bg-opacity-20 p-1.5 rounded-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">GMATInsight</h1>
              <p className="text-blue-100 text-xs">Admin Panel</p>
            </div>
          </div>
          <button 
            className="p-1.5 rounded-md text-white hover:bg-white hover:bg-opacity-20 transition-colors lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto py-3">
          <nav className="space-y-1 px-3">
            {adminCategories.map((category) => {
              const colors = colorClasses[category.color];
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  className={`flex items-center w-full p-3 rounded-md transition-all duration-200 group text-sm relative overflow-hidden ${
                    isActive 
                      ? colors.sidebarActive + ' font-semibold shadow-sm' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                >
                  <category.icon className={`h-4 w-4 mr-3 flex-shrink-0 transition-colors duration-200 ${isActive ? colors.text : 'text-gray-500'}`} />
                  <div className="text-left flex-1">
                    <div className={`transition-colors duration-200 ${isActive ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>{category.title}</div>
                    <div className={`text-xs transition-colors duration-200 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                      {category.items.length} items
                    </div>
                  </div>
                  {/* Animated Underline */}
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out ${isActive ? 'w-full bg-gradient-to-r from-blue-500 to-indigo-600' : 'w-0 bg-transparent'}`}></div>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Sidebar Footer - Reduced size */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-200 transition-colors text-sm">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content - Adjust margin when sidebar open */}
      <div className={`flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar - Always show toggle */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-3 lg:p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeCategoryData.title}</h2>
                  <p className="text-gray-600 text-sm">{activeCategoryData.description}</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <span>{activeCategoryData.items.length} features available</span>
            </div>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {activeCategoryData.items.map((item, index) => (
                <AdminCard key={index} {...item} />
              ))}
            </div>

            {/* Empty State */}
            {activeCategoryData.items.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <activeCategoryData.icon className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items available</h3>
                <p className="text-gray-600">Items for this category will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}