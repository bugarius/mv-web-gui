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
}

export const SimpleWineForm: FC<Props> = ({
                                              updateHarvestInWine,
                                              updateTankInWine,
                                              onSubmit,
                                              error,
                                              wine,
                                              updateWine,
                                              updateDate,
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
                                  error={error}
                    />
                    <InputDate label={t("wine.DATE")}
                               name={'startDate'}
                               onChange={updateDate}
                               defaultValue={wine?.startDate}
                               error={error}
                    />
                    <SelectTank value={wine?.tank || {}}
                                name={'tank'}
                                label={t("wine.TANK")}
                                disabled={wine?.harvest?.allDisposedToWine}
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
                    />
                    <SelectHarvest value={wine?.harvest || {}}
                                   name={'harvest'}
                                   label={t("wine.HARVEST")}
                                   disabled={wine?.harvest?.allDisposedToWine}
                                   onChange={updateHarvestInWine}
                                   error={error}
                    />
                    <FormErrorMessage error={error}/>
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