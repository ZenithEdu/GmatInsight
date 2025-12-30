import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isTransparentRoute = ['/', '/about', '/contact', '/testimonials', '/full-length-test', '/gmat', '/gmat-course-page'].includes(location.pathname);

  useEffect(() => {
    if (!isTransparentRoute) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isTransparentRoute]);

  const handleLoginClick = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Courses', hasDropdown: true },
    { name: 'Full Length Test', href: '/full-length-test' },
    { name: 'MBA Admissions', href: '#mba-admissions' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#2b343d] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src="logo2.png" alt="GMAT INSIGHT" className="h-8 md:h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation (Large Screens) */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-3 xl:space-x-6 max-[1400px]:space-x-2">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className="text-white hover:text-blue-300 
                               px-2 xl:px-3 max-[1400px]:px-2
                               py-2 
                               text-sm xl:text-base 
                               max-[1400px]:text-[0.85rem] 
                               max-[1200px]:text-[0.8rem]
                               transition-colors duration-200 flex items-center"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-1">
                        <Link
                          to="/gmat"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 max-[1400px]:text-[0.85rem]"
                        >
                          GMAT
                        </Link>
                        <Link
                          to="/gre"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 max-[1400px]:text-[0.85rem]"
                        >
                          GRE
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet / Mid Screen Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white hover:text-blue-300 px-2 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-300 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 max-[1400px]:space-x-2">
            <button
              onClick={handleLoginClick}
              className="text-white hover:text-blue-300 
                         px-3 xl:px-4 max-[1400px]:px-3
                         py-1.5 xl:py-2 
                         text-sm xl:text-base 
                         max-[1400px]:text-[0.85rem] 
                         max-[1200px]:text-[0.8rem]
                         font-medium border border-white hover:border-blue-300 rounded transition-colors duration-200"
            >
              LOGIN
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white 
                                px-4 xl:px-6 max-[1400px]:px-4
                                py-1.5 xl:py-2 
                                text-sm xl:text-base 
                                max-[1400px]:text-[0.85rem] 
                                max-[1200px]:text-[0.8rem]
                                font-medium rounded transition-colors duration-200">
              TRY NOW
            </button>
          </div>

          {/* Mobile menu button (Phones only) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-300 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Collapsible Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-[#2b343d]`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full text-left text-white hover:text-blue-300 px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center justify-between"
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="pl-4">
                      <Link
                        to="/gmat"
                        className="block px-3 py-2 text-base text-gray-200 hover:text-blue-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        GMAT
                      </Link>
                      <Link
                        to="/gre"
                        className="block px-3 py-2 text-base text-gray-200 hover:text-blue-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        GRE
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className="text-white hover:text-blue-300 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-600">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleLoginClick}
                className="text-left text-white hover:text-blue-300 px-3 text-base font-medium border border-white hover:border-blue-300 rounded transition-colors duration-200"
              >
                LOGIN
              </button>
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 text-base font-medium rounded transition-colors duration-200">
                TRY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
