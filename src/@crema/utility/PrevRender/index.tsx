import {AppState} from '@auth0/auth0-react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetUserInfo} from 'redux/actions/Auth';
import {initialUrl} from 'shared/constants/AppConst';

type PrevRenderProps = {
  children: React.ReactNode;
};
export const PrevRender = (prop: PrevRenderProps) => {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState<any>(null);
  const {children} = prop;
  const dispatch = useDispatch();
  const {accessToken, isAuthenticated} = useSelector<
    AppState,
    AppState['auth']
  >(({auth}) => auth);
  const {shopInfo} = useSelector<AppState, AppState['shop']>(({shop}) => shop);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const pathName = /^\/[^/]*\/?$/.test(router?.pathname);
  useEffect(() => {
    if (shopInfo) {
      if (pathName) {
        router.push(initialUrl);
      } else {
        router.push(currentUrl);
      }
    }
  }, [shopInfo]);
  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserInfo = async () => {
        dispatch(await onGetUserInfo());
      };
      fetchUserInfo();
    }
  }, [isAuthenticated]);
  return <>{children}</>;
};
