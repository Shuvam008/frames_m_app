import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Member_getAssetListFetch } from '../../redux/actions/getAssetListActions.js';
import { Member_getLocationsFetch } from '../../redux/actions/getLocationsActions.js';
import { Member_getAssetTypeFetch } from '../../redux/actions/getAssetsTypeAction.js';
import { Member_subAssetListFetch } from '../../redux/actions/subAssetsAction.js';
import { Member_getSuppliersFetch } from '../../redux/actions/getSuppliersActions.js';
import _ from 'lodash';
import SearchBar from '../../components/common/search/Search.jsx';
import styles from './assetLists.style.jsx';
import Text from '../../components/common/customText/Text.jsx';

const AssetLists = ({navigation}) => {
  const dispatch = useDispatch();
  const [tableColumn, setTableColumn] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [subAssetData, setSubAssetData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const Locations = useSelector((state) => state.Locations);
  const Suppliers = useSelector((state) => state.Suppliers);
  const AssetType = useSelector((state) => state.AssetType);
  const AssetList = useSelector((state) => state.AssetList);
  const SubAssets = useSelector((state) => state.SubAssetList);
  const { data, isInProgress } = AssetList;

  React.useEffect(() => {
    console.log("AssetListView process.env  >>>", process.env);
    const payload = {};
    dispatch(Member_getAssetTypeFetch(payload));
    dispatch(Member_getLocationsFetch(payload));
    dispatch(Member_getSuppliersFetch(payload));
    dispatch(Member_getAssetListFetch(payload));
    dispatch(Member_subAssetListFetch(payload));
  }, []);

  React.useEffect(() => {
    console.log("React.useEffect AssetList >>>", AssetList);
    console.log("React.useEffect AssetType >>>", AssetType);
    if (AssetList?.data && !_.isEmpty(AssetList?.data)) {
      const tableDataWithId = AssetList?.data.map((e) => {
        const assetType = Array.isArray(AssetType?.data) ? AssetType.data.find(type => type.asset_type_id === e.asset_type) : null;
        const locations = Array.isArray(Locations?.data) ? Locations.data.find(type => type.location_id === e.location_id) : null;
        const suppliers = Array.isArray(Suppliers?.data) ? Suppliers.data.find(type => type.supplier_id === e.supplier_id) : null;

        const assetTypeName = assetType ? assetType.asset_type : '';
        const locationsName = locations ? locations.location_code : '';
        const suppliersName = suppliers ? suppliers.supplier_name : '';
        return { id: e.asset_id, ...e, asset_type: assetTypeName, location_id: locationsName, supplier_id: suppliersName };
      });

      setTableData(tableDataWithId);
    }
    if (SubAssets?.data && !_.isEmpty(SubAssets?.data)) {
      setSubAssetData(SubAssets);
    }
  }, [AssetList?.data, AssetType?.data, SubAssets?.data]);

  const search = (data) => {
    if (!Array.isArray(data)) {
      console.error("search: data is not an array");
      return [];
    }
    const queryString = query ? query.toLowerCase() : '';
    return data.filter((item) =>
      (item.make?.toLowerCase() ?? '').includes(queryString) ||
      (item.asset_type?.toLowerCase() ?? '').includes(queryString) ||
      (item.supplier_id?.toLowerCase() ?? '').includes(queryString) ||
      (item.location_id?.toLowerCase() ?? '').includes(queryString) ||
      (item.serial_no?.toLowerCase() ?? '').includes(queryString) ||
      (String(item.asset_id).toLowerCase() ?? '').includes(queryString)
    );
  };

  const renderItem = ({item}) => (
    <Pressable
    onPress={() => navigation.navigate('DetailsAssets',{asset:item})}
    >
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.text, { fontWeight: '600' }]}>{item.asset_type}</Text>
          <Text style={[styles.text, { fontWeight: '800', color: 'cyan' }]}>{item.location_id}</Text>
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

  // if (isInProgress) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <View>
      {/* <Header /> */}
      <SearchBar setQuery={setQuery} />
      {isInProgress ? (
        <View style={{height:'80%',alignItems: 'center',justifyContent:'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={search(tableData)}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default AssetLists;
