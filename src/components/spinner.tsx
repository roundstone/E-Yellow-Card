import React, { CSSProperties } from "react";

const Spinner = ({ text = "Loading..." }) => {
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
    height: "50vh",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #219f59",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "400",
    color: "#101928",
  },
};

export default Spinner;
