import {
  Member_getAssetBySupplierFetch,
  Member_getAssetBySupplierRejected,
  Member_getAssetBySupplierResolved,
} from '../actions/getAssetsBySuppliersActions';
import {call, put, takeLatest} from 'redux-saga/effects';

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAssetBySupplier(action) {
  try {
    console.log(' fetchgetAssetBySupplier action >>>', action);
    // const url = `${process.env.REACT_APP_EAPIURL}/assets`;
    const url = `${API}/assetsBySupplier`;
    // const url = `http://192.168.1.6:8086/api/assets`;
    console.log(' fetchgetAssetBySupplier url >>>', url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = 'POST';
    const response = yield call(http, url, method, action.payload);
    console.log(' fetchgetAssetBySupplier data >>>', response.data);
    yield put(Member_getAssetBySupplierResolved(response.data));
  } catch (e) {
    yield put(Member_getAssetBySupplierRejected(e));
  }
}

function* fetchgetAssetBySupplierSaga() {
  yield takeLatest(Member_getAssetBySupplierFetch, fetchAssetBySupplier);
}

export default fetchgetAssetBySupplierSaga;
