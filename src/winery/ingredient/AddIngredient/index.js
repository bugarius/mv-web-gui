import React from "react";
import AddIngredientContainer from "./AddIngredientContainer";
import AddIngredientForm from "./AddIngredientForm";

const AddIngredient = (props) => {
    return (
            <AddIngredientContainer {...props} render={(options, keys, actions) => (
                    <AddIngredientForm options={options} keys={keys} actions={actions}/>
            )} />
    )
};

export default AddIngredient;