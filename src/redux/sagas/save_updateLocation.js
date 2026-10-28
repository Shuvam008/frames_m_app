import {
  Member_save_updateLocation,
  Member_save_updateLocationRejected,
  Member_save_updateLocationResolved,
} from "../actions/save_updateLocationActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSave_updateLocation(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/addUpdateLocation`;
    const method = "POST";
    console.log(" fetchSaveSubAsset data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSaveSubAsset data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_save_updateLocationResolved called >>>", response.data);
      yield put(Member_save_updateLocationResolved(response.data));
    } else {
      console.log(" Member_save_updateLocationResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_save_updateLocationRejected(e));
  }
}

function* fetchSave_updateLocationSaga() {
  yield takeLatest(Member_save_updateLocation, fetchSave_updateLocation);
}

export default fetchSave_updateLocationSaga;
