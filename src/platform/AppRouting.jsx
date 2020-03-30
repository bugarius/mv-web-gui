import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {AuthContext} from "./AuthContext";
import {AuthService} from "./AuthService";
import Login from "../components/Pages/Login";
import WelcomeApp from "../welcome/WelcomeApp";
import Lock from "../components/Pages/Lock";
import WineryApp from "../winery/WineryApp";

class AppRouting extends Component {

  static contextType = AuthContext;

  constructor(props)
  {
    super(props);
    this.state = {};
  }

  redirectToLogin = () => {
    const {location: {pathname}} = this.props;

    return <Redirect to={{
      pathname: "/welcome/login",
      state: {
        referrer: pathname
      },
    }}/>
  };

  handleError = (res) => {
    this.setState(() => ({
      error: res
    }));
    this.props.history.push(`/error`);
  };

  componentDidMount()
  {
    const {setPrincipal} = this.context;

    console.log('AuthProvider::componentDidMount');
    AuthService.getUserInfo()
      .then(setPrincipal)
      .catch(this.handleError);
  }

  render()
  {
    const {location} = this.props;
    const {principal} = this.context;
    const {error} = this.state;

    console.log('AppRouting::render', location, error, principal);

    return (error || principal) ?
      <Switch>
        <Route exact path={'/'}>
          {principal && principal.login && principal.lock !== true ? <Redirect to={principal.realms[0]}/> : <Redirect to={'/welcome/login'}/>}
        </Route>
        principal && principal.login && principal.lock === true && <Route path="/welcome/login" component={Login}/>
        <Route path="/lock" component={Lock}/>
        <Route path="/welcome">
          {principal && principal.login ? <Redirect to={principal.realms[0]}/> : <WelcomeApp/>}
        </Route>
        {/*<Route path="/">*/}
        {/*  {principal && principal.login && principal.lock !== true? <Routes/> : this.redirectToLogin()}*/}
        {/*</Route>*/}
        {/*<Route path="/myaccount">*/}
        {/*  {principal && principal.login ? <MyAccountApp/> : this.redirectToLogin()}*/}
        {/*</Route>*/}
        <Route path="/mv">
          {principal && principal.login ? <WineryApp/> : this.redirectToLogin()}
        </Route>
        {/*<Route component={ErrorPage}/>*/}
      </Switch> : <></>

  }
}

export default withRouter(AppRouting);
