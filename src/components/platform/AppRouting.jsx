import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {AuthContext} from "./AuthContext";
import {AuthService} from "./AuthService";
import Login from "../pages/Login";
import WelcomeApp from "../welcome/WelcomeApp";
import Lock from "../pages/Lock";
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
        log.debug('AppRouting::render', error, principal);
        AuthService.getUserInfo()
                .then((res) => setPrincipal(res))
                .catch((res) => {
                    setError(res);
                    history.push(`/error`);
                });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lock]);

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