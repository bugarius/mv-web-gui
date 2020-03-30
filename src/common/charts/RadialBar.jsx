import React from "react";

const RadialBar = ({title, percent, color}) => {

    const barColor = (p) => {
        if (p > 75 && p <= 85)
        {
            return "warning";
        }
        else if (p > 85)
        {
            return "danger";
        }
        return color;
    };

    const percentForColor = Math.floor(percent / 10) * 10;

    return (
            <div style={{width: "200px", textAlign: "center"}}>
                <div className={'h6'}>{title}</div>
                <div data-label={percent + "%"}
                     className={"radial-bar radial-bar-" + percentForColor + " radial-bar-lg radial-bar-" + barColor(percent)}/>
            </div>
    )
};

export default RadialBar;