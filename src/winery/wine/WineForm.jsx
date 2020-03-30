import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {WineContext} from "./WineContext";
import WineService from "./service/WineService";
import {WineValidator} from "../../services/Validators";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import PageWrapper from "../../common/PageWrapper";
import InputElement from "../../common/InputElement";
import {Trans} from "react-i18next";
import Harvests from "./Harvests";

class WineForm extends Component {

    static contextType = WineContext;

    updateWine = (event) => {
        this.context.actions.updateWine(event.target.name, event.target.value);
    };

    updateHarvestInWine = (value) => {
        const harvest = {id: value.value, label: value.label};
        this.context.actions.updateWine('harvest', harvest);
    };

    constructor(props)
    {
        super(props);

        const {match: {params: wineId}} = this.props;

        const loading = wineId;
        const error = !loading && 'NoSuchWineError';

        this.state = {
            loading: loading,
            error: error
        }
    }

    knownErrors = {
        404: 'NoSuchAgreementError',
        401: 'UnauthorizedError',
        403: 'ForbiddenError',
    };

    componentDidMount()
    {
        console.log('WineForm::componentDidMount', this.context);

        const {wineId} = this.props.match.params;
        this.fetchWine(wineId);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {wineId: prevWineId} = prevProps.match.params;
        const {wineId} = this.props.match.params;

        if (prevWineId !== wineId)
        {
            console.log('WineForm::componentDidUpdate');
            this.fetchWine(wineId);
        }
    }

    componentWillUnmount()
    {
        this.context.actions.setWine(undefined);
    };

    fetchWine = (wineId) => {
        console.log('WineForm::fetchWine', this.context);

        WineService.get(wineId)
                .then(this.handleWine)
                .catch(this.handleError);
    };

    handleWine = (wine) => {
        this.context.actions.setWine(wine);

        this.setState(() => ({
            loading: false,
            error: !wine && 'NoSuchWineError',
        }));
    };

    handleError = (res) => {
        console.log('WineForm::handleError', res);

        const error = this.knownErrors[res.status];
        error && this.setState(() => ({error: error}));
        error || this.props.history.push(`/error/${res.status}`);
    };

    onSubmit = (e) =>
    {
        const {wine} = this.context;
        e.preventDefault();
        console.log('WineForm:onSubmit', e, wine);
        this.setState(() => ({
            loading: true,
            showErrors: !WineValidator.isValid(wine)
        }));

        if (WineValidator.isValid(wine))
        {
            const action = () => (wine.id || false ? WineService.put(wine) : WineService.post(wine));
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

    handleSubmit = (wine) => {
        console.log('WineForm::handleSubmit', wine);
        const {principal} = this.props;
        this.context.actions.setWine(wine);

        this.setState(() => ({
            loading: false,
            error: !wine && 'NoSuchWineError',
        }));
        this.props.history.push(`${principal.realms[0]}/wine/all`);
    };

    render()
    {
        console.log('WineForm::render', this.context);
        const {wine} = this.context;
        const {loading, showErrors} = this.state;

        const harvest = wine && wine.harvest;
        const harvestId = harvest && harvest.id;
        const name = wine && wine.name;
        const startDate = wine && wine.startDate;
        const tankNumber = wine && wine.tankNumber;
        const tankCapacity = wine && wine.tankCapacity;
        const liters = wine && wine.liters;
        const allDisposedToWine = harvest && harvest.allDisposedToWine;
        const harvestName = harvest && harvest.grapevine && harvest.grapevine.name + " - " + harvest.dateOfHarvest;

        return (
                <>
                    <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'} loading={loading}>
                        <Card className="card-default">
                            <CardHeader> {wine && wine.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                                    <Trans i18nKey="sidebar.nav.element.ADD_NEW_HARVEST"/>}
                            </CardHeader>
                            <CardBody>
                                <InputElement label={<Trans i18nKey="wine.NAME"/>}
                                              type={'text'}
                                              name={'name'}
                                              onChange={this.updateWine}
                                              defaultValue={name}
                                              showErrors={showErrors}
                                />
                                <InputElement label={<Trans i18nKey="wine.DATE"/>}
                                              type={'date'}
                                              name={'startDate'}
                                              onChange={this.updateWine}
                                              defaultValue={startDate}
                                              showErrors={showErrors}
                                />
                                <InputElement label={<Trans i18nKey="wine.TANK_NUMBER"/>}
                                              type={'text'}
                                              name={'tankNumber'}
                                              maxSize={'100'}
                                              onChange={this.updateWine}
                                              defaultValue={tankNumber}
                                              showErrors={showErrors}
                                />
                                <InputElement label={<Trans i18nKey="wine.TANK_CAPACITY"/>}
                                              type={'number'}
                                              name={'tankCapacity'}
                                              maxSize={'100'}
                                              onChange={this.updateWine}
                                              defaultValue={tankCapacity}
                                              showErrors={showErrors}
                                />
                                <InputElement label={<Trans i18nKey="wine.LITERS"/>}
                                              type={'number'}
                                              name={'liters'}
                                              maxSize={'100'}
                                              onChange={this.updateWine}
                                              defaultValue={liters}
                                              showErrors={showErrors}
                                />

                                {
                                    allDisposedToWine ?
                                            <Harvests value={{id: harvestId, label: harvestName}}
                                                      name={'harvest'}
                                                      label={'Zbiór'}
                                                      disabled={true}
                                                      onChange={this.updateHarvestInWine}/>
                                            :
                                            <Harvests value={harvest}
                                                      name={'harvest'}
                                                      label={'Zbiór'}
                                                      onChange={this.updateHarvestInWine}/>
                                }

                            </CardBody>
                            <CardFooter className="text-center">
                                <Button color="primary" className="btn-square" onClick={this.onSubmit}>
                                    {wine && wine.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                                </Button>
                            </CardFooter>
                        </Card>
                    </PageWrapper>
                </>
        )
    }
}

export default withRouter(WineForm);