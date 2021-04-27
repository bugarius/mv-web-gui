import {TService, useFetchEntityPage} from "./useFetchEntityPage";
import {useLimitedRowsToDimension} from "./useLimitedRowsToDimension";
import {useEntityActions} from "./useEntityActions";
import log from "loglevel";

export const useEntityPageReceiver = <T>(service: TService<T>, listConverter: (entity: T[]) => T[], entityName: string) => {

    const handleError = (error) => {
        //need to implement general errors alerts
        log.debug(error)
    }

    const {
        pagination,
        paginationActions,
        loading,
        removeEntity,
        currentPage
    } = useFetchEntityPage(service, handleError)
    const {limit} = useLimitedRowsToDimension();
    const {proceed, info} = useEntityActions(entityName);

    const entityActions = {
        remove: removeEntity,
        proceed: proceed,
        info: info
    };

    const entities = pagination.content ? listConverter(pagination.content) : []

    return {entities, currentPage, pagination, limit, loading, paginationActions, entityActions};
};