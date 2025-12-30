import React, { useState, useCallback, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  TrendingUp,
  Users,
  Award,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function GMATLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  // Load saved credentials from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("gmat_email");
    const savedRememberMe = localStorage.getItem("gmat_rememberMe");
    
    if (savedEmail && savedRememberMe === "true") {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Email validation
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  }, []);

  // Password validation
  const validatePassword = useCallback((password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setFormErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    // Save email to localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem("gmat_email", email);
      localStorage.setItem("gmat_rememberMe", "true");
    } else {
      localStorage.removeItem("gmat_email");
      localStorage.removeItem("gmat_rememberMe");
    }

    // Simulate API call
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API delay
      console.log("Login successful:", { email });
      // Here you would typically:
      // 1. Make API call to your authentication endpoint
      // 2. Store auth token
      // 3. Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth logic here
    console.log("Google sign-in clicked");
  };

  // Stats data for better maintainability
  const stats = [
    { value: "710+", label: "Avg. Score", color: "text-blue-400" },
    { value: "48K+", label: "Students", color: "text-green-400" },
    { value: "94%", label: "Satisfaction", color: "text-purple-400" },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Adaptive Precision",
      description: "Questions adapt to your performance — focus on what matters.",
      bgColor: "bg-blue-900/40",
      iconColor: "text-blue-400",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "+82 points avg. improvement — reach 720+ in 3–6 months.",
      bgColor: "bg-green-900/40",
      iconColor: "text-green-400",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Feedback from 700+ scorers and admissions experts.",
      bgColor: "bg-purple-900/40",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <>
      <Navbar />
<div className="pt-16  bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-800 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Hero Section */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 overflow-y-auto">
          <div className="max-w-md mx-auto flex flex-col justify-center h-full">


            {/* Headline */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold leading-tight mb-3">
                Your Path to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  700+
                </span>
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Join 48,000+ students turning smart practice into top business school admissions.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-5 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 group hover:bg-gray-800/20 p-3 rounded-xl transition-colors duration-200"
                >
                  <div className={`flex-shrink-0 w-9 h-9 ${feature.bgColor} rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-200`}>
                    <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1.5 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-700/50 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 bg-blue-50 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 relative">
          <div className="w-full max-w-sm md:max-w-md">

            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                Welcome back!
              </h2>
            </div>

            {/* Form Card */}
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/90 rounded-2xl shadow-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) {
                          setFormErrors(prev => ({ ...prev, email: "" }));
                        }
                      }}
                      required
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className={`w-full pl-10 pr-3 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        formErrors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                      placeholder="student@example.com"
                      disabled={isLoading}
                    />
                  </div>
                  {formErrors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (formErrors.password) {
                          setFormErrors(prev => ({ ...prev, password: "" }));
                        }
                      }}
                      required
                      aria-describedby={formErrors.password ? "password-error" : undefined}
                      className={`w-full pl-10 pr-10 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        formErrors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                      disabled={isLoading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p id="password-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-offset-0"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 transition-all shadow-sm hover:shadow text-sm font-medium text-gray-700 disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label="Continue with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.09-4.47 3.09-7.8z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.78H.96v2.67C2.75 20.19 6.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.51 14.22c-.23-.68-.36-1.41-.36-2.22s.13-1.54.36-2.22V7.33H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.67l4.55-2.45z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.7 0 2.75 2.81 0.96 6.33l4.55 2.45C6.42 6.02 8.98 4.98 12 4.98z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 mt-6 text-sm">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Sign up free
                  <ChevronRight className="h-4 w-4" />
                </a>
              </p>
            </div>

            {/* Login-specific Footer */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Secure login • Privacy protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}