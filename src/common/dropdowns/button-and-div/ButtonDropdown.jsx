import React from "react";
import * as PropTypes from 'prop-types';

const ButtonDropdown = ({actions, label, color}) => {
    return (
            <button className={"mr-2 btn-icon btn btn-sm btn-" + (color ? color : 'warning')}
                    onClick={() => actions[1](!actions[0])}
                    aria-controls="example-collapse-text"
                    aria-expanded={actions[0]}>
                {label}
            </button>
    )
};

ButtonDropdown.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.func.isRequired])),
    label: PropTypes.string,
};

export default ButtonDropdown;