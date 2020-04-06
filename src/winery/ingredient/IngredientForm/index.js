import React from "react";
import SimpleIngredientForm from "./SimpleIngredientForm";
import IngredientFormContainer from "./IngredientFromContainer";

const IngredientForm = (props) => {

    return (
            <IngredientFormContainer {...props} render={(onSubmit) => (
                    <SimpleIngredientForm onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default IngredientForm;