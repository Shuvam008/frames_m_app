import {clearAuth, emitSessionExpired, getToken} from './authStorage';

import axios from 'axios';

const http = async (url, method, payload) => {
  const isLogin = url.endsWith('/login');
  const token = getToken();

  try {
    const config = {
      url,
      method,
      headers: token && !isLogin ? {Authorization: `Bearer ${token}`} : {},
      responseType: 'json',
      responseEncoding: 'utf8',
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      config.data = payload;
    }
    return await axios(config);
  } catch (error) {
    const res = {status: 800, data: {}};
    if (error.response) {
      res.status = error.response.status;
      res.data = error.response.data;
      // 401 on anything except login = session revoked or expired
      if (res.status === 401 && !isLogin && token) {
        await clearAuth();
        emitSessionExpired(error.response.data?.message);
      }
    } else {
      console.log('http() error >>>', error.message);
    }
    return res;
  }
};

export default http;
