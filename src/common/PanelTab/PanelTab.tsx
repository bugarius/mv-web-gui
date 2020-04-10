import React, {useState} from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

const PanelTab = ({tab1, tab2, tab1Label, tab2Label}) => {
    const [activeTab, setActiveTab] = useState('add');

    const toggleTab = tab => {
        if (activeTab !== tab)
        {
            setActiveTab(tab);
        }
    };

    return (
        <div className="card card-transparent">
            <Nav tabs justified>
                <NavItem>
                    <NavLink className={activeTab === 'add' ? 'active' : ''}
                             onClick={() => {
                                 toggleTab('add');
                             }}
                    >
                        <em className="far icon-magnifier-add fa-fw"></em> {tab1Label}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === 'info' ? 'active' : ''}
                             onClick={() => {
                                 toggleTab('info');
                             }}
                    >
                        <em className="far icon-info fa-fw"></em> {tab2Label}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="bg-white p-0">
                <TabPane tabId="add">
                    {tab1}
                </TabPane>
                <TabPane tabId="info">
                    {tab2}
                </TabPane>
            </TabContent>
        </div>
    )
};

export default PanelTab;