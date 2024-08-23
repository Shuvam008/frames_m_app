import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {MD3Colors, ProgressBar} from 'react-native-paper';
import {
  Member_resetupdateLocation_closeAsset_maintenance,
  Member_updateLocation_closeAsset_maintenance,
} from '../../redux/actions/updateLocation_closeAsset_maintenanceActions';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ConfirmationModal from '../../components/common/modal/ConfirmationModal';
import Header from '../../components/common/header/Header';
import {Member_Asset_maintenanceBylocationFetch} from '../../redux/actions/getAsset_maintenanceBylocationActions';
import Text from '../../components/common/customText/Text.jsx';
import styles from './Details_Asset_maintenance.style';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from '../../components/common/Toast/ToastContext.jsx';

const LocationDetails_Asset_maintenance = ({route}) => {
  const showToast = useToast();
  const {asset} = route.params;
  const dispatch = useDispatch();
  // console.log('maintenance Details >>>>>>', asset);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const updateLocation_closeAsset_maintenance = useSelector(
    state => state.UpdateLocation_closeAsset_maintenance,
  );
  const MaintenaceByLocation = useSelector(
    state => state.Asset_maintenanceByLocation,
  );
  const Login = useSelector(state => state.Login);

  const selectedItem = Array.isArray(MaintenaceByLocation.data)
    ? MaintenaceByLocation.data.find(
        item => item.asset_maintenance_id === asset.asset_maintenance_id,
      )
    : {};
    
  useFocusEffect(
    React.useCallback(() => {
      showToast('success', 'Docket create and Send mail successfully !');
      const payload = {location_id: Login.data.id_from_master};
      dispatch(Member_Asset_maintenanceBylocationFetch(payload));
      console.log('ZZZZZZZZZZZZZZZZZ >>>.');
    }, []),
  );
  // React.useEffect(() => {
  //   if (MaintenaceByLocation?.data) {
  //     console.log('this from dataBases >>>>', MaintenaceByLocation);
  //   }
  // }, [MaintenaceByLocation]);

  // const selectedItem = MaintenaceByLocation.data.find(
  //   item => item.asset_maintenance_id === asset.asset_maintenance_id,
  // );

  // console.log('selectedItem >>>>', selectedItem);

  const flattenAssetData = data => {
    const flatData = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          // Special case: Map location_id to location_code and supplier_id to supplier_name
          if (key === 'location' && nestedKey === 'location_code') {
            flatData['location_id'] = nestedValue;
          } else if (key === 'supplier' && nestedKey === 'supplier_name') {
            flatData['supplier_id'] = nestedValue;
          } else {
            flatData[`${key}.${nestedKey}`] = nestedValue;
          }
        });
      } else {
        flatData[key] = value;
      }
    });

    return flatData;
  };

  const flattenedAsset = flattenAssetData(selectedItem);

  console.log('flattenedAsset  >>>> ', flattenedAsset);

  const renderItem = ({item}) => {
    // List of keys that should be formatted as dates
    const dateKeys = [
      'request_datetime',
      'request_close_datetime',
      'vendor_ack_datetime',
      'vendor_close_datetime',
      'location_close_datetime',
    ];

    const formattedValue = dateKeys.includes(item.key)
      ? item.value
        ? new Date(item.value).toLocaleString()
        : 'N/A'
      : item.value;

    return (
      <View
        style={{
          backgroundColor:
            item.index % 2 === 0 ? 'rgba(224, 224, 224, 0.5)' : 'inherit',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{item.key.toUpperCase()}</Text>
        <Text align="right">{formattedValue}</Text>
      </View>
    );
  };

  const filteredData = Object.entries(flattenedAsset)
    .map(([key, value], index) => ({key, value, index}))
    .filter(item => item.index < 11 && !['id'].includes(item.key));

  const vendorClose = filteredData.find(
    item => item.key === 'vendor_close_datetime',
  );
  const vendorAck = filteredData.find(
    item => item.key === 'vendor_ack_datetime',
  );
  const reqClose = filteredData.find(
    item => item.key === 'request_close_datetime',
  );

  console.log('reqClose >>>>>>>>>>>>21213>>>>>.', reqClose);

  const handleOpenModalCLOSE = () => {
    setIsModalVisible(true);
  };

  const handleConfirmForCLOSE = () => {
    const payload = {asset_maintenance_id: asset.asset_maintenance_id};
    dispatch(Member_updateLocation_closeAsset_maintenance(payload));
    console.log('Location Close Confirmed!');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    setIsModalVisible(false);
  };
  //After successfully Form submit show a message in gui
  React.useEffect(() => {
    if (
      updateLocation_closeAsset_maintenance.data &&
      Object.keys(updateLocation_closeAsset_maintenance.data).length > 0
    ) {
      console.log(
        'Form submitted successfully >>>',
        updateLocation_closeAsset_maintenance,
      );
      console.log('second print >>>');
      // Navigate to the '/assets' page
      if (
        !updateLocation_closeAsset_maintenance.isError &&
        !updateLocation_closeAsset_maintenance.isInProgress
      ) {
        showToast('success', 'Docket  close successfully!');
        const payload = {location_id: Login.data.id_from_master};
        dispatch(Member_Asset_maintenanceBylocationFetch(payload));

        return () => {
          dispatch(Member_resetupdateLocation_closeAsset_maintenance({}));
        };
      }
    } else if (updateLocation_closeAsset_maintenance.isError) {
      showToast('error', 'Failed to close Docket!');
    }
    // }
  }, [updateLocation_closeAsset_maintenance]);

  if (MaintenaceByLocation.isInProgress) {
    console.log(
      'Loading show >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      MaintenaceByLocation.isInProgress,
    );
    return (
      <View>
        <Header name="Docket Details" />
        <View
          style={{
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header name="Docket Details" />
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={handleConfirmForCLOSE}
        onCancel={handleCancel}
      />
      <FlatList
        style={{flex: 1}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <View
        style={{
          // width: '100%',
          justifyContent: 'center',
          padding: 10,
        }}>
        <ProgressBar
          progress={
            vendorAck.value === null
              ? 0.1
              : vendorClose.value === null
              ? 0.5
              : reqClose.value === null
              ? 0.8
              : 1.0
          }
          color={
            vendorAck.value === null
              ? MD3Colors.error50
              : vendorClose.value === null
              ? 'orange'
              : 'green'
          }
        />
        <Text style={{paddingTop: 5}}>
          {vendorAck.value === null
            ? 'Wating for vendor Acknowledge'
            : vendorClose.value === null
            ? 'Wating for vendor Docket'
            : reqClose.value === null
            ? 'Wating for your confirmation'
            : 'Docket Completed'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        {vendorClose.value === null ? (
          <View></View>
        ) : reqClose.value === null ? (
          <Pressable style={styles.button} onPress={handleOpenModalCLOSE}>
            <Text style={styles.buttonText}>Close Docket</Text>
          </Pressable>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default LocationDetails_Asset_maintenance;
