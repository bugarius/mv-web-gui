import React, {FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {ServiceError} from "../../../../services/types/Service";
import {Tank} from "../types/Tank";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

interface Props {
    onSubmit: () => void;
    error: ServiceError;
    tank: Tank;
    updateTank: () => void;
    loading: boolean;
}

const SimpleTankForm: FC<Props> = ({onSubmit, tank, updateTank, error, loading}) => {

    const {t} = useTranslation();

    return (
            <PageWrapper title={"tank?.TITLE"} subtitle={'tank?.LIST'} loading={loading} disabled={false}>
                <Card className="card-default">
                    <CardHeader> {tank?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={t("tank.NUMBER")}
                                      type={'text'}
                                      name={'number'}
                                      maxSize={'100'}
                                      onChange={updateTank}
                                      defaultValue={tank?.number}
                                      error={error}
                        />
                        <InputElement label={t("tank.CAPACITY")}
                                      type={'number'}
                                      name={'capacity'}
                                      onChange={updateTank}
                                      defaultValue={tank?.capacity}
                                      error={error}
                        />
                        <FormErrorMessage error={error}/>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {tank?.id ? t("common.SAVE") : t("common.ADD")}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

export default SimpleTankForm;