import React, { CSSProperties } from "react";

const MiniSpinner = ({ text = "Loading..." }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{text}</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Define styles with correct TypeScript typing
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column", // No need for `as const` because it's inferred correctly
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px"
  },
  spinner: {
    width: "30px",
    height: "30px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #219f59",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "5px",
    fontSize: "13px",
    fontWeight: "400",
    color: "#101928",
  },
};

export default MiniSpinner;
