import {Service, StatusType} from "../../../services/types/Service";
import {ResponseError} from "../../error/ResponseError";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const useGenericCRUDEntityService = <T> (serviceCallback: (id: number) => Promise<T>, setResult: (value: Service<T>) => void, setError?: (value: Error) => void) => {

    const history = useHistory();
    const {t} = useTranslation();

    const removeElement = (elementId) => {
        if (window.confirm(t("alerts.confirmation.REMOVE_ELEMENT")))
        {
            setResult({status: StatusType.loading});
            serviceCallback(elementId)
                .then(response => {
                    setResult({status: StatusType.loaded, payload: response});
                })
                .catch(error => {
                    setResult(new ResponseError<T>(error));
                    setError?.(error);
                });
        }
    };

    const editElement = (entityName, elementId) => {
        history.push(`/mv/${entityName}/${elementId}/`, {from: history.location.pathname});
    }

  return {removeElement, editElement}
};