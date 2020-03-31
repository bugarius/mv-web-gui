import React from 'react';

const CardBody = ({children, paddingTop, paddingLeft, paddingBottom, paddingRight}) => {
    const style = {
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingBottom: paddingBottom,
        paddingRight: paddingRight
    };

    return (
            <div className="card-body bb" style={style}>{children}</div>
    )
};

export default CardBody;