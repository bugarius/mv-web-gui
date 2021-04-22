import useFetch from "./useFetch";

const useCrudeApi = <T>(endpoint: string) => {
    const crudApi = useFetch<T>(endpoint);

    const getAll = (page: number) => {
        return crudApi.getAll(page);
    };

    const getAllWithParams = (params: Map<string, string | boolean>) => {
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

    const putBody = (body: T) => {
        return crudApi.putBody(body);
    };

    const putId = (id: number) => {
        return crudApi.putId(id);
    };

    const del = (id: number) => {
        return crudApi.del(id);
    };

    return {
        get, getAll, getAllWithParams, getList, post, put, putBody, putId, del
    }
};

export default useCrudeApi;