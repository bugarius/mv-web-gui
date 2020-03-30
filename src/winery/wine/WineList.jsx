import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import PageWrapper from "../../common/PageWrapper";
import WineService from "./service/WineService";
import {FromApiConverter} from "../../services/Converters";
import {Trans} from "react-i18next";
import ListActions from "../../common/ListActions";
import {AuthContext} from "../../platform/AuthContext";
import {withRouter} from "react-router-dom";
import Pagination from "../../common/pagination/Pagination";

const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="wine.NAME"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="wine.DATE"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="wine.TANK_NUMBER"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="wine.TANK_CAPACITY"/></th>,
    <th style={{textAlign: 'center'}} key={6}><Trans i18nKey="wine.LITERS"/></th>,
    <th style={{textAlign: 'center'}} key={7}><Trans i18nKey="common.ACTIONS"/></th>
];

class WineList extends Component {

    static contextType = AuthContext;

    constructor(props)
    {
        super(props);
        this.state = {
            wines: [],
            pagination: {},
            page: 0,
            loading: true,
            height: window.innerHeight,
            width: window.innerWidth,
            limit: this.setLimit()
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount()
    {
        const {page} = this.state;
        const {harvestId} = this.props;
        console.log('WineList::componentDidMount');
        window.addEventListener("resize", this.updateDimensions);
        harvestId ?

            WineService.getListByHarvestId(harvestId, page)
                    .then((result) => this.setState(
                            {
                                pagination: result,
                                loading: false,
                                wines: FromApiConverter.convertWineList(result.content)
                            }))
                    .catch(this.handleError)
      :
            WineService.getList(page)
                    .then((result) => this.setState(
                            {
                                pagination: result,
                                loading: false,
                                wines: FromApiConverter.convertWineList(result.content)
                            }))
                    .catch(this.handleError);

    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            limit: this.setLimit()
        });
    }

    setLimit = () =>
    {
        const limit = window.innerWidth / 150 - 2.5;

        return limit > 2 ? limit : 3;
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    remove = (wine) => {
        const {page, pagination} = this.state;
        const harvest = wine && wine.harvest;

        let fixLastInPage = 0;
        if (window.confirm("Czy jesteś pewien?") === true)
        {
            this.setState({loading: true});
            if (pagination.numberOfElements === 1 && page > 0)
            {
                fixLastInPage = 1;
                this.setState({page: page - 1});
            }

            WineService.delete(wine, harvest, page - fixLastInPage)
                    .then((result) => this.setState(
                            {pagination: result,
                                loading: false,
                                wines: FromApiConverter.convertWineList(result.content)}))
                    .catch(this.handleError);
        }
    };

    handleError = () => {
        this.setState(() => ({
            loading: false
        }));
        this.props.history.push(`/error`);
    };

    proceed = (wine) => {
        const {principal} = this.context;

        this.props.history.push(`${principal.realms[0]}/wine/${wine.id}/`);
    };

    info = (wine) => {
        const {principal} = this.context;

        this.props.history.push(`${principal.realms[0]}/wine/${wine.id}/info`);
    };

    addWine = () => {
        const {principal} = this.context;

        this.props.history.push(`${principal.realms[0]}/wine/0`);
    };

    changePage = (e) =>
    {
        e.preventDefault();

        this.setState({page: e.target.name - 1});
        WineService.getList(e.target.name - 1)
                .then((result) => this.setState(
                        {pagination: result,
                            loading: false,
                            wines: FromApiConverter.convertWineList(result.content)}))
                .catch(this.handleError);
    };

    onNext = (e) =>
    {
        e.preventDefault();
        WineService.getList(this.state.page + 1)
                .then((result) => this.setState(
                        {pagination: result,
                            page: this.state.page + 1,
                            loading: false,
                            wines: FromApiConverter.convertWineList(result.content)}))
                .catch(this.handleError);
    };

    onPrev = (e) =>
    {
        e.preventDefault();
        WineService.getList(this.state.page - 1)
                .then((result) => this.setState(
                        {pagination: result,
                            page: this.state.page - 1,
                            loading: false,
                            wines: FromApiConverter.convertWineList(result.content)}))
                .catch(this.handleError);
    };

    createTHead = () =>
    {
        const {limit} = this.state;
        return <thead>
            <tr>
                {thead.filter((t, index) => index < limit || index === thead.length - 1)}
            </tr>
        </thead>;
    };

    buildRow = (wine) => {
        const {limit} = this.state;
        const id = wine && wine.id;
        const name = wine && wine.name;
        const startDate = wine && wine.startDate;
        const tankNumber = wine && wine.tankNumber;
        const tankCapacity = wine && wine.tankCapacity;
        const liters = wine && wine.liters;
        const fields = [<td style={{textAlign: 'center'}} key={1}>{id}</td>,
                        <td style={{textAlign: 'center'}} key={2}>{name}</td>,
                        <td style={{textAlign: 'center'}} key={3}>{startDate}</td>,
                        <td style={{textAlign: 'center'}} key={4}>{tankNumber}</td>,
                        <td style={{textAlign: 'center'}} key={5}>{tankCapacity}</td>,
                        <td style={{textAlign: 'center'}} key={6}>{liters}</td>,
                        <td style={{textAlign: 'center'}} key={7}>
                        <ListActions entity={wine}
                        actions={{remove: this.remove, proceed: this.proceed, info: this.info}}/>
                        </td>]
        return <tr key={wine.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
            </tr>
    };

    render()
    {
        const { wines, page, pagination } = this.state;
        const { wrapperDisabled, harvest } = this.props;

        const allDisposedToWine = harvest && harvest.allDisposedToWine;
//TODO: zrobić uniwersalny komponent do list
        return (
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'} loading={this.state.loading} disabled={wrapperDisabled}>
                    <Card className="card-default">
                        <CardHeader><Trans i18nKey="sidebar.nav.element.WINE_LIST"/></CardHeader>
                        <CardBody>
                            <Table hover>
                                {
                                    this.createTHead()
                                }
                                <tbody>
                                {(wines || []).map((wine) => this.buildRow(wine))}
                                {
                                    wines && wines.length === 0 &&
                                    <tr>
                                        <td style={{textAlign: 'center'}} colSpan={'100%'}>
                                            <Trans i18nKey="common.NO_DATA"/>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </Table>
                            {
                                (pagination.totalPages > 1) && <Pagination
                                        page={page}
                                        pagination={pagination}
                                        actions={{
                                            changePage: this.changePage,
                                            prev: this.onPrev,
                                            next: this.onNext
                                        }}/>
                            }
                        </CardBody>
                            <div className="card-footer bg-info text-center">
                                <button type="button" disabled={allDisposedToWine} className="btn btn-secondary btn-oval" onClick={this.addWine}>Dodaj nastaw</button>
                            </div>
                    </Card>
                </PageWrapper>
        );
    }
}

export default withRouter(WineList);