import React, {ChangeEvent} from "react";
import {useIngredientOnClickService} from "../../service/useIngredientOnClickService";
import {useGetAppliedIngredient} from "../../service/useGetAppliedIngredient";
import {Ingredient} from "../../types/Ingredient";
import {ServiceError} from "../../../../../services/types/Service";

export interface IngredientFormProps
{
    ingredient: Ingredient;
    actions: {
        onSubmit: {
            update: (e: MouseEvent) => void;
            save: (e: MouseEvent) => void;
        }
        updateIngredientSelect: (e: ChangeEvent<HTMLInputElement>) => void;
        updateTypeSelect: (name: string, s: Record<string, string>) => void;
        onChange: () => void;
        updateDate: () => void;
        key?: string
    };
    error: ServiceError;
    loading: boolean;
}

export const withIngredientServiceHOC = <IngredientFormProps, >(WrappedComponent: React.ComponentType<IngredientFormProps>) => (props) => {

    const {ingredient, error, loading} = useGetAppliedIngredient();
    const actions = useIngredientOnClickService();

    const newProps = {
        ...props,
        actions,
        error,
        ingredient,
        loading
    }

    return <WrappedComponent {...newProps}/>
};

