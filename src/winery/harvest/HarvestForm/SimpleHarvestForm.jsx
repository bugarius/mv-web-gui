import React from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import InputElement from "../../../common/InputElement";
import Grapevines from "./SelectGrapevines";

const SimpleHarvestForm = ({harvest, loading, updateHarvest, updateGrapevineInHarvest, onSubmit, showErrors}) => {

    const grapevine = harvest && harvest.grapevine;
    const dateOfHarvest = harvest && harvest.dateOfHarvest;
    const weightOfEveryEmptyBox = harvest && harvest.weightOfEveryEmptyBox;

    return (
            <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'} loading={loading}>
                <Card className="card-default">
                    <CardHeader> {harvest && harvest.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                            <Trans i18nKey="sidebar.nav.element.ADD_NEW_HARVEST"/>}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={<Trans i18nKey="harvest.DATE_OF_HARVEST"/>}
                                      type={'date'}
                                      name={'dateOfHarvest'}
                                      onChange={updateHarvest}
                                      defaultValue={dateOfHarvest}
                                      showErrors={showErrors}
                        />
                        <InputElement label={<Trans i18nKey="harvest.WEIGHT_OF_EVERY_EMPTY_BOX"/>}
                                      type={'number'}
                                      name={'weightOfEveryEmptyBox'}
                                      maxSize={'100'}
                                      onChange={updateHarvest}
                                      defaultValue={weightOfEveryEmptyBox}
                                      showErrors={showErrors}
                        />
                        <Grapevines value={grapevine}
                                    name={'grapevine'}
                                    label={'Winorośl'}
                                    onChange={updateGrapevineInHarvest}/>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {harvest && harvest.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

export default SimpleHarvestForm;