import {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import log from 'loglevel';

const EntityListReceiver = ({history, render, service, listConverter, entityName}) => {

    const [entities, setEntities] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const getLimit = () => {
        const limit = window.innerWidth / 150 - 2.5;

        return limit > 2 ? limit : 2;
    };

    const [limit, setLimit] = useState(getLimit());

    const handleError = useCallback((error) => {
        setLoading(false);
        log.debug(error);
        // history.push(`/error`);
    }, []);

    const fetchAllEntities = useCallback(() => {
        service.getAll(page)
                .then((result) => {
                    setPagination(result);
                    setLoading(false);
                    setEntities(listConverter(result.content));
                })
                .catch(handleError);
    }, [handleError, setEntities, listConverter, page, service]);

    useEffect(() => {
        window.addEventListener("resize", () => updateDimensions());
        if (!service?.payload)
        {
            fetchAllEntities();
        }
        return () => {
            window.removeEventListener("resize", () => updateDimensions());
            setEntities([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateDimensions = () => {
        setLimit(getLimit());
    };

    const remove = (entity) => {
        if (window.confirm("Czy jesteś pewien?") === true)
        {
            setLoading(true);
            if (pagination.numberOfElements === 1 && page > 0)
            {
                setPage(page - 1);
            }

            service.del(entity.id)
                    .then((result) => {
                        fetchAllEntities();
                        setLoading(false);
                    })
                    .catch(handleError);
        }
    };

    const proceed = (entity) => {
        history.push(`/mv/${entityName}/${entity.id}/`, {from: location.pathname});
    };

    const info = (entity) => {
        history.push(`/mv/${entityName}/${entity.id}/info`, {from: location.pathname});
    };

    const changePage = (e) => {
        e.preventDefault();
        setPage(e.target.name - 1);
        service.getList(e.target.name - 1)
                .then((result) => {
                    setPagination(result);
                    setLoading(false);
                    setEntities(listConverter(result.content));
                })
                .catch(handleError);
    };

    const onNext = (e) => {
        e.preventDefault();
        service.getList(page + 1)
                .then((result) => {
                    setPagination(result);
                    setPage(page + 1);
                    setLoading(false);
                    setEntities(listConverter(result.content));
                })
                .catch(handleError);
    };

    const onPrev = (e) => {
        e.preventDefault();
        service.getList(page - 1)
                .then((result) => {
                    setPagination(result);
                    setPage(page - 1);
                    setLoading(false);
                    setEntities(listConverter(result.content));
                })
                .catch(handleError);
    };

    const paginationActions = {
        changePage: changePage,
        onPrev: onPrev,
        onNext: onNext
    };

    const entityActions = {
        remove: remove,
        proceed: proceed,
        info: info
    };

    return render(entities, page, pagination, limit, loading, paginationActions, entityActions);
};

export default EntityListReceiver;