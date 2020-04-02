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
        method = "GET",
        body,
        headers: any = defaultHeader
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
        const url = `${endpoint}?${URI.buildQuery({catalogId: paramValue1, typeId: paramValue2 })}`;
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
    const post = (body: T) => {
        if (body === null)
        {
            throw new Error("to make a post you must provide a body");
        }
        return customFetch(endpoint, "POST", body);
    };

    const postFile = (files, endpoint: string) => {
        if (files === null)
        {
            throw new Error("to make a post you must provide a body");
        }
        return fetch(endpoint, {
            method: 'POST',
            body: files,
            credentials: 'include'
        }).then(useTransformResponse);
    };

    const putFile = (files, endpoint: string) => {
        if (files === null)
        {
            throw new Error("to make a post you must provide a body");
        }
        return customFetch(endpoint, "PUT", files);
    };

    const put = (id: number, body: T) => {
        if (id === null || body === null)
        {
            throw new Error("to make a put you must provide the id and the body");
        }
        const url = `${endpoint}/${id}`;
        return customFetch(url, "PUT", body);
    };
    const del = (id: number) => {
        if (!id)
        {
            throw new Error("to make a delete you must provide the id");
        }
        const url = `${endpoint}/${id}`;
        return customFetch(url, "DELETE", null);
    };

    return {get, getList, post, put, del, getAllByParams, postFile, putFile};
};
export default useFetch;