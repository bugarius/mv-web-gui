import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import BoxService from "./service/BoxService";
import {FromApiConverter} from "../../services/Converters";
import {Trans} from "react-i18next";
import {AuthContext} from "../../platform/AuthContext";
import {withRouter} from "react-router";
import Pagination from "../../common/pagination/Pagination";

class BoxList extends Component {

    static contextType = AuthContext;

    constructor(props)
    {
        super(props);
        this.state = {
            boxes: [],
            pagination: {},
            page: 0,
            loading: true,
        };
    }

    componentDidMount()
    {
        const {page} = this.state;
        const {harvestId} = this.props;
        console.log('BoxList::componentDidMount');

        BoxService.getList(page, harvestId)
                .then((result) => this.setState(
                        {pagination: result,
                            loading: false,
                            boxes: FromApiConverter.convertBoxList(result.content)}))
                .catch(this.handleError);
    }

    remove = (box) => {
        const {page, pagination} = this.state;
        const {harvestId, loading} = this.props;
        let fixLastInPage = 0;
        if (window.confirm("Czy jesteś pewien?") === true)
        {
            this.setState({loading: true});
            if (pagination.numberOfElements === 1 && page > 0)
            {
                fixLastInPage = 1;
                this.setState({page: page - 1});
            }

            BoxService.delete(box, harvestId, page - fixLastInPage)
                    .then((result) => this.setState(
                            {pagination: result,
                                loading: false,
                                boxes: FromApiConverter.convertBoxList(result.content)}))
                    .catch(this.handleError);
            loading(harvestId);
        }
    };

    handleError = () => {
        this.setState(() => ({
            loading: false
        }));
        this.props.history.push(`/error`);
    };

    proceed = (box) => {
        const {principal} = this.context;

        this.props.history.push(`${principal.realms[0]}/box/${box.id}/`);
    };

    info = (box) => {
        const {principal} = this.context;

        this.props.history.push(`${principal.realms[0]}/box/${box.id}/info`);
    };

    changePage = (e) =>
    {
        e.preventDefault();
        const {harvestId} = this.props;
        this.setState({page: e.target.name - 1});
        BoxService.getList(e.target.name - 1, harvestId)
                .then((result) => this.setState(
                        {pagination: result,
                            loading: false,
                            boxes: FromApiConverter.convertBoxList(result.content)}))
                .catch(this.handleError);
    };

    onNext = (e) =>
    {
        const {harvestId} = this.props;
        e.preventDefault();
        BoxService.getList(this.state.page + 1, harvestId)
                .then((result) => this.setState(
                        {pagination: result,
                            page: this.state.page + 1,
                            loading: false,
                            boxes: FromApiConverter.convertBoxList(result.content)}))
                .catch(this.handleError);
    };

    onPrev = (e) =>
    {
        const {harvestId} = this.props;
        e.preventDefault();
        BoxService.getList(this.state.page - 1, harvestId)
                .then((result) => this.setState(
                        {pagination: result,
                            page: this.state.page - 1,
                            loading: false,
                            boxes: FromApiConverter.convertBoxList(result.content)}))
                .catch(this.handleError);
    };

    createTHead = () =>
    {
        return <thead>
            <tr>
                <th>#</th>
                <th><Trans i18nKey="box.WEIGHT_OF_EMPTY_BOX"/></th>
                <th><Trans i18nKey="box.WEIGHT_OF_FULL_BOX"/></th>
                <th><Trans i18nKey="box.WEIGHT_OF_GRAPES_IN_BOX"/></th>
                <th><Trans i18nKey="common.ACTIONS"/></th>
            </tr>
        </thead>;
    };

    buildRow = (box, index) => {
        const { page } = this.state;
        const {harvest} = this.props;
        const weightOfEmptyBox = box && box.weightOfEmptyBox;
        const weightOfFullBox = box && box.weightOfFullBox;
        const length = harvest && harvest.boxesCount;
        const allDisposedToWine = harvest && harvest.allDisposedToWine;

        return <tr key={length - index}>
                <td style={{padding: '5px'}}>{length - (page * 10) - index}</td>
                <td style={{padding: '5px'}}>{weightOfEmptyBox || 0}</td>
                <td style={{padding: '5px'}}>{weightOfFullBox}</td>
                <td style={{padding: '5px'}}>{Math.round((weightOfFullBox - weightOfEmptyBox) * 100) / 100}</td>
                <td style={{padding: '5px'}}>
                    {
                        !allDisposedToWine ?
                        <div className="card-body d-flex align-items-center" onClick={() => this.remove(box)}
                             style={{cursor: 'pointer'}}>
                            <em className="fa-2x mr-2 far fa-trash-alt"/>
                        </div> :
                        <div className="card-body d-flex align-items-center">
                        <em className="fa-2x mr-2 fas fa-ban"/>
                        </div>
                    }
                </td>
            </tr>
    };

    render()
    {
        const { boxes, loading, pagination, page } = this.state;
        return (
                <div className={loading ? "whirl oval right" : ""}>
                    <Card className="card-default">
                        <CardHeader><Trans i18nKey="sidebar.nav.element.BOX_LIST"/></CardHeader>
                        <CardBody>
                            <table className="table table-striped my-4 w-100">
                                {
                                    this.createTHead()
                                }
                                <tbody>
                                {(boxes || []).map((box, index) => this.buildRow(box, index))}
                                {
                                    boxes && boxes.length === 0 &&
                                    <tr>
                                        <td style={{textAlign: 'center'}} colSpan={'100%'}>
                                            <Trans i18nKey="common.NO_DATA"/>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>
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
                    </Card>
                </div>
        );
    }
}

export default withRouter(BoxList);