import {useCallback, useState} from 'react';
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {useIngredientContext} from "../IngredientContext";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Wine} from "../../wine/types/Wine";

const AddIngredientContainer = ({render}) => {

    const {setWineResult} = useWineContext();
    const {ingredient, updateIngredient} = useIngredientContext();
    const service = useWineService();
    const [key, setKey] = useState(new Date());

    const updateIngredientSelect = (selected) => {
        updateIngredient('ingredient', {...selected, id: selected.value, label: selected.label});
        updateIngredient('type', selected.type);
    };

    const updateTypeSelect = (selected) => {
        updateIngredient('type', selected.value);
        updateIngredient('ingredient', {});
    };

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setWineResult({status: StatusType.loading});
        service.addIngredient(ingredient)
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(error => {
                log.debug(error);
                setWineResult(new ResponseError<Wine>(error));
            });
        updateIngredient("reset", "");
    }, [ingredient, setWineResult, service, updateIngredient]);

    const actions = {onSubmit, updateIngredientSelect, updateTypeSelect};

    return render(actions, key);
};

export default AddIngredientContainer;