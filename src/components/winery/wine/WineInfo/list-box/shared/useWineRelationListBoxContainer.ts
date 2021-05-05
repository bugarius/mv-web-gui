import {Wine} from "../../../types/Wine";
import {useWineContext} from "../../../WineContext";
import {useElementToShow} from "../../../../common/useElementToShow";
import {useGenericCRUDEntityService} from "../../../../common/useGenericCRUDEntityService";

export const useWineRelationListBoxContainer = <T>(list: T[], removeItemCallback, setError?: (value: Error) => void): {list: T[], elementToShow, actions: {toggleShow, removeElement}} => {

    const {setWineResult} = useWineContext();

    const [elementToShow, toggleShow] = useElementToShow();
    const {removeElement, editElement} = useGenericCRUDEntityService<Wine>(removeItemCallback, setWineResult, setError);

    const actions = {toggleShow, removeElement, editElement};

    return {list, elementToShow, actions};
};