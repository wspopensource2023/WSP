"use strict";
const common_vendor = require("../common/vendor.js");
const store_storage = require("../store/storage.js");
class APIService {
  constructor(baseURI) {
    this.baseURI = "";
    if (!baseURI.endsWith("/")) {
      baseURI += "/";
    }
    this.baseURI = baseURI;
  }
  async UpdateAccountProfile(data) {
    return this._post("UpdateAccountProfile", data);
  }
  async GetAchievementMobileBannerInfo() {
    return this._post("GetAchievementMobileBannerInfo", {});
  }
  async GetDIDMobileBannerInfo() {
    return this._post("GetDIDMobileBannerInfo", {});
  }
  async SendSMSCode(phone) {
    return this._post("SendSMSCode", { phone });
  }
  async Login(phone, code) {
    return this._post("Login", {
      phone,
      sms_code: code
    });
  }
  async Me(without_profiles) {
    try {
      return await this._post("Me", {
        without_profiles
      });
    } catch (e) {
      if (e && e.toString().indexOf("无效的登录状态")) {
        const { clear } = store_storage.useStorage();
        clear();
      }
      throw e;
    }
  }
  async GetRealParams(scene) {
    return this._post("GetRealParams", {
      scene
    });
  }
  async ListCampaignByIssuer(account_id, skip, limit) {
    return this._post("ListCampaignByIssuer", {
      issuer_account_id: account_id,
      skip,
      limit
    });
  }
  async GetAccountProfile(account_id) {
    return this._post("GetAccountProfile", { account_id });
  }
  // 个人页面成就获取【我的成就】
  async ListAccountCampaign(account_id, limit, skip) {
    return this._post("ListAccountCampaign", {
      account_id,
      limit,
      skip
    });
  }
  // 个人页面成就获取【我的发行】
  async ListAccountCampaignIssued(account_id, limit, skip) {
    return this._post("ListAccountCampaignIssued", {
      account_id,
      limit,
      skip
    });
  }
  async GetIssuer(account_id) {
    return this._post("GetIssuer", { issuer_account_id: account_id });
  }
  async ListUserAchievements(dstAccountId, page, pageSize) {
    return this._post("ListUserAchievement", {
      participant_account_id: dstAccountId,
      limit: pageSize,
      skip: page
    });
  }
  async ListAchievementParticipant(achievement_id, page, pageSize) {
    return this._post("ListAchievementParticipant", {
      achievement_id,
      limit: pageSize,
      skip: page
    });
  }
  async CollectAchievement(achievement_id) {
    return this._post("CollectAchievement", {
      achievement_id
    });
  }
  async ListCampaign(campaign_type, page, pageSize) {
    return this._post("ListCampaign", {
      limit: pageSize,
      skip: page,
      campaign_type
    });
  }
  async GetCampaignDetail(campaign_id) {
    return this._post("GetCampaignDetail", { campaign_id });
  }
  async ListAchievement(page, pageSize, keywords) {
    return this._post("ListAchievement", {
      limit: pageSize,
      skip: page,
      keyword: keywords,
      issuer_account_id: ""
    });
  }
  async GetAchievement(achievement_id) {
    return this._post("GetAchievement", { achievement_id });
  }
  async VerifyBilibiliBind(param) {
    return this._post("ConditionBilibiliBind", { account_params: param });
  }
  async VerifyWeiboBind(param) {
    return this._post("ConditionWeiboBind", { account_params: param });
  }
  async LoginByWeixinPhone(code) {
    return this._post("LoginByWeixinPhone", {
      code
    });
  }
  async VerifyCondition(achievement_id, condition_id, param) {
    return this._post("VerifyCondition", {
      achievement_id,
      condition_id,
      account_params: param
    });
  }
  async ListIssuedCampaign(issuer_account_id, skip = 1, limit = 10) {
    return this._post("ListCampaign", {
      issuer_account_id,
      skip,
      limit
    });
  }
  async ListIssuedAchievement(issuer_account_id, skip = 1, limit = 10) {
    return this._post("ListAchievement", {
      issuer_account_id,
      skip,
      limit
    });
  }
  async GetProfileByID(profileId) {
    return this._post("GetProfileByID", {
      profile_id: profileId
    });
  }
  async ListCollectedAchievement(participant_account_id, skip = 1, limit = 10) {
    console.log("!! participant_account_id", participant_account_id);
    return this._post("ListUserAchievement", {
      participant_account_id,
      skip,
      limit
    });
  }
  async GetProfile(slug) {
    return this._post("GetProfile", {
      slug
    });
  }
  async UpdateProfile(data) {
    return this._post("UpdateProfile", {
      profile: data
    });
  }
  async DeleteProfile(profileId) {
    return this._post("DeleteProfile", {
      profile_id: profileId
    });
  }
  async GetProfileShareQRImage(profileId) {
    return this._post("GetProfileShareQRImage", {
      profile_id: profileId
    });
  }
  async GetShareQrcode() {
    return this._post("GetShareQrcode", {});
  }
  async SearchProfile(keywords) {
    return this._post("SearchProfile", { keywords });
  }
  async UpdateProfile(data) {
    return this._post("UpdateProfile", { profile: data });
  }
  async AIGCWeiboCRD(uid) {
    return this._post("AIGCWeiboCRD", { uid });
  }
  async AIGCXiaoHongShuCRD(uid) {
    return this._post("AIGCXiaoHongShuCRD", { uid });
  }
  async AIGCBilibiliCRD(uid) {
    return this._post("AIGCBilibiliCRD", { uid });
  }
  async AIGCZhiHuCRD(uid) {
    return this._post("AIGCZhiHuCRD", { uid });
  }
  GetRequestURI(path) {
    return this.baseURI + path;
  }
  GetRequestHeaders() {
    const { jwt } = store_storage.useStorage();
    return { Authorization: `Bearer ${jwt}` };
  }
  async UploadImage(filepath) {
    const res = await this._upload("UploadImage", filepath);
    console.log("上传完成", res);
    return res;
  }
  async UploadVideo(filepath) {
    return this._upload("UploadVideo", filepath);
  }
  _upload(api, filepath) {
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: apiService.GetRequestURI(api),
        //仅为示例，非真实的接口地址
        filePath: filepath,
        name: "form",
        header: apiService.GetRequestHeaders(),
        formData: {},
        success: (uploadFileRes) => {
          const res = JSON.parse(uploadFileRes.data);
          const code = (res == null ? void 0 : res.code) || 0;
          if (code !== 0) {
            reject(`code: ${res.code}, message: ${res.message}`);
            common_vendor.index.showToast({
              icon: "none",
              position: "bottom",
              title: res.message,
              duration: 2e3
            });
          } else {
            resolve(res);
          }
        },
        fail: (res) => {
          reject(res);
          console.log("res", res);
          common_vendor.index.showToast({
            icon: "none",
            position: "bottom",
            title: "上传失败",
            duration: 2e3
          });
        }
      });
    });
  }
  async _post(path, data, headers) {
    return new Promise((resolve, reject) => {
      +common_vendor.index.request({
        url: this.baseURI + path,
        method: "POST",
        data,
        // merge headers
        header: this.GetRequestHeaders(),
        success: (res) => {
          var _a, _b;
          const code = ((_a = res.data) == null ? void 0 : _a.code) || 0;
          if (code !== 0) {
            reject(
              `code: ${res.data.code}, message: ${res.data.message}`
            );
          } else {
            resolve((_b = res == null ? void 0 : res.data) == null ? void 0 : _b.data);
          }
        },
        fail: (err) => {
          common_vendor.index.showToast({
            icon: "none",
            position: "bottom",
            title: `网络错误 ${err == null ? void 0 : err.errMsg}`,
            duration: 2e3
          });
          reject(err);
        }
      });
    });
  }
}
const apiService = new APIService("https://api.xxxxxx.com/v1/");
exports.apiService = apiService;
