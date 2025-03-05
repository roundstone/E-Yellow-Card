import { appAtom } from "@/stores/app";
import { useAtom } from "jotai";
import React from "react";

const useDashboardTitle = (title: string) => {
  const [app, setApp] = useAtom(appAtom);

  React.useEffect(() => {
    setApp({ ...app, dashboardTitle: title });

    return () => setApp({ ...app, dashboardTitle: "" });
  }, [title]);
};

export default useDashboardTitle;
