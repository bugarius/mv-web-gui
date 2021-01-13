import {Service, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../error/ResponseError";
import {useHistory} from "react-router-dom";

export const useGenericCRUDEntityService = <T> (serviceCallback: (id: number) => Promise<T>, setResult: (value: Service<T>) => void) => {

    const history = useHistory();

    const removeElement = (elementId) => {
        setResult({status: StatusType.loading});
        serviceCallback(elementId)
            .then(response => {
                setResult({status: StatusType.loaded, payload: response});
            })
            .catch(error => setResult(new ResponseError<T>(error)));
    };

    const editElement = (entityName, elementId) => {
        history.push(`/mv/${entityName}/${elementId}/`, {from: history.location.pathname});
    }

  return {removeElement, editElement}
};