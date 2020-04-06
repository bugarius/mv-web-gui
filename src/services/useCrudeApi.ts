import useFetch from "./useFetch";

const useCrudeApi = <T>(endpoint: string) => {
    const crudApi = useFetch<T>(endpoint);

    const getAll = (page: number) => {
        return crudApi.getAll(page);
    };

    const getAllWithParams = (params: Map<string, string>) => {
        return crudApi.getAllWithParams(params);
    };

    const getList = () => {
        return crudApi.getList();
    };

    const get = (id: number) => {
        return crudApi.get(id);
    };

    const post = (body: T) => {
        return crudApi.post(body);
    };

    const put = (id: number, body: T) => {
        return crudApi.put(id, body);
    };

    const del = (id: number) => {
        return crudApi.del(id);
    };

    return {
        get, getAll, getAllWithParams, getList, post, put, del
    }
};

export default useCrudeApi;