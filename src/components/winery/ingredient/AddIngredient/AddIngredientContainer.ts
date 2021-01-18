import {useCallback, useState} from 'react';
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {useIngredientContext} from "../IngredientContext";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Wine} from "../../wine/types/Wine";
import {useIngredientOnClickService} from "../service/useIngredientOnClickService";

const AddIngredientContainer = ({render}) => {

    const {setWineResult, wineResult} = useWineContext();
    const {ingredient, updateIngredient} = useIngredientContext();
    const {onChange, updateIngredientSelect, updateTypeSelect} = useIngredientOnClickService();
    const service = useWineService();
    const [key, setKey] = useState(new Date());

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setWineResult({status: StatusType.loading});
        service.addIngredient(ingredient)
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(response => {
                log.debug(response);
                setWineResult(new ResponseError<Wine>(response) as ServiceError);
            });
        updateIngredient("reset", "");
    }, [ingredient, setWineResult, service, updateIngredient]);

    const actions = {onSubmit, updateIngredientSelect, updateTypeSelect, onChange};
    const error = wineResult as ServiceError;

    return render(actions, key, error, ingredient);
};

export default AddIngredientContainer;