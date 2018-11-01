import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_CLEAR
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    try {
      await firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift });

      dispatch({
        type: EMPLOYEE_CREATE
      });

      Actions.pop();
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({
          type: EMPLOYEES_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    try {
      await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift });

      dispatch({
        type: EMPLOYEE_SAVE_SUCCESS
      });

      Actions.pop();
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return async () => {
    try {
      await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove();
      Actions.pop();
    } catch (error) {
      console.log('error', error);
    }
  };
};

export const employeeClearForm = () => {
  return {
    type: EMPLOYEE_CLEAR
  };
};
