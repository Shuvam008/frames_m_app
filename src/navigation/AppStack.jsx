import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/common/drawer/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import ProfileScreen from '../screens/ProfileScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import MomentsScreen from '../screens/MomentsScreen';
// import SettingsScreen from '../screens/SettingsScreen';

import Home from '../screens/home/Home';
import AssetLists from '../screens/asset/AssetLists';
import Asset_maintenance from '../screens/assets_maintenance/Asset_maintenance';
import {TouchableOpacity, View} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const AppStack = ({navigation, route}) => {
  const {user} = route.params;
  console.log('Home Secreen : >>', user);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          shadowOpacity: 0, // Removes shadow on iOS
          borderBottomWidth: 0,
          backgroundColor: '#4a90e2',
          elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 18,
        },
        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <TouchableOpacity onPress={() => alert('Icon 1 clicked!')}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('Icon 2 clicked!')}></TouchableOpacity>
          </View>
        ),
        drawerActiveBackgroundColor: '#FF7754',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        initialParams={{user}}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Assets"
        component={AssetLists}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="business-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Maintenance"
        component={Asset_maintenance}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="construct-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Transfer"
        component={AssetLists}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="swap-horizontal-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
