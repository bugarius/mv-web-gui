import React, {FC} from "react";
import {Color} from "../../enums/Color";

interface Props
{
    color?: Color;
    icon: "trash-alt" | "edit"
    onClick: () => void;
}

export const BoxListActionButton: FC<Props> = ({onClick, icon, color = Color.Muted}) => {
    return (
        <em className={"fa-2x mr-2 far btn-sm btn-square btn btn-" + color + " fa-" + icon}
            onClick={onClick}
            style={{cursor: 'pointer'}}
        />
    )
};