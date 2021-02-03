import React from "react";
import {EditAppliedIngredientForm} from "./EditAppliedIngredientForm";
import {withIngredientServiceHOC} from "../shared/withIngredientServiceHOC";

export const AppliedIngredientForm = () => {

    const EditAppliedIngredientFormWithService = withIngredientServiceHOC(EditAppliedIngredientForm);

    return <EditAppliedIngredientFormWithService/>
};