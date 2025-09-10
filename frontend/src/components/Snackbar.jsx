import React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const Snackbar = ({
  open,
  message,
  type = "success",
  onClose,
  duration = 3000,
  index, // New prop to determine position in the stack
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);

      if (onClose && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setShouldRender(false);
            onClose(); // ✅ ye sirf apna snackbar close karega
          }, 300);
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [open, onClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose?.();
    }, 300);
  };

  if (!shouldRender) return null;

  const getConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-gradient-to-r from-green-500 to-green-600",
          borderColor: "border-green-400",
          iconColor: "text-green-100",
        };
      case "error":
        return {
          icon: AlertCircle,
          bgColor: "bg-gradient-to-r from-red-500 to-red-600",
          borderColor: "border-red-400",
          iconColor: "text-red-100",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
          borderColor: "border-yellow-400",
          iconColor: "text-yellow-100",
        };
      case "info":
      default:
        return {
          icon: Info,
          bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
          borderColor: "border-blue-400",
          iconColor: "text-blue-100",
        };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <>
      <div
        className={`fixed right-4 z-[9999] px-4 py-3 rounded-lg shadow-2xl border backdrop-blur-sm text-white flex items-center gap-3 transition-all duration-300 ease-out transform ${
          config.bgColor
        } ${config.borderColor} ${
          isVisible
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
        style={{
          minWidth: "280px",
          maxWidth: "400px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          bottom: `${2 + index * 3.5}rem`, // 2rem base + 3.5rem per snackbar
        }}
      >
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          <IconComponent size={20} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-medium leading-relaxed text-white">
            {message}
          </span>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 p-1 rounded-lg hover:bg-white/10 focus:outline-none transition-colors duration-200"
          aria-label="Close notification"
        >
          <X
            size={16}
            strokeWidth={2}
            className="text-white/80 hover:text-white"
          />
        </button>
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all ease-linear"
              style={{
                animation: isVisible ? `shrink ${duration}ms linear` : "none",
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 animate-shimmer"
            style={{
              width: "30%",
              transform: "translateX(-100%) skewX(-12deg)",
            }}
          />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        @keyframes slide-in {
          0% {
            transform: translateX(100%) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-out {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scale(0.95);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(400%) skewX(-12deg);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-in forwards;
        }
        .animate-shimmer {
          animation: shimmer 2.5s ease-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </>
  );
};

export default Snackbar;
