import { Save_updateSupplierReducer } from '../reducer/save_updateSupplierReducer';
import { addUserReducer } from '../reducer/addUserReducer';
import { configureStore } from '@reduxjs/toolkit'
import { createAsset_maintenanceReducer } from "../reducer/createAsset_maintenanceReducer";
import { createAsset_transferReducer } from '../reducer/createAsset_transferReducer';
import createSagaMiddleware from 'redux-saga';
import { getAssetByLocationReducer } from '../reducer/getAssetsByLocationReducer';
import { getAssetBySupplierReducer } from '../reducer/getAssetsBySuppliersReducer';
import {getAssetListReducer} from "../reducer/getAssetListReducer";
import { getAssetTransferListReducer } from '../reducer/getAssetTransferListReducer';
import { getAssetTypeReducer } from '../reducer/getAssetsTypeReducer';
import { getAsset_maintenanceBySupplierReducer } from '../reducer/getAsset_maintenanceBySupplierReducer';
import { getAsset_maintenanceBylocationReducer } from '../reducer/getAsset_maintenanceByLocationReducer';
import { getAsset_maintenanceReducer } from "../reducer/getAsset_maintenanceReducer";
import { getCircularListReducer } from '../reducer/getCircularReducer';
import { getLocationByIdReducer } from '../reducer/getLocationByIdReducer';
import { getLocationsReducer } from '../reducer/getLocationsReducer';
import { getSupplierByIdReducer } from '../reducer/getSupplierByIdReducer';
import { getSuppliersReducer } from '../reducer/getSuppliersReducer';
import { getUserListReducer } from '../reducer/getUsersReducer';
import { geteditAssetReducer } from '../reducer/editAssetReducer';
import { importAssetsReducer } from '../reducer/importAssetsReducer';
import { loginReducer } from '../reducer/loginReducer';
import rootSaga from "../rootSaga/rootSaga";
import { saveAssetReducer } from '../reducer/saveAssetReducer';
import { saveSubAssetReducer } from '../reducer/saveSubAssetReducer';
import { save_updateLocationReducer } from '../reducer/save_updateLocationReducer';
import { sendMailReducer } from '../reducer/sendMailReducer';
import { subAssetListReducer } from '../reducer/subAssetReducer';
import { subAssetTypeReducer } from '../reducer/subAssetTypeReducer';
import { updateAssetTransferReceivedTimeReducer } from '../reducer/updateAssetTransferReceivedTimeReducer';
import { updateAssetTransferReducer } from '../reducer/updateAssetTransferReducer';
import { updateAssetTransferTimeReducer } from '../reducer/updateAssetTransferTimeReducer';
import { updateLocation_closeAsset_maintenanceReducer } from "../reducer/updateLocation_closeAsset_maintenanceReducer";
import { updateVendor_ackAsset_maintenanceReducer } from "../reducer/updateVendor_ackAsset_maintenanceReducer";
import { updateVendor_closeAsset_maintenanceReducer } from "../reducer/updateVendor_closeAsset_maintenanceReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    UsersList: getUserListReducer,
    AddUser: addUserReducer,

    AssetList: getAssetListReducer,
    SubAssetList: subAssetListReducer,
    SubAssetTypeList: subAssetTypeReducer,
    AssetType: getAssetTypeReducer,
    Locations: getLocationsReducer,
    Suppliers: getSuppliersReducer,
    saveAsset: saveAssetReducer,
    editAsset: geteditAssetReducer,
    importAssets: importAssetsReducer,
    saveSubAsset: saveSubAssetReducer,
    save_updateLocation: save_updateLocationReducer,
    save_updateSupplier: Save_updateSupplierReducer,

    Asset_maintenance: getAsset_maintenanceReducer,
    CreateAsset_maintenance: createAsset_maintenanceReducer,
    UpdateLocation_closeAsset_maintenance:
      updateLocation_closeAsset_maintenanceReducer,
    UpdateVendor_ackAsset_maintenance: updateVendor_ackAsset_maintenanceReducer,
    UpdateVendor_closeAsset_maintenance:
      updateVendor_closeAsset_maintenanceReducer,

    Asset_transfer: getAssetTransferListReducer,
    CreateAsset_teansfer: createAsset_transferReducer,
    UpdateAsset_transferTime: updateAssetTransferTimeReducer,
    UpdateAsset_transferReceivedTime: updateAssetTransferReceivedTimeReducer,
    UpdateAsset_transfer: updateAssetTransferReducer,

    AssetByLocation: getAssetByLocationReducer,
    AssetBySupplier: getAssetBySupplierReducer,
    LocationById: getLocationByIdReducer,
    SupplierById: getSupplierByIdReducer,

    Asset_maintenanceByLocation: getAsset_maintenanceBylocationReducer,
    Asset_maintenanceBySupplier: getAsset_maintenanceBySupplierReducer,

    Login: loginReducer,

    SendMail: sendMailReducer,

    GetCircularList: getCircularListReducer
  },
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware().concat(sagaMiddleware),
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload'], // Ignore the payload path for non-serializable check
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);