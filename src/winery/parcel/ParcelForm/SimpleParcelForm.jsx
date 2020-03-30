import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";

const SimpleParcelForm = ({parcel, loading, onChange, onSubmit, showErrors}) => {

    const registrationNumber = parcel && parcel.registrationNumber;
    const area = parcel && parcel.area;
    const district = parcel && parcel.district;
    const country = parcel && parcel.country;
    const city = parcel && parcel.city;
    const zipCode = parcel && parcel.zipCode;

    console.log("ParcelForm::render", parcel);
    return (
            <PageWrapper title={"parcel.TITLE"} subtitle={'parcel.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader> {parcel && parcel.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                            <Trans i18nKey="sidebar.nav.element.ADD_NEW"/>}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={<Trans i18nKey="parcel.REGISTRATION_NUMBER"/>}
                                      type={'text'}
                                      name={'registrationNumber'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={registrationNumber}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="parcel.AREA"/>}
                                      type={'number'}
                                      name={'area'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={area}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="parcel.DISTRICT"/>}
                                      type={'text'}
                                      name={'district'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={district}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="parcel.COUNTRY"/>}
                                      type={'text'}
                                      name={'country'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={country}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="parcel.CITY"/>}
                                      type={'text'}
                                      name={'city'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={city}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="parcel.ZIP_CODE"/>}
                                      type={'text'}
                                      name={'zipCode'}
                                      maxSize={'100'}
                                      onChange={onChange}
                                      defaultValue={zipCode}
                                      showErrors={showErrors}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {parcel && parcel.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

export default SimpleParcelForm;