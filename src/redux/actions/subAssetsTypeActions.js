import { createAction } from "@reduxjs/toolkit";

export const Member_subAssetTypeFetch = createAction("Member/subAssetType");
export const Member_subAssetTypeInit = createAction(
  "Member/Member_subAssetTypeInit"
);
export const Member_subAssetTypeResolved = createAction(
  "Member/subAssetTypeResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_subAssetTypeRejected = createAction(
  "Member/subAssetTypeRejected",
  function prepare(payload) {
    return { payload };
  }
);
