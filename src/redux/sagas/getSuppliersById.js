import {
  Member_getSupplierByIdFetch,
  Member_getSupplierByIdRejected,
  Member_getSupplierByIdResolved,
} from '../actions/getSupplierByIdActions';
import {call, put, takeLatest} from 'redux-saga/effects';

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSupplierById(action) {
  try {
    console.log(' fetchSupplierById action >>>', action);
    // const url = `${process.env.REACT_APP_EAPIURL}/SupplierById`;
    const url = `${API}/suppliersById`;
    // const url = "http://192.168.1.6:8086/api/SupplierById";
    const method = 'POST';
    const response = yield call(http, url, method, action.payload);
    console.log(' fetchSupplierById data >>>', response.data);
    yield put(Member_getSupplierByIdResolved(response.data));
  } catch (e) {
    yield put(Member_getSupplierByIdRejected(e));
  }
}

function* fetchSupplierByIdSaga() {
  yield takeLatest(Member_getSupplierByIdFetch, fetchSupplierById);
}

export default fetchSupplierByIdSaga;

