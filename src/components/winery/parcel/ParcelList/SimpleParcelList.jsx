import React from 'react';
import {Card, CardBody, CardHeader, Table} from "reactstrap";
import PageWrapper from "../../../common/PageWrapper";
import {Trans, useTranslation} from "react-i18next";
import ListActions from "../../../common/ListActions";
import Pagination from "../../../common/pagination/Pagination";
import {useParams} from "react-router-dom";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

const thead = [
    <th style={{textAlign: 'center'}} key={1}>#</th>,
    <th style={{textAlign: 'center'}} key={2}><Trans i18nKey="parcel.REGISTRATION_NUMBER"/></th>,
    <th style={{textAlign: 'center'}} key={3}><Trans i18nKey="parcel.AREA"/></th>,
    <th style={{textAlign: 'center'}} key={4}><Trans i18nKey="parcel.COUNTRY"/></th>,
    <th style={{textAlign: 'center'}} key={5}><Trans i18nKey="parcel.CITY"/></th>,
    <th style={{textAlign: 'center'}} key={6}><Trans i18nKey="parcel.DISTRICT"/></th>,
    <th style={{textAlign: 'center'}} key={7}><Trans i18nKey="parcel.ZIP_CODE"/></th>,
    <th style={{textAlign: 'center'}} key={8}><Trans i18nKey="common.ACTIONS"/></th>
];

const SimpleParcelList = ({
                              parcels,
                              page,
                              pagination,
                              limit,
                              loading,
                              paginationActions: {changePage, onPrev, onNext},
                              entityActions: {remove, proceed, archive, revertArchive},
                              children
                          }) => {

    const {status} = useParams();
    const {t} = useTranslation();

    const createTHead = () => {
        return <thead>
        <tr>
            {thead.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
        </thead>;
    };

    const buildRow = (parcel) => {
        const id = parcel && parcel.id;
        const registrationNumber = parcel && parcel.registrationNumber;
        const area = parcel && parcel.area;
        const country = parcel && parcel.country;
        const city = parcel && parcel.city;
        const district = parcel && parcel.district;
        const zipCode = parcel && parcel.zipCode;
        const fields = [
            <td style={{textAlign: 'center'}} key={1}>{id}</td>,
            <td style={{textAlign: 'center'}} key={2}>{registrationNumber}</td>,
            <td style={{textAlign: 'center'}} key={3}>{area}</td>,
            <td style={{textAlign: 'center'}} key={4}>{country}</td>,
            <td style={{textAlign: 'center'}} key={5}>{city}</td>,
            <td style={{textAlign: 'center'}} key={6}>{district}</td>,
            <td style={{textAlign: 'center'}} key={7}>{zipCode}</td>,
            <td style={{textAlign: 'center'}} key={8}>
                <ListActions entity={parcel}
                             actions={{remove: remove, proceed: proceed, archive: archive, revertArchive: revertArchive}}
                             status={status}
                />
            </td>]
        return <tr key={parcel.id}>
            {fields.filter((t, index) => index < limit || index === thead.length - 1)}
        </tr>
    };

    return (
            <PageWrapper title={"parcel.TITLE"} subtitle={'parcel.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader>{status === EntityLiveStatus.ARCHIVED.toLowerCase() ? t('parcel.list.archived.TITLE') : t('parcel.list.created.TITLE')}</CardHeader>
                    <CardBody>
                        <Table hover>
                            {
                                createTHead()
                            }
                            <tbody>
                            {(parcels || []).map((parcel) => buildRow(parcel))}
                            {
                                parcels && parcels.length === 0 &&
                                <tr>
                                    <td style={{textAlign: 'center'}} colSpan={'100%'}>
                                        <Trans i18nKey="common.NO_DATA"/>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </Table>
                        {children}
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

export default SimpleParcelList;