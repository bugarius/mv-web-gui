import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {useParcelContext} from "../ParcelContext";
import {StatusType} from "../../../services/types/Service";
import * as PropTypes from 'prop-types';

const SimpleParcelForm = ({onSubmit}) => {

    const {parcel, parcelResult, updateParcel} = useParcelContext();

    return (
            <PageWrapper title={"parcel.TITLE"} subtitle={'parcel.LIST'} loading={parcelResult.status === StatusType.loading} disabled={false}>
                <Card className="card-default">
                    <CardHeader> {parcel?.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                            <Trans i18nKey="sidebar.nav.element.ADD_NEW"/>}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={<Trans i18nKey="parcel.REGISTRATION_NUMBER"/>}
                                      type={'text'}
                                      name={'registrationNumber'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.registrationNumber}
                        />
                        <InputElement label={<Trans i18nKey="parcel.AREA"/>}
                                      type={'number'}
                                      name={'area'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.area}
                        />
                        <InputElement label={<Trans i18nKey="parcel.DISTRICT"/>}
                                      type={'text'}
                                      name={'district'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.district}
                        />
                        <InputElement label={<Trans i18nKey="parcel.COUNTRY"/>}
                                      type={'text'}
                                      name={'country'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.country}
                        />
                        <InputElement label={<Trans i18nKey="parcel.CITY"/>}
                                      type={'text'}
                                      name={'city'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.city}
                        />
                        <InputElement label={<Trans i18nKey="parcel.ZIP_CODE"/>}
                                      type={'text'}
                                      name={'zipCode'}
                                      maxSize={'100'}
                                      onChange={e => updateParcel(e.target.name, e.target.value)}
                                      defaultValue={parcel?.zipCode}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {parcel?.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
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