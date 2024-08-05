import {
  Member_login,
  Member_loginRejected,
  Member_loginResolved,
} from "../actions/loginActions";
import { call, put, takeLatest } from "redux-saga/effects";
import http from '../../API/http';
import {API} from '../../constants';

// import Config from 'react-native-config';
// import {REACT_APP_EAPIURL} from '@env';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchlogin(action) {
  try {
    // console.log('API URL >>>>>>>>>>>>>>>>:', API);
    console.log(" fetchSuppliers action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/login`;
    const url = `${API}/login`;
    // const url = `http://192.168.1.6:8086/api/login`;
    console.log('API URL:', url);
    const method = "POST";
    console.log(" fetchlogin data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchlogin data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_loginResolved called >>>", response.data);
      yield put(Member_loginResolved(response.data));
    } else {
      console.log(" Member_loginResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_loginRejected(e));
  }
}

function* fetchloginSaga() {
  yield takeLatest(Member_login, fetchlogin);
}

export default fetchloginSaga;
