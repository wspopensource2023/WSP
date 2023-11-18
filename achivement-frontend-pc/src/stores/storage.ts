import { defineStore } from "pinia";
import { h, ref } from "vue";
import type { ProfileType, ThemeType } from "@/common/module";
import { merge } from "lodash";
import useClipboard from "vue-clipboard3";
import { message } from "ant-design-vue";

const { toClipboard } = useClipboard();

export const useStorage = defineStore(
    "storage",
    () => {
        let state = ref({
            jwt: "",
            accountId: "",
            user: {}
        });

        function commitMe(account_id: string) {
            state.value.accountId = account_id || "";
        }

        function commitJWT(jwtToken: string) {
            state.value.jwt = jwtToken;
        }
        function commitUser(user: object) {
            console.log(user, "user1231312312");
            state.value.user = user
        }
        return { state, commitMe, commitJWT, commitUser };
    },
    {
        persist: {
            enabled: true,
            strategies: [{ storage: localStorage, paths: ["state"] }],
        },
    }
);

export function validateUNS(s: string): boolean {
    const pattern = /^[a-zA-Z0-9]{6,18}$/;
    return pattern.test(s);
}

const defaults: ProfileType = {
    metadata: {
        name: "",
        description: "",
        avatarImageUri:
            "https://xxxxxxxx/default_avatar.png",
    },
    theme: {},
    modules: [],
};

export function isProfileUninitialized(profile: ProfileType): boolean {
    const avatarURI = profile?.metadata?.avatarImageUri;
    if (!avatarURI || avatarURI == defaults.metadata.avatarImageUri) {
        return true;
    }
    return false;
}

export function mergeProfile(profile: ProfileType): ProfileType {
    if (isProfileUninitialized(profile) && profile?.modules?.length == 0) {
        defaults.modules.push({
            link: {
                options: {
                    enabled: true,
                    icon: { id: "empty" },
                    name: "我的主页",
                },
                uri: "",
                subTitle: "",
            },
        });
    }
    profile = merge(defaults, profile);
    profile.theme = mergeTheme(profile.theme);
    return profile;
}

export function mergeTheme(theme: ThemeType): ThemeType {
    return merge(
        {
            button: {
                theme: {
                    id: 1,
                    buttonColor: "#FFFFFF",
                    buttonFontColor: "#000000",
                    buttonShadowColor: "#884beb",
                },
            },
            font: {
                color: "#000000",
            },
            background: {
                color: {
                    color: "#F0F0F0",
                },
                image: {
                    uri: "",
                    aero: 0,
                },
                video: {
                    uri: "",
                },
            },
        },
        theme
    );
}

export function getUNSLink(uns: string): string {
    if (!uns) return "#";
    return `https://${getUserDomain(uns)}`;
}

export function getUserDomain(uns: string): string {
    return `${import.meta.env.VITE_DOMAIN}/${uns}`;
}

export async function doCopy(text: string) {
    try {
        await toClipboard(text);
        message.success(
            h("div", {}, [
                "已经将",
                h(
                    "b",
                    {
                        style: "margin: 0 3px; color: #c41aac;",
                    },
                    text
                ),
                "复制到剪切板",
            ]),
            1.5
        );
    } catch (e) {
        message.error(`复制失败`, 1.5);
    }
}

export function formatProfile(profile: ProfileType): ProfileType {
    profile.modules = profile.modules.filter((item) => {
        for (let key in item) {
            // @ts-ignore
            if (item[key] !== null) {
                return true;
            }
        }
        return false;
    });
    return profile;
}
