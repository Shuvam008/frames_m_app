import {ActivityIndicator, MD3Colors, ProgressBar, SegmentedButtons} from 'react-native-paper';
import {COLORS, FONT, SIZES, icons, images} from '../../constants';
import {FlatList, Pressable, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Member_Asset_maintenanceBySupplierFetch} from '../../redux/actions/getAsset_maintenanceBySupplierActions';
import {Member_Asset_maintenanceBylocationFetch} from '../../redux/actions/getAsset_maintenanceBylocationActions';
import {Member_getAssetByLocationFetch} from '../../redux/actions/getAssetsByLocationActions';
import {Member_getAssetBySupplierFetch} from '../../redux/actions/getAssetsBySuppliersActions';
import {Member_getLocationByIdFetch} from '../../redux/actions/getLocationByIdActions';
import Text from '../../components/common/customText/Text';
import {ToggleButton} from 'react-native-paper';
import _ from 'lodash';
import styles from './Home.style';

const Home = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isComplete, setIsComplete] = useState(false);

  const Login = useSelector(state => state.Login);
  const {data, isInProgress} = Login;
  const LocationName = Login.data?.location.location_name;
  const SupplierName = Login.data?.supplier?.supplier_name;

  const AssetsByLocation = useSelector(state => state.AssetByLocation);
  const AssetsBySupplier = useSelector(state => state.AssetBySupplier);

  const [tableData, setTableData] = React.useState([]);
  const [AssetList, setAssetList] = React.useState([]);
  const [AssetMaintenanceList, setAssetMaintenance] = React.useState([]);

  const MaintenaceByLocation = useSelector(
    state => state.Asset_maintenanceByLocation,
  );
  const MaintenaceBySupplier = useSelector(
    state => state.Asset_maintenanceBySupplier,
  );
  useFocusEffect(
    React.useCallback(() => {
      if (Login?.data.user_group == 3) {
        const payload = {location_id: Login.data.id_from_master};
        dispatch(Member_getAssetByLocationFetch(payload));
        dispatch(Member_Asset_maintenanceBylocationFetch(payload));
        console.log('React.useEffect AssetsByLocation call >>>', AssetList);
      } else if (Login?.data.user_group == 4) {
        const payload = {supplier_id: Login.data.id_from_master};
        dispatch(Member_getAssetBySupplierFetch(payload));
        dispatch(Member_Asset_maintenanceBySupplierFetch(payload));
        console.log('React.useEffect AssetsBySupplier call >>>', AssetList);
      }
    }, []),
  );
useFocusEffect(
  React.useCallback(() => {
    if (AssetsBySupplier?.data || AssetsByLocation?.data) {
      if (Login.data.user_group == 3) {
        setAssetList(AssetsByLocation);
        setAssetMaintenance(MaintenaceByLocation);
      } else {
        setAssetList(AssetsBySupplier);
        setAssetMaintenance(MaintenaceBySupplier);
      }
    }
  }, [
    AssetsByLocation,
    AssetsBySupplier,
    MaintenaceByLocation,
    MaintenaceBySupplier,
  ]))

    React.useEffect(() => {
      if (
        AssetMaintenanceList?.data &&
        !_.isEmpty(AssetMaintenanceList?.data)
      ) {
        const tableDataWithId = AssetMaintenanceList?.data.map(e => {
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
    }, [AssetMaintenanceList]);

  const completedRequests = !_.isEmpty(tableData)
    ? tableData?.filter(
        item =>
          item.request_close_datetime !== null &&
          item.request_close_datetime !== undefined,
      )
    : [];
  const incompleteRequests = !_.isEmpty(tableData)
    ? tableData?.filter(
        item =>
          item.request_close_datetime === null ||
          item.request_close_datetime === undefined,
      )
    : [];
  const toggleSwitch = () => setIsComplete(previousState => !previousState);

    const renderItem = ({item}) => (
      <Pressable
        onPress={() =>
          Login?.data.user_group == 3 ? (
            navigation.navigate('Location_Details_Asset_maintenance', {
              asset: item,
            })
          ) : Login?.data.user_group == 4 ? (
            navigation.navigate('Vendor_Details_Asset_maintenance', {
              asset: item,
            })
          ) : (
            <></>
          )
        }>
        <View style={styles.listContainer}>
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
            <Text>
              Date: {new Date(item.request_datetime).toLocaleString()}
            </Text>
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
  console.log('setIsComplete  : >>>', isComplete);
  // console.log('AssetMaintenanceList data : >>>', AssetMaintenanceList);
  console.log('completedRequests data : >>>', completedRequests.length);
  console.log('incompleteRequests data : >>>', incompleteRequests.length);

  console.log('Login data : >>>', data);
  console.log('LocationName data : >>>', LocationName);
  console.log('SupplierName data : >>>', SupplierName);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.circularContainer}>
          <Text style={styles.nameStyle}>
            {data.user_group === 3
              ? LocationName
              : data.user_group === 4
              ? SupplierName
              : 'Not found'}
          </Text>
        </View>
        {AssetMaintenanceList.isInProgress ? (
          <View style={{justifyContent:'center',alignContent:'center',paddingRight:50}}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        ) : (
          <View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={styles.listText}>Total Assets : </Text>
              <Text style={styles.listText}>{AssetList.data?.length}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={styles.listText}>Current Dockets : </Text>
              <Text style={styles.listText}>{incompleteRequests.length}</Text>
            </View>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Text style={styles.listText}>Completed Dockets : </Text>
              <Text style={styles.listText}>{completedRequests.length}</Text>
            </View>
          </View>
        )}
      </View>
      <LinearGradient colors={['#4a90e2', '#fff']} style={styles.bottomView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingBottom: 0,
            flex: 1,
          }}>
          <View
            style={{
              // backgroundColor: '#ccc',
              flex: 1,
              // padding: 10,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.listText1]}>Dockets</Text>
              <TouchableOpacity
                style={[
                  styles.switch,
                  {backgroundColor: isComplete ? '#5bb35f' : '#f75757'},
                ]}
                onPress={toggleSwitch}>
                <Text style={styles.listText}>
                  {isComplete ? 'Complete' : 'Incomplete'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, paddingTop: 5}}>
              <FlatList
                style={{flex: 1, marginBottom: 10}}
                data={isComplete ? completedRequests : incompleteRequests}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

// export const HomeScreenOptions = () => {
//   const navigation = useNavigation();
//   return {
//     headerRight: () => <Ionicons name="log-out" size={30} color="#fff" />,
//     headerStyle: {
//       backgroundColor: COLORS.tertiary,
//     },
//   };
// };

export default Home;
// {
/* <Button
            title="Go to Another Screen"
            onPress={() => navigation.navigate('Assets')}
          /> */
// }
