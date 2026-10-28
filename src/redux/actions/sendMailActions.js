import { createAction } from "@reduxjs/toolkit";

export const Member_sendMail = createAction(
  "Member/sendMail",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_sendMailInit = createAction("Member/Member_sendMailInit");

export const Member_sendMailResolved = createAction(
  "Member/sendMailResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_sendMailRejected = createAction(
  "Member/sendMailRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetsendMail = createAction(
  "Member/Member_resetsendMail",
  function prepare(payload) {
    return { payload };
  }
);
