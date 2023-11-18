import {useStorage} from "@/stores/storage";
import type {AxiosInstance} from "axios";
import axios from "axios";
import {merge} from "lodash";
import {showToast} from "@/library/util";
import config from "@/config/config";

class APIService {
    client: AxiosInstance;

    constructor(baseURI: string) {
        console.log("API Service API_BASE", baseURI);
        this.client = axios.create({
            baseURL: baseURI,
            timeout: 6000,
            headers: {
                common: {},
            },
        });
    }

    async SendSMSCode(phone: string) {
        return this._post("SendSMSCode", {
            phone: phone,
        });
    }

    async Login(phone: string, code: string) {
        return this._post("Login", {
            phone: phone,
            sms_code: code,
        });
    }

    async GetProfileByID(profileId: string) {
        return this._post("GetProfileByID", {
            profile_id: profileId,
        });
    }

    async ListCollectedAchievement(
        participant_account_id: string,
        skip = 1,
        limit = 10
    ) {
        return this._post("ListUserAchievement", {
            participant_account_id: participant_account_id,
            skip: skip,
            limit: limit,
        });
    }

    async ListIssuedCampaign(issuer_account_id: string, skip = 1, limit = 10) {
        return this._post("ListCampaign", {
            issuer_account_id: issuer_account_id,
            skip: skip,
            limit: limit,
        });
    }

    async ListIssuedAchievement(
        issuer_account_id: string,
        skip = 1,
        limit = 10
    ) {
        return this._post("ListAchievement", {
            issuer_account_id: issuer_account_id,
            skip: skip,
            limit: limit,
        });
    }

    async Me(options: any = {}) {
        return this._post("Me", {}, {}, options);
    }

    async ListCampaignByIssuer(
        account_id: string,
        skip: number,
        limit: number
    ) {
        return this._post("ListCampaignByIssuer", {
            issuer_account_id: account_id,
            skip: skip,
            limit: limit,
        });
    }

    async GetIssuer(account_id: string) {
        return this._post("GetIssuer", {
            issuer_account_id: account_id,
        });
    }

    async ListUserAchievements(
        dstAccountId: string,
        page: number,
        pageSize: number
    ) {
        return this._post("ListUserAchievement", {
            participant_account_id: dstAccountId,
            limit: pageSize,
            skip: page,
        });
    }

    async GetProfileShareQRImage(profileId: string) {
        return this._post("GetProfileShareQRImage", {
            profile_id: profileId,
        });
    }

    async GetProfile(slug: string) {
        return this._post("GetProfile", {
            slug: slug,
        });
    }

    async UpdateProfile(data: any) {
        return this._post("UpdateProfile", {
            profile: data,
        });
    }

    async DeleteProfile(profileId: string) {
        return this._post("DeleteProfile", {
            profile_id: profileId,
        });
    }

    async UploadImage(file: File) {
        console.log("starting upload image", file);
        const formData = new FormData();
        formData.append("form", file);
        return await this._upload("UploadImage", formData, {
            "Content-Type": "multipart/form-data",
        });
    }

    async UploadVideo(file: File) {
        console.log("starting upload video", file);
        const formData = new FormData();
        formData.append("form", file);
        return await this._upload("UploadVideo", formData, {
            "Content-Type": "multipart/form-data",
        });
    }

    async AIGCWeiboCRD(uid: string) {
        return this._post("AIGCWeiboCRD", {
            uid: uid,
        });
    }

    async AIGCXiaoHongShuCRD(uid: string) {
        return this._post("AIGCXiaoHongShuCRD", {
            uid: uid,
        });
    }

    async AIGCBilibiliCRD(uid: string) {
        return this._post("AIGCBilibiliCRD", {
            uid: uid,
        });
    }

    async AIGCZhiHuCRD(uid: string) {
        return this._post("AIGCZhiHuCRD", {
            uid: uid,
        });
    }

    async ActivatePremiumBySocialMediaDesc(
        profile_id: string,
        platform: string,
        uid: string
    ) {
        return this._post('ActivatePremiumBySocialMediaDesc', {
            profile_id: profile_id,
            platform: platform,
            uid: uid,
        })
    }

    async _upload(path: any, data: any, headers: any = null) {
        const {state} = useStorage();
        let res;
        try {
            res = await this.client.post(path, data, {
                timeout: 60000,
                headers: merge(headers, {
                    Authorization: `Bearer ${state.jwt}`,
                }),
            });
        } catch (e) {
            showToast({
                message: `网络请求失败`,
                type: "warn",
            });
            console.log(`[HTTP ERROR] failed to call ${path}: ${e}`);
            throw e;
        }
        const code = res?.data?.code || 0;
        if (code !== 0) {
            const message = res?.data?.message;
            showToast({
                message: `${message}`,
                type: "warn",
            });
            console.log(`[BIZ ERROR] failed to call ${path}: ${message}`);
            throw new Error(`code: ${code}, message: ${message}`);
        }
        return res?.data;
    }

    async _post(path: any, data: any, headers: any = null, options: any = {}) {
        const {state} = useStorage();
        const tolerance = options ? options?.tolerance : false;
        let res;
        try {
            res = await this.client.post(path, data, {
                headers: merge(headers, {
                    Authorization: `Bearer ${state.jwt}`,
                }),
            });
        } catch (e) {
            showToast({
                message: `网络请求失败`,
                type: "warn",
            });
            console.log(`[HTTP ERROR] failed to call ${path}: ${e}`);
            throw e;
        }
        const code = res?.data?.code || 0;
        if (code !== 0) {
            const message = res?.data?.message;
            if (!tolerance) {
                showToast({
                    message: `${message}`,
                    type: "warn",
                });
            }
            console.log(`[BIZ ERROR] failed to call ${path}: ${message}`);
            throw new Error(`code: ${code}, message: ${message}`);
        }
        return res?.data?.data;
    }
}

export async function loadMe(router: any) {
    const {commitMe} = useStorage();
    try {
        const res = await apiService.Me();
        commitMe(res);
        return res;
    } catch (e) {
        // 获取当前页面路由
        const currentRoute = router.currentRoute.value;
        let redirectUri = "";
        if (currentRoute.name !== "PageLogin") {
            redirectUri = currentRoute.fullPath;
        }
        await router.push({
            name: "PageLogin",
            query: {
                redirectUri: redirectUri,
            },
        });
    }
}

export const apiService = new APIService(config.API_BASE);
