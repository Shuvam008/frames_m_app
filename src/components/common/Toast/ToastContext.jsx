import React, {createContext, useContext} from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({children}) => {
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      position: 'top', // Positioning the toast at the top of the screen
      visibilityTime: 2000, // Display duration
      autoHide: true, // Automatically hide after visibilityTime
    });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};
