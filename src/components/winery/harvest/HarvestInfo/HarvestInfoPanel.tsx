import React from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader} from "reactstrap";
import {useHarvestContext} from "../HarvestContext";
import {ServiceError, StatusType} from "../../../../services/types/Service";
import PageWrapper from "../../../common/PageWrapper";
import InputElement from "../../../common/InputElement";
import SimpleInputElement from "../../../common/SimpleInputElement";
import {useTranslation} from "react-i18next";
import BoxList from "../../box/BoxList";
import WineList from "../../wine/WineList";
import HarvestHistory from "./history/HarvestHistory";
import {FormErrorMessage} from "../../../common/notifications/FormErrorMessage";

interface Props
{
    actions: {
        addBoxToHarvest?: (e) => void;
        edit?: () => void;
        dispose?: (e, disposeAll: boolean) => void;
        reloadHarvest?: () => void;
        addWineToHarvest: () => void;
    }
}

const HarvestInfoPanel: React.FC<Props> = ({actions: {addBoxToHarvest, edit, dispose, reloadHarvest, addWineToHarvest}}) => {

    const {harvest, harvestResult, updateBox, loading} = useHarvestContext();
    const {harvestId} = useParams();
    const {t} = useTranslation();

    return (
        <>
            <PageWrapper title={"harvest.TITLE"} subtitle={'harvest.LIST'}
                         loading={harvestResult.status === StatusType.loading}>
                <div className="card card-default">
                    <div className="card-header">
                        <div className="card-title">Info
                            - {harvest?.grapevine?.name + " - " + harvest?.dateOfHarvest}</div>
                    </div>
                    {
                        !harvest?.allDisposedToWine && [
                            <div className="card-body bb text-center" key={1}>
                                <InputElement label={t("harvest.WEIGHT_OF_EMPTY_BOX")}
                                              type={'number'}
                                              name={'weightOfEmptyBox'}
                                              maxSize={'100'}
                                              onChange={e => updateBox(e.target.name, e.target.value)}
                                              defaultValue={harvest?.weightOfEveryEmptyBox}
                                />
                            </div>,
                            <div className="card-body bb text-center" key={2}>
                                <Card outline color="success" className="mb-3" style={{
                                    width: '70%',
                                    minWidth: '300px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}>
                                    <CardHeader className="text-white bg-success">Dodaj skrzynkę z
                                        winogronami</CardHeader>
                                    <CardBody>
                                        <SimpleInputElement
                                            type='number'
                                            name='weightOfFullBox'
                                            maxSize='100'
                                            onChange={e => updateBox(e.target.name, e.target.value)}
                                            disabled={harvest?.allDisposedToWine}
                                            autoFocus={true}
                                            onKeyPress={(e) => e.key === 'Enter' && addBoxToHarvest?.(e)}
                                        />
                                        <Button color="success" disabled={harvest?.allDisposedToWine}
                                                className="btn-square"
                                                style={{width: '100%'}} onClick={addBoxToHarvest}>Dodaj
                                            skrzynkę</Button>
                                        <FormErrorMessage error={harvestResult as ServiceError}
                                                          messageType={'fieldError'} fieldName={'weightOfFullBox'}/>
                                    </CardBody>
                                </Card>
                            </div>
                        ]
                    }
                    <div className="card-body bb">
                        <div className="row text-center">
                            <div className="col-4">
                                <p className="text-bold">{t("harvest.WEIGHT_OF_GRAPES")}</p>
                                <div className="h3 m-0">{harvest?.weightOfGrapes || '0'} kg</div>
                            </div>
                            <div className="col-4">
                                <p className="text-bold">{t("harvest.AMOUNT_OF_MUST")}</p>
                                <div className="h3 m-0">{harvest?.amountOfMust || '0'} l</div>
                            </div>
                            <div className="col-4">
                                <p className="text-bold">{t("harvest.AMOUNT_OF_WASTE")}</p>
                                <div className="h3 m-0">{harvest?.amountOfWaste || '0'} kg</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-secondary btn-oval" onClick={edit}>Edytuj
                            zbiór
                        </button>
                    </div>
                    <div className="card-footer bg-warning text-center">
                        <button type="button" disabled={harvest?.allDisposedToWine}
                                className="btn btn-secondary btn-oval"
                                onClick={(e) => dispose?.(e, true)}>{harvest?.allDisposedToWine ? "Zbiór zamknięty i rozdysponowany" : "Zamknij zbiór i oznacz jako rozdysponowany"}</button>
                        {harvest?.allDisposedToWine &&
                        <div style={{paddingTop: "5px"}}><span style={{cursor: "pointer"}}
                                                               onClick={(e) => dispose?.(e, false)}>Cofnij zamknięcie</span>
                        </div>
                        }
                    </div>
                </div>
                {harvestId &&
                <BoxList harvest={harvest} harvestId={harvestId} loading={loading} reloadHarvest={reloadHarvest}/>}
                {harvestId &&
                <WineList harvest={harvest} harvestId={harvestId} wrapperDisabled={true} addWine={addWineToHarvest} reloadHarvest={reloadHarvest}/>}
                <HarvestHistory history={harvest?.history}/>
            </PageWrapper>
        </>
    )
};

export default HarvestInfoPanel;