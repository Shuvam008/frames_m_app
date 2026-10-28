import {COLORS, SIZES} from '../../constants';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
 
  container: {
    backgroundColor: COLORS.white,
    alignContent:'center',
    flex:1,
    justifyContent:'center',
  },
  loginContainer: {
    backgroundColor: COLORS.white,
    alignContent:'center',
    padding:15,
  },
  flagContainer:{
    top:0,
    width:'100%',
    position:'absolute',
    backgroundColor:'yellow'
    
  },
  imageContainer: {
    flexDirection:'row',
    justifyContent:'center',
  },
  button:{
        width:'100%',
        // backgroundColor: 'rgb(241 154 56)',
        borderRadius: 100,
        alignItems: 'center',
        // width: 350,
        paddingVertical: 10,
        marginVertical: 10
  }
});

export default styles;
