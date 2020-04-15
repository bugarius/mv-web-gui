import React from "react";

const SmallTextBadge = ({title, color, float}) => {

    return (
            <div className={"float-" + (float || "right")}>
                <div className={"badge badge-" + (color || "info")}>{title}</div>
            </div>
    )
};

export default SmallTextBadge;