const Loading = ({ 
  overlay = false, 
  text = "Loading...", 
  size = "medium",
  variant = "primary",
  className = ""
}) => {
  const sizes = {
    small: { spinner: "h-6 w-6", text: "text-sm", spacing: "py-4" },
    medium: { spinner: "h-10 w-10", text: "text-base", spacing: "py-8" },
    large: { spinner: "h-14 w-14", text: "text-lg", spacing: "py-12" }
  };

  const variants = {
    primary: { spinner: "border-blue-500 shadow-blue-400", text: "text-blue-600" },
    secondary: { spinner: "border-gray-400 shadow-gray-300", text: "text-gray-600" },
    success: { spinner: "border-green-500 shadow-green-400", text: "text-green-600" },
    white: { spinner: "border-white shadow-white", text: "text-white" }
  };

  const sizeStyles = sizes[size];
  const colorStyles = variants[variant];

  const spinnerClasses = `
    ${sizeStyles.spinner} 
    ${colorStyles.spinner} 
    border-4 border-t-transparent 
    rounded-full animate-spin
  `;

  const textClasses = `
    ${colorStyles.text} 
    ${sizeStyles.text} 
    font-medium mt-3 animate-pulse
  `;

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center ">
        <div className="bg-white rounded-sm shadow-sm px-10 py-8 flex flex-col items-center space-y-4 border border-gray-100">
          <div className={spinnerClasses} role="status" aria-label={text} />
          {text && <span className={textClasses}>{text}</span>}
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${sizeStyles.spacing} ${className}`}>
      <div className={spinnerClasses} role="status" aria-label={text} />
      {text && <span className={textClasses}>{text}</span>}
    </div>
  );
};

export default Loading;
