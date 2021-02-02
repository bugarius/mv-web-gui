import {SelectOption} from "../../../../services/types/SelectOption";
import {ServiceError} from "../../../../services/types/Service";

export interface SelectOptionProps<T>
{
    value?: T | SelectOption | null;
    onChange: (name: string, s: Record<string, string>) => void;
    name: string;
    label?: string;
    optional?: boolean;
    error?: ServiceError;
}