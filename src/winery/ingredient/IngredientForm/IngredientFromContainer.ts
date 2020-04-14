import {useEffect} from 'react';
import {useIngredientContext} from "../IngredientContext";
import useIngredientService from "../service/useIngredientService";
import {useHistory, useParams} from "react-router-dom";
import {StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Ingredient} from "../types/Ingredient";

const IngredientFormContainer = ({render}) => {

    const {ingredient, updateIngredient, setIngredientResult} = useIngredientContext();
    const service = useIngredientService();

    const {ingredientId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setIngredientResult({status: StatusType.loading});
        if (ingredientId?.toString() === "0")
        {
            setIngredientResult({status: StatusType.loaded});
            return;
        }
        ingredientId && service.get(parseInt(ingredientId))
                .then(response => {
                    setIngredientResult({status: StatusType.loaded, payload: response});
                })
                .catch(error => setIngredientResult(new ResponseError<Ingredient>(error)));

        return () => {
            updateIngredient("reset", "")
        }
    }, [ingredientId]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (e) => {
        e.preventDefault();
        log.debug('IngredientForm:onSubmit', e, ingredient);
        setIngredientResult({status: StatusType.loading});

        const action = () => (ingredient?.id ? service.put(ingredient.id, ingredient) : service.post(ingredient));
        action()
            .then(response => {
                setIngredientResult(response);
                history?.push(history?.location?.state!['from'] || `mv/ingredient/all`);
            })
            .catch(res => {
                log.warn(res);
                history.push(`/mv/error`);
            });
    };

    log.debug("IngredientForm::render", ingredient);
    return render(onSubmit);
};

export default IngredientFormContainer;