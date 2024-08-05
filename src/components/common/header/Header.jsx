import React from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './header.style'
import Text from '../customText/Text';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={styles.menuButton}
      >
        <Ionicons name="chevron-back-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Asset Details</Text>
      {/* <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out" size={30} color="#fff" />
      </TouchableOpacity> */}
      <View></View>
    </View>
  );
};

export default Header