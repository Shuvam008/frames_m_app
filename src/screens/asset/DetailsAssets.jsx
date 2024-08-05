import { StyleSheet, View } from 'react-native'
import React from 'react'
import styles from './DetailsAssets.style';
import Text from '../../components/common/customText/Text';
import Header from '../../components/common/header/Header';

const DetailsAssets = ({route}) => {
  const {asset} = route.params;
  return (
    <View>
      <Header/>
      <Text>detailsAssets: {asset.serial_no}</Text>
    </View>
  )
}


export default DetailsAssets