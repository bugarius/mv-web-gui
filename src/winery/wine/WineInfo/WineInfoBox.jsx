import React, {useContext} from 'react';
import {Card, CardBody, CardFooter, CardHeader, Table} from "reactstrap";
import ProgressBar from "../../../common/charts/ProgressBar";
import SmallTextBadge from "../../../common/badges/SmallTextBadge";
import CommonRow from "../../../common/table/CommonRow";
import {WineContext} from "../WineContext";

const WineInfoBox = ({actions: {edit}}) => {

    const {wine} = useContext(WineContext);
    const {tankCapacity, liters, tankNumber, name, startDate, ingredients} = wine;
    const percent = Math.floor(liters * 100 / tankCapacity);

    return (<Card className="b">
                <CardHeader>
                    <SmallTextBadge title={'wystartowany'} color={'success'}/>
                    <h4 className="m-0">Zbiornik nr {tankNumber}</h4>
                    <small className="text-muted">{name}</small>
                </CardHeader>
                <CardBody>
                    <ProgressBar percent={percent} color={'info'} title={'Zapełnienie zbiornika'}/>
                </CardBody>
                <Table>
                    <tbody>
                    <CommonRow label={'Data rozpoczęscia'} value={startDate}/>
                    <CommonRow label={'Litry aktualnie'} value={liters}/>
                    <CommonRow label={'Ostatnio dodany składnik'} value={ingredients && ingredients.length > 0 ? ingredients[ingredients.length - 1].name : "Brak"}/>
                    </tbody>
                </Table>
                <CardFooter className="text-center">
                    <button className="btn btn-secondary" type="button" onClick={edit}>Edytuj</button>
                </CardFooter>
            </Card>
    );
};

export default WineInfoBox;