import axios from 'axios';

import { BACKEND_URL } from './consts';

export const request = (
  url: string,
  method = 'GET',
  body = null,
  headers = {}
) => {
  return new Promise((resolve, reject) => {
    axios({
      url: BACKEND_URL + url,
      method: method,
      data: body,
      headers: headers,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
