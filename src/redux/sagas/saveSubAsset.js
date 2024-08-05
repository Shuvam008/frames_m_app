import {
  Member_saveSubAsset,
  Member_saveSubAssetRejected,
  Member_saveSubAssetResolved,
} from "../actions/saveSubAssetActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSaveSubAsset(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/addSubAsset`;
    const method = "POST";
    console.log(" fetchSaveSubAsset data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSaveSubAsset data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_saveSubAssetResolved called >>>", response.data);
      yield put(Member_saveSubAssetResolved(response.data));
    } else {
      console.log(" Member_saveSubAssetResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_saveSubAssetRejected(e));
  }
}

function* fetchSaveSubAssetSaga() {
  yield takeLatest(Member_saveSubAsset, fetchSaveSubAsset);
}

export default fetchSaveSubAssetSaga;
