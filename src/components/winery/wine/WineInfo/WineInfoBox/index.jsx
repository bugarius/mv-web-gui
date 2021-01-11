import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Table} from "reactstrap";
import ProgressBar from "../../../../common/charts/ProgressBar";
import SmallTextBadge from "../../../../common/badges/SmallTextBadge";
import CommonRow from "../../../../common/table/CommonRow";
import {useWineContext} from "../../WineContext";
import * as PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../../common/PageWrapper";

const WineInfoBox = ({actions: {editWine}}) => {

    const {wine, loading} = useWineContext();
    const {t} = useTranslation();

    const {liters, name, startDate, ingredients, tank} = wine;

    return (
            <PageWrapper loading={loading} disabled>
                <Card className="b">
                    <CardHeader>
                        <SmallTextBadge title={wine?.status && t(`wine.status.${wine?.status}`)} color={'success'}/>
                        <h4 className="m-0">Zbiornik nr {tank?.number}</h4>
                        <small className="text-muted">{name}</small>
                    </CardHeader>
                    <CardBody>
                        <ProgressBar percent={tank?.percentOfUsage} color={'info'} title={'Zapełnienie zbiornika'}/>
                    </CardBody>
                    <Table>
                        <tbody>
                        <CommonRow label={'Data rozpoczęscia'} value={startDate}/>
                        <CommonRow label={'Litry aktualnie'} value={liters}/>
                        <CommonRow label={'Ostatnio dodany składnik'}
                                   value={ingredients && ingredients.length > 0 ? ingredients[ingredients.length - 1].name : "Brak"}/>
                        </tbody>
                    </Table>
                    <CardFooter className="text-center">
                        <button className="btn btn-secondary" type="button" onClick={editWine}>Edytuj</button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    );
};

WineInfoBox.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default WineInfoBox;