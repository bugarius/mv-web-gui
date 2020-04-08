import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {Trans} from "react-i18next";
import Pagination from "../../../common/pagination/Pagination";
import ListActions from "../../../common/ListActions";
import PageWrapper from "../../../common/PageWrapper";

const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="wine.NAME"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="wine.DATE"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="wine.TANK_NUMBER"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="wine.TANK_CAPACITY"/></th>,
    <th style={{textAlign: 'center'}} key={6}><Trans i18nKey="wine.LITERS"/></th>,
    <th style={{textAlign: 'center'}} key={7}><Trans i18nKey="common.ACTIONS"/></th>
];

const SimpleWineList = ({wines, page, pagination, limit, loading, paginationActions: {changePage, onPrev, onNext}, entityActions: {remove, proceed, info}, wrapperDisabled}) => {

    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (wine) => {
        const fields = [<td style={{textAlign: 'center'}} key={1}>{wine?.id}</td>,
            <td style={{textAlign: 'center'}} key={2}>{wine?.name}</td>,
            <td style={{textAlign: 'center'}} key={3}>{wine?.startDate}</td>,
            <td style={{textAlign: 'center'}} key={4}>{wine?.tankNumber}</td>,
            <td style={{textAlign: 'center'}} key={5}>{wine?.tankCapacity}</td>,
            <td style={{textAlign: 'center'}} key={6}>{wine?.liters}</td>,
            <td style={{textAlign: 'center'}} key={7}>
                <ListActions entity={wine}
                             actions={{remove: remove, proceed: proceed, info: info}}/>
            </td>];
        return <tr key={wine.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'} loading={loading}
                         disabled={wrapperDisabled}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.WINE_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(wines || []).map((harvest) => buildRow(harvest))}
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

export default SimpleWineList;