import React from "react";
import PageWrapper from "../../../common/PageWrapper";
import {Button, Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import {Trans} from "react-i18next";
import InputElement from "../../../common/InputElement";
import Grapevines from "./SelectGrapevines";
import {useHarvestContext} from "../HarvestContext";
import {StatusType} from "../../../services/types/Service";
import PropTypes from 'prop-types';

const SimpleHarvestForm = ({updateGrapevineInHarvest, onSubmit}) => {

    const {harvest, updateHarvest, harvestResult} = useHarvestContext();

    return (
            <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'} loading={harvestResult.status === StatusType.loading}>
                <Card className="card-default">
                    <CardHeader> {harvest?.id ? <Trans i18nKey="sidebar.nav.element.EDIT"/> :
                            <Trans i18nKey="sidebar.nav.element.ADD_NEW_HARVEST"/>}
                    </CardHeader>
                    <CardBody>
                        <InputElement label={<Trans i18nKey="harvest.DATE_OF_HARVEST"/>}
                                      type={'date'}
                                      name={'dateOfHarvest'}
                                      onChange={e => updateHarvest(e.target.name, e.target.value)}
                                      defaultValue={harvest?.dateOfHarvest}
                        />
                        <InputElement label={<Trans i18nKey="harvest.WEIGHT_OF_EVERY_EMPTY_BOX"/>}
                                      type={'number'}
                                      name={'weightOfEveryEmptyBox'}
                                      maxSize={'100'}
                                      onChange={e => updateHarvest(e.target.name, e.target.value)}
                                      defaultValue={harvest?.weightOfEveryEmptyBox}
                        />
                        <Grapevines value={harvest?.grapevine}
                                    name={'grapevine'}
                                    label={'Winorośl'}
                                    onChange={updateGrapevineInHarvest}/>
                    </CardBody>
                    <CardFooter className="text-center">
                        <Button color="primary" className="btn-square" onClick={onSubmit}>
                            {harvest?.id ? <Trans i18nKey="common.SAVE"/> : <Trans i18nKey="common.ADD"/>}
                        </Button>
                    </CardFooter>
                </Card>
            </PageWrapper>
    )
};

SimpleHarvestForm.propTypes = {
    updateGrapevineInHarvest: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SimpleHarvestForm;