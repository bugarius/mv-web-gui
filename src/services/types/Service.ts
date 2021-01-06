export interface Error {
    message: string;
    errors?: {}
}

export enum StatusType {
    init = "init",
    loading = "loading",
    loaded = "loaded",
    error = "error"
}

interface ServiceInit<T> {
    status?: StatusType.init | StatusType;
    payload?: T;
}
interface ServiceLoading<T> {
    status?: StatusType.loading | StatusType;
    payload?: T;
}
interface ServiceLoaded<T> {
    status?: StatusType.loaded | StatusType;
    payload?: T;
}

export type ServiceWorking<T> = | ServiceInit<T> | ServiceLoading<T> | ServiceLoaded<T>;

export interface ServiceError<T> {
    status?: StatusType.error | StatusType;
    error: Error;
    hasError: (name: string) => boolean;
    getErrorMessage: (name: string) => string;
}
export type Service<T> =
    | ServiceWorking<T>
    | ServiceError<T>;