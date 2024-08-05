import {
  Member_createAsset_maintenance,
  Member_createAsset_maintenanceRejected,
  Member_createAsset_maintenanceResolved,
} from "../actions/createAsset_maintenanceActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* createAsset_maintenance(action) {
  try {
    console.log(" fetchcreateAsset_maintenance action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/createMaintenanceService`;
    console.log(" fetchcreateAsset_maintenance url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "post";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchcreateAsset_maintenance data >>>", response.data);
    yield put(Member_createAsset_maintenanceResolved(response.data));
  } catch (e) {
    yield put(Member_createAsset_maintenanceRejected(e));
  }
}

function* fetchcreateAsset_maintenanceSaga() {
    yield takeLatest(Member_createAsset_maintenance, createAsset_maintenance)
}

export default fetchcreateAsset_maintenanceSaga;