import React from 'react';
import {FormGroup} from "reactstrap";
import Select from "react-select";
import useGrapevinesReceiver from "../../grapevine/service/useGrapevinesReceiver";
import {SelectOption} from "../../../services/types/SelectOption";
import {Grapevine} from "../../grapevine/types/Grapevine";
import * as PropTypes from "prop-types";

interface Props
{
    value: Grapevine | SelectOption;
    onChange: () => void;
    name: string;
    label?: string;
    optional?: boolean;
}

const SelectGrapevines: React.FC<Props> = ({value: selected, onChange, name, label, optional}) => {

    const {selected: value, options: grapevines} = useGrapevinesReceiver(selected);

    return (
        <fieldset>
            <FormGroup row>
                <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                    <span className="text-danger" style={{display: optional === true ? 'none' : ''}}> *</span>
                </label>
                <div className="col-md-10">
                    <Select name={name}
                            options={grapevines}
                            onChange={onChange}
                            value={value}
                            placeholder={"Wybierz"}/>
                    <span className="invalid-feedback">Field is required</span>
                </div>
            </FormGroup>
        </fieldset>
    )
};

SelectGrapevines.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    optional: PropTypes.bool
};

export default SelectGrapevines;