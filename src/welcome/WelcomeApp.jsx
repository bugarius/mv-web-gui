import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from "../components/Pages/Login";

class WelcomeApp extends Component {
  render()
  {
    return (
      <div className="app-container app-theme-white body-tabs-shadow">
        <Switch>
          <Route exact path={'/welcome'}>
            <Redirect to={'/welcome/login'}/>
          </Route>
          {/*<Route path={'/welcome/register'} component={RegisterPage}/>*/}
          <Route path={'/welcome/login'} component={Login}/>
          {/*<Route path={'/welcome/recover'} component={RecoverPage}/>*/}
          {/*<Route path={'/welcome/reset/:token?'} component={ResetPage}/>*/}
        </Switch>
      </div>
    );
  }
}

export default WelcomeApp;
