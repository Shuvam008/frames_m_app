import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Member_resetlogin} from '../../../redux/actions/loginActions';
import React from 'react';
import Text from '../customText/Text';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const Login = useSelector(state => state.Login);
  const {data, isInProgress} = Login;
  const LocationName = Login.data?.location.location_name;
  const SupplierName = Login.data?.supplier?.supplier_name;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          // backgroundColor: '#8200d6'
          backgroundColor: '#ffff',
        }}>
        <ImageBackground
          source={require('../../../assets/images/flag.jpg')}
          style={{
            // padding: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Image
              source={require('../../../assets/images/pngegg.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: '#000',
                fontWeight: 600,
                fontSize: 12,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}>
              {data.user_group === 3
                ? LocationName
                : data.user_group === 4
                ? SupplierName
                : 'Not found'}
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} color="#000" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Share
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(Member_resetlogin({}));
            props.navigation.replace('Login');
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color="#000" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
