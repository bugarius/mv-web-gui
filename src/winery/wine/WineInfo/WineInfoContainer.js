import {useContext, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {AuthContext} from "../../../platform/AuthContext";
import WineService from "../service/WineService";
import {WineValidator} from "../../../services/Validators";
import {WineContext} from "../WineContext";

const WineInfo = ({match: {params: {wineId}}, history, render}) => {

    const {wine, actions: {setWine, setLoading, setShowErrors}} = useContext(WineContext);
    const {principal} = useContext(AuthContext);

    useEffect(() => {
        WineService.get(wineId)
                .then(wine => {
                    setWine(wine);
                    setLoading(false);
                })
                .catch(res => {
                    setLoading(false);
                    console.log('error');
                    console.log(res);
                });
        return setWine({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wineId]);

    const edit = () => {
        history.push(`${principal.realms[0]}/wine/${wineId}/`);
    };

    // eslint-disable-next-line no-unused-vars
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('WineInfo:onSubmit', e, wine);
        setLoading(true);
        setShowErrors(!WineValidator.isValid(wine));

        if (WineValidator.isValid(wine))
        {
            const action = () => (wine.id || false ? WineService.put(wine) : WineService.post(wine));
            action()
                    .then(wine => {
                        console.log('WineInfo::handleSubmit', wine);
                        history.push(`${principal.realms[0]}/wine/${wine.id}/info`);
                        setWine(wine);
                        setLoading(false);
                    })
                    .catch(res => {
                        console.log('error');
                        console.log(res);
                    });
        }
        else
        {
            setLoading(false);
        }
    };

    const actions = {edit};

    return render(actions);
};

export default withRouter(WineInfo);