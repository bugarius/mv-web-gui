import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleSelect from "../../../common/SimpleSelect";
import SelectParcels from "./SelectParcels";
import {ServiceError} from "../../../../services/types/Service";
import {Grapevine} from "../types/Grapevine";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    updateParcelsInGrapevine: () => void;
    error: ServiceError;
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
                                      error={error}
                        />
                        <InputElement label={t("grapevine.NUMBER_OF_PLANTS")}
                                      type={'number'}
                                      name={'numberOfPlants'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.numberOfPlants}
                                      error={error}
                        />
                        <InputElement label={t("grapevine.AREA")}
                                      type={'number'}
                                      name={'area'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.area}
                                      error={error}
                        />
                        <InputElement label={t("grapevine.YEAR_OF_PLANTING")}
                                      type={'date'}
                                      name={'yearOfPlanting'}
                                      maxSize={'100'}
                                      onChange={updateGrapevine}
                                      defaultValue={grapevine?.yearOfPlanting}
                                      error={error}
                                      optional
                        />
                        <SimpleSelect label={t("grapevine.GRAPE_COLOR")}
                                      name={"grapeColor"}
                                      onChange={updateGrapevine}
                                      value={grapevine?.grapeColor || ''}
                                      options={[{value: "WHITE", text: "Białe"},
                                          {value: "RED", text: "Czerwone"}]}
                                      error={error}
                        />
                        <SelectParcels value={grapevine?.parcels || []}
                                       name={'parcels'}
                                       label={t('grapevine.PARCELS')}
                                       onChange={updateParcelsInGrapevine}
                                       error={error}
                        />
                        <FormErrorMessage error={error}/>
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