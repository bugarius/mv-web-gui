import {useState} from 'react';
import {useParams} from "react-router-dom";
import {Wine} from "../../types/Wine";
import {StatusType} from "../../../../services/types/Service";
import {ResponseError} from "../../../../error/ResponseError";
import useWineService from "../../service/useWineService";
import {useWineContext} from "../../WineContext";


const WineIngredientsListBoxContainer = ({render}) => {

    const {wine, setWineResult} = useWineContext();
    const {wineId} = useParams();
    const service = useWineService(wineId);

    const [ingredientToShow, setIngredientToShow] = useState({id: null, isOpen: false});

    const handleClick = (id) => {
        setIngredientToShow({id: id, isOpen: ingredientToShow.id === id ? !ingredientToShow.isOpen : true});
    };

    const removeIngredient = (ingredientAddedId) => {
        service.delIngredient(ingredientAddedId)
            .then(response => {
                setWineResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setWineResult(new ResponseError<Wine>(error)));
    };
    const {ingredients} = wine;
    const actions = {handleClick, removeIngredient};

    return render(ingredients, ingredientToShow, actions);
};

export default WineIngredientsListBoxContainer;