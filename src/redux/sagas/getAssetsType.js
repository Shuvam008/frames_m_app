import {
  Member_getAssetTypeFetch,
  Member_getAssetTypeRejected,
  Member_getAssetTypeResolved,
} from "../actions/getAssetsTypeAction";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAssetType(action) {
  try {
    console.log(" fetchAssetType action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/assetsType`;
    const url = `${API}/assetsType`;
    // const url = "http://192.168.1.6:8086/api/assetsType";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchAssetType data >>>", response.data);
    yield put(Member_getAssetTypeResolved(response.data));
  } catch (e) {
    yield put(Member_getAssetTypeRejected(e));
  }
}

function* fetchAssetTypeSaga() {
  yield takeLatest(Member_getAssetTypeFetch, fetchAssetType);
}

export default fetchAssetTypeSaga;
