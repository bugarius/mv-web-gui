import React from 'react';
import 'loaders.css/loaders.css';
import 'spinkit/css/spinkit.css';

const ComponentWrapper = ({loading, disabled, children}) => {

    return (
            <>
                {
                    disabled ?
                            <div>{children}</div>
                            :
                            <div className={loading ? "whirl oval right" : ""}>
                                {children}
                            </div>
                }
            </>
    );
};

export default ComponentWrapper;
