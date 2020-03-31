import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {HarvestContext} from "./HarvestContext";
import HarvestService from "./service/HarvestService";
import {HarvestValidator} from "../../services/Validators";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import PageWrapper from "../../common/PageWrapper";
import {Trans} from "react-i18next";
import InputElement from "../../common/InputElement";
import SimpleInputElement from "../../common/SimpleInputElement";
import BoxList from "../box/BoxList";
import WineList from "../wine/WineList";

class HarvestInfo extends Component {

    static contextType = HarvestContext;

    updateBox = (event) => {
        this.context.actions.updateBox(event.target.name, event.target.value);
    };

    constructor(props)
    {
        super(props);

        const {match: {params: {harvestId}}} = this.props;

        const loading = harvestId;
        const error = !loading && 'NoSuchHarvestError';

        this.state = {
            loading: loading,
            error: error,
            reload: false
        }
    }

    knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    componentDidMount()
    {
        console.log('HarvestInfo::componentDidMount', this.context);

        const {match: {params: {harvestId}}} = this.props;
        this.fetchHarvest(harvestId);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {harvestId: prevHarvestId} = prevProps.match.params;
        const {harvestId} = this.props.match.params;
        const {reload} = this.state;

        if (prevHarvestId !== harvestId || reload)
        {
            console.log('HarvestInfo::componentDidUpdate');
            this.fetchHarvest(harvestId);
        }
    }

    componentWillUnmount()
    {
        this.context.actions.setHarvest(undefined);
    };

    fetchHarvest = (harvestId) => {
        console.log('HarvestInfo::fetchHarvest', this.context);

        HarvestService.get(harvestId)
                .then(this.handleHarvest)
                .catch(this.handleError);
    };

    handleHarvest = (harvest) => {
        this.context.actions.setHarvest(harvest);

        this.setState(() => ({
            loading: false,
            reload: false,
            error: !harvest && 'NoSuchHarvestError',
        }));
    };

    handleError = (res) => {
        console.log('HarvestInfo::handleError', res);

        const error = this.knownErrors[res.status];
        error && this.setState(() => ({error: error}));
        error || this.props.history.push(`/error/${res.status}`);
    };

    edit = () => {
        const {harvestId} = this.props.match.params;
        const {principal} = this.props;
        this.props.history.push(`${principal.realms[0]}/harvest/${harvestId}/`);
    };

    dispose = (e, disposeAll) => {
        const {harvest} = this.context;
        e.preventDefault();
        console.log('HarvestInfo:onSubmit', e, harvest);
        if (window.confirm("Czy jesteś pewien?") === true)
        {
            this.setState(() => ({
                loading: true,
                showErrors: !HarvestValidator.isValid(harvest)
            }));

            if (HarvestValidator.isValid(harvest))
            {
                harvest.allDisposedToWine = disposeAll;
                HarvestService.put(harvest)
                        .then(this.handleSubmit)
                        .catch(this.handleError);
            }
            else
            {
                this.setState({
                    loading: false
                })
            }
        }
    };

    onSubmit = (e) => {
        const {harvest} = this.context;
        e.preventDefault();
        console.log('HarvestInfo:onSubmit', e, harvest);
        this.setState(() => ({
            loading: true,
            showErrors: !HarvestValidator.isValid(harvest)
        }));

        if (HarvestValidator.isValid(harvest))
        {
            const action = () => (harvest.id || false ? HarvestService.put(harvest) : HarvestService.post(harvest));
            action()
                    .then(this.handleSubmit)
                    .catch(this.handleError);
        }
        else
        {
            this.setState({
                loading: false
            })
        }
    };

    handleSubmit = (harvest) => {
        console.log('HarvestInfo::handleSubmit', harvest);
        const {principal} = this.props;
        this.context.actions.setHarvest(harvest);

        this.setState(() => ({
            loading: false,
            error: !harvest && 'NoSuchHarvestError',
        }));
        this.props.history.push(`${principal.realms[0]}/harvest/${harvest.id}/info`);
    };

    loading = (harvestId) => {
        this.setState({
            reload: true
        })
    };

