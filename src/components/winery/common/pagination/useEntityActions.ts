import {useHistory} from "react-router-dom";

interface Entity {
    id: number;
}

export const useEntityActions =  (entityName: string) => {
    const history = useHistory();
    const proceed = (entity: Entity) => {
        history.push(`/mv/${entityName}/e/${entity.id}/`, {from: history.location.pathname});
    };

    const info = (entity: Entity) => {
        history.push(`/mv/${entityName}/info/${entity.id}`, {from: history.location.pathname});
    };

    return {proceed, info}
}