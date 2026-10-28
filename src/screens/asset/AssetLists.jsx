import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import SearchBar from '../../components/common/search/Search.jsx';
import styles from './assetLists.style.jsx';
import Text from '../../components/common/customText/Text.jsx';
import {Member_getAssetByLocationFetch} from '../../redux/actions/getAssetsByLocationActions.js';
import {Member_getAssetBySupplierFetch} from '../../redux/actions/getAssetsBySuppliersActions.js';
import Toast from 'react-native-toast-message';

const AssetLists = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = React.useState([]);

  const [query, setQuery] = React.useState('');
  // const AssetList = useSelector((state) => state.AssetByLocation);
  const Login = useSelector(state => state.Login);
  const AssetsByLocation = useSelector(state => state.AssetByLocation);
  const AssetsBySupplier = useSelector(state => state.AssetBySupplier);

  const [AssetList, setAssetList] = React.useState([]);

  React.useEffect(() => {
    if (Login?.data.user_group == 3) {
      const payload = {location_id: Login.data.id_from_master};
      dispatch(Member_getAssetByLocationFetch(payload));
      console.log('React.useEffect AssetsByLocation call >>>', AssetList);
    } else if (Login?.data.user_group == 4) {
      const payload = {supplier_id: Login.data.id_from_master};
      dispatch(Member_getAssetBySupplierFetch(payload));
      console.log('React.useEffect AssetsBySupplier call >>>', AssetList);
    }
  }, [Login]);

  React.useEffect(() => {
    if (AssetsBySupplier?.data || AssetsByLocation?.data) {
      if (Login.data.user_group == 3) {
        setAssetList(AssetsByLocation);
      } else {
        setAssetList(AssetsBySupplier);
      }
    }
  }, [AssetsByLocation, AssetsBySupplier]);

  React.useEffect(() => {
    if (AssetList?.data && !_.isEmpty(AssetList?.data)) {
      const tableDataWithId = AssetList?.data.map(e => {
        const assetTypeName = e.assetType?.asset_type || 'N/A';
        const locationsName = e.location?.location_code || 'N/A';
        const suppliersName = e.supplier?.supplier_name || 'N/A';

        return {
          id: e.asset_id,
          ...e,
          asset_type: assetTypeName,
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
        (item.asset_type?.toLowerCase() ?? '').includes(queryString) ||
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
          navigation.navigate('LocationDetailsAssets', {asset: item})
        ) : Login?.data.user_group == 4 ? (
          navigation.navigate('VendorDetailsAssets', {asset: item})
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
          <Text style={styles.text}>Make: {item.make}</Text>
          <Text>Model: {item.model_no}</Text>
        </View>
        <View style={styles.row}>
          <Text>S/L: {item.serial_no}</Text>
          <Text>Supply on: {item.supply_date}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={{flex: 1}}>
      {/* <Header /> */}
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
      <Toast />
    </View>
  );
};

export default AssetLists;
