import React from 'react';
import {TextInput} from 'react-native';
// import {darkGreen} from './Constants';
import { COLORS, SIZES } from "../../../constants";

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        width:'100%',
        borderRadius: 10,
        color: COLORS.primary, 
        padding: 15,
        backgroundColor: COLORS.white, 
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: .1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    }}
      placeholderTextColor={ COLORS.primary}></TextInput>
  );
};

export default Field;

// fontFamily:Font["poppins-regular"]