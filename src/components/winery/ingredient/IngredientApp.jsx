import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import IngredientList from "./IngredientList";
import {IngredientForm} from "./IngredientForm";
import IngredientProvider from "./IngredientContext";

const IngredientApp = () => {

    return (
            <>
                <IngredientProvider>
                    <Switch>
                        <Route exact path="/mv/ingredient">
                            <Redirect to="/mv/ingredient/all"/>
                        </Route>
                        <Route exact path="/mv/ingredient/all" component={IngredientList}/>
                        <Route exact path="/mv/ingredient/:status?" component={IngredientList}/>
                        <Route exact path="/mv/ingredient/e/:ingredientId?">
                            <IngredientForm />
                        </Route>
                        <Route path="/mv/ingredient/info/:ingredientId?">

                        </Route>
                    </Switch>
                </IngredientProvider>
            </>

    );
};

export default IngredientApp;
