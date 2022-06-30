import {
  logoutFireBase,
  registerUserWithEmailAndPasword,
  signInWithGoogle,
  startLoginWithEmailAndPassword
} from "../../FireBaseConfig/provider";

import { checkingCredentials, logout, login } from "../../Store/Auth";
import { clearNotesLogOut } from '../Journal'

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startGithubSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startCreatingWithEmailAndPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPasword({ email, password, displayName });
    if (!ok) return dispatch(logout({ errorMessage }))
    dispatch(login({ uid, displayName, email, photoURL }))
  };
};

export const startLoginUserWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const res = await startLoginWithEmailAndPassword({ email, password })
    console.log(res)
    if (!res.ok) return dispatch(logout(res))
    dispatch(login(res))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await dispatch(logoutFireBase)
    dispatch(clearNotesLogOut())
    dispatch(logout())
  }
}