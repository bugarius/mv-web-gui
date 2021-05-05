import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {ServiceError} from "../../../../services/types/Service";
import SelectHarvest from "./SelectHarvest";
import SelectTank from "./SelectTank";
import {Wine} from "../types/Wine";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";
import {InputDate} from "../../../common/form-elements/InputDate";
import {useParams} from "react-router-dom";
import {EntityLiveStatus} from "../../../common/enums/EntityLiveStatus";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateHarvestInWine: () => void;
    updateTankInWine: () => void;
    error: ServiceError;
    wine: Wine;
    updateWine: (e: ChangeEvent<HTMLInputElement>) => void;
    updateDate: () => void;
    loading: boolean;
    onClickBack: () => void;
}

export const SimpleWineForm: FC<Props> = ({
                                              updateHarvestInWine,
                                              updateTankInWine,
                                              onSubmit,
                                              error,
                                              wine,
                                              updateWine,
                                              updateDate,
                                              loading,
                                              onClickBack
                                          }) => {

    const {t} = useTranslation();
    const {harvestId, wineId} = useParams();

    return (
        <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'}
                     loading={loading}>
            <Card className="card-default">
                <CardHeader> {wine?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                </CardHeader>
                <CardBody>
                    <InputElement label={t("wine.NAME")}
                                  type={'text'}
                                  name={'name'}
                                  onChange={updateWine}
                                  defaultValue={wine?.name}
                                  error={error}
                                  disabled={wine?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <InputDate label={t("wine.DATE")}
                               name={'startDate'}
                               onChange={updateDate}
                               defaultValue={wine?.startDate}
                               error={error}
                               disabled={wine?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    <SelectTank value={wine?.tank || {}}
                                name={'tank'}
                                label={t("wine.TANK")}
                                disabled={wine?.liveStatus === EntityLiveStatus.ARCHIVED}
                                onChange={updateTankInWine}
                                error={error}
                    />
                    <InputElement label={t("wine.LITERS")}
                                  type={'number'}
                                  name={'liters'}
                                  maxSize={'100'}
                                  onChange={updateWine}
                                  defaultValue={wine?.liters}
                                  error={error}
                                  disabled={wine?.liveStatus === EntityLiveStatus.ARCHIVED}
                    />
                    {((!harvestId && wineId === '0') || wine?.liveStatus === EntityLiveStatus.ARCHIVED) &&
                        <SelectHarvest value={wine?.harvest || {}}
                                       name={'harvest'}
                                       label={t("wine.HARVEST")}
                                       disabled={wine?.harvest?.allDisposedToWine || wine?.liveStatus === EntityLiveStatus.ARCHIVED}
                                       onChange={updateHarvestInWine}
                                       error={error}
                                       showExtraMessage={wine?.harvest?.allDisposedToWine && wine?.liveStatus !== EntityLiveStatus.ARCHIVED}
                        />
                    }
                    <FormErrorMessage error={error} messageType={"details"}/>
                </CardBody>
                <CardFooter className="text-center">
                    {wine?.liveStatus === EntityLiveStatus.ARCHIVED ?
                        <Button color="primary" className="btn-square" onClick={onClickBack}>
                            {t("common.BACK")}
                        </Button>
                        :
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {wine?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    }
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};