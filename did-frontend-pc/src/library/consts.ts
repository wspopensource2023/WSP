export const PROFILE_CONSTS = {
    KEY_PROFILE_TEXT_ALIGN: "profile.text.align",
    KEY_PROFILE_BACKGROUND_IMAGE: "profile.background.image",
    KEY_PROFILE_BACKGROUND_MODE: "profile.background.mode",
    KEY_PROFILE_BACKGROUND_COLOR: "profile.background.color",
    KEY_PROFILE_BACKGROUND_VIDEO: "profile.background.video",
    KEY_PROFILE_BACKGROUND_VIDEO_POSTER: "profile.background.video_poster",
    DEFAULT_PROFILE_TEXT_ALIGN: "left",
    DEFAULT_PROFILE: {
        apiVersion: "v1",
        kind: "Profile",
        spec: {
            accountId: "",
            profileId: "",
            slug: "",
            title: "尚未设置名称",
            avatar: "https://xxxxxxxx/default_avatar.png",
            description: "暂无简介",
            style: {},
            identity: "",
            children: [
                {
                    apiVersion: "v1",
                    kind: "Group",
                    spec: {
                        visible: true,
                        style: {
                            "profile.text.align": "center",
                            "profile.background.mode": "color",
                            "profile.background.color": "rgb(47,48,69)",
                        },
                        children: [
                            {
                                apiVersion: "v1",
                                kind: "Story",
                                spec: {
                                    icon: "title",
                                    title: "欢迎来到我的数字名片",
                                    subtitle: "Welcome!",
                                    content:
                                        "欢迎来到我的数字名片，我会在这里分享我的社交媒体、个人简介、作品集、联系方式等信息，请持续关注哦！",
                                },
                            },
                        ],
                    },
                },
            ],
        },
    },
};
