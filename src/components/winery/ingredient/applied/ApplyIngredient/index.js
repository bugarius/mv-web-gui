import React from "react";
import AddIngredientForm from "./AddIngredientForm";
import {withIngredientServiceHOC} from "../shared/withIngredientServiceHOC";

export const ApplyIngredient = () => {
    const AddIngredientFormWithService = withIngredientServiceHOC(AddIngredientForm);
    return <AddIngredientFormWithService />
};