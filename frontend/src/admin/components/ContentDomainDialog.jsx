import { useState } from "react";
import { X } from "lucide-react";

const ContentDomainDialog = ({ isOpen, onClose, onConfirm }) => {
  const [domain, setDomain] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Select Content Domain</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Please select whether this question is Math-related or Non-Math related:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setDomain("Math")}
              className={`p-4 rounded-xl border-2 transition-all ${
                domain === "Math"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
            >
              Math Related
            </button>
            <button
              onClick={() => setDomain("Non-Math")}
              className={`p-4 rounded-xl border-2 transition-all ${
                domain === "Non-Math"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:border-emerald-300"
              }`}
            >
              Non-Math Related
            </button>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(domain)}
              disabled={!domain}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDomainDialog;