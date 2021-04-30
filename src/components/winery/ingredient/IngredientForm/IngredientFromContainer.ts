import {ChangeEvent, useEffect} from 'react';
import {useIngredientContext} from "../IngredientContext";
import useIngredientService from "../service/useIngredientService";
import {useHistory, useParams} from "react-router-dom";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../error/ResponseError";
import log from "loglevel";
import {Ingredient} from "../types/Ingredient";
import {SelectOption} from "../../../../services/types/SelectOption";

export const IngredientFormContainer = ({render}) => {

    const {ingredient, updateIngredient, setIngredientResult, ingredientResult} = useIngredientContext();
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
            .catch(response => setIngredientResult(new ResponseError<Ingredient>(response) as ServiceError));

        return () => {
            updateIngredient("reset", "")
        }
    }, [ingredientId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateIngredient = (e: ChangeEvent<HTMLInputElement>) => {
        updateIngredient(e.target.name, e.target.value);
    };

    const handleUpdateIngredientType = (name: string, selected: SelectOption) => {
        updateIngredient(name, selected.value);
    };

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
            .catch(response => setIngredientResult(new ResponseError<Ingredient>(response) as ServiceError));
    };

    const onClickBack = () => {
        history?.push(history?.location?.state!['from'] || `/mv/ingredient/archived`);
    }

    const error = ingredientResult as ServiceError;

    log.debug("IngredientForm::render", ingredient);
    return render(
        onSubmit,
        handleUpdateIngredientType,
        error,
        ingredient,
        handleUpdateIngredient,
        ingredientResult.status === StatusType.loading,
        onClickBack
    );
};