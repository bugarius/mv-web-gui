import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

import FormValidator from '../forms/FormValidator.js';
import {AuthService} from "../platform/AuthService";
import {AuthContext} from "../platform/AuthContext";

class Login extends Component {

    static contextType = AuthContext;

    state = {
        formLogin: {
            email: '',
            password: ''
        }
    }

     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */
    validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                [input.name]: value,
                errors: {
                    ...this.state[form.name].errors,
                    [input.name]: result
                }
            }
        });

    }

    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName));
        const {formLogin: {email, password}} = this.state;
        e.preventDefault()

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        this.setState({
            [form.name]: {
                ...this.state[form.name],
                errors
            }
        });

        !hasError && AuthService.login(email, password)
                .then(this.handleLogin)
                .catch(res => console.log(res));
    }

    handleLogin = (principal) => {
        console.log('LoginForm::handleLogin', principal);
        this.context.setPrincipal(principal);

        this.setState(() => ({
            loading: false,
            showErrors: false,
            failed: !principal.login,
        }));
        principal?.login && this.props.history.push(principal.realms[0]);
    };

    /* Simplify error check */
    hasError = (formName, inputName, method) => {
        return  this.state[formName] &&
                this.state[formName].errors &&
                this.state[formName].errors[inputName] &&
                this.state[formName].errors[inputName][method]
    }

    render() {
        return (
            <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                    <div className="card-header text-center bg-dark">
                        <div>
                            {/*<img className="block-center rounded" src="img/logo.png" alt="Logo"/>*/}
                            Moja Winnica
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="text-center py-2">ZALOGUJ SIĘ ABY KONTYNUOWAĆ</p>
                        <form className="mb-3" name="formLogin" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        className="border-right-0"
                                        placeholder="Enter email"
                                        invalid={this.hasError('formLogin','email','required')||this.hasError('formLogin','email','email')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={this.state.formLogin.email}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-envelope"></em>
                                        </span>
                                    </div>
                                    { this.hasError('formLogin','email','required') && <span className="invalid-feedback">Pole wymagane</span> }
                                    { this.hasError('formLogin','email','email') && <span className="invalid-feedback">Podaj prawidłowy email</span> }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <Input type="password"
                                        id="id-password"
                                        name="password"
                                        className="border-right-0"
                                        placeholder="Password"
                                        invalid={this.hasError('formLogin','password','required')}
                                        onChange={this.validateOnChange}
                                        data-validate='["required"]'
                                        value={this.state.formLogin.password}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    <span className="invalid-feedback">Pole wymagane</span>
                                </div>
                            </div>
                            { this.state.failed && <small className="text-danger">Nieprawidłowy login lub hasło</small> }
                            <div className="clearfix">
                                {/*<div className="checkbox c-checkbox float-left mt-0">*/}
                                {/*    <label>*/}
                                {/*        <input type="checkbox" value="" name="remember"/>*/}
                                {/*        <span className="fa fa-check"></span>Remember Me</label>*/}
                                {/*</div>*/}
                                <div className="float-right">
                                    <Link to="recover" className="text-muted">Zapomniałeś hasła?</Link>
                                </div>
                            </div>
                            <button className="btn btn-block btn-primary mt-3" type="submit">Zaloguj</button>
                        </form>
                        <p className="pt-3 text-center">Chcesz dołączyć?</p>
                        <Link to="register" className="btn btn-block btn-secondary">Zarejestruj się teraz</Link>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2020</span>
                    <span className="mx-2">-</span>
                    <span>Moja Winnica</span>
                    <br/>
                    <span>Aplikacja do zarządzania produkcją wina z upraw własnych</span>
                </div>
            </div>
        );
    }
}

export default Login;
