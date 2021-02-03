import React, {FC} from "react";
import {BoxListActionButtonsSection} from "./BoxListActionButtonsSection";
import {BoxListActionButton} from "./BoxListActionButton";
import {Color} from "../../enums/Color";

interface Props
{
    actions: BoxListActionButtonsActions;
}

export interface BoxListActionButtonsActions
{
    editElement: () => void;
    removeElement: () => void;
}

export const BoxListActionsButtons: FC<Props> = ({actions: {editElement, removeElement}}) => {
    return (
        <BoxListActionButtonsSection float={"right"}>
            <BoxListActionButton color={Color.LightBlue} onClick={editElement} icon={"edit"}/>
            <BoxListActionButton color={Color.Red} onClick={removeElement} icon={"trash-alt"}/>
        </BoxListActionButtonsSection>
    )
};