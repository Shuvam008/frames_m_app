import {COLORS, SIZES} from '../../constants';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignContent: 'center',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    height: 220,
  },
  circularContainer: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    // flex:1,
    backgroundColor: '#4a90e2',
  },
  bottomView: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center'
  },
  switch: {
    width: 120,
    paddingVertical: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  listContainer: {
    // margin: SIZES.xSmall,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: COLORS.tertiary,
    // color:'red'
  },
  flagContainer: {
    top: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'yellow',
  },
  nameStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  listText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  listText1: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize:18
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    // backgroundColor: 'rgb(241 154 56)',
    borderRadius: 100,
    alignItems: 'center',
    // width: 350,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default styles;
