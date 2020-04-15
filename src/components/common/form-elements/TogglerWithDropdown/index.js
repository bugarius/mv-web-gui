import React from 'react';
import DropdownContainer from "./DropdownContainer";
import TogglerDropdown from "./TogglerDropdown";
import * as PropTypes from "prop-types";

const TogglerWithDropdown = (props) => {

    return (
            <DropdownContainer {...props} render={(onChange, open) => (
                    <TogglerDropdown {...props} onChange={onChange} open={open}/>
            )}/>
    )
};

TogglerWithDropdown.propTypes = {
    label: PropTypes.string,
    dropdownName: PropTypes.string,
    togglerValue: PropTypes.any,
    dropdownValues: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
    onResetValue: PropTypes.func,
    onChange: PropTypes.func,
};

export default TogglerWithDropdown;