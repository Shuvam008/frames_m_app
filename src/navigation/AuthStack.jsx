import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
import Login from '../screens/login/Login';
import AppStack from './AppStack';
import VendorDetailsAssets from '../screens/asset/VendorDetailsAssets';
import LocationDetailsAssets from '../screens/asset/LocationDetailsAssets';
import AddDocket from '../screens/assets_maintenance/addDocket/AddDocket';
import VendorDetails_Asset_maintenance from '../screens/assets_maintenance/VendorDetails_Asset_maintenance';
import LocationDetails_Asset_maintenance from '../screens/assets_maintenance/LocationDetails_Asset_maintenance';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen
        name="LocationDetailsAssets"
        component={LocationDetailsAssets}
        options={{
          headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
        }}
      />
      <Stack.Screen
        name="VendorDetailsAssets"
        component={VendorDetailsAssets}
        options={{
          headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
        }}
      />
      <Stack.Screen
        name="AddDocket"
        component={AddDocket}
        options={{
          headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
        }}
      />
      <Stack.Screen
        name="Vendor_Details_Asset_maintenance"
        component={VendorDetails_Asset_maintenance}
        options={{
          headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
        }}
      />
      <Stack.Screen
        name="Location_Details_Asset_maintenance"
        component={LocationDetails_Asset_maintenance}
        options={{
          headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
        }}
      />
      {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
    </Stack.Navigator>
  
  );
};

export default AuthStack;