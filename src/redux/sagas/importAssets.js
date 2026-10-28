import {
  Member_importAssetsRejected,
  Member_importAssetsResolved,
  Member_importAssets,
} from "../actions/importAssetsActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchimportAssets(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    // const url=`${process.env.EAPI_URL}/api/assets`;
    const url = `${process.env.REACT_APP_EAPIURL}/AssetsFromExcel`;
    // const url = "http://192.168.1.17:8086/api/addAsset";
    const method = "POST";
    console.log(" fetchSaveAsset data >>>", action.payload);
    // const formData = new FormData();
    // formData.append("file", action.payload);
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSaveAsset data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_saveAssetResolved called >>>", response.data);
      yield put(Member_importAssetsResolved(response.data));
    } else {
      console.log(" Member_saveAssetResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
    }
  } catch (e) {
    yield put(Member_importAssetsRejected(e));
  }
}

function* fetchimportAssetsSaga() {
  yield takeLatest(Member_importAssets, fetchimportAssets);
}

export default fetchimportAssetsSaga;
