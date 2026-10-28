import {Member_getAssetListFetch, Member_getAssetListRejected, Member_getAssetListResolved} from "../actions/getAssetListActions";
import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAssetList(action) {
    try {
        console.log(" fetchgetAssetList action >>>",action);
        // const url = `${process.env.REACT_APP_EAPIURL}/assets`;
        const url = `${API}/assets`;
        // const url = `http://192.168.1.6:8086/api/assets`;
        console.log(" fetchgetAssetList url >>>", url);
        // const url = "http://192.168.1.2:8086/api/assets";
        const method="GET";
        const response = yield call(http,url,method, action.payload);
        console.log(" fetchgetAssetList data >>>", response.data);
        yield put(Member_getAssetListResolved(response.data))
    } catch (e) {
        yield put(Member_getAssetListRejected(e))
    }
}

function* fetchgetAssetListSaga() {
    yield takeLatest(Member_getAssetListFetch, fetchAssetList)
}

export default fetchgetAssetListSaga;