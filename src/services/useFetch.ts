import URI from 'urijs';
import {StringValueValidator} from "./Validators";
import useTransformResponse from "./useTransformResponse";

const useFetch = <T>(endpoint?: string) => {
    const defaultHeader = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    const customFetch = (
        url,
        method: "GET" | "POST" | "PUT" | "DELETE",
        body,
        headers = defaultHeader
    ) => {
        const options = {
            method,
            headers,
            body
        };
        if (StringValueValidator.isNotBlank(body))
        {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options)
            .then(useTransformResponse);
    };
    const getAllByParams = (paramName1: string, paramValue1: number | string, paramName2?: string, paramValue2?: number | string) => {
        const url = `${endpoint}?${URI.buildQuery({catalogId: paramValue1, typeId: paramValue2})}`;
        return customFetch(url, 'GET', null);
    };
    const get = (id?: number) => {
        const url = `${endpoint}${id ? `/${id}` : ""}`;
        return customFetch(url, 'GET', null);
    };
    const getList = () => {
        const url = `${endpoint}/all`;
        return customFetch(url, 'GET', null);
    };
    const getAll = (page: number, status?: string) => {
        status = status ? status.toUpperCase() : status;
        const url = `${endpoint}?${URI.buildQuery({p: page, s: status})}`;
        return customFetch(url, 'GET', null);
    };
    const getAllWithParams = (params: Map<string, string | boolean>) => {
        const url = `${endpoint}/all?${URI.buildQuery(Object.fromEntries(params.entries()))}`;
        return customFetch(url, 'GET', null);
    };
    const post = (body: T) => {
        // if (body === null)
        // {
        //     throw new Error("to make a post you must provide a body");
        // }
        return customFetch(endpoint, "POST", body);
    };

    const postFile = (files, fileEndpoint: string) => {
        // if (files === null)
        // {
        //     throw new Error("to make a post you must provide a body");
        // }
        return fetch(fileEndpoint, {
            method: 'POST',
            body: files,
            credentials: 'include'
        }).then(useTransformResponse);
    };

    const putFile = (files, fileEndpoint: string) => {
        // if (files === null)
        // {
        //     throw new Error("to make a post you must provide a body");
        // }
        return customFetch(fileEndpoint, "PUT", files);
    };

    const put = (id: number, body: T) => {
        // if (id === null || body === null)
        // {
        //     throw new Error("to make a put you must provide the id and the body");
        // }
        const url = `${endpoint}/${id}`;
        return customFetch(url, "PUT", body);
    };
    const putBody = (body: T) => {
        // if (body === null)
        // {
        //     throw new Error("to make a put you must provide the body");
        // }
        const url = `${endpoint}`;
        return customFetch(url, "PUT", body);
    };
    const putId = (id: number) => {
        // if (id === null)
        // {
        //     throw new Error("to make a put you must provide the id");
        // }
        const url = `${endpoint}/${id}`;
        return customFetch(url, "PUT", null);
    };
    const del = (id: number, page?: number) => {
        // if (!id)
        // {
        //     throw new Error("to make a delete you must provide the id");
        // }
        const url = `${endpoint}/${id}?${URI.buildQuery({p: page})}`;
        return customFetch(url, "DELETE", null);
    };

    return {get, getList, getAll, getAllWithParams, post, put, putBody, putId, del, getAllByParams, postFile, putFile};
};
export default useFetch;