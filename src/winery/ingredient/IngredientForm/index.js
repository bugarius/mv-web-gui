import React from "react";
import {withRouter} from "react-router-dom";
import SimpleIngredientForm from "./SimpleIngredientForm";
import IngredientFormContainer from "./IngredientFromContainer";

const IngredientForm = (props) => {

    return (
            <IngredientFormContainer {...props} render={(ingredient, loading, onSubmit) => (
                    <SimpleIngredientForm ingredient={ingredient}
                                          loading={loading}
                                          onSubmit={onSubmit}
                    />
            )}/>
    )
};

export default withRouter(IngredientForm);