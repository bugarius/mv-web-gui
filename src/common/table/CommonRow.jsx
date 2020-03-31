import React from 'react';

const CommonRow = ({label, value, onClick, style, className}) => {

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

export default CommonRow;