import {
  Member_getAssetByLocationFetch,
  Member_getAssetByLocationRejected,
  Member_getAssetByLocationResolved,
} from '../actions/getAssetsByLocationActions';
import {call, put, takeLatest} from 'redux-saga/effects';

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAssetByLocation(action) {
  try {
    console.log(' fetchgetAssetByLocation action >>>', action);
    // const url = `${process.env.REACT_APP_EAPIURL}/assets`;
    const url = `${API}/assetsByLocation`;
    // const url = `http://192.168.1.6:8086/api/assets`;
    console.log(' fetchgetAssetByLocation url >>>', url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = 'POST';
    const response = yield call(http, url, method, action.payload);
    console.log(' fetchgetAssetByLocation data >>>', response.data);
    yield put(Member_getAssetByLocationResolved(response.data));
  } catch (e) {
    yield put(Member_getAssetByLocationRejected(e));
  }
}

function* fetchgetAssetByLocationSaga() {
  yield takeLatest(Member_getAssetByLocationFetch, fetchAssetByLocation);
}

export default fetchgetAssetByLocationSaga;
