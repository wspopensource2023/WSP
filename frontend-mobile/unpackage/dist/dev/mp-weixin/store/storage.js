"use strict";
const common_vendor = require("../common/vendor.js");
const library_consts = require("../library/consts.js");
const useStorage = common_vendor.defineStore("storage", {
  state: () => {
    return {
      jwt: "",
      accountId: 0,
      account: {}
    };
  },
  actions: {
    commitMe(data) {
      this.accountId = (data == null ? void 0 : data.account_id) || 0;
      this.account = data;
    },
    commitJWT(jwtToken) {
      this.jwt = jwtToken;
    },
    clear() {
      this.jwt = "";
      this.accountId = 0;
      this.profiles = [];
      common_vendor.index.clearStorageSync();
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
});
function getDefaultProfile() {
  return common_vendor._.cloneDeep(library_consts.PROFILE_CONSTS.DEFAULT_PROFILE);
}
function getDefaultAvatar() {
  return "https://static.xxxxxx.com/default_avatar.png";
}
function getDefaultName() {
  return "尚未设置名称";
}
function getDefaultDescription() {
  return "暂无简介";
}
function getDefaultBanner() {
  return "";
}
exports.getDefaultAvatar = getDefaultAvatar;
exports.getDefaultBanner = getDefaultBanner;
exports.getDefaultDescription = getDefaultDescription;
exports.getDefaultName = getDefaultName;
exports.getDefaultProfile = getDefaultProfile;
exports.useStorage = useStorage;
