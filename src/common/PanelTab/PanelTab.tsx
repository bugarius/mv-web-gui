import React, {useState} from "react";
import {Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {useTranslation} from "react-i18next";
import AddIngredient from "../../winery/ingredient/AddIngredient";
import {useIngredientContext} from "../../winery/ingredient/IngredientContext";

const PanelTab = () => {
    const {ingredient} = useIngredientContext();
    const [activeTab, setActiveTab] = useState('add');
    const {t} = useTranslation();

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
                            <em className="far icon-magnifier-add fa-fw"></em> {t('add_ingredient.TO_WINE')}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={activeTab === 'info' ? 'active' : ''}
                                 onClick={() => {
                                     toggleTab('info');
                                 }}
                        >
                            <em className="far icon-info fa-fw"></em> Informacje o składniku
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="bg-white p-0">
                    <TabPane tabId="add">
                        <AddIngredient />
                    </TabPane>
                    <TabPane tabId="info">
                        {ingredient?.ingredient?.id ?
                                <Card style={{marginBottom: "0px"}} className={'p-2'}>
                                    <CardBody>
                                    <p className='text-bold'>{ingredient?.ingredient?.name}</p>
                                    <p style={{whiteSpace: 'pre-wrap'}}>{ingredient?.ingredient?.info}</p>
                                    </CardBody>
                                </Card>
                        : <Card style={{marginBottom: "0px"}}>
                                    <CardBody className={'text-center'}><p>Nie wybrano składnika</p></CardBody>
                                </Card>
                        }
                    </TabPane>
                </TabContent>
            </div>
    )
};

export default PanelTab;