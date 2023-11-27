import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSearchParams} from 'react-router-dom';
import {CodeChallengePayload} from 'models/auth';
import {createChallenge} from 'utils/CodeChallenge';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '@auth0/auth0-react';
import {onSetAccessToken} from 'redux/actions/Auth';

type SSOListenerProps = {
  children: React.ReactNode;
};
export const SSOListenerProvider = (prop: SSOListenerProps) => {
  const {children} = prop;
  const router = useRouter();
  const dispatch = useDispatch();
  const {accessToken} = useSelector<AppState, AppState['auth']>(
    ({auth}) => auth,
  );
  const [searchParams, setSearchParams] = useSearchParams('');

  const removeQueryParams = (paramName: string) => {
    const param = searchParams.get(paramName);
    if (param) {
      searchParams.delete(paramName);
      setSearchParams(searchParams);
    }
  };

  const handleGetAccessToken = async (
    codeChallengePayload: CodeChallengePayload,
  ) => {
    await dispatch(onSetAccessToken(codeChallengePayload));
    await removeQueryParams('authCode');
    // setIsLoading(false);
  };

  useEffect(() => {
    const authCode = searchParams.get('authCode');
    if (authCode && !accessToken) {
      const codeVerifier = localStorage.getItem('codeVerifier');
      const codeChallengePayload = {
        authCode: authCode,
        codeVerifier: codeVerifier,
      };
      handleGetAccessToken(codeChallengePayload);
      return;
    }
    if (!accessToken) {
      const handleRedirectToSSO = async () => {
        const REACT_APP_SSO_SERVER_URL = process.env.REACT_APP_SSO_SERVER_URL;
        const APP_CODE = process.env.REACT_APP_SSO_APP_CODE;
        const CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
        const challenge = await createChallenge();
        const urlObj = new URL(window.location.href);
        urlObj.hash = '';
        window.history.pushState('', '', urlObj);
        const redirectTo = window.location.href;
        const codeVerifier = challenge.code_verifier;
        localStorage.setItem('codeVerifier', codeVerifier);
        const codeChallenge = challenge.code_challenge;
        const url = `${REACT_APP_SSO_SERVER_URL}?redirectTo=${redirectTo}&appCode=${APP_CODE}&clientId=${CLIENT_ID}&codeChallenge=${codeChallenge}`;
        router.push(url);
      };
      handleRedirectToSSO();
    }
  }, [accessToken]);
  return <>{children}</>;
};
