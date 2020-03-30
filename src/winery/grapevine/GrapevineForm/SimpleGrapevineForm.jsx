import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleSelect from "../../../common/SimpleSelect";
import SelectParcels from "./SelectParcels";

const SimpleGrapevineForm = ({grapevine, loading, updateGrapevine, updateParcelsInGrapevine, onSubmit, showErrors}) => {

    const name = grapevine && grapevine.name;
    const numberOfPlants = grapevine && grapevine.numberOfPlants;
    const area = grapevine && grapevine.area;
    const yearOfPlanting = grapevine && grapevine.yearOfPlanting;
    const grapeColor = grapevine && grapevine.grapeColor;
    const parcels = grapevine && grapevine.parcels;

    return (
            <>
                <PageWrapper title={"grapevine.TITLE"} subtitle={'grapevine.LIST'} loading={loading}>
                    <Card className="card-default">
                        <CardHeader> {grapevine && grapevine.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                                <Trans i18nKey="sidebar.nav.element.ADD_NEW"/>}
                        </CardHeader>
                        <CardBody>
                            <InputElement label={<Trans i18nKey="grapevine.NAME"/>}
                                          type={'text'}
                                          name={'name'}
                                          maxSize={'100'}
                                          onChange={updateGrapevine}
                                          defaultValue={name}
                                          showErrors={showErrors}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.NUMBER_OF_PLANTS"/>}
                                          type={'number'}
                                          name={'numberOfPlants'}
                                          maxSize={'100'}
                                          onChange={updateGrapevine}
                                          defaultValue={numberOfPlants}
                                          showErrors={showErrors}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.AREA"/>}
                                          type={'number'}
                                          name={'area'}
                                          maxSize={'100'}
                                          onChange={updateGrapevine}
                                          defaultValue={area}
                                          showErrors={showErrors}
                            />
                            <InputElement label={<Trans i18nKey="grapevine.YEAR_OF_PLANTING"/>}
                                          type={'date'}
                                          name={'yearOfPlanting'}
                                          maxSize={'100'}
                                          onChange={updateGrapevine}
                                          defaultValue={yearOfPlanting}
                                          showErrors={showErrors}
                            />
                            <SimpleSelect label={<Trans i18nKey="grapevine.GRAPE_COLOR"/>}
                                          name={"grapeColor"}
                                          onChange={updateGrapevine}
                                          value={grapeColor}
                                          options={[{value: "WHITE", text: "Białe"},
                                              {value: "RED", text: "Czerwone"}]}
                                          showErrors={showErrors}
                            />
                            <SelectParcels value={parcels}
                                           name={'parcels'}
                                           label={'Działki'}
                                           onChange={updateParcelsInGrapevine}/>
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="primary" className="btn-square" onClick={onSubmit}>
                                {grapevine && grapevine.id ? <Trans i18nKey="common.SAVE"/> :
                                        <Trans i18nKey="common.ADD"/>}
                            </Button>
                        </CardFooter>
                    </Card>
                </PageWrapper>
            </>
    )
};

export default SimpleGrapevineForm;