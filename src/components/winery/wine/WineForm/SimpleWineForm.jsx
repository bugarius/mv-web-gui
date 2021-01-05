import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {StatusType} from "../../../../services/types/Service";
import {useWineContext} from "../WineContext";
import SelectHarvest from "./SelectHarvest";
import SelectTank from "./SelectTank";

const SimpleWineForm = ({updateHarvestInWine, updateTankInWine, onSubmit}) => {

    const {wine, updateWine, wineResult} = useWineContext();
    const {t} = useTranslation();

    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'}
                             loading={wineResult.status === StatusType.loading}>
                    <Card className="card-default">
                        <CardHeader> {wine?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                        </CardHeader>
                        <CardBody>
                            <InputElement label={t("wine.NAME")}
                                          type={'text'}
                                          name={'name'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.name}
                                          showErrors={wineResult?.hasError?.("name")}
                                          errorMessage={wineResult?.getErrorMessage?.("name")}
                            />
                            <InputElement label={t("wine.DATE")}
                                          type={'date'}
                                          name={'startDate'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.startDate}
                                          showErrors={wineResult?.hasError?.("date")}
                                          errorMessage={wineResult?.getErrorMessage?.("date")}
                                          optional
                            />
                            <SelectTank value={wine?.tank || {}}
                                        name={'tank'}
                                        label={t("wine.TANK")}
                                        disabled={wine?.harvest?.allDisposedToWine}
                                        onChange={updateTankInWine}
                                        showErrors={wineResult?.hasError?.("tank")}
                                        errorMessage={wineResult?.getErrorMessage?.("tank")}
                            />
                            <InputElement label={t("wine.LITERS")}
                                          type={'number'}
                                          name={'liters'}
                                          maxSize={'100'}
                                          onChange={e => updateWine(e.target.name, e.target.value)}
                                          defaultValue={wine?.liters}
                                          showErrors={wineResult?.hasError?.("liters")}
                                          errorMessage={wineResult?.getErrorMessage?.("liters")}
                            />
                            <SelectHarvest value={wine?.harvest}
                                           name={'harvest'}
                                           label={t("wine.HARVEST")}
                                           disabled={wine?.harvest?.allDisposedToWine}
                                           onChange={updateHarvestInWine}
                                           showErrors={wineResult?.hasError?.("harvest")}
                                           errorMessage={wineResult?.getErrorMessage?.("harvest")}
                            />


                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="primary" className="btn-square" onClick={onSubmit}>
                                {wine?.id ? t("common.SAVE") : t("common.ADD")}
                            </Button>
                        </CardFooter>
                    </Card>
                </PageWrapper>
            </>
    )
};

export default SimpleWineForm;