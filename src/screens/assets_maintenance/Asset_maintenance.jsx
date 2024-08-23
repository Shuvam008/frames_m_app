import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {MD3Colors, ProgressBar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {Member_Asset_maintenanceBySupplierFetch} from '../../redux/actions/getAsset_maintenanceBySupplierActions';
import {Member_Asset_maintenanceBylocationFetch} from '../../redux/actions/getAsset_maintenanceBylocationActions';
import React from 'react';
import SearchBar from '../../components/common/search/Search';
import Text from '../../components/common/customText/Text.jsx';
import _ from 'lodash';
import styles from './Asset_maintenance.style';
import {useFocusEffect} from '@react-navigation/native';

const Asset_maintenance = ({navigation}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState('');
  const [tableData, setTableData] = React.useState([]);
  const [AssetList, setAssetList] = React.useState([]);
  const MaintenaceByLocation = useSelector(
    state => state.Asset_maintenanceByLocation,
  );
  const MaintenaceBySupplier = useSelector(
    state => state.Asset_maintenanceBySupplier,
  );
  const Login = useSelector(state => state.Login);

  useFocusEffect(
    React.useCallback(() => {
      if (Login?.data.user_group === 3) {
        const payload = {location_id: Login.data.id_from_master};
        dispatch(Member_Asset_maintenanceBylocationFetch(payload));
      } else if (Login?.data.user_group === 4) {
        const payload = {supplier_id: Login.data.id_from_master};
        dispatch(Member_Asset_maintenanceBySupplierFetch(payload));
      }
    }, [Login.data.id_from_master, Login.data.user_group, dispatch]),
  );

  React.useEffect(() => {
    if (MaintenaceByLocation?.data || MaintenaceBySupplier?.data) {
      if (Login.data.user_group == 3) {
        setAssetList(MaintenaceByLocation);
      } else {
        setAssetList(MaintenaceBySupplier);
      }
    }
  }, [Login.data.user_group, MaintenaceByLocation, MaintenaceBySupplier]);

  React.useEffect(() => {
    if (AssetList?.data && !_.isEmpty(AssetList?.data)) {
      const tableDataWithId = AssetList?.data.map(e => {
        //   const assetTypeName = e.assetType?.asset_type || "N/A";
        const locationsName = e.location?.location_code || 'N/A';
        const suppliersName = e.supplier?.supplier_name || 'N/A';

        return {
          id: e.asset_maintenance_id,
          ...e,
          asset_type: e.asset?.assetType.asset_type,
          location_id: locationsName,
          supplier_id: suppliersName,
        };
      });

      setTableData(tableDataWithId);
    } else {
      console.log('React.useEffect AssetList not updated >>>', AssetList);
    }

    // if (SubAssets?.data && !_.isEmpty(SubAssets?.data)) {
    //   setSubAssetData(SubAssets);
    // }
  }, [AssetList]);

  const {data, isInProgress} = AssetList;

  const search = data => {
    if (!Array.isArray(data)) {
      console.error('search: data is not an array');
      return [];
    }
    const queryString = query ? query.toLowerCase() : '';
    return data.filter(
      item =>
        (item.make?.toLowerCase() ?? '').includes(queryString) ||
        (item.supplier_id?.toLowerCase() ?? '').includes(queryString) ||
        (item.location_id?.toLowerCase() ?? '').includes(queryString) ||
        (item.serial_no?.toLowerCase() ?? '').includes(queryString) ||
        (String(item.asset_id).toLowerCase() ?? '').includes(queryString),
    );
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() =>
        Login?.data.user_group == 3 ? (
          navigation.navigate('Location_Details_Asset_maintenance', {
            asset: item,
          })
        ) : Login?.data.user_group == 4 ? (
          navigation.navigate('Vendor_Details_Asset_maintenance', {asset: item})
        ) : (
          <></>
        )
      }>
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.text, {fontWeight: '600'}]}>
            {item.asset_type}
          </Text>
          <Text style={[styles.text, {fontWeight: '800', color: 'cyan'}]}>
            {item.location_id}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Text style={styles.text}>Asset S/L: {item.asset.serial_no}</Text>
          <Text>Date: {new Date(item.request_datetime).toLocaleString()}</Text>
        </View>
        <View style={styles.row}>
          <Text>Request Type: {item.request_type}</Text>
        </View>
        <ProgressBar
          progress={
            item.vendor_ack_datetime === null
              ? 0.1
              : item.vendor_close_datetime === null
              ? 0.5
              : item.request_close_datetime === null
              ? 0.8
              : 1.0
          }
          color={
            item.vendor_ack_datetime === null
              ? MD3Colors.error50
              : item.vendor_close_datetime === null
              ? 'orange'
              : 'green'
          }
        />
      </View>
    </Pressable>
  );

  return (
    <View style={{flex: 1}}>
      <SearchBar setQuery={setQuery} />
      {isInProgress ? (
        <View
          style={{
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={{flex: 1, marginBottom: 10}}
          data={search(tableData)}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Asset_maintenance;
