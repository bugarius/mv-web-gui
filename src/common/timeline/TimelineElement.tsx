import React from 'react';
import {Color} from "../enums/Color";
import {History} from "../../winery/wine/types/History";
import {useTranslation} from "react-i18next";
import PropTypes from 'prop-types';
import {FromApiConverter} from "../../services/Converters";

interface Props
{
    inverted?: boolean;
    icon?: string;
    iconBg?: Color | string;
    historyItem?: History;
}

const TimelineElement: React.FC<Props> = (
    {
        inverted,
        icon,
        iconBg,
        historyItem,
    }) => {

    const {t} = useTranslation();

    return (
        <li className={(inverted ? "timeline-inverted" : "")}>
            <div className={"timeline-badge " + (iconBg || Color.Blue)}>
                <em className={icon || t(`history.icon.status.${historyItem?.status}`)}/>
            </div>
            <div className="timeline-card">
                <div className="popover right">
                    <h4 className="popover-header">{t(`history.status.${historyItem?.status}`)} <small>{FromApiConverter.convertDateTime(historyItem?.date)}</small></h4>
                    <div className="arrow"/>
                    <div className="popover-body">
                        <p>{t(`ingredients.TYPE.${historyItem?.actionType}`)}: {historyItem?.message}
                            <br/>
                            <small>Dodał: {historyItem?.modifier?.name}</small> <br/>
                        </p>
                    </div>
                </div>
            </div>
        </li>
    )
};

TimelineElement.propTypes = {
    inverted: PropTypes.bool,
    icon: PropTypes.string,
    iconBg: PropTypes.string,
    historyItem: PropTypes.object
};

export default TimelineElement;