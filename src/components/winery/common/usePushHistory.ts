import {useHistory, useLocation} from "react-router-dom";

export const usePushHistory = (): {pushHistory: (path: string) => void} => {

    const history = useHistory();
    const location = useLocation();

    location.state = {from: history.location.pathname};
    const pushHistory = (path: string) => {
        location.pathname = path;
        history.push(location);
    };

    return {pushHistory}
}