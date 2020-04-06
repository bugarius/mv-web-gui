import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleSelect from "../../../common/SimpleSelect";
import SelectParcels from "./SelectParcels";
import {useGrapevineContext} from "../GrapevineContext";
import {StatusType} from "../../../services/types/Service";

const SimpleGrapevineForm = ({updateParcelsInGrapevine, onSubmit}) => {

    const {grapevine, updateGrapevine, grapevineResult} = useGrapevineContext();

    return (
            <>
                <PageWrapper title={"grapevine.TITLE"} subtitle={'grapevine.LIST'} loading={grapevineResult.status === StatusType.loading}>
                    <Card className="card-default">
                        <CardHeader> {grapevine?.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                                <Trans i18nKey="sidebar.nav.element.ADD_NEW"/>}
                        </CardHeader>
                        <CardBody>
                            <InputElement label={<Trans i18nKey="grapevine.NAME"/>}
                                          type={'text'}
                                          name={'name'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.name}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.NUMBER_OF_PLANTS"/>}
                                          type={'number'}
                                          name={'numberOfPlants'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.numberOfPlants}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.AREA"/>}
                                          type={'number'}
                                          name={'area'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.area}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.YEAR_OF_PLANTING"/>}
                                          type={'date'}
                                          name={'yearOfPlanting'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.yearOfPlanting}
                            />
                            <SimpleSelect label={<Trans i18nKey="grapevine.GRAPE_COLOR"/>}
                                          name={"grapeColor"}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          value={grapevine?.grapeColor || ''}
                                          options={[{value: "WHITE", text: "Białe"},
                                              {value: "RED", text: "Czerwone"}]}
                            />
                            <SelectParcels value={grapevine?.parcels}
                                           name={'parcels'}
                                           label={'Działki'}
                                           onChange={updateParcelsInGrapevine}/>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="primary" className="btn-square" onClick={onSubmit}>
                                {grapevine?.id ? <Trans i18nKey="common.SAVE"/> :
                                        <Trans i18nKey="common.ADD"/>}
                            </Button>
                        </CardFooter>
                    </Card>
                </PageWrapper>
            </>
    )
};

export default SimpleGrapevineForm;