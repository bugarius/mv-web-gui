import React, {useMemo, useState} from 'react';
import * as PropTypes from 'prop-types';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
  const [principal, setPrincipal] = useState(null);
  const [lock, setLock] = useState(false);

  const actions = {
    mainRole: principal?.realms?.[0],
    isAdmin: principal?.hasAccess?.('/account'),
    isUser: principal?.hasAccess?.('/mv')
  };

  const providerValue = useMemo(() => ({principal, setPrincipal, actions, lock, setLock}), [principal, setPrincipal, actions, lock, setLock]);

  return (
          <AuthContext.Provider value={providerValue}>
            {children}
          </AuthContext.Provider>
  )
};

AuthProvider.propTypes = {
  children: PropTypes.any
};

export default AuthProvider;