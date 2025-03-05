import React from "react";

interface RouteWrapperProps {
  element: React.ReactNode;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
}

const RouteWrapper = ({ element, layout: Layout }: RouteWrapperProps) => {
  if (Layout) {
    return <Layout>{element}</Layout>;
  }
  return <>{element}</>; // If no layout is specified, render the element as-is
};

export default RouteWrapper;
