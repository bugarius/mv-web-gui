import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

export interface Parcel
{
    id?: number | null;
    country?: string;
    city?: string;
    zipCode?: string;
    district?: string;
    area?: number | null;
    registrationNumber?: string;
    liveStatus?: EntityLiveStatus;
}