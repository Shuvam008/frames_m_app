import {
  Member_getLocationByIdFetch,
  Member_getLocationByIdRejected,
  Member_getLocationByIdResolved,
} from '../actions/getLocationByIdActions';
import {call, put, takeLatest} from 'redux-saga/effects';

import http from '../../API/http';
import {API} from '../../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchLocationById(action) {
  try {
    console.log(' fetchLocationById action >>>', action);
    // const url = `${process.env.REACT_APP_EAPIURL}/LocationById`;
    const url = `${API}/locationsById`;
    // const url = `http://192.168.1.6:8086/api/LocationById`;
    // const url = "http://192.168.1.2:8086/api/LocationById";
    const method = 'POST';
    const response = yield call(http, url, method, action.payload);
    console.log(' fetchLocationById data >>>', response.data);
    yield put(Member_getLocationByIdResolved(response.data));
  } catch (e) {
    yield put(Member_getLocationByIdRejected(e));
  }
}

function* fetchLocationByIdSaga() {
  yield takeLatest(Member_getLocationByIdFetch, fetchLocationById);
}

export default fetchLocationByIdSaga;
