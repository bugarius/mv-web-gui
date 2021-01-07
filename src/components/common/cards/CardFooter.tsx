import React, {FC} from 'react';

interface Props {
    children?: any;
    paddingTop?: string | number;
    paddingLeft?: string | number;
    paddingBottom?: string | number;
    paddingRight?: string | number;
}

const CardFooter: FC<Props> = ({children, paddingTop, paddingLeft, paddingBottom, paddingRight}) => {
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