import {useHistory} from "react-router-dom";

interface Entity {
    id: number;
}

export const useEntityActions =  (entityName: string) => {
    const history = useHistory();
    const proceed = (entity: Entity) => {
        history.push(`/mv/${entityName}/${entity.id}/`, {from: history.location.pathname});
    };

    const info = (entity: Entity) => {
        history.push(`/mv/${entityName}/${entity.id}/info`, {from: history.location.pathname});
    };

    return {proceed, info}
}