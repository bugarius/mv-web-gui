import {Parcel} from "../../parcel/types/Parcel";
import {GrapeColor} from "./GrapeColor";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

export interface Grapevine
{
    id?: number | null;
    name?: string;
    numberOfPlants?: number | null;
    area?: number | null;
    parcels?: Parcel[];
    yearOfPlanting?: string;
    grapeColor?: GrapeColor | null;
    liveStatus?: EntityLiveStatus;
    // picture?: {};
}