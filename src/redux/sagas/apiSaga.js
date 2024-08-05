import { call, put, takeLatest } from 'redux-saga/effects';
import { setData, setError, setLoading } from '../reducer/apiSlice';

import {API_ACTIONS} from "../actions/actionConstant";
import axios from 'axios';

function* fetchData(action) {
  console.log(" fetchData Entry >>>");
  console.log(" fetchData action >>>",action);
  try {
    yield put(setLoading());
    const response = yield call(() => axios.get(action.payload.url));
    console.log(" fetchData success data >>>",response.data);
    yield put(setData(response.data));
    console.log(" fetchData Exit >>>");
  } catch (error) {
    console.log(" fetchData fail error >>>",error);
    yield put(setError(error.message));
  }
}

function* watchFetchDataSaga() {
  console.log(" watchFetchDataSaga Entry >>>");
  yield takeLatest(API_ACTIONS.API_FETCH_DATA, fetchData);
}

export default watchFetchDataSaga;

