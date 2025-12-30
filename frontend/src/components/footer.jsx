import React, { useState } from "react";
import {
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Shield,
  ArrowRight,
  GraduationCap,
  Phone,
  MapPin,
} from "lucide-react";

const SocialLink = ({ Icon, color, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? "scale(1.15) translateY(-4px) rotate(5deg)"
          : "scale(1) translateY(0) rotate(0deg)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={`relative ${color} p-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all group overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-50" />
      <Icon size={18} className="text-white relative z-10 drop-shadow-md" />
      <div className="absolute -inset-1 bg-white/30 rounded-lg blur opacity-0 group-hover:opacity-70 transition-opacity -z-10" />
    </a>
  );
};

const FooterLink = ({ children, href }) => (
  <li>
    <a
      href={href}
      className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm py-0.5"
    >
      <span className="w-0 group-hover:w-1.5 h-px bg-blue-500 mr-0 group-hover:mr-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#0a1a2f] text-white overflow-hidden font-sans border-t border-white/10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div
          className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] bg-purple-600/5 rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ animationDuration: "7s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mb-12">
          {/* Enhanced Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:rotate-6 group-hover:scale-110 duration-300">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  GMAT INSIGHT
                </h2>
                <p className="text-sm text-cyan-400 font-semibold tracking-wider uppercase">
                  Master Your Future
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <div className="p-2 rounded-md">
                  <Phone
                    size={16}
                    className="text-orange-500 group-hover:text-orange-400"
                  />
                </div>
                <span className="text-sm">
                  +91 9999687183 || +91 9891333772
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <div className="p-2 rounded-md">
                  <Mail
                    size={16}
                    className="text-green-500 group-hover:text-green-400"
                  />
                </div>
                <span className="text-sm">
                  info@gmatinsight.com || Sushma.Jha@gmatinsight.com ||
                  Bhoopendra.Singh@gmatinsight.com
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <div className="p-2 rounded-md">
                  <MapPin
                    size={16}
                    className="text-pink-500 group-hover:text-pink-400"
                  />
                </div>
                <span className="text-sm">
                  <b>Centre 1:</b> 205-206, 2nd Floor, Vardhman JayPee Plaza,
                  Sector-4 (Main Market), Plot No.6, Dwarka New Delhi-110075{" "}
                  <br />{" "}
                  <i>
                    {" "}
                   <b>Landmark:</b> Above Airtel Showroom, Opp. Ayushman Hospital
                  </i>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <div className="p-2 rounded-md">
                  <MapPin
                    size={16}
                    className="text-pink-500 group-hover:text-pink-400"
                  />
                </div>
                <span className="text-sm">
                  {" "}
                  <b>Centre 2:</b> NIL-26AB, 1st Floor, Malviya Nagar New Delhi
                  110017 <br />{" "}
                  <i>
                    <b>Landmark:</b> On road adjacent to Malviya Nagar Bus stop and
                    above Ganpati jeweller
                  </i>
                </span>
              </div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-blue-500 rounded-full" />
              Resources
            </h3>
            <ul className="space-y-1">
              {[
                "Plans & Pricing",
                "Live Classes",
                "Tutoring Services",
                "Student Reviews",
                "Score Guarantee",
                "MBA Admissions",
                "Success Stories",
              ].map((item) => (
                <FooterLink key={item} href="#">
                  {item}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-orange-500 rounded-full" />
              Company
            </h3>
            <ul className="space-y-1">
              {[
                "About Us",
                "Careers",
                "Partner Program",
                "Contact Support",
                "Privacy Policy",
                "Terms of Service",
                "Cookie Settings",
              ].map((item) => (
                <FooterLink key={item} href="#">
                  {item}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-0.5 h-3 bg-green-500 rounded-full" />
              Support
            </h3>
            <ul className="space-y-1">
              {[
                "Help Center",
                "Documentation",
                "API Reference",
                "Community Forum",
                "Report a Bug",
                "Feature Request",
                "System Status",
              ].map((item) => (
                <FooterLink key={item} href="#">
                  {item}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Links Column 4 - Learning + Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
                <span className="w-0.5 h-3 bg-yellow-500 rounded-full" />
                Learning
              </h3>
              <ul className="space-y-1">
                {[
                  "Study Guides",
                  "Video Tutorials",
                  "Practice Tests",
                  "Webinars",
                  "Blog Articles",
                  "Exam Calendar",
                  "Resources Library",
                ].map((item) => (
                  <FooterLink key={item} href="#">
                    {item}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div className="-ml-10 mt-15">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5">
                <span className="text-base">🌐</span>
                Connect With Us
              </h4>
              <div className="flex gap-1">
                <SocialLink
                  Icon={Facebook}
                  color="bg-gradient-to-br from-blue-600 to-blue-500"
                  href="#"
                />
                <SocialLink
                  Icon={Linkedin}
                  color="bg-gradient-to-br from-blue-700 to-blue-600"
                  href="#"
                />
                <SocialLink
                  Icon={Twitter}
                  color="bg-gradient-to-br from-sky-500 to-cyan-400"
                  href="#"
                />
                <SocialLink
                  Icon={Youtube}
                  color="bg-gradient-to-br from-red-600 to-red-500"
                  href="#"
                />
                <SocialLink
                  Icon={Instagram}
                  color="bg-gradient-to-br from-pink-600 via-purple-600 to-purple-500"
                  href="#"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-300 text-center md:text-left">
            <p className="font-medium text-gray-200">
              &copy; 2025{" "}
              <span className="text-white font-semibold">GMATInsight</span>. All
              rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a
              href="mailto:info@gmatinsight.com"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
            >
              <Mail
                size={14}
                className="text-blue-400 group-hover:scale-110 transition-transform"
              />
              info@gmatinsight.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
