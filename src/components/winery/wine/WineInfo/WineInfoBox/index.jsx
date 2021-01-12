import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Table} from "reactstrap";
import ProgressBar from "../../../../common/charts/ProgressBar";
import SmallTextBadge from "../../../../common/badges/SmallTextBadge";
import CommonRow from "../../../../common/table/CommonRow";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../../common/PageWrapper";

const WineInfoBox = ({button: {action, label}, wine, loading}) => {

    const {t} = useTranslation();

    return (
            <PageWrapper loading={loading} disabled>
                <Card className="b">
                    <CardHeader>
                        <SmallTextBadge title={wine?.status && t(`wine.status.${wine?.status}`)} color={'success'}/>
                        <h4 className="m-0">Zbiornik nr {wine?.tank?.number}</h4>
                        <small className="text-muted">{wine?.name}</small>
                    </CardHeader>
                    <CardBody>
                        <ProgressBar percent={wine?.tank?.percentOfUsage} color={'info'} title={'Zapełnienie zbiornika'}/>
                    </CardBody>
                    <Table>
                        <tbody>
                        <CommonRow label={'Data rozpoczęscia'} value={wine?.startDate}/>
                        <CommonRow label={'Litry aktualnie'} value={wine?.liters}/>
                        <CommonRow label={'Ostatni dodany składnik'}
                                   value={wine?.ingredients && wine?.ingredients.length > 0 ? wine?.ingredients[wine?.ingredients.length - 1].name : "Brak"}/>
                        <CommonRow label={'Ostatni proces'} value={t(`event.type.${wine?.lastEvent?.type}`)}/>
                        </tbody>
                    </Table>
                    <CardFooter className="text-center">
                        <button className="btn btn-secondary" type="button" onClick={action}>{label}</button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    );
};

export default WineInfoBox;