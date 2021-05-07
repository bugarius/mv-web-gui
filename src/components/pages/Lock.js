import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthContext} from "../platform/AuthContext";
import {AuthService} from "../platform/AuthService";
import {StringValueValidator} from "../../services/Validators";

const Lock = () => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const {principal, setLock} = useContext(AuthContext);
    const login = principal?.login
    const avatar = principal?.avatarUrl;
    const history = useHistory();

    useEffect(() => {
        if (!login)
        {
            history.push("/welcome/login")
        }
    }, [login, history])

    useEffect(() => {
        setLock(true);
        AuthService.logout();
        return () => setLock(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const unlock = (e) => {
        e.preventDefault();
        AuthService.login(login, password)
                .then(res => {
                    if (res?.login)
                    {
                        setLock(false);
                        setError(false);
                        history.push(history?.location?.state?.from || `/`)
                    }
                    else
                    {
                        setError(true);
                    }
                })
                .catch(() => setError(true));
    };

    return (
            <div className="abs-center wd-xl">
                <div className="d-flex justify-content-center">
                    <div className="p-2">
                        <img className="img-fluid img-thumbnail rounded-circle" src={avatar} alt="Avatar"
                             width="60" height="60"/>
                    </div>
                </div>
                <div className="card b0">
                    <div className="card-body">
                        <p className="text-center">Wprowadź hasło aby odblokować</p>
                        <form>
                            <div className="form-group">
                                <div className="input-group with-focus">
                                    <input className={"form-control border-right-0 " + (error ? 'is-invalid' : '')}
                                           id="exampleInputEmail1"
                                           type="password"
                                           placeholder="Wprowadź hasło"
                                           autoComplete="off"
                                           required
                                           onChange={e => setPassword(e.target.value)}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                </div>
                                {error &&
                                <div className="text-danger">Hasło nieprawidłowe</div>
                                }
                            </div>
                            <div className="d-flex">
                                <div className="mt-1">
                                    <Link to="recover" className="text-muted">
                                        <small>Zapomniałeś hasła?</small>
                                    </Link>
                                </div>
                                <div className="ml-auto">
                                    <button onClick={unlock} disabled={StringValueValidator.isBlank(password)} className="btn btn-sm btn-primary">Odblokuj
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="p-3 text-center">
                    <span className="mr-2">&copy;</span>
                    <span>2021</span>
                    <span className="mx-2">-</span>
                    <span>Moja Winnica</span>
                    <br/>
                    <span>Aplikacja do zarządzania produkcją wina z upraw własnych</span>
                </div>
            </div>
    );
};

export default Lock;

