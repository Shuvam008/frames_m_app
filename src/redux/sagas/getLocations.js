import {
  Member_getLocationsFetch,
  Member_getLocationsRejected,
  Member_getLocationsResolved,
} from "../actions/getLocationsActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchLocations(action) {
  try {
    console.log(" fetchLocations action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/locations`;
    const url = `${API}/locations`;
    // const url = `http://192.168.1.6:8086/api/locations`;
    // const url = "http://192.168.1.2:8086/api/locations";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchLocations data >>>", response.data);
    yield put(Member_getLocationsResolved(response.data));
  } catch (e) {
    yield put(Member_getLocationsRejected(e));
  }
}

function* fetchLocationsSaga() {
  yield takeLatest(Member_getLocationsFetch, fetchLocations);
}

export default fetchLocationsSaga;
