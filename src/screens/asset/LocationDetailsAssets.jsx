import {Button, FlatList, Pressable, StyleSheet, View} from 'react-native';

import Header from '../../components/common/header/Header';
import React from 'react';
import Text from '../../components/common/customText/Text';
import styles from './DetailsAssets.style';

const LocationDetailsAssets = ({route, navigation}) => {
  const [subAssetData, setSubAssetData] = React.useState([]);
  const {asset} = route.params;
  // console.log("asset data >>>>>>>>>",asset)

  const flattenAssetData = data => {
    const flatData = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          flatData[`${key}.${nestedKey}`] = nestedValue;
        });
      } else {
        flatData[key] = value;
      }
    });

    return flatData;
  };

  const flattenedAsset = flattenAssetData(asset);

  const renderItem = ({item}) => (
    <View
      style={{
        backgroundColor:
          item.index % 2 === 0 ? 'rgba(224, 224, 224, 0.5)' : 'inherit',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{item.key.toUpperCase()}</Text>
      <Text align="right">
        {item.key === 'codal_life_exp'
          ? item.value
            ? 'Yes'
            : 'No'
          : item.value}
      </Text>
    </View>
  );

  console.log(
    'asset data >>>>>>>>> 12345',
    Object.entries(flattenedAsset).map(([key, value], index) => ({
      key,
      value,
      index,
    })),
  );
  const filteredData = Object.entries(flattenedAsset)
    .map(([key, value], index) => ({key, value, index}))
    .filter(
      item =>
        item.index < 20 &&
        ![
          'id',
          'is_active',
          'po_no',
          'po_date',
          'fund_type',
          'purchased_by',
          'warranty_exp_date',
          'codal_life',
          'codal_life_exp',
          'creation_datetime',
          'update_datetime',
          'support_type',
        ].includes(item.key),
    );
  return (
    <View style={{marginBottom: 10, flex: 1}}>
      <Header name="Asset Details" />
      {/* <Text>LocationDetailsAssets</Text>
      <Text>detailsAssets: {asset.serial_no}</Text> */}
      <FlatList
        style={{flex: 1}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AddDocket', {asset: asset})}>
          <Text style={styles.buttonText}>Add New Docket</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Maintenance')}>
          <Text style={styles.buttonText}>Show Docket</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LocationDetailsAssets;
