import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Text from '../../components/common/customText/Text.jsx';
import React, {useState} from 'react';
import Header from '../../components/common/header/Header';
import styles from './Details_Asset_maintenance.style';
import ConfirmationModal from '../../components/common/modal/ConfirmationModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  Member_resetUpdateVendor_ackAsset_maintenance,
  Member_updateVendor_ackAsset_maintenance,
} from '../../redux/actions/updateVendor_ackAsset_maintenanceActions';
import {useFocusEffect} from '@react-navigation/native';
import {Member_Asset_maintenanceBySupplierFetch} from '../../redux/actions/getAsset_maintenanceBySupplierActions';
import {
  Member_resetupdateVendor_closeAsset_maintenance,
  Member_updateVendor_closeAsset_maintenance,
} from '../../redux/actions/updateVendor_closeAsset_maintenanceActions';
import { useToast } from '../../components/common/Toast/ToastContext.jsx';

const VendorDetails_Asset_maintenance = ({route}) => {
  const showToast = useToast();
  const dispatch = useDispatch();
  const {asset} = route.params;
  // console.log('maintenance Details >>>>>>', asset);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ackButton, setAckButton] = useState(false);

  const updateVendor_closeAsset_maintenance = useSelector(
    state => state.UpdateVendor_closeAsset_maintenance,
  );
  const updateVendor_ackAsset_maintenance = useSelector(
    state => state.UpdateVendor_ackAsset_maintenance,
  );

  const MaintenaceBySupplier = useSelector(
    state => state.Asset_maintenanceBySupplier,
  );
  const Login = useSelector(state => state.Login);

  console.log('print my data>>>.', MaintenaceBySupplier);

  const selectedItem = Array.isArray(MaintenaceBySupplier.data)
    ? MaintenaceBySupplier.data.find(
        item => item.asset_maintenance_id === asset.asset_maintenance_id,
      )
    : {};
  console.log('Selected Item: >>>>>>>>>>>>', selectedItem);

  useFocusEffect(
    React.useCallback(() => {
      const payload = {supplier_id: Login.data.id_from_master};
      dispatch(Member_Asset_maintenanceBySupplierFetch(payload));
      console.log('3982173927jbfjbjc dasdsa2983723821937923>>>.');
    }, []),
  );

  console.log('selectedItem >>>>', selectedItem);

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

  // console.log('flattenedAsset Details >>>>>> >>>>', flattenedAsset);

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

  const vendorAck = filteredData.find(
    item => item.key === 'vendor_ack_datetime',
  );
  const vendorClose = filteredData.find(
    item => item.key === 'vendor_close_datetime',
  );
  const reqClose = filteredData.find(
    item => item.key === 'request_close_datetime',
  );

  const handleOpenModalACK = () => {
    setAckButton(true);
    setIsModalVisible(true);
  };

  const handleOpenModalCLOSE = () => {
    setAckButton(false);
    setIsModalVisible(true);
  };

  const handleConfirmForACK = () => {
    const payload = {asset_maintenance_id: asset.asset_maintenance_id};
    dispatch(Member_updateVendor_ackAsset_maintenance(payload));
    console.log('ACK Confirmed!');
    setIsModalVisible(false);
  };

  const handleConfirmForCLOSE = () => {
    const payload = {asset_maintenance_id: asset.asset_maintenance_id};
    dispatch(Member_updateVendor_closeAsset_maintenance(payload));
    console.log('Close Confirmed!');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    setIsModalVisible(false);
  };

  //After successfully Form submit show a message in gui
  React.useEffect(() => {
    if (
      updateVendor_closeAsset_maintenance.data &&
      Object.keys(updateVendor_closeAsset_maintenance.data).length > 0
    ) {
      console.log(
        'Form submitted successfully >>>',
        updateVendor_closeAsset_maintenance,
      );
      console.log('second print >>>');
      // Navigate to the '/assets' page
      if (
        !updateVendor_closeAsset_maintenance.isError &&
        !updateVendor_closeAsset_maintenance.isInProgress
      ) {
        showToast('success', 'Docket  close successfully!');
        const payload = {supplier_id: Login.data.id_from_master};
        dispatch(Member_Asset_maintenanceBySupplierFetch(payload));
        return () => {
          dispatch(Member_resetupdateVendor_closeAsset_maintenance({}));
        };
      }
    } else if (updateVendor_closeAsset_maintenance.isError) {
      showToast('error', 'Failed to close Docket!');
    }
    // }
  }, [updateVendor_closeAsset_maintenance]);

  //After successfully Form submit show a message in gui
  React.useEffect(() => {
    if (
      updateVendor_ackAsset_maintenance.data &&
      Object.keys(updateVendor_ackAsset_maintenance.data).length > 0
    ) {
      console.log(
        'Form submitted successfully >>>',
        updateVendor_ackAsset_maintenance,
      );
      console.log('second print >>>');
      // Navigate to the '/assets' page
      if (
        !updateVendor_ackAsset_maintenance.isError &&
        !updateVendor_ackAsset_maintenance.isInProgress
      ) {
        showToast('success', 'Docket  acknowledge successfully!');
        const payload = {supplier_id: Login.data.id_from_master};
        dispatch(Member_Asset_maintenanceBySupplierFetch(payload));
        return () => {
          dispatch(Member_resetUpdateVendor_ackAsset_maintenance({}));
        };
      }
    } else if (updateVendor_ackAsset_maintenance.isError) {
      showToast('error', 'Failed to acknowledge Docket!');
    }
    // }
  }, [updateVendor_ackAsset_maintenance]);

  if (MaintenaceBySupplier.isInProgress) {
    console.log(
      'Loading show >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      MaintenaceBySupplier.isInProgress,
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
        onConfirm={ackButton ? handleConfirmForACK : handleConfirmForCLOSE}
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
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
        }}>
        {vendorAck.value === null ? (
          <Pressable style={styles.button} onPress={handleOpenModalACK}>
            <Text style={styles.buttonText}>Acknowledge</Text>
          </Pressable>
        ) : vendorClose.value === null ? (
          <Pressable style={styles.button} onPress={handleOpenModalCLOSE}>
            <Text style={styles.buttonText}>Close Docket</Text>
          </Pressable>
        ) : reqClose.value === null ? (
          <View>
            <Text style={{color: 'orange'}}>
              Wating for Location Acknowledge
            </Text>
          </View>
        ) : (
          <View>
            <Text style={{color: 'green'}}>Docket Completed</Text>
          </View>
        )}
      </View>
      
    </View>
  );
};

export default VendorDetails_Asset_maintenance;
