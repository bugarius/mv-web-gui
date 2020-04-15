import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import PageWrapper from "../../../common/PageWrapper";
import {Trans} from "react-i18next";
import ListActions from "../../../common/ListActions";
import Pagination from "../../../common/pagination/Pagination";

const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="harvest.DATE_OF_HARVEST"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="harvest.GRAPEVINE"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="harvest.WEIGHT_OF_GRAPES"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="harvest.AMOUNT_OF_MUST"/></th>,
    <th style={{textAlign: 'center'}} key={6}><Trans i18nKey="harvest.AMOUNT_OF_WASTE"/></th>,
    <th style={{textAlign: 'center'}} key={7}><Trans i18nKey="harvest.WEIGHT_OF_EVERY_EMPTY_BOX"/></th>,
    <th style={{textAlign: 'center'}} key={8}><Trans i18nKey="common.ACTIONS"/></th>
];

const SimpleHarvestList = ({harvests, page, pagination, limit, loading, paginationActions: {changePage, onPrev, onNext}, entityActions: {remove, proceed, info}}) => {

    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (harvest) => {
        const fields = [<td style={{textAlign: 'center'}} key={1}>{harvest?.id}</td>,
            <td style={{textAlign: 'center'}} key={2}>{harvest?.dateOfHarvest}</td>,
            <td style={{textAlign: 'center'}} key={3}>{harvest?.grapevine?.name}</td>,
            <td style={{textAlign: 'center'}} key={4}>{harvest?.weightOfGrapes || 0}</td>,
            <td style={{textAlign: 'center'}} key={5}>{harvest?.amountOfMust || 0}</td>,
            <td style={{textAlign: 'center'}} key={6}>{harvest?.amountOfWaste || 0}</td>,
            <td style={{textAlign: 'center'}} key={7}>{harvest?.weightOfEveryEmptyBox || 0}</td>,
            <td style={{textAlign: 'center'}} key={8}>
                <ListActions entity={harvest}
                             actions={{remove: remove, proceed: proceed, info: info}}/>
            </td>];
        return <tr key={harvest.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.HARVEST_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(harvests || []).map((harvest) => buildRow(harvest))}
                            {
                                harvests && harvests.length === 0 &&
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

export default SimpleHarvestList;