import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {ServiceError} from "../../../../services/types/Service";
import SelectHarvest from "./SelectHarvest";
import SelectTank from "./SelectTank";
import {Wine} from "../types/Wine";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateHarvestInWine: () => void;
    updateTankInWine: () => void;
    error: ServiceError<Wine>;
    wine: Wine;
    updateWine: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export const SimpleWineForm: FC<Props> = ({
                                              updateHarvestInWine,
                                              updateTankInWine,
                                              onSubmit,
                                              error,
                                              wine,
                                              updateWine,
                                              loading
                                          }) => {

    const {t} = useTranslation();

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
                                  showErrors={error?.hasError?.("name")}
                                  errorMessage={error?.getErrorMessage?.("name")}
                    />
                    <InputElement label={t("wine.DATE")}
                                  type={'date'}
                                  name={'startDate'}
                                  onChange={updateWine}
                                  defaultValue={wine?.startDate}
                                  showErrors={error?.hasError?.("date")}
                                  errorMessage={error?.getErrorMessage?.("date")}
                                  optional
                    />
                    <SelectTank value={wine?.tank || {}}
                                name={'tank'}
                                label={t("wine.TANK")}
                                disabled={wine?.harvest?.allDisposedToWine}
                                onChange={updateTankInWine}
                                showErrors={error?.hasError?.("tank")}
                                errorMessage={error?.getErrorMessage?.("tank")}
                    />
                    <InputElement label={t("wine.LITERS")}
                                  type={'number'}
                                  name={'liters'}
                                  maxSize={'100'}
                                  onChange={updateWine}
                                  defaultValue={wine?.liters}
                                  showErrors={error?.hasError?.("liters")}
                                  errorMessage={error?.getErrorMessage?.("liters")}
                    />
                    <SelectHarvest value={wine?.harvest || {}}
                                   name={'harvest'}
                                   label={t("wine.HARVEST")}
                                   disabled={wine?.harvest?.allDisposedToWine}
                                   onChange={updateHarvestInWine}
                                   showErrors={error?.hasError?.("harvest")}
                                   errorMessage={error?.getErrorMessage?.("harvest")}
                    />


                </CardBody>
                <CardFooter className="text-center">
                    <Button color="primary" className="btn-square" onClick={onSubmit}>
                        {wine?.id ? t("common.SAVE") : t("common.ADD")}
                    </Button>
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};