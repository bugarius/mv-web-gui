import {TService, useFetchEntityPage} from "./useFetchEntityPage";
import {useLimitedRowsToDimension} from "./useLimitedRowsToDimension";
import {useEntityActions} from "./useEntityActions";

export const useEntityPageReceiver = <T>(service: TService<T>, listConverter: (entity: T[]) => T[], entityName: string, setError: (value: Error) => void) => {

    const {
        pagination,
        paginationActions,
        loading,
        removeEntity,
        currentPage,
        archiveEntity,
        revertArchiveEntity
    } = useFetchEntityPage(service, setError)
    const {limit} = useLimitedRowsToDimension();
    const {proceed, info} = useEntityActions(entityName);

    const entityActions = {
        remove: removeEntity,
        proceed: proceed,
        info: info,
        archive: archiveEntity,
        revertArchive: revertArchiveEntity
    };

    const entities = pagination.content ? listConverter(pagination.content) : []

    return {entities, currentPage, pagination, limit, loading, paginationActions, entityActions};
};