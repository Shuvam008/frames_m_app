import {ActivityIndicator, Alert, AppState, View} from 'react-native';
import {Member_loginResolved, Member_resetlogin} from './redux/actions/loginActions';
import {Provider, useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {loadAuth, onSessionExpired} from './API/authStorage';

import {API} from '../src/constants';
import AuthStack from './navigation/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from './components/common/Toast/ToastContext';
import http from './API/http';
import {store} from './redux/state/store';

const API_URL = `${API}/mobile/login`;

const SessionGuard = ({children}) => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const loggedIn = useSelector(s => !!s.Login.data?.token);

  // restore a saved login before the first screen is drawn
  useEffect(() => {
    (async () => {
      const saved = await loadAuth();
      if (saved) dispatch(Member_loginResolved(saved));
      setReady(true);
    })();
  }, [dispatch]);

  // any request that returns 401 ends up here
  useEffect(
    () =>
      onSessionExpired(message => {
        dispatch(Member_resetlogin());
        Alert.alert('Logged out', message || 'Session ended. Please login again.');
      }),
    [dispatch],
  );

  // find out quickly when this phone was kicked out by another login
  useEffect(() => {
    if (!loggedIn) return undefined;
    const check = () => http(`${API_URL}/session/check`, 'GET');
    check();
    const id = setInterval(check, 30000);
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') check();
    });
    return () => {
      clearInterval(id);
      sub.remove();
    };
  }, [loggedIn]);

  if (!ready) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <SessionGuard>
              <AuthStack />
            </SessionGuard>
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </Provider>
  );
}

export default App;