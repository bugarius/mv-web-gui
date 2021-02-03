import {useEffect} from "react";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import {Ingredient} from "../types/Ingredient";
import {ResponseError} from "../../../error/ResponseError";
import useIngredientService from "./useIngredientService";
import {useParams} from "react-router-dom";
import {useIngredientContext} from "../IngredientContext";

interface ReturnProps
{
    ingredient: Ingredient;
    error: ServiceError | undefined;
    loading: boolean;
}

export const useGetAppliedIngredient = (): ReturnProps  => {

    const service = useIngredientService();
    const {appliedIngredientId} = useParams();
    const {ingredient, setIngredientResult, ingredientResult, loading} = useIngredientContext();

    useEffect(() => {
        if (loading && appliedIngredientId && !ingredient.type)
        {
            const resolveAppliedIngredient = (appliedIngredient: Ingredient) => {

                return {
                    notes: appliedIngredient.notes,
                    name: appliedIngredient.name,
                    type: appliedIngredient.type,
                    amount: appliedIngredient.amount,
                    ingredient: appliedIngredient.ingredient,
                    appliedDate: appliedIngredient.appliedDate
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

    const error = ingredientResult?.status === StatusType.error ? ingredientResult as ServiceError : undefined;

    return {ingredient, error, loading}
};