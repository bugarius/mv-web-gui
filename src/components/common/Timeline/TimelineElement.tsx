import React from 'react';
import {Color} from "../enums/Color";
import {History} from "../../winery/wine/types/History";
import {useTranslation} from "react-i18next";
import PropTypes from 'prop-types';
import {FromApiConverter} from "../../../services/Converters";
import TimelineSeparator from "./TimelineSeparator";

interface Props
{
    header?: string;
    subHeader?: string;
    inverted?: boolean;
    icon?: string;
    iconBg?: Color | string;
    historyItem?: History;
}

const TimelineElement: React.FC<Props> = (
    {
        header,
        subHeader,
        inverted,
        icon,
        iconBg,
        historyItem,
    }) => {

    const {t} = useTranslation();

    return (<>
        <li className={(inverted ? "timeline-inverted" : "")}>
            <div className={"timeline-badge " + (iconBg || Color.Blue)}>
                <em className={icon || t(`history.icon.status.${historyItem?.status}`)}/>
            </div>
            <div className="timeline-card">
                <div className="popover right">
                    <h4 className="popover-header">{header} <small>{FromApiConverter.convertDateTime(historyItem?.date)}</small></h4>
                    <div className="arrow"/>
                    <div className="popover-body">
                        <p>{subHeader}
                            <br/>
                            <small>Dodał: {historyItem?.modifier?.name}</small> <br/>
                        </p>
                    </div>
                </div>
            </div>
        </li>
            <TimelineSeparator className={"p-0"} style={{height: "0px"}}/>
        </>
    )
};

TimelineElement.propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
    inverted: PropTypes.bool,
    icon: PropTypes.string,
    iconBg: PropTypes.string,
    historyItem: PropTypes.object
};

export default TimelineElement;