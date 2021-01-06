import React from "react";
import AddIngredientForm from "./AddIngredientForm";
import AddIngredientContainer from "./AddIngredientContainer";

const AddIngredient = (props) => {
    return (
            <AddIngredientContainer {...props} render={(actions, newKey, error, ingredient) => (
                    <AddIngredientForm actions={actions} newKey={newKey} error={error} ingredient={ingredient}/>
            )}/>
    )
};

export default AddIngredient;