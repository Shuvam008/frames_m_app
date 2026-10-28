import { createAction } from "@reduxjs/toolkit";

export const Member_subAssetListFetch = createAction("Member/subAssetList");
export const Member_subAssetListInit = createAction(
  "Member/Member_subAssetListInit"
);
export const Member_subAssetListResolved = createAction(
  "Member/subAssetListResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_subAssetListRejected = createAction(
  "Member/subAssetListRejected",
  function prepare(payload) {
    return { payload };
  }
);
