import {StyleSheet} from 'react-native';

import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  row:{
    flexDirection:"row",
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:5
    
  },
  header:{
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    backgroundColor: COLORS.tertiary,
    // color:'red'
  },
  text:{

  },
  container: {
    margin:SIZES.xSmall,
    marginVertical:5,
    // padding: 10,
    // paddingVertical:5,
    borderRadius:5,
    backgroundColor:'#fff',
    // backgroundColor:'red',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    flex: 1,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default styles;
