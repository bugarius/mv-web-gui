import React, {useContext, useMemo, useState} from "react";
import * as PropTypes from 'prop-types';

const ValidationSchemaContext = React.createContext(null);

export const useValidationSchemaContext = () => useContext(ValidationSchemaContext);

const ValidationSchemaProvider = ({children}) => {
    const [schema, setSchema] = useState({});
    const [currentSchema, setCurrentSchema] = useState({});

    const providerValues = useMemo(() => ({
        schema,
        setSchema,
        currentSchema,
        setCurrentSchema
    }), [schema, setSchema, currentSchema, setCurrentSchema]);

    return (
            <ValidationSchemaContext.Provider value={providerValues}>
                {children}
            </ValidationSchemaContext.Provider>
    )
};

ValidationSchemaProvider.propTypes = {
  children: PropTypes.any
};

export default ValidationSchemaProvider;