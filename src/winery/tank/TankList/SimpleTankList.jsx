import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import PageWrapper from "../../../common/PageWrapper";
import {Trans} from "react-i18next";
import ListActions from "../../../common/ListActions";
import Pagination from "../../../common/pagination/Pagination";
import ProgressBar from "../../../common/charts/ProgressBar";

const thead = [
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="tank.NUMBER"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="tank.CAPACITY"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="tank.LITERS"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="tank.PERCENT_OF_USAGE"/></th>,
];

const SimpleTankList = ({tanks, page, pagination, limit, loading, paginationActions: {changePage, onPrev, onNext}, entityActions: {remove, proceed, info}}) => {

    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (tank) => {
        const fields = [
            <td style={{textAlign: 'center'}} key={2}>{tank?.number}</td>,
            <td style={{textAlign: 'center'}} key={3}>{tank?.capacity}</td>,
            <td style={{textAlign: 'center'}} key={4}>{tank?.liters}</td>,
            <td style={{textAlign: 'center'}} key={5}><ProgressBar percent={tank?.percentOfUsage} color={'info'} /></td>,
            <td style={{textAlign: 'center'}} key={8}>
                <ListActions entity={tank}
                             actions={{remove: remove, proceed: proceed, info: info}}/>
            </td>]
        return <tr key={tank.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper title={"tank.TITLE"} subtitle={'tank.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.TANKS_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(tanks || []).map((tank) => buildRow(tank))}
                            {
                                tanks && tanks.length === 0 &&
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
                                        changePage: changePage,
                                        prev: onPrev,
                                        next: onNext
                                    }}/>
                        }
                    </CardBody>
                </Card>
            </PageWrapper>
    );
};

export default SimpleTankList;