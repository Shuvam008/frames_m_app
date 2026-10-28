import {StyleSheet} from 'react-native';

import {COLORS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex:1,
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default styles;
