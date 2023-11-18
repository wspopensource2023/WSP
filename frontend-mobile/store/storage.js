import { defineStore } from "pinia";
import { merge } from "lodash";
import _ from "lodash";
import { PROFILE_CONSTS } from "@/library/consts";

export const useStorage = defineStore("storage", {
    state: () => {
        return {
            jwt: "",
            accountId: 0,
            account: {},
        };
    },
    actions: {
        commitMe(data) {
            this.accountId = data?.account_id || 0;
            this.account = data;
        },
        commitJWT(jwtToken) {
            this.jwt = jwtToken;
        },
        clear() {
            this.jwt = "";
            this.accountId = 0;
            this.profiles = [];
            uni.clearStorageSync();
        },
    },
    persist: {
        enabled: true,
        strategies: [{ storage: localStorage }],
    },
});

function standardizeProfile(profile) {
    return merge(
        {
            apiVersion: "v1",
            kind: "Profile",
            spec: {
                accountId: "",
                profileId: "",
                slug: "",
                title: "",
                avatar: "",
                description: "",
                style: {},
                identity: "",
                children: [],
            },
        },
        profile
    );
}

export function getDefaultProfile() {
    return _.cloneDeep(PROFILE_CONSTS.DEFAULT_PROFILE);
}

export function getDefaultAvatar() {
    return "https://static.xxxxxx.com/default_avatar.png";
}

export function getDefaultName() {
    return "尚未设置名称";
}

export function getDefaultDescription() {
    return "暂无简介";
}

export function getDefaultBanner() {
    return "";
}
