import {Parcel} from "../../parcel/types/Parcel";
import {GrapeColor} from "./GrapeColor";

export interface Grapevine
{
    id?: number | null;
    name?: string;
    numberOfPlants?: number | null;
    area?: number | null;
    parcels?: Parcel[];
    yearOfPlanting?: string;
    grapeColor?: GrapeColor | null;
    // picture?: {};
}