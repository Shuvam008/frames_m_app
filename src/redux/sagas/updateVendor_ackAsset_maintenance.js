import {
    Member_updateVendor_ackAsset_maintenance,
    Member_updateVendor_ackAsset_maintenanceRejected, 
    Member_updateVendor_ackAsset_maintenanceResolved
} from "../actions/updateVendor_ackAsset_maintenanceActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateVendor_ackAsset_maintenance(action) {
  try {
    console.log(" fetchupdateVendor_ackAsset_maintenance action >>>", action);
    const url = `${API}/updateMaintenanceService/vendor_ack`;
    console.log(" fetchupdateVendor_ackAsset_maintenance url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "patch";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchupdateVendor_ackAsset_maintenance data >>>", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      yield put(Member_updateVendor_ackAsset_maintenanceResolved(response.data));
    } else {
      console.log(
        " Member_updateLocation_closeAsset_maintenanceResolved not called >>>",
        response.data
      );
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
  } catch (e) {
    yield put(Member_updateVendor_ackAsset_maintenanceRejected(e));
  }
}

function* fetchupdateVendor_ackAsset_maintenanceSaga() {
    yield takeLatest(Member_updateVendor_ackAsset_maintenance, updateVendor_ackAsset_maintenance)
}

export default fetchupdateVendor_ackAsset_maintenanceSaga;