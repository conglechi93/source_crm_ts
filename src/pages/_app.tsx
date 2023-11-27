import React, {useEffect, useState} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../@crema/utility/AppContextProvider';
import {Provider} from 'react-redux';
import AppThemeProvider from '../@crema/utility/AppThemeProvider';
import AppStyleProvider from '../@crema/utility/AppStyleProvider';
import AppLocaleProvider from '../@crema/utility/AppLocaleProvider';
import FirebaseAuthProvider from '../@crema/services/auth/firebase/FirebaseAuthProvider';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import {PersistGate} from 'redux-persist/integration/react';
import {EmotionCache} from '@emotion/cache';
import '../@crema/services/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../public/assets/styles/index.css';
import '../shared/vendors/index.css';
import {persistor, store} from 'redux/store';
import {RequestInterceptor} from 'api/RequestInterceptor';
import {SSOListenerProvider} from '@crema/utility/SSOListenerProvider';
import {BrowserRouter} from 'react-router-dom';
import {PrevRender} from '@crema/utility/PrevRender';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);
  return (
    isBrowser && (
      <CacheProvider value={emotionCache}>
        <BrowserRouter>
          <Head>
            <title>Crema material</title>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
          </Head>
          <AppContextProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppThemeProvider>
                  <AppStyleProvider>
                    <AppLocaleProvider>
                      <RequestInterceptor>
                        <SSOListenerProvider>
                          <PrevRender>
                            <FirebaseAuthProvider>
                              <AuthRoutes>
                                <CssBaseline />
                                <Component {...pageProps} />
                              </AuthRoutes>
                            </FirebaseAuthProvider>
                          </PrevRender>
                        </SSOListenerProvider>
                      </RequestInterceptor>
                    </AppLocaleProvider>
                  </AppStyleProvider>
                </AppThemeProvider>
              </PersistGate>
            </Provider>
          </AppContextProvider>
        </BrowserRouter>
      </CacheProvider>
    )
  );
}
