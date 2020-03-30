import React from 'react';

const CardHeader = ({title}) => {
    return (
            <div className="card-header">
                <div className={'card-title'}>{title}</div>
            </div>
    )
};

export default CardHeader;