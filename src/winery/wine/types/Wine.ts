import {Ingredient} from "../../ingredient/types/Ingredient";
import {Harvest} from "../../harvest/types/Harvest";
import {Tank} from "../../tank/types/Tank";

export interface Wine
{
    id?: number | null;
    name?: string;
    tank?: Tank;
    startDate?: string;
    liters?: number | null;
    harvest?: Harvest;
    ingredients?: Ingredient[];
    history?: History[];
}