import {
  Member_sendMail,
  Member_sendMailRejected,
  Member_sendMailResolved,
} from "../actions/sendMailActions";
import { call, put, takeLatest } from "redux-saga/effects";

import {API} from '../../constants';
import http from "../../API/http";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSendMail(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    // const url = `${process.env.REACT_APP_EAPIURL}/send-email`;
    const url = `${API}/send-email`;
    const method = "POST";
    console.log(" fetchsendMail data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchsendMail data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_sendMailResolved called >>>", response.data);
      yield put(Member_sendMailResolved(response.data));
    } else {
      console.log(" Member_sendMailResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    console.log("e >>>>>>>>>",e)
    yield put(Member_sendMailRejected({data:{to:'not found'}}));
  }
}

function* fetchSendMailSaga() {
  yield takeLatest(Member_sendMail, fetchSendMail);
}

export default fetchSendMailSaga;
