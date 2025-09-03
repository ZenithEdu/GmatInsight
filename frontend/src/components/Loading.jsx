const Loading = ({ overlay = false, text = "Loading..." }) => {
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Text */}
          <span className="text-blue-600 font-semibold">{text}</span>
        </div>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Normal loader (without overlay)
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
      <span className="text-blue-600 font-semibold">{text}</span>
    </div>
  );
};

export default Loading;
