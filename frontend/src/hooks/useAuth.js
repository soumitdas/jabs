import React, { useContext, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import authApi from "../api/auth";
import userApi from "../api/user";
import useLocalStorage from "./useLocalStorage";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useLocalStorage("__auth_user", null);
  const [token, setToken] = useLocalStorage("__auth_token", null);
  const [tokenExp, setTokenExp] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    document.documentElement.classList.toggle("is-clipped");
    setModal(!modal);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setTokenExp(decodedToken.exp);
        if (decodedToken.exp < Date.now() / 1000) {
          throw new Error("Session Expired");
        }
      } catch (err) {
        signout();
        alert(`${err.message}\nPlease sign-in again`);
      }
    }
  }, [token]);

  const getToken = () => {
    if (tokenExp && tokenExp < Date.now() / 1000) {
      alert(`Session Expired\nPlease sign-in again`);
      signout();
    }
    return token;
  };

  const signin = ({ email, password, remember = false }) => {
    return authApi.signin(email, password, remember).then((resp) => {
      setUser(resp.data.user);
      setToken(resp.data.token);
      return resp.data;
    });
  };

  const googleSignin = (idToken) => {
    return authApi.googleSignin(idToken).then((resp) => {
      setUser(resp.data.user);
      setToken(resp.data.token);
      return resp.data;
    });
  };

  const signup = ({ name, email, password }) => {
    return authApi.signup(name, email, password).then((resp) => {
      if (resp.data.user && resp.data.token) {
        setUser(resp.data.user);
        setToken(resp.data.token);
      }
      return resp.data;
    });
  };

  const signout = () => {
    setUser(false);
    setToken(null);
    setTokenExp(null);
  };

  const changePassword = ({ oldPassword, newPassword }) => {
    return authApi.changePassword(oldPassword, newPassword, token);
  };

  const updateUserSelf = (data) => {
    return userApi.updateUserSelf(data, token).then((resp) => {
      setUser(resp.data);
      return resp.data;
    });
  };

  return {
    user,
    token: getToken(),
    signin,
    googleSignin,
    signup,
    signout,
    changePassword,
    updateUserSelf,
    modal,
    toggleModal,
  };
}
