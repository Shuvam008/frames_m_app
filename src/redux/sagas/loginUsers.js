import {
  Member_login,
  Member_loginRejected,
  Member_loginResolved,
} from "../actions/loginActions";
import { call, put, takeLatest } from "redux-saga/effects";

import {API} from '../../constants';
import http from '../../API/http';
import {saveAuth} from '../../API/authStorage';

// import Config from 'react-native-config';
// import {REACT_APP_EAPIURL} from '@env';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchlogin(action) {
  try {
    // console.log('API URL >>>>>>>>>>>>>>>>:', API);
    console.log(" fetchSuppliers action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/login`;
    const url = `${API}/mobile/login`;
    // const url = `http://192.168.1.6:8086/api/login`;
    console.log('API URL:', url);
    const method = "POST";
    console.log(" fetchlogin data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchlogin data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      yield call(saveAuth, response.data);
      yield put(Member_loginResolved(response.data));
    } else {
      yield put(Member_loginRejected({message: response.data?.message || 'Login failed'}));
    }
    
  } catch (e) {
    yield put(Member_loginRejected(e));
  }
}

function* fetchloginSaga() {
  yield takeLatest(Member_login, fetchlogin);
}

export default fetchloginSaga;
