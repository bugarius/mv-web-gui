import {useCallback, useState} from "react";
import {useIngredientContext} from "../IngredientContext";
import {StatusType} from "../../../../services/types/Service";
import log from "loglevel";
import {ResponseError} from "../../../error/ResponseError";
import {Ingredient} from "../types/Ingredient";
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {useHistory, useParams} from "react-router-dom";
import {useEventHandlerActions} from "../../common/useEventHandlerActions";
import {ToApiConverter} from "../../../../services/Converters";

export const useIngredientOnClickService = () => {

    const {updateIngredient, ingredient, setIngredientResult} = useIngredientContext();
    const {setWineResult} = useWineContext();
    const wineService = useWineService();
    const history = useHistory();
    const {appliedIngredientId} = useParams();
    const [key, setKey] = useState(new Date());

    const {onChange, updateDateTime: updateDate} = useEventHandlerActions(updateIngredient);

    const updateIngredientSelect = (selected) => {
        updateIngredient('ingredient', {...selected, id: selected.value, label: selected.label});
        updateIngredient('type', selected.type);
    };

    const updateTypeSelect = (name, selected) => {
        updateIngredient(name, selected.value);
        updateIngredient('ingredient', {});
    };

    const updateOnSubmit = useCallback((e) => {
        e.preventDefault();
        if (appliedIngredientId)
        {
            setIngredientResult({status: StatusType.loading});
            wineService.putIngredient(parseInt(appliedIngredientId), ToApiConverter.convertIngredient(ingredient))
                .then(() => history.push(history?.location?.state!['from'] || `/mv/wine/all`))
                .catch(response => {
                    log.debug(response);
                    setIngredientResult(new ResponseError<Ingredient>(response));
                });
        }
    }, [ingredient, appliedIngredientId, setIngredientResult, history, wineService]);

    const saveOnSubmit = useCallback((e) => {
        e.preventDefault();
        setIngredientResult({status: StatusType.loading});
        wineService.addIngredient(ToApiConverter.convertIngredient(ingredient))
            .then(response => {
                updateIngredient("reset", "");
                setWineResult({status: StatusType.loaded, payload: response});
                setKey(new Date());
            })
            .catch(response => {
                log.debug(response);
                setIngredientResult(new ResponseError<Ingredient>(response));
            });
    }, [ingredient, setWineResult, wineService, updateIngredient, setIngredientResult]);

    return {
        updateIngredientSelect,
        updateTypeSelect,
        onChange,
        updateDate,
        onSubmit: {update: updateOnSubmit, save: saveOnSubmit},
        key
    }
}