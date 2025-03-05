import React, { Suspense } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { Toaster } from "./utils/toast";
import ReactQueryProvider from "./provider/react-query";
import PreviousPathnameProvider from "./provider/previous-pathname";
import LoaderProvider from "./provider/loader";

function App() {
  return (
    <>
      {/* <ReactQueryProvider> */}
      {/* <PreviousPathnameProvider> */}
      <Suspense fallback={<div className="">Loading...</div>}>
        <main className="relative">
          <LoaderProvider>
            <Toaster />
            <AppRoutes />
            {/* <GlobalModal /> */}
            {/* <GlobalDrawer /> */}
          </LoaderProvider>
        </main>
      </Suspense>
      {/* </PreviousPathnameProvider> */}
      {/* </ReactQueryProvider> */}
    </>
  );
}

export default App;
