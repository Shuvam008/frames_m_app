import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
            // backgroundColor: '#8200d6'
            backgroundColor: '#ffff'
        }}>
        <ImageBackground
          source={require('../../../assets/images/flag.jpg')}
          style={{
            // padding: 20,
            paddingHorizontal:20,
            flexDirection:'row',
            justifyContent:'flex-end'
          }}>
          <View
          style={{justifyContent:'center',alignItems:'center'}}
          >
            <Image
                source={require('../../../assets/images/pngegg.png')}
                style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
            />
            <Text
                style={{
                color: '#000',
                fontWeight:600,
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
                }}>
                MMG
            </Text>
            {/* <View style={{flexDirection: 'row'}}>
                <Text
                style={{
                    color: '#000',
                    fontFamily: 'Roboto-Regular',
                    marginRight: 5,
                }}>
                280 Coins
                </Text>
                <FontAwesome5 name="coins" size={14} color="#000" />
            </View> */}
          </View>  
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
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
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
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