import {
  Member_save_updateSupplier,
  Member_save_updateSupplierRejected,
  Member_save_updateSupplierResolved,
} from "../actions/save_updateSupplierActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSave_updateSupplier(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/addUpdateSuppliers`;
    const method = "POST";
    console.log(" fetchSaveSubAsset data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSaveSubAsset data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_save_updateSupplierResolved called >>>", response.data);
      yield put(Member_save_updateSupplierResolved(response.data));
    } else {
      console.log(" Member_save_updateSupplierResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_save_updateSupplierRejected(e));
  }
}

function* fetchSave_updateSupplierSaga() {
  yield takeLatest(Member_save_updateSupplier, fetchSave_updateSupplier);
}

export default fetchSave_updateSupplierSaga;
