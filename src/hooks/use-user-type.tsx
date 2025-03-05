import { useState, useEffect } from "react";
import UseLoaded from "./use-loaded";
import { useSearchParams } from "react-router-dom";

const useUserType = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [userType, setUserType] = useState<string | null>(type);
  const loaded = UseLoaded();

  useEffect(() => {
    if (type) {
      setUserType(type);
    } else {
      setUserType("guest");
    }
  }, [type]);

  return { userType, loaded };
};

export default useUserType;