    render()
    {
        console.log('HarvestInfo::render', this.context);
        const {harvest} = this.context;
        const {loading, showErrors} = this.state;

        const grapevine = harvest && harvest.grapevine;
        const dateOfHarvest = harvest && harvest.dateOfHarvest;
        const weightOfGrapes = harvest && harvest.weightOfGrapes;
        const amountOfMust = harvest && harvest.amountOfMust;
        const amountOfWaste = harvest && harvest.amountOfWaste;
        const weightOfEveryEmptyBox = harvest && harvest.weightOfEveryEmptyBox;
        const allDisposedToWine = harvest && harvest.allDisposedToWine;
        const harvestId = harvest && harvest.id;

        return (
                <>
                    <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'} loading={loading}>
                        <div className="card card-default">
                            <div className="card-header">
                                <div className="card-title">Info
                                    - {grapevine && grapevine.name + " - " + dateOfHarvest}</div>
                            </div>
                            {
                                !allDisposedToWine && [
                                    <div className="card-body bb text-center" key={1}>
                                        <InputElement label={<Trans i18nKey="harvest.WEIGHT_OF_EMPTY_BOX"/>}
                                                      type={'number'}
                                                      name={'weightOfEmptyBox'}
                                                      maxSize={'100'}
                                                      onChange={this.updateBox}
                                                      defaultValue={weightOfEveryEmptyBox}
                                                      showErrors={showErrors}
                                        />
                                    </div>,
                                    <div className="card-body bb text-center" key={2}>
                                        <Card outline color="success" className="mb-3" style={{
                                            width: '70%',
                                            minWidth: '300px',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}>
                                            <CardHeader className="text-white bg-success">Dodaj skrzynkę z
                                                winogronami</CardHeader>
                                            <CardBody>
                                                <SimpleInputElement
                                                        type='number'
                                                        name='weightOfFullBox'
                                                        maxSize='100'
                                                        onChange={this.updateBox}
                                                        disabled={allDisposedToWine}
                                                        showErrors={showErrors}
                                                        autoFocus={true}
                                                        onKeyPress={(e) => e.key === 'Enter' && this.onSubmit(e)}
                                                />
                                                <Button color="success" disabled={allDisposedToWine}
                                                        className="btn-square"
                                                        style={{width: '100%'}} onClick={this.onSubmit}>Dodaj
                                                    skrzynkę</Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ]
                            }
                            <div className="card-body bb">
                                <div className="row text-center">
                                    <div className="col-4">
                                        <p className="text-bold"><Trans i18nKey="harvest.WEIGHT_OF_GRAPES"/></p>
                                        <div className="h3 m-0">{weightOfGrapes || '0'} kg</div>
                                    </div>
                                    <div className="col-4">
                                        <p className="text-bold"><Trans i18nKey="harvest.AMOUNT_OF_MUST"/></p>
                                        <div className="h3 m-0">{amountOfMust || '0'} l</div>
                                    </div>
                                    <div className="col-4">
                                        <p className="text-bold"><Trans i18nKey="harvest.AMOUNT_OF_WASTE"/></p>
                                        <div className="h3 m-0">{amountOfWaste || '0'} kg</div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button type="button" className="btn btn-secondary btn-oval" onClick={this.edit}>Edytuj
                                    zbiór
                                </button>
                            </div>
                            <div className="card-footer bg-warning text-center">
                                <button type="button" disabled={allDisposedToWine}
                                        className="btn btn-secondary btn-oval"
                                        onClick={(e) => this.dispose(e, true)}>{allDisposedToWine ? "Zbiór zamknięty i rozdysponowany" : "Zamknij zbiór i oznacz jako rozdysponowany"}</button>
                                {allDisposedToWine &&
                                <div style={{paddingTop: "5px"}}><span style={{cursor: "pointer"}}
                                                                       onClick={(e) => this.dispose(e, false)}>Cofnij zamknięcie</span>
                                </div>
                                }
                            </div>
                        </div>
                        {harvestId && <BoxList harvest={harvest} harvestId={harvestId} loading={this.loading}/>}
                        {harvestId && <WineList harvest={harvest} harvestId={harvestId} wrapperDisabled={true}/>}
                    </PageWrapper>
                </>
        )
    }
}

export default withRouter(HarvestInfo);