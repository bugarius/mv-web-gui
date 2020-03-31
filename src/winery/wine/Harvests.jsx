import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {FormGroup} from "reactstrap";
import Select from "react-select";
import HarvestService from "../harvest/service/HarvestService";

class Harvests extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            options: []
        }
    }

    componentDidMount()
    {
        HarvestService.getAll()
                .then(this.handleHarvests)
                .catch(this.handleError);
    }

    handleHarvests = (harvests) => {
        console.log('HarvestForm:handleHarvests ', harvests);
        const options = harvests
                .filter(h => !h.allDisposedToWine)
                .map((p) => ({value: p.id, label: p.grapevine.name + " - " + p.dateOfHarvest}));

        this.setState({harvests: options, loading: false})
    };

    handleError = (res) => {
        console.log('Harvests::handleError', res);

        const error = this.knownErrors[res.status];
        error && this.setState(() => ({error: error}));
        error || this.props.history.push(`/error/${res.status}`);
    };

    render()
    {
        const {value: selected, onChange, name, label, optional, disabled} = this.props;
        const {harvests} = this.state;

        const value = selected && selected.id ?
                {value: selected.id, label: (selected.label || false ? selected.label : selected.name)}
                : {value: "", label: "Wybierz"};

        return (
                <>
                    <fieldset>
                        <FormGroup row>
                            <label className="col-md-2 col-form-label" htmlFor={name}>{label}
                                <span className="text-danger"
                                      style={{display: optional === true ? 'none' : ''}}> *</span>
                            </label>
                            <div className="col-md-10">
                                <Select name={name}
                                        options={harvests}
                                        onChange={onChange}
                                        value={value || ""}
                                        isDisabled={disabled}
                                        placeholder={"Wybierz"}/>
                                <span className="invalid-feedback">Field is required</span>
                            </div>
                        </FormGroup>
                    </fieldset>
                </>
        )
    }
}

export default withRouter(Harvests);