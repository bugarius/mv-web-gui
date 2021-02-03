import React from "react";
import {SimpleIngredientForm} from "./SimpleIngredientForm";
import {IngredientFormContainer} from "./IngredientFromContainer";

export const IngredientForm = (props) => {

    return (
            <IngredientFormContainer {...props} render={(onSubmit, updateIngredientType,  error, ingredient, updateIngredient, loading) => (
                    <SimpleIngredientForm onSubmit={onSubmit}
                                          updateIngredientType={updateIngredientType}
                                          error={error}
                                          ingredient={ingredient}
                                          updateIngredient={updateIngredient}
                                          loading={loading}
                    />
            )}/>
    )
};