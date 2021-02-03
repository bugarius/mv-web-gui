import React, {FC} from "react";
import {FormGroup} from "reactstrap";

interface Props
{
    label?: Label;
}

interface Label
{
    text: string;
    labelColMd?: string;
    optional?: boolean;
}

export const InputElementSection: FC<Props> = ({children, label}) => {
    return (
        <fieldset>
            <FormGroup row>
                {label?.text &&
                <label className={"col-form-label col-md-" + (label?.labelColMd || "2")}>{label?.text}
                    <span className="text-danger" style={{display: label?.optional === true ? 'none' : ''}}> *</span>
                </label>
                }
                {children}
            </FormGroup>
        </fieldset>
    )
};