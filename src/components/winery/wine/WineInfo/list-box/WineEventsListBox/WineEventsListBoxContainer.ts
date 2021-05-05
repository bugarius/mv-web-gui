import {useWineContext} from "../../../WineContext";
import {useWineRelationListBoxContainer} from "../shared/useWineRelationListBoxContainer";
import useWineService from "../../../service/useWineService";
import {useProductionEventContext} from "../../../../production_event/ProductionEventContext";


export const WineEventsListBoxContainer = ({render}) => {

    const {wine} = useWineContext();
    const {setError} = useProductionEventContext();
    const service = useWineService();
    const {list, elementToShow, actions} = useWineRelationListBoxContainer(wine.events, service.removeEvent, setError);

    return render(list, elementToShow, actions)
};