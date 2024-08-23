// import {darkGreen} from './Constants';
import { COLORS, SIZES } from "../../../constants";

import React from 'react';
import {TextInput} from 'react-native';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        color: COLORS.primary,
        padding: 15,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
      }}
      placeholderTextColor={COLORS.primary}></TextInput>
  );
};

export default Field;

// fontFamily:Font["poppins-regular"]