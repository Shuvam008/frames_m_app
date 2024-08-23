import React from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './header.style'
import Text from '../customText/Text';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.menuButton}>
          <Ionicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{props.name}</Text>
        {/* <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out" size={30} color="#fff" />
      </TouchableOpacity> */}
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default Header