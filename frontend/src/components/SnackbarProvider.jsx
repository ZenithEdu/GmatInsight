import React, { createContext, useContext, useCallback, useState } from "react";
import Snackbar from "./Snackbar";

// Provide a default no-op function to avoid undefined context errors
const SnackbarContext = createContext(() => {});

export function SnackbarProvider({ children }) {
  const [snackbars, setSnackbars] = useState([]);

  // Enqueue a new snackbar
  const enqueueSnackbar = useCallback((message, options = {}) => {
    const newSnackbar = {
      key: Date.now() + Math.random(),
      message,
      type: options.type || "success",
      duration: options.duration ?? 3000,
      open: true,
    };
    setSnackbars((prev) => [...prev, newSnackbar]);
  }, []);

  // Close a specific snackbar (ab sirf remove karega, koi timeout nahi)
  const handleClose = useCallback((key) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.key !== key));
  }, []);

  // Reverse the snackbars array for rendering so newest is at the bottom
  const reversedSnackbars = [...snackbars].reverse();

  return (
    <SnackbarContext.Provider value={enqueueSnackbar}>
      {children}
      <div className="fixed bottom-0 right-0 z-[9999]">
        {reversedSnackbars.map((snackbar, index) => (
          <Snackbar
            key={snackbar.key}
            open={snackbar.open}
            message={snackbar.message}
            type={snackbar.type}
            duration={snackbar.duration}
            onClose={() => handleClose(snackbar.key)}
            index={index} // Index for vertical positioning (0 = bottom)
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
}

// Hook to use in components
export function useSnackbar() {
  return useContext(SnackbarContext);
}
