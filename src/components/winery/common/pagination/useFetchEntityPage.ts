import {useEffect, useState} from "react";
import {defaultError} from "../../parcel/ParcelContext";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";
import {useParams} from "react-router-dom";

export interface TPagination<T>
{
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: TPageable;
    size: number;
    sort: TSort;
    totalElements: number;
    totalPages: number;
}

interface TPageable
{
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: TSort;
    unpaged: boolean;
}

interface TSort
{
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface TService<T>
{
    getAll: (page: number, status?: string) => Promise<TPagination<T>>;
    del: (id: number) => Promise<T>;
    archive: (id: number) => Promise<T>;
    revertArchive: (id: number) => Promise<T>;
}

export const useFetchEntityPage = <T>(service: TService<T>, setError: (value: Error) => void, newPage = 0) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(newPage);
    const [pagination, setPagination] = useState<Partial<TPagination<T>>>({});
    const {status} = useParams();
    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const reload = () => {
        setPagination({});
        setError({...defaultError.error, name: ""});
    }

    useEffect(() => {
        if ((pagination?.content && pagination.number === page) || isErrorResponse || loading)
        {
            return;
        }
        setLoading(true);
        service.getAll(page, status ? status : EntityLiveStatus.CREATED)
            .then(p => {
                setPagination(p);
                setLoading(false);
                setError({...defaultError.error, name: ""});
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                setIsErrorResponse(true);
            })
    }, [pagination, setPagination, setLoading, service, setError, page, status, isErrorResponse, setIsErrorResponse, loading])

    const changePage = (e) => {
        e.preventDefault();
        setPage(e.target.name - 1);
    };

    const onNext = (e) => {
        e.preventDefault();
        setPage(page + 1)
    };

    const onPrev = (e) => {
        e.preventDefault();
        setPage(page - 1)
    };

    const paginationActions = {
        changePage: changePage,
        onPrev: onPrev,
        onNext: onNext
    };

    const recalculatePageAfterRemoveOrArchiveActions = () => {
        if (pagination.numberOfElements === 1 && page > 0)
        {
            setPage(page - 1);
        }
    }

    const removeEntity = (entity) => {
        if (window.confirm("Czy jesteś pewien?"))
        {
            recalculatePageAfterRemoveOrArchiveActions();
            service.del(entity.id)
                .then(() => {
                    reload();
                })
                .catch((error) => setError(error));
        }
    };

    const archiveEntity = (entity) => {
        recalculatePageAfterRemoveOrArchiveActions();
        service.archive(entity.id)
            .then(() => {
                reload();
            })
            .catch((error) => setError(error));
    };

    const revertArchiveEntity = (entity) => {
        recalculatePageAfterRemoveOrArchiveActions();
        service.revertArchive(entity.id)
            .then(() => {
                reload();
            })
            .catch((error) => setError(error));
    };

    return {
        pagination,
        pageResult: pagination?.content,
        loading,
        removeEntity,
        archiveEntity,
        revertArchiveEntity,
        paginationActions,
        currentPage: page
    }
}