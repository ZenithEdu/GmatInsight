import React from "react";
import { X } from "lucide-react";

const Snackbar = ({
  open,
  message,
  type = "success", // "success" | "error" | "info"
  onClose,
  duration = 3000,
}) => {
  React.useEffect(() => {
    if (open && onClose && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, onClose, duration]);

  if (!open) return null;

  const colorMap = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-100 px-4 py-2 rounded-sm shadow-lg animate-slide-in text-white flex items-center gap-3 ${colorMap[type]}`}
      style={{ minWidth: "220px" }}
    >
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={16} />
      </button>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Snackbar;
