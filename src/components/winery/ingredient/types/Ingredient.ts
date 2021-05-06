import {IngredientType} from "./IngredientType";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

export interface Ingredient
{
    id?: number | null;
    ingredient?: Ingredient | null;
    name?: string;
    info?: string;
    type?: IngredientType | null;
    amount?: number | null;
    notes?: string;
    appliedDate: Date | string | null;
    liveStatus?: EntityLiveStatus;
}