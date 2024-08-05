import axios from 'axios';

const http = async (url, method, payload) => {
  try {
    console.log('http() payload >>>', payload);
    console.log('http() url is >>>', url);
    const config = {
      url,
      method,
      responseType: 'json',
      responseEncoding: 'utf8',
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      onDownloadProgress: function (progressEvent) {
        console.log('Download progress >>>', progressEvent);
      },
      onUploadProgress: function (progressEvent) {
        console.log('Upload progress >>>', progressEvent);
      },
    };

    // Conditionally add the payload for appropriate methods
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      config.data = payload;
    }

    const res = await axios(config);
    // console.log('http() res >>>', res);

    if (res.status === 200) {
      // console.log('http() res.data >>>', res.data);
      return res;
    } else {
      // console.error('http() non-200 response >>>', res);
      return res;
    }
  } catch (error) {
    const res = {
      status: 800,
      data: {},
    };

    if (error.response) {
      console.error('http() error response >>>', error.response);
      res.status = error.response.status;
      res.data = error.response.data;
    } else if (error.request) {
      console.error('http() no response >>>', error.request);
    } else {
      console.error('http() error setting up request >>>', error.message);
    }

    console.error('http() error >>>', error);
    return res;
  }
};

export default http;
