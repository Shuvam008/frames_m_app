import {
    Member_Asset_maintenanceFetch,
    Member_Asset_maintenanceRejected, 
    Member_Asset_maintenanceResolved
} from "../actions/getAsset_maintenanceActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAsset_maintenance(action) {
  try {
    console.log(" fetchAsset_maintenance action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/assetMaintenances`;
    console.log(" fetchAsset_maintenance url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchAsset_maintenance data >>>", response.data);
    yield put(Member_Asset_maintenanceResolved(response.data));
  } catch (e) {
    yield put(Member_Asset_maintenanceRejected(e));
  }
}

function* fetchAsset_maintenanceSaga() {
    yield takeLatest(Member_Asset_maintenanceFetch, fetchAsset_maintenance)
}

export default fetchAsset_maintenanceSaga;