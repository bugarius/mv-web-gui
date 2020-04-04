import React from 'react';
import {useWineContext} from "../WineContext";
import PageWrapper from "../../../common/PageWrapper";
import {Col, Row} from "reactstrap";
import WineInfoBox from "./WineInfoBox";
import PanelTab from "../../../common/PanelTab/PanelTab";
import PropTypes from 'prop-types';
import WineIngredientsListBox from "./WineIngredientsListBox";

const WineInfo = ({actions}) => {

    const {loading} = useWineContext();

    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'} loading={loading}>
                    <Row>
                        <Col xl="4" lg="6">
                            <WineInfoBox actions={actions}/>
                            <WineIngredientsListBox actions={actions}/>
                        </Col>
                        <Col>
                            <PanelTab/>
                        </Col>
                    </Row>

                </PageWrapper>
            </>
    );
};

WineInfo.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func)
};

export default WineInfo;