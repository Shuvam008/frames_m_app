import { createAction } from "@reduxjs/toolkit";

export const Member_getLocationsFetch = createAction("Member/getLocations");
export const Member_getLocationsInit = createAction(
  "Member/Member_getLocationsInit"
);
export const Member_getLocationsResolved = createAction(
  "Member/getLocationsResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_getLocationsRejected = createAction(
  "Member/getLocationsRejected",
  function prepare(payload) {
    return { payload };
  }
);
