import React from 'react';
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans, useTranslation} from "react-i18next";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import {useTankContext} from "../TankContext";
import {StatusType} from "../../../../services/types/Service";
import * as PropTypes from 'prop-types';

const SimpleTankForm = ({onSubmit}) => {

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
                        />
                        <InputElement label={<Trans i18nKey="tank.CAPACITY"/>}
                                      type={'number'}
                                      name={'capacity'}
                                      onChange={e => updateTank(e.target.name, e.target.value)}
                                      defaultValue={tank?.capacity}
                        />
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {tank?.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

SimpleTankForm.propTypes = {
  onSubmit: PropTypes.func
};

export default SimpleTankForm;