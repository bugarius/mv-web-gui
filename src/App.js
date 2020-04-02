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
import AppRouting from "./platform/AppRouting";
import ErrorProvider from "./error/ErrorContext";
import ValidationSchemaProvider from "./winery/validation/ValidationSchemaContext";
import {FormContext, useForm} from "react-hook-form";
import AuthProvider from "./platform/AuthContext";


const App = () => {

    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global PUBLIC_URL */
    const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

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
                        <FormContext {...methods} >
                            <BrowserRouter basename={basename}>
                                <AppRouting/>
                            </BrowserRouter>
                        </FormContext>
                    </ValidationSchemaProvider>
                </ErrorProvider>
            </AuthProvider>
    )
            ;
};

export default App;
