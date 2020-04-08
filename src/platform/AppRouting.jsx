import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {AuthContext} from "./AuthContext";
import {AuthService} from "./AuthService";
import Login from "../components/Pages/Login";
import WelcomeApp from "../welcome/WelcomeApp";
import Lock from "../components/Pages/Lock";
import WineryApp from "../winery/WineryApp";
import * as PropTypes from 'prop-types';
import log from 'loglevel';

const AppRouting = ({location: {pathname}, history}) => {

    const [error, setError] = useState('');
    const {principal, setPrincipal, lock} = useContext(AuthContext);

    const redirectToLogin = () => {
        return <Redirect to={{
            pathname: "/welcome/login",
            state: {
                referrer: pathname
            },
        }}/>
    };

    useEffect(() => {
        if (principal !== null) return;
        log.debug('AppRouting::render', error, principal);
        AuthService.getUserInfo()
                .then((principal) => setPrincipal(principal))
                .catch((error) => {
                    setError(error);
                    history.push(`/error`);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (error || principal) ?
      <Switch>
        <Route exact path={'/'}>
          {principal?.login && !lock ? <Redirect to={principal.realms[0]}/> : <Redirect to={'/welcome/login'}/>}
        </Route>
        <Route path="/welcome/login" component={Login}/>
        <Route path="/lock" component={Lock}/>
        <Route path="/welcome">
          {principal?.login ? <Redirect to={principal.realms[0]}/> : <WelcomeApp/>}
        </Route>
        <Route path="/mv">
          {principal?.login ? <WineryApp/> : redirectToLogin()}
        </Route>
      </Switch> : <></>

};

AppRouting.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
};

export default withRouter(AppRouting);