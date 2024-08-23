import {Button, TextInput, View} from 'react-native';
import {FormikProvider, useFormik} from 'formik';
import {
  Member_createAsset_maintenance,
  Member_resetAsset_maintenance,
} from '../../../redux/actions/createAsset_maintenanceActions';
import {
  Member_resetsendMail,
  Member_sendMail,
} from '../../../redux/actions/sendMailActions';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ActivityIndicator} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../../components/common/header/Header';
import {Member_getLocationsFetch} from '../../../redux/actions/getLocationsActions';
import {Member_getSuppliersFetch} from '../../../redux/actions/getSuppliersActions';
import Text from '../../../components/common/customText/Text';
import _ from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from '../../../components/common/Toast/ToastContext';

const AddDocket = ({navigation, route}) => {
  const showToast = useToast();
  const {asset} = route.params;
  const dispatch = useDispatch();
  const Locations = useSelector(state => state.Locations);
  const Suppliers = useSelector(state => state.Suppliers);
  const createAsset_maintenance = useSelector(
    state => state.CreateAsset_maintenance,
  );
  const SendMail = useSelector(state => state.SendMail);
  const [requestType, setRequestType] = useState('Machine out of service');
  useFocusEffect(
    React.useCallback(() => {
      // showToast('success', 'Docket created and email sent successfully!');
      const payload = {};
      dispatch(Member_getLocationsFetch(payload));
      dispatch(Member_getSuppliersFetch(payload));
    }, []),
  );

  const [filteredLocationsData, setfilteredLocationsData] = React.useState([]);
  const [filteredSuppliersData, setfilteredSuppliersData] = React.useState([]);
  //   const [isDataReady, setIsDataReady] = React.useState(false); // Track if data is ready

  const formik = useFormik({
    initialValues: {
      asset_id: asset.asset_id,
      location_id: '',
      supplier_id: '',
      request_desc: '',
      request_type: requestType,
    },
    //   validate: validateForm,
    onSubmit: values => {
      console.log('filteredLocationsData : >>>', filteredLocationsData);
      console.log('filteredSuppliersData : >>>', filteredSuppliersData);
      console.log('Submitting form with values: ', values);
      console.log('Row data: ', asset.asset_id);
      const payload = values;
      dispatch(Member_createAsset_maintenance(payload));
    },
  }); // Depend on isDataReady

  React.useEffect(() => {
    console.log('Locations:', Locations);
    console.log('Suppliers:', Suppliers);

    if (
      Locations?.data &&
      !_.isEmpty(Locations?.data) &&
      Suppliers?.data &&
      !_.isEmpty(Suppliers?.data)
    ) {
      const filteredLocations = Locations.data.filter(
        item => item.location_code === asset.location_id,
      );
      const filteredSuppliers = Suppliers.data.filter(
        item => item.supplier_name === asset.supplier_id,
      );

      setfilteredLocationsData(filteredLocations);
      setfilteredSuppliersData(filteredSuppliers);

      // Update formik values when the filtered data is available
      if (filteredLocations.length > 0) {
        formik.setFieldValue('location_id', filteredLocations[0].location_id);
      }
      if (filteredSuppliers.length > 0) {
        formik.setFieldValue('supplier_id', filteredSuppliers[0].supplier_id);
      }
    } else {
      // console.error(
      //   'Locations or Suppliers data is not available or not an array.',
      // );
    }
  }, [Locations, Suppliers]);

  const supplierName = filteredSuppliersData[0]?.supplier_name;
  const locationCode = filteredLocationsData[0]?.location_code;
  const text = `
  Dear ${supplierName},

  I am writing to bring to your immediate attention an issue concerning the ticket machine at ${locationCode} in the Sealdah Division. The machine has been non-functional for an extended period, causing significant inconvenience to passengers.

  I kindly request that the necessary repairs or maintenance be carried out at the earliest to restore the machine's functionality. Your prompt attention to this matter will be greatly appreciated by all who use the station.

  Thank you for your cooperation.

  Sincerely,
  Your Name
  Your Contact Information
`;
  //After successfully Form submit show a message in gui
  React.useEffect(() => {
    if (!_.isEmpty(createAsset_maintenance?.data) && !createAsset_maintenance.isError) {
      if (!createAsset_maintenance.isInProgress) {
        const emailId =
          filteredSuppliersData.length > 0
            ? filteredSuppliersData[0]?.email_id
            : null;
        const payload = {
          to: filteredSuppliersData[0]?.email_id,
          // to: emailId,
          text: text,
          subject: `Urgent: Non-Functioning Ticket Machine at ${locationCode}`,
          cc: ['pintudasall@gmail.com'],
        };
        console.log('payload >>>>>>>>>>>>>>kkkkkkk>>>>>>>>>>>>>', payload.to);
        if (!emailId) {
          // console.error('Email ID is not available.');
          // showToast('error', 'Supplier email is not available.');
        } else {
          // console.error('Email ID is available.', emailId);
          // console.log('Email ID is available.', emailId);

          dispatch(Member_sendMail(payload));
        }
        // Clean up if needed
        return () => {
          dispatch(Member_resetAsset_maintenance({}));
        };
      }
    } else if (createAsset_maintenance.isError) {
      showToast('error', 'Failed to create Docket!');
    }
  }, [createAsset_maintenance]);

  useFocusEffect(
    React.useCallback(() => {
      if (
        !_.isEmpty(SendMail?.data) &&
        !SendMail.isError &&
        !SendMail.isInProgress
      ) {
        showToast('success', 'Docket created and email sent successfully!');
        navigation.navigate('Assets');
        dispatch(Member_resetsendMail({}));
      } else if (SendMail.isError) {
        showToast(
          'error',
          'Docket created successfully but failed to send email!',
        );
        navigation.goBack();
        dispatch(Member_resetsendMail({}));
      }
    }, [SendMail, dispatch]),
  );

  // if (!Locations?.data || !Suppliers?.data) {
  //   return <View>Loading...</View>;
  // }
  const columns = [
    {field: 'request_type', headerName: 'Failure type'},
    {field: 'request_desc', headerName: 'Description'},
  ];
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Machine out of service', value: 'Machine out of service'},
    {label: 'Machine out of order', value: 'Machine out of order'},
    {label: 'Not working', value: 'Not working'},
    {label: 'Other', value: 'Other'},
  ]);

  if (SendMail.isInProgress) {
    return (
      <View style={{flex: 1}}>
        <Header name="Add New Docket" />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header name="Add New Docket" />
      <FormikProvider value={formik}>
        <View
          style={{
            flex: 1,
            // flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <View>
            {columns.map((column, index) => (
              <View key={index} style={{width: '100%', marginBottom: 15}}>
                <Text style={{paddingBottom: 10}}>{column.headerName}</Text>
                {column.field === 'request_type' ? (
                  <View
                    style={{
                      //   flex:1,
                      height: 50,
                      // zIndex: open ? 10000 : 0,
                      marginBottom: open ? 150 : 0,
                    }}>
                    <DropDownPicker
                      open={open}
                      setOpen={setOpen}
                      value={requestType}
                      setValue={value => setRequestType(value)}
                      items={items}
                      setItems={setItems}
                      containerStyle={{height: 40}}
                      style={{
                        backgroundColor: '#fafafa',
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: '#fafafa',
                      }}
                      // dropDownDirection="BOTTOM"
                      onChangeValue={value => {
                        //   console.log(value);
                        formik.setFieldValue('request_type', value);
                      }}
                    />
                  </View>
                ) : (
                  <View style={{height: 200}}>
                    <TextInput
                      style={{
                        borderColor: 'gray',
                        borderWidth: 1,
                        padding: 10,
                        marginTop: 10,
                        height: '100%',
                        textAlignVertical: 'top',
                        color: 'black',
                      }}
                      placeholder="Please Enter Value"
                      placeholderTextColor="black"
                      multiline
                      numberOfLines={4}
                      onChangeText={formik.handleChange(column.field)}
                      value={formik.values[column.field]}
                      onBlur={() => formik.setFieldTouched(column.field)}
                    />
                  </View>
                )}
                {formik.touched[column.field] &&
                  formik.errors[column.field] && (
                    <Text style={{color: 'red'}}>
                      {formik.errors[column.field]}
                    </Text>
                  )}
              </View>
            ))}
          </View>
          <View>
            <Button
              title="Send"
              onPress={formik.handleSubmit}
              disabled={!formik.isValid}
            />
          </View>
        </View>
      </FormikProvider>
    </View>
  );
};

export default AddDocket;
