import React from 'react';
import {withRouter} from "react-router-dom";
import {FormGroup} from "reactstrap";
import Select from "react-select";
import ParcelsReceiver from "../../common/ParcelsReceiver";

const SelectParcels = ({value: selected, onChange, name, label, optional}) => {

    const value = (selected || [])
            .map((p) => ({
                value: p.id,
                label: (p.label || false ? p.label : p.registrationNumber + " - " + p.district)
            }));

    return (
                <fieldset>
                    <FormGroup row>
                        <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                            <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                        </label>
                            <ParcelsReceiver render={(parcels) => (
                                <div className="col-md-10">
                                    <Select name={name}
                                            options={parcels}
                                            onChange={onChange}
                                            value={value}
                                            isMulti
                                            placeholder={"Wybierz"}/>
                                    <span className="invalid-feedback">Field is required</span>
                                </div>
                            )}/>
                            </FormGroup>
                </fieldset>
    )
};

export default withRouter(SelectParcels);