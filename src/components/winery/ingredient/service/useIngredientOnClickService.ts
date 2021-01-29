import {ChangeEvent, useCallback, useState} from "react";
import {useIngredientContext} from "../IngredientContext";
import {StatusType} from "../../../../services/types/Service";
import log from "loglevel";
import {ResponseError} from "../../../error/ResponseError";
import {Ingredient} from "../types/Ingredient";
import {useWineContext} from "../../wine/WineContext";
import useWineService from "../../wine/service/useWineService";
import {useHistory, useParams} from "react-router-dom";

export const useIngredientOnClickService = () => {

    const {updateIngredient, ingredient, setIngredientResult} = useIngredientContext();
    const {setWineResult} = useWineContext();
    const wineService = useWineService();
    const history = useHistory();
    const {appliedIngredientId} = useParams();
    const [key, setKey] = useState(new Date());

    const updateIngredientSelect = (selected) => {
        updateIngredient('ingredient', {...selected, id: selected.value, label: selected.label});
        updateIngredient('type', selected.type);
    };

    const updateTypeSelect = (selected) => {
        updateIngredient('type', selected.value);
        updateIngredient('ingredient', {});
    };

    const onChange = (e: ChangeEvent<HTMLButtonElement>) => {
        updateIngredient(e.target.name, e.target.value);
    };

    const updateDate = (dateName: string, date: Date) => {
        updateIngredient(dateName, date);
    };

    const updateOnSubmit = useCallback((e) => {
        e.preventDefault();
        if (appliedIngredientId)
        {
            setIngredientResult({status: StatusType.loading});
            wineService.putIngredient(parseInt(appliedIngredientId), ingredient)
                .then(() => history.push(history?.location?.state!['from'] || `mv/wine/all`))
                .catch(response => {
                    log.debug(response);
                    setIngredientResult(new ResponseError<Ingredient>(response));
                });
        }
    }, [ingredient, appliedIngredientId, setIngredientResult, history, wineService]);

    const saveOnSubmit = useCallback((e) => {
        e.preventDefault();
        setIngredientResult({status: StatusType.loading});
        wineService.addIngredient(ingredient)
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