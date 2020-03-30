import React from 'react';

export const AuthContext = React.createContext();


export class AuthProvider extends React.Component {

  constructor(props)
  {
    super(props);
    console.log('AuthProvider::constructor', props);

    this.state = {
      setPrincipal: this.setPrincipal,
    };
  }

  setPrincipal = (principal) => {
    console.log('AuthProvider::setPrincipal', principal);

    this.setState(() => {
      return {principal: principal}
    });
  };

  render()
  {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthConsumer = AuthContext.Consumer;