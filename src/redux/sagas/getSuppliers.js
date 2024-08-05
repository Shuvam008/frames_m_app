import {
  Member_getSuppliersFetch,
  Member_getSuppliersRejected,
  Member_getSuppliersResolved,
} from "../actions/getSuppliersActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSuppliers(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/suppliers`;
    const url = `${API}/suppliers`;
    // const url = "http://192.168.1.6:8086/api/suppliers";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSuppliers data >>>", response.data);
    yield put(Member_getSuppliersResolved(response.data));
  } catch (e) {
    yield put(Member_getSuppliersRejected(e));
  }
}

function* fetchSuppliersSaga() {
  yield takeLatest(Member_getSuppliersFetch, fetchSuppliers);
}

export default fetchSuppliersSaga;
