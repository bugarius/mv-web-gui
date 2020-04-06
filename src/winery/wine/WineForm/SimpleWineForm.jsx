import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {StatusType} from "../../../services/types/Service";
import {useWineContext} from "../WineContext";
import SelectHarvest from "./SelectHarvest";

const SimpleWineForm = ({updateHarvestInWine, onSubmit}) => {

    const {wine, updateWine, wineResult} = useWineContext();
console.log(wine)
    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'}
                             loading={wineResult.status === StatusType.loading}>
                    <Card className="card-default">
                        <CardHeader> {wine?.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                                <Trans i18nKey="sidebar.nav.element.ADD_NEW_HARVEST"/>}
                        </CardHeader>
                        <CardBody>
                            <InputElement label={<Trans i18nKey="wine.NAME"/>}
                                          type={'text'}
                                          name={'name'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.name}
                            />
                            <InputElement label={<Trans i18nKey="wine.DATE"/>}
                                          type={'date'}
                                          name={'startDate'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.startDate}
                            />
                            <InputElement label={<Trans i18nKey="wine.TANK_NUMBER"/>}
                                          type={'text'}
                                          name={'tankNumber'}
                                          maxSize={'100'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.tankNumber}
                            />
                            <InputElement label={<Trans i18nKey="wine.TANK_CAPACITY"/>}
                                          type={'number'}
                                          name={'tankCapacity'}
                                          maxSize={'100'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.tankCapacity}
                            />
                            <InputElement label={<Trans i18nKey="wine.LITERS"/>}
                                          type={'number'}
                                          name={'liters'}
                                          maxSize={'100'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.liters}
                            />
                            <SelectHarvest value={wine?.harvest}
                                           name={'harvest'}
                                           label={'Zbiór'}
                                           disabled={wine?.harvest?.allDisposedToWine}
                                           onChange={updateHarvestInWine}
                            />


                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="primary" className="btn-square" onClick={onSubmit}>
                                {wine?.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                            </Button>
                        </CardFooter>
                    </Card>
                </PageWrapper>
            </>
    )
};

export default SimpleWineForm;