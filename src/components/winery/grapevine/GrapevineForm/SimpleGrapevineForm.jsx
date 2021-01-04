import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleSelect from "../../../common/SimpleSelect";
import SelectParcels from "./SelectParcels";
import {useGrapevineContext} from "../GrapevineContext";
import {StatusType} from "../../../../services/types/Service";

const SimpleGrapevineForm = ({updateParcelsInGrapevine, onSubmit}) => {

    const {grapevine, updateGrapevine, grapevineResult} = useGrapevineContext();
    const {t} = useTranslation();

    return (
            <>
                <PageWrapper title={"grapevine.TITLE"} subtitle={'grapevine.LIST'}
                             loading={grapevineResult.status === StatusType.loading}>
                    <Card className="card-default">
                        <CardHeader> {grapevine?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW")}
                        </CardHeader>
                        <CardBody>
                            <InputElement label={t("grapevine.NAME")}
                                          type={'text'}
                                          name={'name'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.name}
                                          showErrors={grapevineResult?.hasError?.("name")}
                                          errorMessage={grapevineResult?.getErrorMessage?.("name")}
                            />
                            <InputElement label={t("grapevine.NUMBER_OF_PLANTS")}
                                          type={'number'}
                                          name={'numberOfPlants'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.numberOfPlants}
                                          showErrors={grapevineResult?.hasError?.("numberOfPlants")}
                                          errorMessage={grapevineResult?.getErrorMessage?.("numberOfPlants")}
                            />
                            <InputElement label={t("grapevine.AREA")}
                                          type={'number'}
                                          name={'area'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.area}
                                          showErrors={grapevineResult?.hasError?.("area")}
                                          errorMessage={grapevineResult?.getErrorMessage?.("area")}
                            />
                            <InputElement label={t("grapevine.YEAR_OF_PLANTING")}
                                          type={'date'}
                                          name={'yearOfPlanting'}
                                          maxSize={'100'}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          defaultValue={grapevine?.yearOfPlanting}
                                          showErrors={grapevineResult?.hasError?.("yearOfPlanting")}
                                          errorMessage={grapevineResult?.getErrorMessage?.("yearOfPlanting")}
                                          optional
                            />
                            <SimpleSelect label={t("grapevine.GRAPE_COLOR")}
                                          name={"grapeColor"}
                                          onChange={e => updateGrapevine(e.target.name, e.target.value)}
                                          value={grapevine?.grapeColor || ''}
                                          options={[{value: "WHITE", text: "Białe"},
                                              {value: "RED", text: "Czerwone"}]}
                                          showErrors={grapevineResult?.hasError?.("grapeColor")}
                                          errorMessage={grapevineResult?.getErrorMessage?.("grapeColor")}
                            />
                            <SelectParcels value={grapevine?.parcels}
                                           name={'parcels'}
                                           label={t('grapevine.PARCELS')}
                                           onChange={updateParcelsInGrapevine}
                                           showErrors={grapevineResult?.hasError?.("parcels")}
                                           errorMessage={grapevineResult?.getErrorMessage?.("parcels")}
                            />
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="primary" className="btn-square" onClick={onSubmit}>
                                {grapevine?.id ? t("common.SAVE") : t("common.ADD")}
                            </Button>
                        </CardFooter>
                    </Card>
                </PageWrapper>
            </>
    )
};

export default SimpleGrapevineForm;