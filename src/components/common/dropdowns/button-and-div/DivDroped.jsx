import React from "react";
import * as PropTypes from 'prop-types';
import {Collapse} from "react-collapse/lib/Collapse";

const DivDropped = ({open, label, children}) => {
    return (
            <Collapse isOpened={open}>
                <div className="p-0 m-0">
                    {label && <h6 className=" p-3 text-muted text-uppercase font-size-md opacity-5 font-weight-normal">{label}</h6>}
                    {children}
                </div>
            </Collapse>
    )
};

DivDropped.propTypes = {
    open: PropTypes.bool,
    label: PropTypes.string,
    children: PropTypes.any,
};

export default DivDropped;