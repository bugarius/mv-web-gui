import useCrudeApi from "../../../../services/useCrudeApi";
import {ProductionEvent} from "../../wine/types/Wine";

export const useProductionEventService = () => {

    const {get} = useCrudeApi<ProductionEvent>(`/ajax/events`);

    return {get}
};