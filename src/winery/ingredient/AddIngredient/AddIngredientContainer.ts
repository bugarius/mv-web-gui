import {useCallback, useState} from 'react';
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {useParams} from "react-router-dom";
import {useIngredientContext} from "../IngredientContext";
import {StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import {Grapevine} from "../../grapevine/types/Grapevine";
import log from "loglevel";

const AddIngredientContainer = ({render}) => {

    const {setWineResult} = useWineContext();
    const {ingredient, updateIngredient} = useIngredientContext();
    const {wineId} = useParams();
    const service = useWineService(wineId);
    const [key, setKey] = useState(new Date());

    const updateIngredientSelect = (selected) => {
        updateIngredient('ingredient', {...selected, id: selected.value, label: selected.label});
    };

    const updateTypeSelect = (selected) => {
        updateIngredient('type', selected.value);
        updateIngredient('ingredient', {});
    };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setWineResult({status: StatusType.loading});
        ingredient?.ingredient && service.addIngredient(ingredient)
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(error => {
                log.debug(error);
                setWineResult(new ResponseError<Grapevine>(error));
            });
        updateIngredient("reset", "");
    }, [ingredient, setWineResult, service, updateIngredient]);

    const actions = {onSubmit, updateIngredientSelect, updateTypeSelect};

    return render(actions, key);
};

export default AddIngredientContainer;