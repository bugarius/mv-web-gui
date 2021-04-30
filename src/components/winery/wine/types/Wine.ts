import {Ingredient} from "../../ingredient/types/Ingredient";
import {Harvest} from "../../harvest/types/Harvest";
import {Tank} from "../../tank/types/Tank";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

export enum WineStatus {
    SEDIMENTATION,
    MACERATION,
    FERMENTATION,
    DEACIDIFICATION,
    CLARIFICATION,
    AGING,
}

export enum ProductionEventType {
    SEDIMENTATION= "SEDIMENTATION",
    MACERATION = "MACERATION",
    FERMENTATION = "FERMENTATION",
    MALOLACTIC_FERMENTATION = "MALOLACTIC_FERMENTATION",
    DEACIDIFICATION = "DEACIDIFICATION",
    CLARIFICATION = "CLARIFICATION",
    SUGARING = "CLARIFICATION",
    ALCOHOL_INCREASING = "ALCOHOL_INCREASING",
    DECANTING_ABOVE_SEDIMENT = "DECANTING_ABOVE_SEDIMENT",
    FILTERING = "FILTERING",
    BOTTLING = "BOTTLING",
    OTHER = "OTHER"
}

export interface ProductionEvent {
    id?: number | null;
    name?: string;
    type: ProductionEventType | null;
    info?: string;
    startingDate: Date | string | null;
    endingDate?: Date | string | null;
    waste?: number | null;
}

export interface Wine
{
    id?: number | null;
    name: string;
    tank: Tank | null;
    startDate?: string;
    liters: number | null;
    harvest: Harvest | null;
    ingredients: Ingredient[];
    history: History[];
    status: WineStatus | null;
    events: ProductionEvent[];
    lastEvent: ProductionEvent | null;
    liveStatus?: EntityLiveStatus;
}