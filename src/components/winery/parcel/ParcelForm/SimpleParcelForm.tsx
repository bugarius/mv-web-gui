import React, {ChangeEvent, FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {ServiceError} from "../../../../services/types/Service";
import {Parcel} from "../types/Parcel";

interface Props
{
    onSubmit: (e: ChangeEvent<HTMLInputElement>) => void;
    error: ServiceError;
    parcel: Parcel;
    updateParcel: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
}

const SimpleParcelForm: FC<Props> = ({onSubmit, error, parcel, updateParcel, loading}) => {

    const {t} = useTranslation();
    console.log("updateParcel", updateParcel)

    return (
        <PageWrapper title={"parcel.TITLE"} subtitle={'parcel.LIST'}
                     loading={loading} disabled={false}>
            <Card className="card-default">
                <CardHeader> {parcel?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW")}
                </CardHeader>
                <CardBody>
                    <InputElement label={t("parcel.REGISTRATION_NUMBER")}
                                  type={'text'}
                                  name={'registrationNumber'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.registrationNumber}
                                  error={error}
                    />
                    <InputElement label={t("parcel.AREA")}
                                  type={'number'}
                                  name={'area'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.area}
                                  error={error}
                    />
                    <InputElement label={t("parcel.DISTRICT")}
                                  type={'text'}
                                  name={'district'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.district}
                                  error={error}
                    />
                    <InputElement label={t("parcel.COUNTRY")}
                                  type={'text'}
                                  name={'country'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.country}
                                  error={error}
                                  optional
                    />
                    <InputElement label={t("parcel.CITY")}
                                  type={'text'}
                                  name={'city'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.city}
                                  error={error}
                                  optional
                    />
                    <InputElement label={t("parcel.ZIP_CODE")}
                                  type={'text'}
                                  name={'zipCode'}
                                  maxSize={'100'}
                                  onChange={updateParcel}
                                  defaultValue={parcel?.zipCode}
                                  error={error}
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

export default SimpleParcelForm;