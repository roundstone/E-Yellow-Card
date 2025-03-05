import React, { createContext, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";

// Create a context to store the previous pathname
export const PreviousPathnameContext = createContext<string | undefined>(
  undefined
);

// Define the props for the provider component
interface PreviousPathnameProviderProps {
  children: ReactNode;
}

// Provider component to track the previous pathname
export default function PreviousPathnameProvider({
  children,
}: PreviousPathnameProviderProps) {
  const location = useLocation(); // Get the current location object
  const pathname = location.pathname; // Extract the pathname from the location
  const ref = useRef<string>("/"); // Store the previous pathname in a ref

  // Update the ref whenever the pathname changes
  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  // Provide the previous pathname to the context
  return (
    <PreviousPathnameContext.Provider value={ref.current}>
      {children}
    </PreviousPathnameContext.Provider>
  );
}
