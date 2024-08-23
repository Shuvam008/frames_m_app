
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/state/store';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './navigation/AuthStack';
import { ToastProvider } from './components/common/Toast/ToastContext';



function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </Provider>
  );
}

export default App;
