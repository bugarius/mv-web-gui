/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
// App Routes
// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import AppRouting from "./components/platform/AppRouting";
import ErrorProvider from "./components/error/ErrorContext";
import ValidationSchemaProvider from "./components/winery/validation/ValidationSchemaContext";
import {FormContext, useForm} from "react-hook-form";
import AuthProvider from "./components/platform/AuthContext";
import ResponsiveProvider from "./components/platform/ResponsiveContext";


const App = () => {

    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only

    // const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

    const methods = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        validateCriteriaMode: "all",
        submitFocusError: true,
    });

    return (
            <AuthProvider>
                <ErrorProvider>
                    <ValidationSchemaProvider>
                        <ResponsiveProvider>
                            <FormContext {...methods} >
                                <BrowserRouter>
                                    <AppRouting/>
                                </BrowserRouter>
                            </FormContext>
                        </ResponsiveProvider>
                    </ValidationSchemaProvider>
                </ErrorProvider>
            </AuthProvider>
    )
            ;
};

export default App;
