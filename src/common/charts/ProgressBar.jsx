import React from "react";
import {Progress} from "reactstrap";

const ProgressBar = ({title, percent, color}) => {

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
            <>
                <div className="d-flex align-items-center">
                    <div className="w-100">
                        <Progress className="progress-xs m-0" value={percentForColor || percent}
                                  color={barColor(percentForColor)}/>
                    </div>
                    <div className="wd-xxs text-right">
                        <div className="text-bold text-muted">{percentForColor || percent}%</div>
                    </div>
                </div>
                <div className="text-muted">{title}</div>
            </>
    )
};

export default ProgressBar;