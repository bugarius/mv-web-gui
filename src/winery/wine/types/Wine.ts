import {Ingredient} from "../../ingredient/types/Ingredient";
import {Harvest} from "../../harvest/types/Harvest";

export interface Wine
{
    id?: number | null;
    name?: string;
    tankNumber?: number | null;
    tankCapacity?: number | null;
    startDate?: string;
    liters?: number | null;
    harvest?: Harvest;
    ingredients?: Ingredient[];
}