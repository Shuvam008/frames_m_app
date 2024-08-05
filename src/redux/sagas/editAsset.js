import {
  Member_editAsset,
  Member_editAssetRejected,
  Member_editAssetResolved,
} from "../actions/editAssetAction";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetcheditAsset(action) {
  try {
    console.log(" fetcheditAsset action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/updateAsset`;
    const method = "POST";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetcheditAsset data >>>", response.data);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_editAssetResolved called >>>", response.data);
      yield put(Member_editAssetResolved(response.data));
    } else {
      console.log(" Member_editAssetRejected called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    
  } catch (e) {
    yield put(Member_editAssetRejected(e));
  }
}

function* fetcheditAssetSaga() {
  yield takeLatest(Member_editAsset, fetcheditAsset);
}

export default fetcheditAssetSaga;
