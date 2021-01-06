import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleSelect from "../../../common/SimpleSelect";
import SelectParcels from "./SelectParcels";
import {ServiceError} from "../../../../services/types/Service";
import {Grapevine} from "../types/Grapevine";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateParcelsInGrapevine: () => void;
    error: ServiceError<Grapevine>;
    grapevine: Grapevine;
    updateGrapevine: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

export const SimpleGrapevineForm: FC<Props> = ({
                                                   updateParcelsInGrapevine,
                                                   onSubmit,
                                                   error,
                                                   grapevine,
                                                   updateGrapevine,
                                                   loading
                                               }) => {

    const {t} = useTranslation();

    return (
        <>
            <PageWrapper title={"grapevine.TITLE"} subtitle={'grapevine.LIST'}
                         loading={loading}>
                <Card className="card-default">
                    <CardHeader> {grapevine?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW")}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={t("grapevine.NAME")}
                                      type={'text'}
                                      name={'name'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.name}
                                      showErrors={error?.hasError?.("name")}
                                      errorMessage={error?.getErrorMessage?.("name")}
                        />
                        <InputElement label={t("grapevine.NUMBER_OF_PLANTS")}
                                      type={'number'}
                                      name={'numberOfPlants'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.numberOfPlants}
                                      showErrors={error?.hasError?.("numberOfPlants")}
                                      errorMessage={error?.getErrorMessage?.("numberOfPlants")}
                        />
                        <InputElement label={t("grapevine.AREA")}
                                      type={'number'}
                                      name={'area'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.area}
                                      showErrors={error?.hasError?.("area")}
                                      errorMessage={error?.getErrorMessage?.("area")}
                        />
                        <InputElement label={t("grapevine.YEAR_OF_PLANTING")}
                                      type={'date'}
                                      name={'yearOfPlanting'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.yearOfPlanting}
                                      showErrors={error?.hasError?.("yearOfPlanting")}
                                      errorMessage={error?.getErrorMessage?.("yearOfPlanting")}
                                      optional
                        />
                        <SimpleSelect label={t("grapevine.GRAPE_COLOR")}
                                      name={"grapeColor"}
                                      onChange={updateGrapevine}
                                      value={grapevine?.grapeColor || ''}
                                      options={[{value: "WHITE", text: "Białe"},
                                          {value: "RED", text: "Czerwone"}]}
                                      showErrors={error?.hasError?.("grapeColor")}
                                      errorMessage={error?.getErrorMessage?.("grapeColor")}
                        />
                        <SelectParcels value={grapevine?.parcels || []}
                                       name={'parcels'}
                                       label={t('grapevine.PARCELS')}
                                       onChange={updateParcelsInGrapevine}
                                       showErrors={error?.hasError?.("parcels")}
                                       errorMessage={error?.getErrorMessage?.("parcels")}
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