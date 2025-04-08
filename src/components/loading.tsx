// components/Loading.tsx
import React from "react";

const Loading = () => {
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Makes sure it's on top of all other content
  };

  const spinnerStyle: React.CSSProperties = {
    border: "4px solid rgba(255, 255, 255, 0.3)", // White border with transparency
    borderTop: "4px solid #fff", // White color for the top
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite", // Spin animation
  };

  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{spinKeyframes}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loading;