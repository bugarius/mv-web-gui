import {useWineContext} from "../../../WineContext";
import {useWineRelationListBoxContainer} from "../useWineRelationListBoxContainer";
import useWineService from "../../../service/useWineService";


export const WineEventsListBoxContainer = ({render}) => {

    const {wine} = useWineContext();
    const service = useWineService();
    const {list, elementToShow, actions} = useWineRelationListBoxContainer(wine.events, service.removeEvent);

    return render(list, elementToShow, actions)
};