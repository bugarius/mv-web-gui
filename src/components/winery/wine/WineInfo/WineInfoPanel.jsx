import React from 'react';
import PageWrapper from "../../../common/PageWrapper";
import {Col, Row} from "reactstrap";
import WineInfoBox from "./WineInfoBox";
import PanelTab from "../../../common/PanelTab/PanelTab";
import PropTypes from 'prop-types';
import WineIngredientsListBox from "./list-box/WineIngredientsListBox";
import {ApplyIngredient} from "../../ingredient/applied/ApplyIngredient";
import IngredientInfoPanelTab from "../../ingredient/IngredientInfoPanelTab";
import {useTranslation} from "react-i18next";
import {useWineContext} from "../WineContext";
import WineHistory from "./history/WineHistory";
import {ProductionEventForm} from "../../production_event/ProductionEventForm";
import {WineEventsListBox} from "./list-box/WineEventsListBox";

const WineInfoPanel = ({button}) => {

    const {t} = useTranslation();
    const {wine, loading} = useWineContext();

    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'}>
                    <Row>
                        <Col xl="4" lg="6">
                            <WineInfoBox button={button} wine={wine} loading={loading}/>
                            <WineEventsListBox/>
                            <WineIngredientsListBox/>
                        </Col>
                        <Col>
                            <ProductionEventForm />
                            <PanelTab tab1Label={t('add_ingredient.ADD_WINE')}
                                      tab1={<ApplyIngredient/>}
                                      tab2Label={t('add_ingredient.INGREDIENT_INFO')}
                                      tab2={<IngredientInfoPanelTab/>}
                            />
                        </Col>
                    </Row>
                    <WineHistory history={wine?.history}/>

                </PageWrapper>
            </>
    );
};

WineInfoPanel.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func)
};

export default WineInfoPanel;