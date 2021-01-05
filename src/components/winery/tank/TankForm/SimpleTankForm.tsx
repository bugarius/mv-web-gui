import React, {FC} from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {useTankContext} from "../TankContext";
import {StatusType} from "../../../../services/types/Service";

interface Props {
    onSubmit: () => void;
}

const SimpleTankForm: FC<Props> = ({onSubmit}) => {

    const {tank, tankResult, updateTank} = useTankContext();
    const {t} = useTranslation();

    return (
            <PageWrapper title={"tank.TITLE"} subtitle={'tank.LIST'} loading={tankResult.status === StatusType.loading} disabled={false}>
                <Card className="card-default">
                    <CardHeader> {tank?.id ? t("sidebar.nav.element.EDIT") : t("sidebar.nav.element.ADD_NEW_HARVEST")}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={t("tank.NUMBER")}
                                      type={'text'}
                                      name={'number'}
                                      maxSize={'100'}
                                      onChange={e => updateTank(e.target.name, e.target.value)}
                                      defaultValue={tank?.number}
                                      showErrors={tankResult?.hasError?.("number")}
                                      errorMessage={tankResult?.getErrorMessage?.("number")}
                        />
                        <InputElement label={t("tank.CAPACITY")}
                                      type={'number'}
                                      name={'capacity'}
                                      onChange={e => updateTank(e.target.name, e.target.value)}
                                      defaultValue={tank?.capacity}
                                      showErrors={tankResult?.hasError?.("capacity")}
                                      errorMessage={tankResult?.getErrorMessage?.("capacity")}
                        />
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