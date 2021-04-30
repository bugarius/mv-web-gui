import React, {ChangeEvent, FC} from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import InputElement from "../../../common/InputElement";
import Grapevines from "./SelectGrapevines";
import {ServiceError} from "../../../../services/types/Service";
import {Harvest} from "../types/Harvest";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";
import {InputDate} from "../../../common/form-elements/InputDate";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateGrapevineInHarvest: () => void;
    error: ServiceError;
    harvest: Harvest;
    updateHarvest: (e: ChangeEvent<HTMLInputElement>) => void;
    updateDate: (date: Date | string) => void;
    loading: boolean;
    onClickBack: () => void;
}

const SimpleHarvestForm: FC<Props> = ({
                                          updateGrapevineInHarvest,
                                          onSubmit,
                                          error,
                                          harvest,
                                          updateHarvest,
                                          updateDate,
                                          loading,
                                          onClickBack
                                      }) => {

    const {t} = useTranslation();

    return (
        <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'}
                     loading={loading}>
            <Card className="card-default">
                <CardHeader> {harvest?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                </CardHeader>
                <CardBody>
                    <InputDate label={t("harvest.DATE_OF_HARVEST")}
                               name={'dateOfHarvest'}
                               onChange={updateDate}
                               defaultValue={harvest?.dateOfHarvest}
                               error={error}
                               disabled={harvest?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <InputElement label={t("harvest.WEIGHT_OF_EVERY_EMPTY_BOX")}
                                  type={'number'}
                                  name={'weightOfEveryEmptyBox'}
                                  maxSize={'100'}
                                  onChange={updateHarvest}
                                  defaultValue={harvest?.weightOfEveryEmptyBox}
                                  error={error}
                                  optional
                                  disabled={harvest?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <Grapevines value={harvest?.grapevine || {}}
                                name={'grapevine'}
                                label={t("harvest.GRAPEVINE")}
                                onChange={updateGrapevineInHarvest}
                                error={error}
                                disabled={harvest?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <FormErrorMessage error={error}/>
                </CardBody>
                <CardFooter className="text-center">
                    {harvest?.liveStatus === EntityLiveStatus.ARCHIVED ?
                        <Button color="primary" className="btn-square" onClick={onClickBack}>
                            {t("common.BACK")}
                        </Button>
                        :
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {harvest?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    }
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};

export default SimpleHarvestForm;