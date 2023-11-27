import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useStore} from 'react-redux';
import {CLEAN_STATE} from 'shared/constants/ActionTypes';
import {axiosInstance} from './Request';
const cancelTokens: {[k: string]: CancelTokenSource | null} = {};
let cancelTokensIndex = 'DEFAULT';

/**
 * Flag trang thai co dang chay refresh token hay khong
 */
let isRefreshing = false;

/**
 * Queue luu lai nhung request bi loi 401 de thuc hien xu ly sau khi refresh new token
 */
let failedQueue: any = [];

export class AxiosRequestCancleToken {
  static cancel(key: string = 'DEFAULT') {
    cancelTokens?.[key]?.cancel();
  }

  static setIndex(key: string = 'DEFAULT') {
    cancelTokensIndex = key;
  }

  static getToken() {
    if (!cancelTokens[cancelTokensIndex]) this.generate(cancelTokensIndex);
    return cancelTokens?.[cancelTokensIndex]?.token;
  }

  static generate(key: string = 'DEFAULT') {
    const source = axios.CancelToken.source();
    cancelTokens[key || 'DEFAULT'] = source;
    this.setIndex(key);
  }
}

const useRequestInterceptor = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const apiRequestInterceptor = (config: AxiosRequestConfig) => {
      const {accessToken} = store.getState().auth;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.cancelToken = AxiosRequestCancleToken.getToken();
      AxiosRequestCancleToken.setIndex();
      return config;
    };

    const apiSuccessResponseInterceptor = (
      response: AxiosResponse,
    ): AxiosResponse['data'] => {
      return response;
    };

    const apiFailureResponseInterceptor = async (error: any) => {
      const {response = {}} = error;
      const {data, status} = response;
      const originalRequest = error.config;
      if (status === 401 && !originalRequest._retry) {
        dispatch({type: CLEAN_STATE});
      }
      const message = data ? data.error || data.message : '';
      return Promise.reject({...error, message});
    };

    const reqInterceptor = axiosInstance.interceptors.request.use(
      apiRequestInterceptor,
    );
    const resInterceptor = axiosInstance.interceptors.response.use(
      apiSuccessResponseInterceptor,
      apiFailureResponseInterceptor,
    );
    setReady(true);
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return ready;
};

const RequestInterceptor = ({children}: React.PropsWithChildren<any>) => {
  const initialized = useRequestInterceptor();
  if (initialized) return children;
  else return null;
};

export {useRequestInterceptor, RequestInterceptor};
