import React, {ChangeEvent, FC} from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import InputElement from "../../../common/InputElement";
import Grapevines from "./SelectGrapevines";
import {ServiceError} from "../../../../services/types/Service";
import {Harvest} from "../types/Harvest";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateGrapevineInHarvest: () => void;
    error: ServiceError<Harvest>;
    harvest: Harvest;
    updateHarvest: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

const SimpleHarvestForm: FC<Props> = ({
                                          updateGrapevineInHarvest,
                                          onSubmit,
                                          error,
                                          harvest,
                                          updateHarvest,
                                          loading
                                      }) => {

    const {t} = useTranslation();

    return (
        <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'}
                     loading={loading}>
            <Card className="card-default">
                <CardHeader> {harvest?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                </CardHeader>
                <CardBody>
                    <InputElement label={t("harvest.DATE_OF_HARVEST")}
                                  type={'date'}
                                  name={'dateOfHarvest'}
                                  onChange={updateHarvest}
                                  defaultValue={harvest?.dateOfHarvest}
                                  showErrors={error?.hasError?.("dateOfHarvest")}
                                  errorMessage={error?.getErrorMessage?.("dateOfHarvest")}
                    />
                    <InputElement label={t("harvest.WEIGHT_OF_EVERY_EMPTY_BOX")}
                                  type={'number'}
                                  name={'weightOfEveryEmptyBox'}
                                  maxSize={'100'}
                                  onChange={updateHarvest}
                                  defaultValue={harvest?.weightOfEveryEmptyBox}
                                  showErrors={error?.hasError?.("weightOfEveryEmptyBox")}
                                  errorMessage={error?.getErrorMessage?.("weightOfEveryEmptyBox")}
                                  optional
                    />
                    <Grapevines value={harvest?.grapevine || {}}
                                name={'grapevine'}
                                label={t("harvest.GRAPEVINE")}
                                onChange={updateGrapevineInHarvest}
                                showErrors={error?.hasError?.("grapevine")}
                                errorMessage={error?.getErrorMessage?.("grapevine")}
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

export default SimpleHarvestForm;