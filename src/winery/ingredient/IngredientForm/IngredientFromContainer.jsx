import React, {useContext, useEffect, useState} from 'react';
import {IngredientContext} from "../IngredientContext";
import {AuthContext} from "../../../platform/AuthContext";
import IngredientService from "../service/IngredientService";
import {useValidationSchemaContext} from "../../validation/ValidationSchemaContext";

const IngredientFormContainer = ({match: {params: {ingredientId}}, history, render}) => {

    const {ingredient, actions: {setIngredient}} = useContext(IngredientContext);
    const {principal} = useContext(AuthContext);
    // const {setSchema, setCurrentSchema} = useValidationSchemaContext();

    const [loading, setLoading] = useState(ingredientId);

    const knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    useEffect(() => {
        IngredientService.get(ingredientId)
                .then(res => {
                    setIngredient(res);
                    // setCurrentSchema({});
                    setLoading(false);
                })
                .catch(res => {
                    const error = knownErrors[res.status];
                    error || history.push(`/error/${res.status}`);
                });
        return setIngredient(null);
    }, [history, knownErrors, ingredientId, setIngredient]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('IngredientForm:onSubmit', e, ingredient);
        setLoading(true);

            const action = () => (ingredient.id || false ? IngredientService.put(ingredient) : IngredientService.post(ingredient));
            action()
                    .then(handleSubmit)
                    .catch(res => {
                        const error = knownErrors[res.status];
                        error || history.push(`/error/${res.status}`);
                    });
    };

    const handleSubmit = (ingredient) => {
        console.log('IngredientForm::handleSubmit', ingredient);
        setIngredient(ingredient);
        setLoading(false);
        history.push(`${principal.realms[0]}/ingredient/all`);
    };

    console.log("IngredientForm::render", ingredient);
    if (ingredient !== null)
    return render(ingredient, loading, onSubmit);
    return <></>
};

export default IngredientFormContainer;