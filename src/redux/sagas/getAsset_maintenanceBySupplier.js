import {
  Member_Asset_maintenanceBySupplierFetch,
  Member_Asset_maintenanceBySupplierRejected,
  Member_Asset_maintenanceBySupplierResolved,
} from '../actions/getAsset_maintenanceBySupplierActions';

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAsset_maintenanceBySupplier(action) {
  try {
    console.log(" fetchAsset_maintenanceBySupplier action >>>", action);
    const url = `${API}/asset_maintenanceBySupplierId`;
    console.log(" fetchAsset_maintenanceBySupplier url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = 'post';
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchAsset_maintenanceBySupplier data >>>", response.data);
    yield put(Member_Asset_maintenanceBySupplierResolved(response.data));
  } catch (e) {
    yield put(Member_Asset_maintenanceBySupplierRejected(e));
  }
}

function* fetchAsset_maintenanceBySupplierSaga() {
    yield takeLatest(Member_Asset_maintenanceBySupplierFetch, fetchAsset_maintenanceBySupplier)
}

export default fetchAsset_maintenanceBySupplierSaga;