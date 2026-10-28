import {
  Member_getUserListFetch,
  Member_getUserListRejected,
  Member_getUserListResolved,
} from "../actions/getUserListActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUsers(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/getAllUsers`;
    // const url = "http://192.168.1.2:8086/api/suppliers";
    const method = "post";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSuppliers data >>>", response.data);
    yield put(Member_getUserListResolved(response.data));
  } catch (e) {
    yield put(Member_getUserListRejected(e));
  }
}

function* fetchUsersSaga() {
  yield takeLatest(Member_getUserListFetch, fetchUsers);
}

export default fetchUsersSaga;
