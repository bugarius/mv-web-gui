import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import GrapevinesReceiver from "../../common/GrapevinesReceiver";

const SelectGrapevines = ({value: selected, onChange, name, label, optional}) => {

    const value = selected && selected.id ?
            {value: selected.id, label: (selected.label || false ? selected.label : selected.name)}
            : {value: "", label: "Wybierz"};

    return (
            <>
                <fieldset>
                    <FormGroup row>
                        <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                            <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                        </label>
                        <GrapevinesReceiver render={(grapevines) => (
                                <div className="col-md-10">
                                    <Select name={name}
                                            options={grapevines}
                                            onChange={onChange}
                                            value={value}
                                            placeholder={"Wybierz"}/>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>

                        )}/>
                    </FormGroup>
                </fieldset>
            </>
    )
};

export default SelectGrapevines;