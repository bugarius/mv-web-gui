import {Ingredient} from "../../ingredient/types/Ingredient";
import {Harvest} from "../../harvest/types/Harvest";
import {Tank} from "../../tank/types/Tank";

export enum WineStatus {
    SEDIMENTATION,
    MACERATION,
    FERMENTATION,
    DEACIDIFICATION,
    CLARIFICATION,
    AGING,
}

export enum ProductionEventType {
    SEDIMENTATION,
    MACERATION,
    FERMENTATION,
    MALOLACTIC_FERMENTATION,
    DEACIDIFICATION,
    CLARIFICATION,
    SUGARING,
    ALCOHOL_INCREASING,
    DECANTING_ABOVE_SEDIMENT,
    OTHER
}

export interface ProductionEvent {
    id?: number | null;
    name?: string;
    type: ProductionEventType | null;
    info?: string;
    startingDate: string;
    endingDate?: string;
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
}