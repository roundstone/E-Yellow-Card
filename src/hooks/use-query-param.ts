import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = (key: string) => {
    const { search } = useLocation();

    const value = useMemo(() => {
        const params = new URLSearchParams(search);
        return params.get(key) || "";
    }, [search, key]);

    return value;
};

export default useQueryParam;
