import {Grapevine} from "../../grapevine/types/Grapevine";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";
import {History} from "../../wine/types/History";

export interface Harvest
{
    id?: number | null;
    grapevine?: Grapevine;
    dateOfHarvest?: string;
    weightOfGrapes?: number | null;
    amountOfMust?: number | null;
    amountOfWaste?: number | null;
    box?: BoxWithGrapes | null;
    boxesCount?: number | null;
    weightOfEveryEmptyBox?: number | null;
    allDisposedToWine?: boolean;
    history?: History[];
}