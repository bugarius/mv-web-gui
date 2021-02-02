import {SimpleUserData} from "../../../platform/SimpleUserData";

export interface History
{
    status?: string;
    creationDate?: Date;
    createdItemDate?: Date;
    modifier?: SimpleUserData;
    message?: string;
    actionType?: string;
}