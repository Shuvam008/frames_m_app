import React from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { COLORS, images, icons, FONT, SIZES, SHADOWS } from '../../constants';
// import { StackNavigationProp } from '@react-navigation/stack'; // Import the StackNavigationProp type
import Header from '../../components/common/header/Header';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { toFormData } from 'axios';

// type HomeProps = {
//   navigation: StackNavigationProp<any>;
// }
const Home = ({navigation,route}) => {

  const Login = useSelector((state) => state.Login);
  const { data, isInProgress } = Login;
  // const {user} = route.params;
  // console.log("Home Secreen : >>",user)

  return (
    <SafeAreaView>
      <View>
        {/* <Header /> */}
        <Text>{data.user_name}</Text>
        <Button
          title="Go to Another Screen"
          onPress={() => navigation.navigate('AssetsList')}
        />
      </View>
    </SafeAreaView>
  );
};

export const HomeScreenOptions = () => {
  const navigation = useNavigation();
  return {
    headerRight: () => (
      <Ionicons name="log-out" size={30} color="#fff" />
    ),
    // headerLeft: () => (
    //   <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
    //     <Ionicons name="menu" size={30} color="#fff" />
    //   </TouchableOpacity>
    // ),
    headerStyle: {
      backgroundColor: COLORS.tertiary,
    },
  };
};

export default Home;
