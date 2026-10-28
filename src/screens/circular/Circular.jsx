import {ActivityIndicator, Button} from 'react-native-paper';
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {FlatList} from 'react-native-gesture-handler';
import {Member_getCircularListFetch} from '../../redux/actions/getCircularListActions';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
// import RNFS from 'react-native-fs';
import React from 'react';
import SearchBar from '../../components/common/search/Search';
import Text from '../../components/common/customText/Text';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import fileCf from '../../assets/images/fileCf.png';
import styles from './Circular.style';

const Circular = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const Login = useSelector(state => state.Login);
  const GetCircularList = useSelector(state => state.GetCircularList);
  const [CircularList, setCircularList] = React.useState([]);

  React.useEffect(() => {
    dispatch(Member_getCircularListFetch({}));
  }, [dispatch]);

  React.useEffect(() => {
    if (GetCircularList?.data?.circularNoticeList) {
      if (Login?.data.user_group === 3) {
        console.log('Location');
        const filteredCircularList =
          GetCircularList.data.circularNoticeList.filter(
            item => item.group_identifier === 1 || item.group_identifier === 3,
          );
        setCircularList(filteredCircularList);
      } else if (Login?.data.user_group === 4) {
        console.log('supplier');
        const filteredCircularList =
          GetCircularList.data.circularNoticeList.filter(
            item => item.group_identifier === 2 || item.group_identifier === 3,
          );
        setCircularList(filteredCircularList);
      }
    }
  }, [GetCircularList, Login]);

  React.useEffect(() => {
    if (CircularList && !_.isEmpty(CircularList)) {
      const tableDataWithId = CircularList.map(e => ({
        id: e.id,
        ...e,
      }));
      setTableData(tableDataWithId);
    } else {
      console.log('React.useEffect CircularList not updated >>>', CircularList);
    }
  }, [CircularList]);

  const search = data => {
    if (!Array.isArray(data)) {
      console.error('search: data is not an array');
      return [];
    }
    const queryString = query ? query.toLowerCase() : '';
    return data.filter(
      item =>
        (item.creationDatetime?.toLowerCase() ?? '').includes(queryString) ||
        (item.subject?.toLowerCase() ?? '').includes(queryString) ||
        (String(item.id).toLowerCase() ?? '').includes(queryString),
    );
  };
  const openSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  // Method to request storage permission
  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log('Android version:', Platform.Version);

        if (Platform.Version >= 33) {
          // Android 13 and above
          const readImagePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );
          const readVideoPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          );
          const readAudioPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          );

          const allPermissionsGranted =
            readImagePermission === PermissionsAndroid.RESULTS.GRANTED &&
            readVideoPermission === PermissionsAndroid.RESULTS.GRANTED &&
            readAudioPermission === PermissionsAndroid.RESULTS.GRANTED;

          if (allPermissionsGranted) {
            return true;
          } else {
            Alert.alert(
              'Permission Required',
              'You need to grant media storage permission to download the file.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: openSettings},
              ],
            );
            return false;
          }
        } else if (Platform.Version >= 30) {
          const managePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
          );

          if (!managePermission) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              return true;
            } else {
              Alert.alert(
                'Storage Permission Required',
                'You need to grant storage permission to use this feature.',
                [
                  {text: 'Cancel', style: 'cancel'},
                  {text: 'Open Settings', onPress: openSettings},
                ],
              );
              return false;
            }
          }
          return true;
        } else {
          const writePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );

          if (!writePermission) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          }

          return true;
        }
      }

      return false; // iOS doesn't require storage permissions
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  };
async function downloadFile(fileName, downloadUrl) {
  console.log('FileName [downloadFile] >>>', downloadUrl);

  const isPermitted = await requestStoragePermission();
  if (!isPermitted) {
    console.log('Storage permission denied');
    return;
  }

  const {config, fs, android} = RNFetchBlob;
  const downloadsDir = fs.dirs.DownloadDir;
  const filePath = `${downloadsDir}/${fileName}`;

  try {
    let lastProgress = 0;

    const response = await config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: `Downloading ${fileName}`,
        mediaScannable: true,
        mime: 'application/pdf', // Update based on the file type you're downloading
      },
    })
      .fetch('GET', downloadUrl)
      .progress((received, total) => {
        const progress = Math.floor((received / total) * 100);
        if (progress > lastProgress) {
          console.log(`Progress: ${progress}%`);
          lastProgress = progress;
        }
      });

    console.log('Response object:', response);

    if (response && response.path()) {
      console.log(`File downloaded successfully to: ${response.path()}`);

      setTimeout(async () => {
        const filePath = response.path();
        const exists = await RNFS.exists(filePath);

        if (!exists) {
          console.error('File does not exist at the specified path:', filePath);
          return;
        }

        // Define mimeType based on the file extension
        const fileType = fileName.split('.').pop(); // Extract the file extension
        let mimeType;

        switch (fileType) {
          case 'pdf':
            mimeType = 'application/pdf';
            break;
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          default:
            console.error('Unsupported file type');
            return; // Exit if the file type is unsupported
        }

        try {
          console.log(
            'Attempting to open file with path:',
            filePath,
            'and mimeType:',
            mimeType,
          );
          android.actionViewIntent(filePath, mimeType);
        } catch (e) {
          console.error('Error opening file:', e);
        }

        // Continue with the code to open the file...
      }, 1000);

      return response.path();
    } else {
      console.error('Download completed, but path is not available.');
      return null;
    }
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Download failed');
  }
}

  const renderItem = ({item}) => (
    <Pressable
      onPress={() =>
        downloadFile(item.filepath.split('/').pop(), item.filepath)
      }>
      <View style={styles.container}>
        {/* <View style={[styles.row, styles.header]}>
          <Text style={[styles.text, {fontWeight: '600'}]}>
            {item.asset_type}
          </Text>
          <Text style={[styles.text, {fontWeight: '800', color: 'cyan'}]}>
            {item.location_id}
          </Text>
        </View> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{padding: 10}}>
            <Text style={{}}>Circular ID: {item.id}</Text>
            <Text style={{paddingTop: 10}}>
              Date & Time: {item.creationDatetime}
            </Text>
          </View>
          <View>
            <Image
              source={fileCf} // Local image reference
              style={{width: 50, height: 50}} // You can adjust the size
              alt=""
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Subject: {item.subject}</Text>
          <Text style={[styles.text, {color: 'blue'}]}>
            {item.filepath.split('/').pop()}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const {isInProgress} = GetCircularList;
  const handelFetch = () => {
    dispatch(Member_getCircularListFetch({}));
  };
  return (
    <View style={{flex: 1}}>
      {/* <Header /> */}
      <SearchBar setQuery={setQuery} />
      <Button onPress={handelFetch}>FETCH</Button>
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

export default Circular;

// const requestStoragePermission = async () => {
//   try {
//     if (Platform.OS === 'android') {
//       console.log('Android version:', Platform.Version);

//       if (Platform.Version >= 33) {
//         const readImagePermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         );
//         const readVideoPermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         );
//         const readAudioPermission = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
//         );

//         const allPermissionsGranted =
//           readImagePermission === PermissionsAndroid.RESULTS.GRANTED &&
//           readVideoPermission === PermissionsAndroid.RESULTS.GRANTED &&
//           readAudioPermission === PermissionsAndroid.RESULTS.GRANTED;

//         if (allPermissionsGranted) {
//           console.log('All media permissions granted');
//           return true;
//         } else {
//           console.log('One or more media permissions were not granted');
//           Alert.alert(
//             'Permission Required',
//             'You need to grant media storage permission to download the file.',
//             [
//               {text: 'Cancel', style: 'cancel'},
//               {text: 'Open Settings', onPress: openSettings},
//             ],
//           );
//           return false;
//         }
//       } else if (Platform.Version >= 30) {
//         // For Android 11 (API 30) to Android 12 (API 32)
//         const managePermission = await PermissionsAndroid.check(
//           PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
//         );

//         if (!managePermission) {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
//           );

//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Manage external storage permission granted');
//             return true;
//           } else {
//             console.log('Manage external storage permission not granted');
//             Alert.alert(
//               'Storage Permission Required',
//               'You need to grant storage permission to use this feature.',
//               [
//                 {text: 'Cancel', style: 'cancel'},
//                 {text: 'Open Settings', onPress: openSettings},
//               ],
//             );
//             return false;
//           }
//         }

//         return true;
//       } else {
//         // For Android 10 and below
//         const writePermission = await PermissionsAndroid.check(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         );

//         if (!writePermission) {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//             {
//               title: 'Storage Permission Required',
//               message:
//                 'This app needs access to your storage to download files',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }

//         return true;
//       }
//     }

//     return false; // iOS doesn't require storage permissions
//   } catch (err) {
//     console.error('Permission request error:', err);
//     return false;
//   }
// };

// const openSettings = () => {
//   Linking.openSettings().catch(() => {
//     Alert.alert('Unable to open settings');
//   });
// };

// const downloadFile = async (fileUrl, fileName) => {
//   const hasPermission = await requestStoragePermission();
//   console.log('Storage permission granted:', hasPermission);
//   if (!hasPermission && Platform.OS === 'android') {
//     Alert.alert(
//       'Permission Required',
//       'You need to grant storage permission to download the file. Go to settings and enable it.',
//       [
//         {text: 'Cancel', style: 'cancel'},
//         {text: 'Open Settings', onPress: openSettings},
//       ],
//     );
//     return;
//   }

//   let downloadDest = '';

//   if (Platform.OS === 'android') {
//     downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
//   } else {
//     downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
//   }

//   try {
//     const response = await RNFS.downloadFile({
//       fromUrl: fileUrl,
//       toFile: downloadDest,
//     }).promise;

//     if (response.statusCode === 200) {
//       Alert.alert('Download Success', `File downloaded to: ${downloadDest}`);
//     } else {
//       Alert.alert('Download Failed', `Status code: ${response.statusCode}`);
//     }
//   } catch (error) {
//     Alert.alert('Download Error', `Error: ${error.message}`);
//   }
// };
