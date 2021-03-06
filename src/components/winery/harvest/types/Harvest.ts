import {Grapevine} from "../../grapevine/types/Grapevine";
import {BoxWithGrapes} from "../../box/types/BoxWithGrapes";
import {History} from "../../wine/types/History";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

export interface Harvest
{
    id?: number | null;
    grapevine?: Grapevine | null;
    dateOfHarvest: Date | string | null;
    weightOfGrapes?: number | null;
    amountOfMust?: number | null;
    amountOfWaste?: number | null;
    box: BoxWithGrapes;
    boxesCount?: number | null;
    weightOfEveryEmptyBox?: number | null;
    allDisposedToWine?: boolean;
    history?: History[];
    liveStatus?: EntityLiveStatus;
}