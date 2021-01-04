import React from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import InputElement from "../../../common/InputElement";
import Grapevines from "./SelectGrapevines";
import {useHarvestContext} from "../HarvestContext";
import {StatusType} from "../../../../services/types/Service";
import PropTypes from 'prop-types';

const SimpleHarvestForm = ({updateGrapevineInHarvest, onSubmit}) => {

    const {harvest, updateHarvest, harvestResult} = useHarvestContext();
    const {t} = useTranslation();

    console.log("harvestResult", harvestResult)

    return (
            <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'} loading={harvestResult.status === StatusType.loading}>
                <Card className="card-default">
                    <CardHeader> {harvest?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={t("harvest.DATE_OF_HARVEST")}
                                      type={'date'}
                                      name={'dateOfHarvest'}
                                      onChange={e => updateHarvest(e.target.name, e.target.value)}
                                      defaultValue={harvest?.dateOfHarvest}
                                      showErrors={harvestResult?.hasError?.("dateOfHarvest")}
                                      errorMessage={harvestResult?.getErrorMessage?.("dateOfHarvest")}
                        />
                        <InputElement label={t("harvest.WEIGHT_OF_EVERY_EMPTY_BOX")}
                                      type={'number'}
                                      name={'weightOfEveryEmptyBox'}
                                      maxSize={'100'}
                                      onChange={e => updateHarvest(e.target.name, e.target.value)}
                                      defaultValue={harvest?.weightOfEveryEmptyBox}
                                      showErrors={harvestResult?.hasError?.("weightOfEveryEmptyBox")}
                                      errorMessage={harvestResult?.getErrorMessage?.("weightOfEveryEmptyBox")}
                                      optional
                        />
                        <Grapevines value={harvest?.grapevine || {}}
                                    name={'grapevine'}
                                    label={t("harvest.GRAPEVINE")}
                                    onChange={updateGrapevineInHarvest}
                                    showErrors={harvestResult?.hasError?.("grapevine")}
                                    errorMessage={harvestResult?.getErrorMessage?.("grapevine")}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {harvest?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

SimpleHarvestForm.propTypes = {
    updateGrapevineInHarvest: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SimpleHarvestForm;