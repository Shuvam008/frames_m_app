import { createAction } from "@reduxjs/toolkit";

export const Member_login = createAction(
  "Member/login",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_loginInit = createAction("Member/Member_loginInit");

export const Member_loginResolved = createAction(
  "Member/loginResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_loginRejected = createAction(
  "Member/loginRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetlogin = createAction(
  "Member/Member_resetlogin",
  function prepare(payload) {
    return { payload };
  }
);
