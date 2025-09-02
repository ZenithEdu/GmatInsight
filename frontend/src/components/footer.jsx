import React from 'react';
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Instagram, 
  Music 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Security Badge Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="logo2.png" 
                alt="GMAT INSIGHT" 
                className="h-10"
              />
              
            </div>
            <p className="text-sm text-gray-300">
              Prepare with the best. Rock the test.™
            </p>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-full p-2">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">✓</span>
                </div>
              </div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
                COMODO SECURE
              </div>
            </div>
          </div>

          {/* GMAT INSIGHT Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">GMAT INSIGHT</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">TTP™ Plans and Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutoring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Live Classes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Score Guarantee</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">MBA Admissions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Refer and earn</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Question of the day</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">ACCOUNT</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GMAT Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">EA Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">SAT Prep</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
             <div className="space-y-4">
  <h3 className="text-lg font-medium text-gray-100 tracking-wider uppercase">Connect With Us</h3>
  <div className="grid grid-cols-3 gap-3">
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Facebook size={20} className="text-gray-100 group-hover:text-white" />
    </a>
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Linkedin size={20} className="text-gray-100 group-hover:text-white" />
    </a>
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Twitter size={20} className="text-gray-100 group-hover:text-white" />
    </a>
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Youtube size={20} className="text-gray-100 group-hover:text-white" />
    </a>
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Instagram size={20} className="text-gray-100 group-hover:text-white" />
    </a>
    <a href="#" className="bg-gray-800 hover:bg-gray-700 rounded-full p-3 flex items-center justify-center transition-all duration-200 w-12 h-12 group">
      <Music size={20} className="text-gray-100 group-hover:text-white" />
    </a>
  </div>
</div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              If you need any help, please email us at{' '}
              <a href="mailto:info@targettestprep.com" className="text-blue-400 hover:text-blue-300">
                info@gmatinsight.com
              </a>
            </p>
            <p className="text-sm text-gray-400">
              2025 © GMAT INSIGHT. All rights reserved
            </p>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              GMAT® is a registered trademark of Educational Testing Service (ETS). Educational Testing Service does not endorse, nor is it affiliated in any way with GMAT INSIGHT or any of this web site.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;