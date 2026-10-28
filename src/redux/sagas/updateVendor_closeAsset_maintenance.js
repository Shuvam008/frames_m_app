import {
  Member_updateVendor_closeAsset_maintenance,
  Member_updateVendor_closeAsset_maintenanceRejected,
  Member_updateVendor_closeAsset_maintenanceResolved,
} from "../actions/updateVendor_closeAsset_maintenanceActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateVendor_closeAsset_maintenance(action) {
  try {
    console.log(" fetchupdateVendor_closeAsset_maintenance action >>>", action);
    const url = `${API}/updateMaintenanceService/vendor_close`;
    console.log(" fetchupdateVendor_closeAsset_maintenance url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "patch";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchupdateVendor_closeAsset_maintenance data >>>", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      yield put(Member_updateVendor_closeAsset_maintenanceResolved(response.data));
    } else {
      console.log(
        " Member_updateLocation_closeAsset_maintenanceResolved not called >>>",
        response.data
      );
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
  } catch (e) {
    yield put(Member_updateVendor_closeAsset_maintenanceRejected(e));
  }
}

function* fetchupdateVendor_closeAsset_maintenanceSaga() {
    yield takeLatest(Member_updateVendor_closeAsset_maintenance, updateVendor_closeAsset_maintenance)
}

export default fetchupdateVendor_closeAsset_maintenanceSaga;