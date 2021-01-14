import {useWineContext} from "../../../WineContext";
import {useWineRelationListBoxContainer} from "../shared/useWineRelationListBoxContainer";
import useWineService from "../../../service/useWineService";


export const WineIngredientsListBoxContainer = ({render}) => {

    const {wine} = useWineContext();
    const service = useWineService();
    const {list, elementToShow, actions} = useWineRelationListBoxContainer(wine.ingredients, service.delIngredient);

    return render(list, elementToShow, actions)
};