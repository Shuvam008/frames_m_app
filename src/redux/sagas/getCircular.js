import {
  Member_getCircularListFetch,
  Member_getCircularListRejected,
  Member_getCircularListResolved,
} from '../actions/getCircularListActions';
import {call, put, takeLatest} from 'redux-saga/effects';

import {API} from '../../constants';
import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchCircularList(action) {
  try {
    console.log(' fetchCircular action >>>', action);
    // const url = `${process.env.REACT_APP_EAPIURL}/getAllCircularList`;
    const url = `${API}/getCircularNoticeList`;
    // const url = "http://192.168.1.2:8086/api/Circular";
    const method = 'post';
    const response = yield call(http, url, method, action.payload);
    console.log(' fetchCircular data >>>', response.data);
    yield put(Member_getCircularListResolved(response.data));
  } catch (e) {
    yield put(Member_getCircularListRejected(e));
  }
}

function* fetchCircularListSaga() {
  yield takeLatest(Member_getCircularListFetch, fetchCircularList);
}

export default fetchCircularListSaga;
