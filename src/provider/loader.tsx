"use client";
import React, { useEffect, useState } from "react";

function LoaderProvider({ children }: React.PropsWithChildren) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <>Loading...</>;
  }

  return children;
}

export default LoaderProvider;
