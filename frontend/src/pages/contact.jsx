import React, { useState } from "react";
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Users,
  Sparkles,
  User,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

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

const ContactUs = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    courseInterest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName) {
      newErrors.studentName = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          studentName: "",
          email: "",
          phone: "",
          courseInterest: "",
          message: "",
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  const stats = [
    {
      icon: Users,
      label: "Active Clients",
      value: "500+",
      color: "text-cyan-400",
    },
    {
      icon: Clock,
      label: "Avg Response",
      value: "<24h",
      color: "text-violet-400",
    },
    {
      icon: CheckCircle2,
      label: "Success Rate",
      value: "99.99%",
      color: "text-emerald-400",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900 overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-10px);
            }
            75% {
              transform: translateY(-15px) translateX(5px);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>

        <FloatingParticles />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 bg-gray-900/95 backdrop-blur-sm">
          {/* Soft gradient accents - adjusted for dark mode */}
          <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div
            className="pointer-events-none absolute top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30 bg-gray-800/50 backdrop-blur mb-6 hover:bg-gray-700/50 transition-colors cursor-pointer text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Response within 24 hours
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight animate-fadeIn text-gray-100">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 inline-flex items-center gap-2">
                our team
                <Sparkles className="inline-block text-blue-400" size={32} />
              </span>
            </h1>

            <p
              className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Ready to transform your business with intelligent automation?
              Share your use case and get a tailored solution demo.
            </p>

            {/* Stats Bar */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <stat.icon
                    className={`mx-auto mb-2 ${stat.color}`}
                    size={24}
                  />
                  <p className="text-2xl font-bold text-gray-100">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section
          id="contact"
          className="relative z-10 max-w-6xl mx-auto px-4 py-16"
        >
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Info Card */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-blue-400/30 rounded-3xl opacity-60 blur-2xl transition duration-500" />
              <div className="relative bg-white/90 border border-gray-200 rounded-3xl p-8 md:p-9 backdrop-blur-xl shadow-xl">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-900">
                  Ready to Ace Your GMAT?
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
                  Share your goals, current score, and timeline. Our experts
                  will craft a personalized prep plan just for you.
                </p>

                <div className="space-y-6">
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-blue-50/80 border border-blue-200/50 backdrop-blur-sm shadow-sm">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mt-0.5">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-blue-600 font-medium mb-1">
                        Call us
                      </p>
                      <p className="text-sm font-semibold text-gray-900 leading-tight break-words">
                        +91 99996 87183 <span className="text-gray-500">|</span>{" "}
                        +91 98913 33772
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-purple-50/80 border border-purple-200/50 backdrop-blur-sm shadow-sm">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg mt-0.5">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-purple-600 font-medium mb-1">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-gray-900 leading-tight break-all">
                        info@gmatinsight.com{" "}
                        <span className="text-gray-500">|</span>
                        <br />
                        <span className="text-gray-600">Sushma.Jha@</span>
                        gmatinsight.com <span className="text-gray-500">|</span>
                        <br />
                        <span className="text-gray-600">Bhoopendra.Singh@</span>
                        gmatinsight.com
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/50 backdrop-blur-sm shadow-sm">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg mt-0.5">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide text-emerald-600 font-medium mb-2">
                        Locations
                      </p>
                      <div className="space-y-3 text-sm font-medium text-gray-900 leading-relaxed">
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-800">
                            Centre 1
                          </p>
                          <p className="text-gray-700 text-xs">
                            205-206, 2nd Floor, Vardhman JayPee Plaza, Sector-4
                            (Main Market), Plot No.6, Dwarka, New Delhi-110075
                          </p>
                          <p className="text-emerald-600 text-xs italic">
                            Above Airtel Showroom, Opp. Ayushman Hospital
                          </p>
                        </div>
                        <div className="pt-3 border-t border-emerald-100">
                          <p className="font-semibold text-gray-800">
                            Centre 2
                          </p>
                          <p className="text-gray-700 text-xs">
                            NIL-26AB, 1st Floor, Malviya Nagar, New Delhi 110017
                          </p>
                          <p className="text-emerald-600 text-xs italic">
                            Adjacent to Malviya Nagar Bus stop, above Ganpati
                            Jeweller
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-700">
                  <p className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <CheckCircle2 className="text-emerald-500" size={16} />
                    Personalized study plans tailored to your needs
                  </p>
                  <p className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <CheckCircle2 className="text-blue-500" size={16} />
                    Experienced instructors with proven track records
                  </p>
                  <p className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <CheckCircle2 className="text-purple-500" size={16} />
                    High success rate with flexible scheduling options
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400/30 via-purple-300/20 to-blue-400/30 rounded-3xl opacity-40 blur-2xl" />
              <div className="relative bg-white/95 border border-gray-200 rounded-3xl p-7 md:p-8 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Looking for a solution?
                    </h2>
                    <p className="text-xs md:text-sm text-gray-700 mt-1">
                      Fill the form and we&apos;ll get back within one business
                      day.
                    </p>
                  </div>
                  <span className="hidden md:inline-flex text-[11px] px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
                    No spam, ever
                  </span>
                </div>

                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-emerald-600" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700 text-center">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Student Name */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          name="studentName"
                          required
                          value={formData.studentName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 px-4 py-3 rounded-xl bg-white border ${
                            errors.studentName
                              ? "border-red-400"
                              : "border-gray-300"
                          } text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-700 transition`}
                          placeholder="Your full name"
                        />
                      </div>
                      {errors.studentName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.studentName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 px-4 py-3 rounded-xl bg-white border ${
                            errors.email ? "border-red-400" : "border-gray-300"
                          } text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-700 transition`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 px-4 py-3 rounded-xl bg-white border ${
                            errors.phone ? "border-red-400" : "border-gray-300"
                          } text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-700 transition`}
                          placeholder="+91 1234567890"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Course Interest */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        Interested In
                      </label>
                      <div className="relative">
                        <BookOpen
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <select
                          name="courseInterest"
                          value={formData.courseInterest}
                          onChange={handleInputChange}
                          className="w-full pl-10 px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-700 transition appearance-none"
                        >
                          <option value="">Select course/program</option>
                          <option value="GMAT">GMAT</option>
                          <option value="GRE">GRE</option>
                          <option value="SAT">SAT</option>
                          <option value="TOEFL">TOEFL</option>
                          <option value="IELTS">IELTS</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-900">
                        Message
                      </label>
                      <div className="relative">
                        <MessageCircle
                          className="absolute left-3 top-3 text-gray-400"
                          size={18}
                        />
                        <textarea
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full pl-10 pt-3 px-4 py-3 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-700 transition resize-none"
                          placeholder="Tell us about your goals, preferred start date, and any specific requirements..."
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {formData.message.length}/500 characters
                      </p>
                    </div>

                    {/* Submit + Hint */}
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-900 to-purple-900 text-white py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-gray-600 text-center">
                        By submitting, you agree to be contacted about product
                        and updates.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
