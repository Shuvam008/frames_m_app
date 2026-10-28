import { createAction } from '@reduxjs/toolkit';

export const Member_Asset_maintenanceFetch = createAction('Member/Asset_maintenance');
export const Member_Asset_maintenanceInit = createAction('Member/Member_Asset_maintenanceInit');
export const Member_Asset_maintenanceResolved = createAction('Member/Asset_maintenanceResolved', function prepare(payload) {
    return {payload}
});
export const Member_Asset_maintenanceRejected = createAction('Member/Asset_maintenanceRejected', function prepare(payload) {
  return {payload}
});

