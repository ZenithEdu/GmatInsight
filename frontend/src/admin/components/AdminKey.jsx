import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertTriangle, Loader2, KeyRound } from "lucide-react";
import { useSnackbar } from "../../components/SnackbarProvider";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminKey({ onSuccess }) {
  const [key, setKey] = useState("");
  const [mode, setMode] = useState("loading");
  const [confirmKey, setConfirmKey] = useState("");
  const [creating, setCreating] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showConfirmKey, setShowConfirmKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showSnackbar = useSnackbar();
  useEffect(() => {
    setKey("");
    setMode("loading");
    fetch(`${API_URL}/admin/key-exists`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setMode(data.exists ? "enter" : "create");
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          setMode("enter");
        }, 1000);
        showSnackbar("Failed to connect to server. Please try again.", { type: "error", duration: 5000 });
      });
  }, []);

  // Create admin key
  const handleCreate = async () => {
    if (!key || !confirmKey) {
      showSnackbar("Please enter and confirm the admin key.", { type: "error" });
      return;
    }
    if (key.length < 6) {
      showSnackbar("Admin key must be at least 6 characters long.", { type: "error" });
      return;
    }
    if (key !== confirmKey) {
      showSnackbar("Keys do not match.", { type: "error" });
      return;
    }
    
    setCreating(true);
    
    try {
      const res = await fetch(`${API_URL}/admin/set-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (!res.ok) {
        setCreating(false);
        return;
      }
      
      // Success animation
      setTimeout(() => {
        setMode("enter");
        setKey("");
        setConfirmKey("");
        setCreating(false);
      }, 1500);
      
    } catch {
      showSnackbar("Server connection failed. Please try again.", { type: "error" });
      setCreating(false);
    }
  };

  // Enter admin key
  const handleSubmit = async () => {
    if (!key) {
      showSnackbar("Please enter the admin key.", { type: "error" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_URL}/admin/verify-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (res.status === 200) {
        showSnackbar("Access granted. Redirecting...", { type: "success" });
      }
      if (!res.ok) {
        showSnackbar("Invalid admin key. Please try again.", { type: "error" });
        setIsSubmitting(false);
        return;
      }
      
      const data = await res.json();

      // Save token in sessionStorage with 24h expiry
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_expiry", expiryTime.toString());

      // Success delay
      setTimeout(() => {
        onSuccess();
      }, 1200);
      
    } catch {
      showSnackbar("Server connection failed. Please try again.", { type: "error" });
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  if (mode === "loading") {
    return (
      <div className="fixed inset-0 z-[200] bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-md flex items-center justify-center p-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-9 w-full max-w-sm border border-white/20 transform animate-pulse">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Initializing System
            </h3>
            <p className="text-gray-600 text-base">Verifying admin configuration...</p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "create") {
    return (
      <div className="fixed inset-0 z-[200] bg-gradient-to-br from-emerald-900/95 to-teal-900/95 backdrop-blur-md flex items-center justify-center p-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-7 w-full max-w-sm border border-white/20 transform transition-all duration-500 hover:scale-105">
          
          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Setup Admin Access
            </h2>
            <p className="text-gray-600 text-base">
              Create a secure administrative key
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Admin Key Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-base pr-11"
                  placeholder="Create admin key (min 6 characters)"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);

                  }}
                  onKeyDown={(e) => handleKeyPress(e, handleCreate)}
                  autoFocus
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                >
                  {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Key Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative">
                <input
                  type={showConfirmKey ? "text" : "password"}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-base pr-11"
                  placeholder="Confirm admin key"
                  value={confirmKey}
                  onChange={(e) => {
                    setConfirmKey(e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyPress(e, handleCreate)}
                />
                <button
                  onClick={() => setShowConfirmKey(!showConfirmKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors p-1"
                >
                  {showConfirmKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>


            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={creating}
              className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
            >
              {creating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Key...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Admin Key
                </>
              )}
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <div className="flex items-start gap-2 text-emerald-800">
              <Shield className="w-4 h-4 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold mb-1 text-sm">Security Notice</p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  This key provides full administrative access. Store it securely and never share with unauthorized users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enter mode
  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-blue-900/95 to-indigo-900/95 backdrop-blur-md flex items-center justify-center p-3">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-7 w-full max-w-sm border border-white/20 transform transition-all duration-500 hover:scale-105">
        
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Admin Access Required
          </h2>
          <p className="text-gray-600 text-base">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Key Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showKey ? "text" : "password"}
                className="w-full pl-11 pr-11 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-base"
                placeholder="Enter admin key"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                onKeyDown={(e) => handleKeyPress(e, handleSubmit)}
                autoFocus
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors p-1"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>


          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying Access...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Access Admin Panel
              </>
            )}
          </button>
        </div>

        {/* Warning Notice */}
        <div className="mt-3 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-1.5 text-amber-800">
            <Shield className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Protected area for authorized personnel only.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}