import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {useParcelContext} from "../ParcelContext";
import {StatusType} from "../../../../services/types/Service";
import * as PropTypes from 'prop-types';

const SimpleParcelForm = ({onSubmit}) => {

    const {parcel, parcelResult, updateParcel} = useParcelContext();
    const {t} = useTranslation();

    return (
        <PageWrapper title={"parcel.TITLE"} subtitle={'parcel.LIST'}
                     loading={parcelResult.status === StatusType.loading} disabled={false}>
            <Card className="card-default">
                <CardHeader> {parcel?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW")}
                </CardHeader>
                <CardBody>
                    <InputElement label={t("parcel.REGISTRATION_NUMBER")}
                                  type={'text'}
                                  name={'registrationNumber'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.registrationNumber}
                                  showErrors={parcelResult?.hasError?.("registrationNumber")}
                                  errorMessage={parcelResult?.getErrorMessage?.("registrationNumber")}
                    />
                    <InputElement label={t("parcel.AREA")}
                                  type={'number'}
                                  name={'area'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.area}
                                  showErrors={parcelResult?.hasError?.("area")}
                                  errorMessage={parcelResult?.getErrorMessage?.("area")}
                    />
                    <InputElement label={t("parcel.DISTRICT")}
                                  type={'text'}
                                  name={'district'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.district}
                                  showErrors={parcelResult?.hasError?.("district")}
                                  errorMessage={parcelResult?.getErrorMessage?.("district")}
                    />
                    <InputElement label={t("parcel.COUNTRY")}
                                  type={'text'}
                                  name={'country'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.country}
                                  showErrors={parcelResult?.hasError?.("country")}
                                  errorMessage={parcelResult?.getErrorMessage?.("country")}
                                  optional
                    />
                    <InputElement label={t("parcel.CITY")}
                                  type={'text'}
                                  name={'city'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.city}
                                  showErrors={parcelResult?.hasError?.("city")}
                                  errorMessage={parcelResult?.getErrorMessage?.("city")}
                                  optional
                    />
                    <InputElement label={t("parcel.ZIP_CODE")}
                                  type={'text'}
                                  name={'zipCode'}
                                  maxSize={'100'}
                                  onChange={e => updateParcel(e.target.name, e.target.value)}
                                  defaultValue={parcel?.zipCode}
                                  showErrors={parcelResult?.hasError?.("zipCode")}
                                  errorMessage={parcelResult?.getErrorMessage?.("zipCode")}
                                  optional
                    />
                </CardBody>
                <CardFooter className="text-center">
                    <Button color="primary" className="btn-square" onClick={onSubmit}>
                        {parcel?.id ? t("common.SAVE") : t("common.ADD")}
                    </Button>
                </CardFooter>
            </Card>
        </PageWrapper>
    )
};

SimpleParcelForm.propTypes = {
    onSubmit: PropTypes.func
};

export default SimpleParcelForm;