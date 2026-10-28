import {
  Member_subAssetListFetch,
  Member_subAssetListRejected,
  Member_subAssetListResolved,
} from "../actions/subAssetsAction";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSubAssetList(action) {
  try {
    console.log(" fetchsubAssetList action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/subAssets`;
    const url = `${API}/subAssets`;
    console.log(" fetchsubAssetList url >>>", url);
    // const url = "http://192.168.1.6:8086/api/assets";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchsubAssetList data >>>", response.data);
    yield put(Member_subAssetListResolved(response.data));
  } catch (e) {
    yield put(Member_subAssetListRejected(e));
  }
}

function* fetchsubAssetListSaga() {
  yield takeLatest(Member_subAssetListFetch, fetchSubAssetList);
}

export default fetchsubAssetListSaga;
