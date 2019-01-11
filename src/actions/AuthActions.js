import firebase from "firebase";
import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOGOUT_USER,
  LOGOUT_TEACHER,
} from "./types";
import { provider } from "../database";

export const usernameChanged = text => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginTeacher = (username, password) => {
  return dispatch => {
    if (
      username.substring(0, 3) !== "KSL" &&
      username.substring(0, 3) !== "ksl"
    ) {
      alert("This page is for teacher.");
      loginUserFail(dispatch);
      return;
    }
    username = username + "@camp.com";
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(user => {
        loginTeacherSuccess(dispatch);
      })
      .catch(error => {
        alert("Wrong username or password.");
        loginUserFail(dispatch);
        console.log(error);
      });
  };
};

export const loginUser = (username, password) => {
  return dispatch => {
    if (
      username.substring(0, 3) === "KSL" ||
      username.substring(0, 3) === "ksl"
    ) {
      alert("This page is for student.");
      loginUserFail(dispatch);
      return;
    }
    username = username + "@camp.com";
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(user => {
        loginUserSuccess(dispatch);
      })
      .catch(error => {
        alert("Wrong username or password.");
        loginUserFail(dispatch);
        console.log(error);
      });
  };
};

export function verifyAuth() {
  return function(dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      //console.log("user data:" + JSON.stringify(user));
      if (user) {
        if (
          user.email.substring(0, 3) === "KSL" ||
          user.email.substring(0, 3) === "ksl"
        ) {
          teacherAlreadyLogin(dispatch, user);
        } else {
          alreadyLogin(dispatch, user);
        }
      } else {
        userNotAlreadyLogin(dispatch);
        teacherNotAlreadyLogin(dispatch);
      }
    });
  };
}

const teacherAlreadyLogin = (dispatch, user) => {
  dispatch({
    type: "teacherAlreadylogin",
    payload: user
  });
};

const alreadyLogin = (dispatch, user) => {
  dispatch({
    type: "alreadylogin",
    payload: user
  });
};

const userNotAlreadyLogin = dispatch => {
  dispatch({
    type: "userNotAlreadyLogin"
  });
};

const teacherNotAlreadyLogin = dispatch => {
  dispatch({
    type: "teacherNotAlreadyLogin"
  });
};

const loginTeacherSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_TEACHER_SUCCESS,
    payload: user
  });
};

const loginTeacherFail = dispatch => {
  dispatch({ type: LOGIN_TEACHER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const logoutUser = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logout(dispatch);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const logoutTeacher = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logoutT(dispatch);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const logout = dispatch => {
  dispatch({ type: LOGOUT_USER });
};

const logoutT = dispatch => {
  dispatch({ type: LOGOUT_TEACHER });
};
