import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import {Trans} from "react-i18next";
import Pagination from "../../../common/pagination/Pagination";
import {useHarvestContext} from "../../harvest/HarvestContext";
import PageWrapper from "../../../common/PageWrapper";

const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="box.WEIGHT_OF_EMPTY_BOX"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="box.WEIGHT_OF_FULL_BOX"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="box.WEIGHT_OF_GRAPES_IN_BOX"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="common.ACTIONS"/></th>
];

const SimpleBoxList = ({
                           boxes,
                           page,
                           pagination,
                           limit,
                           loading,
                           paginationActions: {changePage, onPrev, onNext},
                           entityActions: {remove},
                           reloadHarvest
                       }) => {

    const {harvest} = useHarvestContext();
    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (box) => {
        const fields = [<td style={{padding: '5px', textAlign: 'center'}} key={1}>sdf</td>,
            <td style={{padding: '5px', textAlign: 'center'}} key={2}>{box?.weightOfEmptyBox || 0}</td>,
            <td style={{padding: '5px', textAlign: 'center'}} key={3}>{box?.weightOfFullBox}</td>,
            <td style={{padding: '5px', textAlign: 'center'}}
                key={4}>{Math.round((box?.weightOfFullBox - box?.weightOfEmptyBox) * 100) / 100}</td>,
            <td style={{padding: '5px', textAlign: 'center'}} key={5}>
                {
                    !harvest?.allDisposedToWine ?
                            <div className="card-body d-flex align-items-center" onClick={() => {
                                remove(box);
                                reloadHarvest();
                            }}
                                 style={{cursor: 'pointer'}}>
                                <em className="fa-2x mr-2 far fa-trash-alt"/>
                            </div> :
                            <div className="card-body d-flex align-items-center">
                                <em className="fa-2x mr-2 fas fa-ban"/>
                            </div>
                }
            </td>];
        return <tr key={box.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper loading={loading}>
                <Card className="card-default">
                    <CardHeader><Trans i18nKey="sidebar.nav.element.BOX_LIST"/></CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(boxes || []).map((harvest) => buildRow(harvest))}
                            {
                                boxes && boxes.length === 0 &&
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

export default SimpleBoxList;