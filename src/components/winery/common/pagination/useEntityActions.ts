import {usePushHistory} from "../usePushHistory";

interface Entity {
    id: number;
}

export const useEntityActions =  (entityName: string) => {
    const {pushHistory} = usePushHistory();
    const proceed = (entity: Entity) => {
        pushHistory(`/mv/${entityName}/e/${entity.id}/`);
    };

    const info = (entity: Entity) => {
        pushHistory(`/mv/${entityName}/info/${entity.id}`);
    };

    return {proceed, info}
}