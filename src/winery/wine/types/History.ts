import {SimpleUserData} from "../../../platform/SimpleUserData";

export interface History
{
    status?: string;
    date?: Date;
    modifier?: SimpleUserData;
    message?: string;
    actionType?: string;
}