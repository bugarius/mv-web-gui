import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {Trans} from "react-i18next";
import {FromApiConverter} from "../../../services/Converters";
import PageWrapper from "../../../common/PageWrapper";
import ListActions from "../../../common/ListActions";
import Pagination from "../../../common/pagination/Pagination";


const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="grapevine.NAME"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="grapevine.NUMBER_OF_PLANTS"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="grapevine.AREA"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="grapevine.YEAR_OF_PLANTING"/></th>,
    <th style={{textAlign: 'center'}} key={6}><Trans i18nKey="grapevine.GRAPE_COLOR"/></th>,
    <th style={{textAlign: 'center'}} key={7}><Trans i18nKey="common.ACTIONS"/></th>
];

const SimpleGrapevineList = ({grapevines, page, pagination, limit, loading, paginationActions: {changePage, onPrev, onNext}, entityActions: {remove, proceed, info}}) => {

    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (grapevine) => {
        const id = grapevine && grapevine.id;
        const name = grapevine && grapevine.name;
        const numberOfPlants = grapevine && grapevine.numberOfPlants;
        const area = grapevine && grapevine.area;
        const yearOfPlanting = grapevine && grapevine.yearOfPlanting;
        const grapeColor = grapevine && grapevine.grapeColor;
        const fields = [<td style={{textAlign: 'center'}} key={1}>{id}</td>,
            <td style={{textAlign: 'center'}} key={2}>{name}</td>,
            <td style={{textAlign: 'center'}} key={3}>{numberOfPlants}</td>,
            <td style={{textAlign: 'center'}} key={4}>{area}</td>,
            <td style={{textAlign: 'center'}} key={5}>{yearOfPlanting}</td>,
            <td style={{textAlign: 'center'}} key={6}><Trans i18nKey={FromApiConverter.convertGrapeColor(grapeColor)}/>
            </td>,
            <td style={{textAlign: 'center'}} key={7}>
                <ListActions entity={grapevine}
                             actions={{remove: remove, proceed: proceed, info: info}}/>
            </td>]
        return <tr key={grapevine.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper title={"grapevine.TITLE"} subtitle={'grapevine.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.GRAPEVINE_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(grapevines || []).map((grapevine) => buildRow(grapevine))}
                            {
                                grapevines && grapevines.length === 0 &&
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

export default SimpleGrapevineList;