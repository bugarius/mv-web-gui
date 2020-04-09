import React from 'react';
import PageWrapper from "../../../common/PageWrapper";
import {Col, Row} from "reactstrap";
import WineInfoBox from "./WineInfoBox";
import PanelTab from "../../../common/PanelTab/PanelTab";
import PropTypes from 'prop-types';
import WineIngredientsListBox from "./WineIngredientsListBox";
import AddIngredient from "../../ingredient/AddIngredient";
import IngredientInfoPanelTab from "../../ingredient/IngredientInfoPanelTab";
import {useTranslation} from "react-i18next";
import {useWineContext} from "../WineContext";
import WineHistory from "./history/WineHistory";

const WineInfo = ({actions}) => {

    const {t} = useTranslation();
    const {wine} = useWineContext();

    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'}>
                    <Row>
                        <Col xl="4" lg="6">
                            <WineInfoBox actions={actions}/>
                            <WineIngredientsListBox actions={actions}/>
                        </Col>
                        <Col>
                            <PanelTab tab1Label={t('add_ingredient.ADD_WINE')}
                                      tab1={<AddIngredient/>}
                                      tab2Label={t('add_ingredient.INGREDIENT_INFO')}
                                      tab2={<IngredientInfoPanelTab/>}/>
                        </Col>
                    </Row>
                    <WineHistory history={wine?.history}/>

                </PageWrapper>
            </>
    );
};

WineInfo.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func)
};

export default WineInfo;