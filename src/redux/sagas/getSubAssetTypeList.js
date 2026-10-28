import {
  Member_subAssetTypeFetch,
  Member_subAssetTypeRejected,
  Member_subAssetTypeResolved,
} from "../actions/subAssetsTypeActions";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSubAssetType(action) {
  try {
    console.log(" fetchsubAssetType action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/subAssetsTypes`;
    console.log(" fetchsubAssetType url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchsubAssetType data >>>", response.data);
    yield put(Member_subAssetTypeResolved(response.data));
  } catch (e) {
    yield put(Member_subAssetTypeRejected(e));
  }
}

function* fetchsubAssetTypeSaga() {
  yield takeLatest(Member_subAssetTypeFetch, fetchSubAssetType);
}

export default fetchsubAssetTypeSaga;
