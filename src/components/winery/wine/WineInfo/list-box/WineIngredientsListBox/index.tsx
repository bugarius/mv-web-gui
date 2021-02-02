import React from "react";
import {WineIngredientsListBoxContainer} from "./WineIngredientsListBoxContainer";
import IngredientsListBox from "./IngredientsListBox";

const WineIngredientsListBox = () => {

    return (
        <WineIngredientsListBoxContainer render={(ingredients, ingredientToShow, actions) => (
            <IngredientsListBox ingredients={ingredients} ingredientToShow={ingredientToShow} actions={actions}/>
        )}/>
    )
};

export default WineIngredientsListBox;