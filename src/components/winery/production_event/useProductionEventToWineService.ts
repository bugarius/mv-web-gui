import useCrudeApi from "../../../services/useCrudeApi";
import {ProductionEvent} from "../wine/types/Wine";

export const useProductionEventToWineService = (wineId?: string) => {

    const wineCrudApi = useCrudeApi<ProductionEvent>(`/ajax/wines/event/${wineId}`);

    const add = (body: ProductionEvent) => {
        return wineCrudApi.putBody(body);
    }

    const edit = (eventId: number, body: ProductionEvent) => {
        return wineCrudApi.put(eventId, body);
    }

    const remove = (eventId: number) => {
        return wineCrudApi.del(eventId);
    }

    return { add, remove, edit }
};