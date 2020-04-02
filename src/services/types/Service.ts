export interface Error {
    name: string;
    message: string;
    stack?: string;
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
    hasError?: (name: string) => boolean;
    payload?: T;
}
interface ServiceLoading<T> {
    status?: StatusType.loading | StatusType;
    hasError?: (name: string) => boolean;
    payload?: T;
}
interface ServiceLoaded<T> {
    status?: StatusType.loaded | StatusType;
    hasError?: (name: string) => boolean;
    payload: T;
}
export interface ServiceError<T> {
    status?: StatusType.error | StatusType;
    error: Error;
    hasError: (name: string) => boolean;
    payload?: T;
}
export type Service<T> =
    | ServiceInit<T>
    | ServiceLoading<T>
    | ServiceLoaded<T>
    | ServiceError<T>;