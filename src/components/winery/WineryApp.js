import React, {Suspense} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PageLoader from '../common/PageLoader';
import Base from '../Layout/Base';
import BasePage from '../Layout/BasePage';
import ParcelApp from "./parcel/ParcelApp";
import GrapevineApp from "./grapevine/GrapevineApp";
import HarvestApp from "./harvest/HarvestApp";
import WineApp from "./wine/WineApp";
import IngredientApp from "./ingredient/IngredientApp";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Recover from "../pages/Recover";
import Lock from "../pages/Lock";
import NotFound from "../pages/NotFound";
import Error500 from "../pages/Error500";
import Maintenance from "../pages/Maintenance";
import ErrorApp from "../error/ErrorApp";
import TankApp from "./tank/TankApp";

const waitFor = Tag => props => <Tag {...props}/>;

const listofPages = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance'
];

const Routes = ({location}) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {enter: 500, exit: 500};

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if (listofPages.indexOf(location.pathname) > -1)
    {
        return (
                // Page Layout component wrapper
                <BasePage>
                    <Suspense fallback={<PageLoader/>}>
                        <Switch location={location}>
                            <Route path="/mv/login" component={waitFor(Login)}/>
                            <Route path="/mv/register" component={waitFor(Register)}/>
                            <Route path="/mv/recover" component={waitFor(Recover)}/>
                            <Route path="/mv/lock" component={waitFor(Lock)}/>
                            <Route path="/mv/notfound" component={waitFor(NotFound)}/>
                            <Route path="/mv/error500" component={waitFor(Error500)}/>
                            <Route path="/mv/maintenance" component={waitFor(Maintenance)}/>
                        </Switch>
                    </Suspense>
                </BasePage>
        )
    }
    else
    {
        return (
                // Layout component wrapper
                // Use <BaseHorizontal> to change layout
                <Base>
                    <TransitionGroup>
                        <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                            <div>
                                <Suspense fallback={<PageLoader/>}>
                                    <Switch location={location}>
                                        <Route path="/login" component={waitFor(Login)}/>

                                        {/*Parcels*/}
                                        <Route path="/mv/parcel" component={waitFor(ParcelApp)}/>

                                        {/*Grapevines*/}
                                        <Route path="/mv/grapevine" component={waitFor(GrapevineApp)}/>

                                        {/*Harvests*/}
                                        <Route path="/mv/harvest" component={waitFor(HarvestApp)}/>

                                        {/*Wines*/}
                                        <Route path="/mv/wine" component={waitFor(WineApp)}/>

                                        {/*Tanks*/}
                                        <Route path="/mv/tank" component={waitFor(TankApp)}/>

                                        {/*Ingredients*/}
                                        <Route path="/mv/ingredient" component={waitFor(IngredientApp)}/>

                                        {/*Error*/}
                                        <Route path="/mv/error" component={waitFor(ErrorApp)}/>
                                    </Switch>
                                </Suspense>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Base>
        )
    }
};

export default withRouter(Routes);