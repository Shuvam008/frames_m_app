import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
import Login from '../screens/login/Login';
import AppStack from './AppStack';
import DetailsAssets from '../screens/asset/DetailsAssets';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen
        name="DetailsAssets"
        component={DetailsAssets}
        options={{
          headerRight: () => (
            <Ionicons name="log-out" size={30} color="#fff" />
          ),
        //   headerStyle: {
        //     backgroundColor: COLORS.tertiary,
        //   },
        }}
      />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;