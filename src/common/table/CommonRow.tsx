import React from 'react';
import PropTypes from 'prop-types';

interface Props
{
    label?: string,
    value?: any[] | string | number,
    onClick?: () => void,
    style?: {},
    className?: string
}
const CommonRow: React.FC<Props> = ({label, value, onClick, style, className}) => {

    const renderColumns = () => {
        if (Array.isArray(value))
        {
            return value.map((v, index) => <td key={index} className={'text-nowrap'}>{v}</td>)
        }
        return <td>{value}</td>
    };

    return (
            <tr onClick={onClick} style={style} className={className}>
                <td>
                    <strong>{label}</strong>
                </td>
                {renderColumns()}
            </tr>
    )
};

CommonRow.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string
};

export default CommonRow;