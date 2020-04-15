import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from "../pages/Login";
import Lock from "../pages/Lock";

class WelcomeApp extends Component {
  render()
  {
    return (
      <div className="app-container app-theme-white body-tabs-shadow">
        <Switch>
          <Route path="/lock" component={Lock}/>
          <Route path={'/welcome/login'} component={Login}/>
          <Route path={'/'}>
            <Redirect to={'/welcome/login'}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default WelcomeApp;
