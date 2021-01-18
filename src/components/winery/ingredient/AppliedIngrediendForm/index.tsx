import React from "react";
import {EditAppliedIngredientForm} from "./EditAppliedIngredientForm";
import {useIngredientContext} from "../IngredientContext";
import EditIngredientContainer from "./EditIngredientContainer";

export const AppliedIngredientForm = () => {

    const {loading} = useIngredientContext();

    return (
        <EditIngredientContainer render={(actions, error, ingredient) => (
            <EditAppliedIngredientForm actions={actions} error={error} ingredient={ingredient} loading={loading}/>
        )}/>
    )
};