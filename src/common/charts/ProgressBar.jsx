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

    return (
            <>
                <div className="d-flex align-items-center">
                    <div className="w-100">
                        <Progress className="progress-xs m-0" value={percent}
                                  color={barColor(percent)}/>
                    </div>
                    <div className="wd-xxs text-right">
                        <div className="text-bold text-muted">{percent || "0"}%</div>
                    </div>
                </div>
                <div className="text-muted">{title}</div>
            </>
    )
};

export default ProgressBar;