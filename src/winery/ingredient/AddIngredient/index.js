import React from "react";
import AddIngredientForm from "./AddIngredientForm";
import AddIngredientContainer from "./AddIngredientContainer";

const AddIngredient = (props) => {
    return (
            <AddIngredientContainer {...props} render={(actions, newKey) => (
                    <AddIngredientForm actions={actions} newKey={newKey}/>
            )}/>
    )
};

export default AddIngredient;