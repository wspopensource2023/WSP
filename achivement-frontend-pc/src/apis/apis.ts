import { useStorage } from "@/stores/storage";
import axios from "axios";
// import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast } from "@/library/util";
import { merge } from "lodash";
import config from "@/config/config";

class APIService {
    client;

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

    async Me() {
        return this._post("Me", {});
    }

    async Login(phone: string, code: string) {
        return this._post("Login", {
            phone: phone,
            sms_code: code,
        });
    }

    // 获取领取了某个徽章的用户列表
    async ListAchievementParticipant(
        achievement_id: string,
        limit: number,
        skip: number
    ) {
        return this._post("ListAchievementParticipant", {
            achievement_id: achievement_id,
            limit: limit,
            skip: skip,
        });
    }

    // 查询成就列表
    async ListCampaign(campaign_type: string, limit: number, skip: number) {
        return this._post("ListCampaign", {
            limit,
            skip,
            campaign_type: campaign_type,
        });
    }
    async ListAchievementByCampaign(campaign_id: string) {
        return this._post("ListAchievementByCampaign", {
            campaign_id: campaign_id,
        });
    }

    // 查询成就详情
    async GetCampaignDetail(campaign_id: string) {
        return this._post("GetCampaignDetail", {
            campaign_id: campaign_id,
        });
    }

    // 获取徽章详情
    async GetAchievement(achievement_id: string) {
        return this._post("GetAchievement", {
            achievement_id: achievement_id,
        });
    }

    // 领取成功
    async CollectAchievement(achievement_id: string) {
        return this._post("CollectAchievement", {
            achievement_id: achievement_id,
        });
    }

    // 验证
    async VerifyCondition(
        achievement_id: string,
        condition_id: string,
        param: any
    ) {
        return this._post("VerifyCondition", {
            achievement_id: achievement_id,
            condition_id: condition_id,
            account_params: param,
        });
    }

    async VerifyWeiboBind(param: any) {
        return this._post("ConditionWeiboBind", {
            account_params: param,
        });
    }

    async VerifyBilibiliBind(param: any) {
        return this._post("ConditionBilibiliBind", {
            account_params: param,
        });
    }

    async CreateInvitationCode(
        achievement_id: string,
        condition_id: string,
        count: number
    ) {
        return this._post("CreateInvitationCode", {
            achievement_id: achievement_id,
            condition_id: condition_id,
            count: count,
        });
    }

    async ListInvitationCode(
        achievement_id: string,
        condition_id: string,
        page: number,
        limit: number,
        status: string
    ) {
        return this._post("ListInvitationCode", {
            achievement_id: achievement_id,
            condition_id: condition_id,
            skip: page,
            limit: limit,
            status: status,
        });
    }

    async VerifyIssuer(achievement_id: string) {
        return this._post("VerifyIssuer", {
            achievement_id: achievement_id,
        });
    }

    async GetAccountProfile(account_id: string) {
        return this._post("GetAccountProfile", {
            account_id: account_id,
        });
    }

    // 个人页面成就获取【我的发行】
    async ListAccountCampaignIssued(
        account_id: string,
        limit: number,
        skip: number
    ) {
        return this._post("ListAccountCampaignIssued", {
            account_id: account_id,
            limit: limit,
            skip: skip,
        });
    }

    // 个人页面成就获取【我的成就】
    async ListAccountCampaign(account_id: string, limit: number, skip: number) {
        return this._post("ListAccountCampaign", {
            account_id: account_id,
            limit: limit,
            skip: skip,
        });
    }

    // 图片上传
    async uploadImage(file: File, filename: string) {
        const formData = new FormData();
        formData.append("form", file);
        formData.append("filename", filename);
        return this._post("/UploadImage", formData);
    }

    // 个人页面编辑
    async UpdateAccountProfile(
        name: string,
        avatar: string,
        desc: string,
        banner: string
    ) {
        return this._post("UpdateAccountProfile", {
            name,
            avatar,
            desc,
            banner,
        });
    }

    async ListCampaignByIssuer(
        issuer_account_id: string,
        limit: number,
        skip: number
    ) {
        return this._post("ListCampaignByIssuer", {
            issuer_account_id: issuer_account_id,
            limit: limit,
            skip: skip,
        });
    }

    async _post(path: any, data: any, headers: any = null) {
        const { state } = useStorage();
        console.log("!!!!", state);
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
            const message = res?.data?.msg || "请求失败";
            showToast({
                message: `${message}`,
                type: "warn",
            });
            console.log(`[BIZ ERROR] failed to call ${path}: ${message}`);
            throw new Error(`code: ${code}, message: ${message}`);
        }

        // 特殊处理
        if (path === "/UploadImage") {
            return res?.data;
        }
        return res?.data?.data;
    }
}

export const apiService = new APIService(config.API_BASE);
