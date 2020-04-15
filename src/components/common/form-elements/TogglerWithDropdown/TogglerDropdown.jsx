import React from 'react';
import * as PropTypes from 'prop-types';
import Toggler from "../InputElement/Toggler";

const TogglerDropdown = ({dropdownName, label, children, onChange, open}) => {

    return (
            <>
                <Toggler name={dropdownName} checked={open} label={label} onChange={onChange}/>
                {open &&
                <div style={{marginLeft: "10px", marginBottom: "15px"}}>
                    {children}
                </div>
                }
            </>
    )
};

TogglerDropdown.propTypes = {
    dropdownName: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    open: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.arrayOf(PropTypes.element.isRequired)])
};

export default TogglerDropdown;