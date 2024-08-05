import React from 'react';

import styles from './search.style'

import {
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = (props) => {
const {setQuery} = props;
  return (
    <View style={styles.searchBar}>
      <TextInput 
      style={styles.searchInput} 
      placeholder="Search . . . " 
    //   onChange={(e) => setQuery(e.target.value.toLowerCase())}
      onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;