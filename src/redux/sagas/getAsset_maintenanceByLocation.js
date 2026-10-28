import {
  Member_Asset_maintenanceBylocationFetch,
  Member_Asset_maintenanceBylocationRejected,
  Member_Asset_maintenanceBylocationResolved,
} from '../actions/getAsset_maintenanceBylocationActions';

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAsset_maintenanceBylocation(action) {
  try {
    console.log(" fetchAsset_maintenanceBylocation action >>>", action);
    const url = `${API}/asset_maintenanceByLocationId`;
    console.log(" fetchAsset_maintenanceBylocation url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "post";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchAsset_maintenanceBylocation data >>>", response.data);
    yield put(Member_Asset_maintenanceBylocationResolved(response.data));
  } catch (e) {
    yield put(Member_Asset_maintenanceBylocationRejected(e));
  }
}

function* fetchAsset_maintenanceBylocationSaga() {
    yield takeLatest(Member_Asset_maintenanceBylocationFetch, fetchAsset_maintenanceBylocation)
}

export default fetchAsset_maintenanceBylocationSaga;