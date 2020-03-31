import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import IngredientList from "./IngredientList";
import {IngredientProvider} from "./IngredientContext";
import IngredientForm from "./IngredientForm";

const IngredientApp = () => {

    return (
            <>
                <IngredientProvider>
                    <Switch>
                        <Route exact path="/mv/ingredient">
                            <Redirect to="/mv/ingredient/all"/>
                        </Route>
                        <Route exact path="/mv/ingredient/all" component={IngredientList}/>
                        <Route exact path="/mv/ingredient/:ingredientId?">
                            <IngredientForm />
                        </Route>
                        <Route path="/mv/wine/:ingredientId?/info">
                            {/*<WineInfo/>*/}
                        </Route>
                    </Switch>
                </IngredientProvider>
            </>

    );
};

export default IngredientApp;