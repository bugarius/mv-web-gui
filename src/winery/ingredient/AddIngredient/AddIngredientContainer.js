import React, {useContext, useEffect, useMemo, useReducer, useState} from 'react';
import IngredientService from "../service/IngredientService";
import WineService from "../../wine/service/WineService";
import {WineContext} from "../../wine/WineContext";

const initialState = {
    id: "",
    ingredientId: "",
    notes: "",
    amount: "",
    type: ""
};

const types = [
    {value: 'YEAST', label: 'Drożdże'},
    {value: 'NUTRIENT', label: 'Pożywka'},
    {value: 'ENZYME', label: 'Enzym'},
    {value: 'TANNIN', label: 'Tanina'},
    {value: 'BACTERIA', label: 'Bakteria'},
    {value: 'DEACIDIFICATION', label: 'Odkwaszanie'},
    {value: 'CLARIFICATION', label: 'Klarowanie'},
    {value: 'SUGARING', label: 'Słodzenie'},
    {value: 'ALCOHOL_INCREASING', label: 'Wzmacnianie'},
    {value: 'OTHER', label: 'Inne'}
];

const AddIngredientContainer = ({setSelectedIngredient, render}) => {

    const reducer = (state, action) => {
        if (action.type === "reset")
        {
            setSelectedIngredient(null);
            return initialState;
        }

        const result = {...state};
        result[action.type] = action.value;
        return result;
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const {actions: {setWine, setLoading}, wine} = useContext(WineContext);
    const [ingredients, setIngredients] = useState([]);
    const [key, setKey] = useState(1); //to rerender defaultValues in inputs
    const [ingredientKey, setIngredientKey] = useState(1); //to rerender defaultValues in inputs
    const {type, ingredientId} = state;

    useEffect(() => {
        IngredientService.getAll(type)
                .then(res => {
                    const ingredients = (res || []).map(i => ({value: i.id, label: i.name, selected: i}));
                    setIngredients(ingredients);
                })
                .catch(res => {
                    console.log(res);
                });
    }, [type]);

    const handleChange = (name, value) => {
        dispatch({type: name, value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        WineService.putIngredient(wine.id, state)
                .then(res => {
                    setLoading(false);
                    setWine(res);
                    setKey(key + 1);
                    dispatch({type: "reset"});
                })
                .catch(res => {
                    console.log(res);
                    setLoading(false);
                });
    };

    const setIngredient = (selected) => {
        handleChange('ingredientId', selected.value);
        setSelectedIngredient(selected.selected);
    };

    const setType = (selected) => {
        handleChange('type', selected.value);
        setSelectedIngredient(selected.selected);
        if (ingredientId)
        {
            handleChange('ingredientId', null);
            setSelectedIngredient(null);
            setIngredientKey(ingredientKey + 1);
        }
    };

    const options = useMemo(() => ({types, ingredients}), [types, ingredients]);
    const keys = useMemo(() => ({ingredientKey, key}), [ingredientKey, key]);
    const actions = useMemo(() => ({
        handleChange,
        onSubmit,
        setType,
        setIngredient
    }), [handleChange, onSubmit, setType, setIngredient]);

    return render(options, keys, actions);
};

export default AddIngredientContainer;