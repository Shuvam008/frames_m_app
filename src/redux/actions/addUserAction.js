import { createAction } from "@reduxjs/toolkit";

export const Member_addUser = createAction(
  "Member/addUser",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_addUserInit = createAction("Member/Member_addUserInit");

export const Member_addUserResolved = createAction(
  "Member/addUserResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_addUserRejected = createAction(
  "Member/addUserRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetAddUser = createAction(
  "Member/Member_resetAddUser",
  function prepare(payload) {
    return { payload };
  }
);
