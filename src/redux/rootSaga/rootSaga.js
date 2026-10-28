import fetchAssetTypeSaga from "../sagas/getAssetsType";
import fetchAsset_TransferSaga from "../sagas/getAsset_transfer";
import fetchAsset_maintenanceBySupplierSaga from "../sagas/getAsset_maintenanceBySupplier";
import fetchAsset_maintenanceBylocationSaga from "../sagas/getAsset_maintenanceByLocation";
import fetchAsset_maintenanceSaga from "../sagas/getAsset_maintenance";
import fetchCircularListSaga from "../sagas/getCircular";
import fetchLocationByIdSaga from "../sagas/getLocationById";
import fetchLocationsSaga from "../sagas/getLocations";
import fetchSaveAssetSaga from "../sagas/saveAsset";
import fetchSaveSubAssetSaga from "../sagas/saveSubAsset";
import fetchSave_updateLocationSaga from "../sagas/save_updateLocation";
import fetchSave_updateSupplierSaga from "../sagas/save_updateSupplier";
import fetchSendMailSaga from "../sagas/sendMail";
import fetchSupplierByIdSaga from "../sagas/getSuppliersById";
import fetchSuppliersSaga from "../sagas/getSuppliers";
import fetchUsersSaga from "../sagas/getUsers";
import fetchaddUserSaga from "../sagas/addUsers";
import fetchcreateAsset_maintenanceSaga from "../sagas/createAsset_maintenance";
import fetchcreateAsset_transferSaga from "../sagas/createAsset_transfer";
import fetcheditAssetSaga from "../sagas/editAsset";
import fetchgetAssetByLocationSaga from "../sagas/getAssetsByLocation";
import fetchgetAssetBySupplierSaga from "../sagas/getAssetsBySupplier";
import fetchgetAssetListSaga from "../sagas/getAssetList";
import fetchimportAssetsSaga from "../sagas/importAssets";
import fetchloginSaga from "../sagas/loginUsers";
import fetchsubAssetListSaga from "../sagas/getSubAssetList";
import fetchsubAssetTypeSaga from "../sagas/getSubAssetTypeList";
import fetchupdateAssetTransferReceivedTimeSaga from "../sagas/updateTransfer_received_timeAsset_transfer";
import fetchupdateAssetTransferSaga from "../sagas/updateAsset_transfer";
import fetchupdateAssetTransferTimeSaga from "../sagas/updateTransfer_timeAsset_transfer";
import fetchupdateLocation_closeAsset_maintenanceSaga from "../sagas/updateLocation_closeAsset_maintenance";
import fetchupdateVendor_ackAsset_maintenanceSaga from "../sagas/updateVendor_ackAsset_maintenance";
import fetchupdateVendor_closeAsset_maintenanceSaga from "../sagas/updateVendor_closeAsset_maintenance";
import { fork } from 'redux-saga/effects';
import watchFetchDataSaga from "../sagas/apiSaga";

export default function* rootSaga() {
    yield fork(fetchgetAssetListSaga)
    yield fork(fetchsubAssetListSaga)
    yield fork(fetchsubAssetTypeSaga)
    yield fork(fetchAssetTypeSaga)
    yield fork(fetchLocationsSaga)
    yield fork(fetchSuppliersSaga)
    yield fork(fetchSaveAssetSaga)
    yield fork(fetcheditAssetSaga)
    yield fork(fetchimportAssetsSaga)
    yield fork(fetchSaveSubAssetSaga)
    yield fork(fetchSave_updateLocationSaga)
    yield fork(fetchSave_updateSupplierSaga)

    yield fork(fetchAsset_maintenanceSaga)
    yield fork(fetchcreateAsset_maintenanceSaga)
    yield fork(fetchupdateLocation_closeAsset_maintenanceSaga)
    yield fork(fetchupdateVendor_ackAsset_maintenanceSaga)
    yield fork(fetchupdateVendor_closeAsset_maintenanceSaga)

    yield fork(fetchAsset_TransferSaga)
    yield fork(fetchcreateAsset_transferSaga)
    yield fork(fetchupdateAssetTransferSaga)
    yield fork(fetchupdateAssetTransferTimeSaga)
    yield fork(fetchupdateAssetTransferReceivedTimeSaga)

    yield fork(fetchaddUserSaga)
    yield fork(fetchUsersSaga)

    yield fork(fetchloginSaga)

    yield fork(fetchgetAssetByLocationSaga)
    yield fork(fetchgetAssetBySupplierSaga)
    yield fork(fetchLocationByIdSaga)
    yield fork(fetchSupplierByIdSaga)

    yield fork(fetchAsset_maintenanceBylocationSaga)
    yield fork(fetchAsset_maintenanceBySupplierSaga)

    yield fork(fetchSendMailSaga)

    yield fork(fetchCircularListSaga)

    yield fork(watchFetchDataSaga)
    // code after fork-effect
}