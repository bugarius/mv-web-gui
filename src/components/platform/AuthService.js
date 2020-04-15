import { AuthApi } from "./AuthApi";
import {FromApiConverter} from "../../services/Converters";

export const AuthService = {
  getUserInfo: () => {
    return AuthApi.get()
      .then(FromApiConverter.convertPrincipal);
  },

  login: (login, password) => {
    return AuthApi.login(login, password)
      .then(FromApiConverter.convertPrincipal);
  },

  logout: () => {
    return AuthApi.logout()
      .then(FromApiConverter.convertPrincipal);
  },

  recover: (email) => {
    return AuthApi.recover(email);
  },

  validate: (token) => {
    return AuthApi.validate(token)
      .then(FromApiConverter.convertPrincipal);
  },

  reset: (token, password) => {
    return AuthApi.reset(token, password)
      .then(FromApiConverter.convertPrincipal);
  }

};