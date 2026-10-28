import {API} from '../constants';
import {Member_resetlogin} from '../redux/actions/loginActions';
import {clearAuth} from './authStorage';
import http from './http';

const API_URL = `${API}/mobile/login`;

export const logoutUser = async dispatch => {
  try {
    await http(`${API_URL}/logout`, 'POST');   // sends the token before it is cleared
  } catch (e) {}
  await clearAuth();
  dispatch(Member_resetlogin());
};