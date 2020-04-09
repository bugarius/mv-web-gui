import React from 'react';
import PropTypes from 'prop-types';

interface Props
{
    label?: string;
}

const TimelineSeparator: React.FC<Props> = ({label}) => {

    return (
        <li className="timeline-separator" data-datetime={label}/>
    )
};

TimelineSeparator.propTypes = {
    label: PropTypes.string,
};

export default TimelineSeparator;