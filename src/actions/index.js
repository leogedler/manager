import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

export const emailChanged = (text) => (
  {
    type: EMAIL_CHANGED,
    payload: text
  }
);

export const passwordChanged = (text) => (
  {
    type: PASSWORD_CHANGED,
    payload: text
  }
);

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });

  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    loginUserSuccess(dispatch, user);
  } catch (e) {
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      loginUserSuccess(dispatch, newUser);
    } catch (error) {
      console.log('error login/signup', error);
      loginUserFail(dispatch);
    }
  }
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};
