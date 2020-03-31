import React, {useContext} from 'react';
import {withRouter} from "react-router-dom";
import {WineContext} from "../WineContext";
import PageWrapper from "../../../common/PageWrapper";
import {Col, Row} from "reactstrap";
import WineInfoBox from "./WineInfoBox";
import WineIngredientsListBox from "./WineIngredientsListBox";
import PanelTab from "../../../common/PanelTab/PanelTab";

const WineInfo = ({actions}) => {

    const {loading} = useContext(WineContext);
    return (
            <>
                <PageWrapper title={"wine.TITLE"} subtitle={'wine.LIST'} loading={loading}>
                    <Row>
                        <Col xl="4" lg="6">
                            <WineInfoBox actions={actions}/>
                            <WineIngredientsListBox actions={actions}/>
                        </Col>
                        <Col >
                            <PanelTab />
                        </Col>
                    </Row>

                </PageWrapper>
            </>
    );
};

export default withRouter(WineInfo);