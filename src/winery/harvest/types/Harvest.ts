import {Grapevine} from "../../grapevine/types/Grapevine";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";

export interface Harvest
{
    id?: number | null;
    grapevine?: Grapevine;
    dateOfHarvest?: string;
    weightOfGrapes?: number | null;
    amountOfMust?: number | null;
    amountOfWaste?: number | null;
    box?: BoxWithGrapes;
    boxesCount?: number | null;
    weightOfEveryEmptyBox?: number | null;
    allDisposedToWine?: boolean;
}