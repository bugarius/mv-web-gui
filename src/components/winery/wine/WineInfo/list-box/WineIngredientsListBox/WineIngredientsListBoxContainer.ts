import {useWineContext} from "../../../WineContext";
import {useWineRelationListBoxContainer} from "../shared/useWineRelationListBoxContainer";
import useWineService from "../../../service/useWineService";
import {useIngredientContext} from "../../../../ingredient/IngredientContext";


export const WineIngredientsListBoxContainer = ({render}) => {

    const {wine} = useWineContext();
    const service = useWineService();
    const {setError} = useIngredientContext();
    const {
        list,
        elementToShow,
        actions
    } = useWineRelationListBoxContainer(wine.ingredients, service.delIngredient, setError);

    return render(list, elementToShow, actions)
};