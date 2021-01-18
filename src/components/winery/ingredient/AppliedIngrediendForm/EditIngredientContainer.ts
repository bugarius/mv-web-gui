import {useCallback, useEffect} from 'react';
import {useIngredientContext} from "../IngredientContext";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {useHistory, useParams} from "react-router-dom";
import useIngredientService from "../service/useIngredientService";
import {Ingredient} from "../types/Ingredient";
import useWineService from "../../wine/service/useWineService";
import {useWineContext} from "../../wine/WineContext";
import {useIngredientOnClickService} from "../service/useIngredientOnClickService";

const EditIngredientContainer = ({render}) => {

    const {ingredient, setIngredientResult, ingredientResult} = useIngredientContext();
    const {onChange, updateIngredientSelect, updateTypeSelect} = useIngredientOnClickService();
    const {setWineResult} = useWineContext();
    const service = useIngredientService();
    const wineService = useWineService();
    const history = useHistory();

    const {appliedIngredientId} = useParams();

    useEffect(() => {
        if (ingredientResult.status === StatusType.loading && appliedIngredientId && !ingredient.type)
        {
            const resolveAppliedIngredient = (appliedIngredient: Ingredient) => {

                return {
                    notes: appliedIngredient.notes,
                    name: appliedIngredient.name,
                    type: appliedIngredient.type,
                    amount: appliedIngredient.amount,
                    ingredient: appliedIngredient.ingredient
                }
            }
            service.getApplied(parseInt(appliedIngredientId))
                .then(response => setIngredientResult({
                    status: StatusType.loaded,
                    payload: resolveAppliedIngredient(response)
                }))
                .catch(response => new ResponseError<Ingredient>(response));
        }
    })

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (appliedIngredientId)
        {
            setIngredientResult({status: StatusType.loading});
            wineService.putIngredient(parseInt(appliedIngredientId), ingredient)
                .then(response => {
                    setWineResult({status: StatusType.loaded, payload: response});
                    history.push(history?.location?.state!['from'] || `mv/wine/all`)
                })
                .catch(response => {
                    log.debug(response);
                    setIngredientResult(new ResponseError<Ingredient>(response));
                });
        }
    }, [ingredient, appliedIngredientId, setIngredientResult, history, setWineResult, wineService]);

    const actions = {onSubmit, updateIngredientSelect, updateTypeSelect, onChange};
    const error = ingredientResult as ServiceError;

    return render(actions, error, ingredient);
};

export default EditIngredientContainer;