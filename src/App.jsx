
import React from 'react';
// import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Home , { HomeScreenOptions } from './screens/home/Home';
import { Provider } from 'react-redux';
import { store } from './redux/state/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Correct import statement for createStackNavigator
// import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AssetLists from './screens/asset/AssetLists';
import DetailsAssets from './screens/asset/DetailsAssets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from "./constants";
import Login from './screens/login/Login';
// import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthStack from './navigation/AuthStack';
// enableScreens();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={HomeScreenOptions}
      />
      <Stack.Screen
        name="AssetsList"
        component={AssetLists}
        options={{
          headerRight: () => (
            <Ionicons name="log-out" size={30} color="#fff" />
          ),
          headerStyle: {
            backgroundColor: COLORS.tertiary,
          },
        }}
      />
      <Stack.Screen
        name="DetailsAssets"
        component={DetailsAssets}
        options={{
          headerRight: () => (
            <Ionicons name="log-out" size={30} color="#fff" />
          ),
          headerStyle: {
            backgroundColor: COLORS.tertiary,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
       <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
          {/* <Drawer.Navigator 
            drawerContent={props =><CustomDrawer {...props}/>}
            screenOptions={{headerShown: false}}
            // initialRouteName="Login"
          >
          

            <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              // headerShown:false,
              headerRight: () => (
                <Ionicons name="log-out" size={30} color="#fff" />
              ),
              headerStyle: {
                backgroundColor: COLORS.tertiary,
              },
            }}
            />

            <Drawer.Screen 
            name="Home" 
            component={Home}
            options={HomeScreenOptions}
            />
            <Drawer.Screen 
            name="AssetsList" 
            component={AssetLists}
            // options={{
            //   headerRight: () => (
            //     <Ionicons name="log-out" size={30} color="#fff" />
            //   ),
            //   headerStyle: {
            //     backgroundColor: COLORS.tertiary,
            //   },
            // }}
            />
            <Drawer.Screen 
            name="DetailsAssets" 
            component={DetailsAssets}
            options={{
              headerRight: () => (
                <Ionicons name="log-out" size={30} color="#fff" />
              ),
              headerStyle: {
                backgroundColor: COLORS.tertiary,
              },
            }}
            />
          </Drawer.Navigator> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
