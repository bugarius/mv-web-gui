import {useEffect, useState} from "react";
import {ResponseError} from "../../../error/ResponseError";

export interface TPagination<T> {
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

interface TPageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: TSort;
    unpaged: boolean;
}

interface TSort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface TService<T> {
    getAll: (page: number) => Promise<TPagination<T>>
    del: (id: number) => Promise<T>
}

export const useFetchEntityPage = <T> (service: TService<T>, setError: (value: ResponseError<T[]>) => void, newPage = 0) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(newPage);
    const [pagination, setPagination] = useState<Partial<TPagination<T>>>({});

    const reload = () => {
        setPagination({})
    }

    useEffect(() => {
        if (pagination?.content && pagination.number === page)
        {
            return;
        }
        setLoading(true);
        service.getAll(page)
            .then(p => {
                setPagination(p);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [pagination, setPagination, setLoading, service, setError, page])

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

    const removeEntity = (entity) => {
        if (window.confirm("Czy jesteś pewien?"))
        {
            if (pagination.numberOfElements === 1 && page > 0)
            {
                setPage(page - 1);
            }

            service.del(entity.id)
                .then(() => {
                    reload();
                })
                .catch((error) => console.log(error));
        }
    };

    return {pagination, pageResult: pagination?.content, loading, removeEntity, paginationActions, currentPage: page}
}