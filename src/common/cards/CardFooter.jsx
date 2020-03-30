import React from 'react';

const CardFooter = ({children, paddingTop, paddingLeft, paddingBottom, paddingRight}) => {
    const style = {
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingBottom: paddingBottom,
        paddingRight: paddingRight
    };

    return (
            <div className="card-footer text-center" style={style}>{children}</div>
    )
};

export default CardFooter;