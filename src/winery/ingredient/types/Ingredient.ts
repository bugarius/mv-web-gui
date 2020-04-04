import {IngredientType} from "./IngredientType";

export interface Ingredient
{
    id?: number | null;
    ingredientId?: number | null;
    name?: string;
    info?: string;
    type?: IngredientType;
    amount?: number | null;
    notes?: string;
}