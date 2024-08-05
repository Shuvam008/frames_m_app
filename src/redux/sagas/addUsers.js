import {
  Member_addUser,
  Member_addUserRejected,
  Member_addUserResolved,
} from "../actions/addUserAction";
import { call, put, takeLatest } from "redux-saga/effects";

import http from "../../API/http";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchaddUser(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/addUsers`;
    const method = "POST";
    console.log(" fetchaddUser data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchaddUser data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_addUserResolved called >>>", response.data);
      yield put(Member_addUserResolved(response.data));
    } else {
      console.log(" Member_addUserResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_addUserRejected(e));
  }
}

function* fetchaddUserSaga() {
  yield takeLatest(Member_addUser, fetchaddUser);
}

export default fetchaddUserSaga;
