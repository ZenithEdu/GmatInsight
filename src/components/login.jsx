import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('login.jpg')`,
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-50" />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-6 text-center">
        <div className="inline-flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-white text-2xl font-bold">MatInsight</h1>
          <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">PRO</span>
        </div>
        <p className="text-gray-300 mt-2">Prepare with the best. Rock the test.</p>
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          <div className="bg-transparent-600 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-slate-700">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Sign in to access your
              </h2>
              <p className="text-2xl font-semibold text-white">
                <span className="text-blue-400">GMAT</span> course
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Email"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 bg-opacity-50 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-slate-700"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-teal-600 hover:bg-teal-800 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                SIGN IN
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  onClick={() => console.log('Forgot password clicked')}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-gray-400 text-sm">
          © 2025 Gmatinsight. All rights reserved.
        </p>
      </div>
    </div>
  );
}