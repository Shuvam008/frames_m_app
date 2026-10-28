import React from 'react';
import { Text as RNText } from 'react-native';
import styles from './Text.style';
// import RobotoRegular from 'react-native-vector-icons/RobotoRegular';


const Text = ({ style, ...props }) => {
  return <RNText style={[styles.defaultText, style]} {...props} />;
};

export default Text;