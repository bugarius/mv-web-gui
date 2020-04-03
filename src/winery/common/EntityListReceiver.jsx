import {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

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

    useEffect(() => {
        window.addEventListener("resize", () => updateDimensions());
        service.getAll(page)
                .then((result) => {
                    setPagination(result);
                    setLoading(false);
                    setEntities(listConverter(result.content));
                })
                .catch(handleError);
        return window.removeEventListener("resize", () => updateDimensions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateDimensions = () => {
        setLimit(getLimit());
    };

    const remove = (entity) => {
        let fixLastInPage = 0;
        if (window.confirm("Czy jesteś pewien?") === true)
        {
            setLoading(true);
            if (pagination.numberOfElements === 1 && page > 0)
            {
                fixLastInPage = 1;
                setPage(page - 1);
            }

            service.del(entity.id, page - fixLastInPage)
                    .then((result) => {
                        setPagination(result);
                        setLoading(false);
                        setEntities(listConverter(result.content));
                    })
                    .catch(handleError);
        }
    };

    const handleError = () => {
        setLoading(false);
        history.push(`/error`);
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