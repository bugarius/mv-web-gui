import React, {FC} from "react";

interface Props
{
    float: "right" | "left" | "none" | "clear"
}

export const BoxListActionButtonsSection: FC<Props> = ({children, float = "right"}) => {
    return (
        <div className={"bg-cover float-" + float}>
            {children}
        </div>
    )
};