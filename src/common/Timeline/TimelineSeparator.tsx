import React from 'react';
import PropTypes from 'prop-types';

interface Props
{
    label?: string;
    className?: string;
    style?: {}
}

const TimelineSeparator: React.FC<Props> = ({label, className, style}) => {

    return (
        <li className={"timeline-separator " + (className ? className : "")} data-datetime={label} style={style}/>
    )
};

TimelineSeparator.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default TimelineSeparator;