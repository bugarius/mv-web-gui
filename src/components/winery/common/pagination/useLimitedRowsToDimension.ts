import {useEffect, useState} from "react";

export const useLimitedRowsToDimension = () => {
    const getLimit = () => {
        const limitResult = window.innerWidth / 150 - 2.5;
        return limitResult > 2 ? limitResult : 2;
    };

    const [limit, setLimit] = useState(getLimit());

    useEffect(() => {
        window.addEventListener("resize", () => updateDimensions());
        return () => {
            window.removeEventListener("resize", () => updateDimensions());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateDimensions = () => {
        setLimit(getLimit());
    };

    return {limit}
}