export const moduleConfigs = [
    {
        kind: "Link",
        name: "链接",
        icon: "link",
        description:
            "添加一个链接，让访问者可以直接点击进入你想要分享的网页或者社交媒体页面。",
        default: {
            apiVersion: "v1",
            kind: "Link",
            spec: {
                title: "暂无标题",
                visible: true,
                icon: "link",
                subtitle: "",
                backgroundColor: "",
                fontColor: "",
                borderSize: "",
                url: "",
            },
        },
    },
    {
        kind: "Title",
        name: "标题",
        icon: "title",
        description: "添加一个标题，来对列表进行简单的分类",
        default: {
            apiVersion: "v1",
            kind: "Title",
            spec: {
                title: "",
                visible: true,
                style: {},
            },
        },
    },
    {
        kind: "Story",
        name: "文章",
        icon: "story",
        description: "发布一篇文章，展示自己的故事、想法和经验。",
        default: {
            apiVersion: "v1",
            kind: "Story",
            spec: {
                title: "暂无标题",
                visible: true,
                icon: "story",
                subtitle: "",
                metadata: [],
                content: "",
            },
        },
    },
    {
        kind: "Bilibili",
        name: "哔哩哔哩",
        icon: "bilibili",
        description:
            "展示你在B站的账号，让访问者可以了解你在B站的影响力以及作品。",
        default: {
            apiVersion: "v1",
            kind: "Bilibili",
            spec: {
                uid: "",
                title: "暂无标题",
                visible: true,
                icon: "bilibili",
                subtitle: "",
                backgroundColor: "",
                fontColor: "",
                borderSize: "",
                url: "",
            },
        },
    },
    {
        kind: "XiaoHongShu",
        name: "小红书",
        icon: "xiaohongshu",
        description:
            "展示你在小红书的账号信息，让访问者可以了解你在小红书上的影响力以及分享的内容。",
        default: {
            apiVersion: "v1",
            kind: "XiaoHongShu",
            spec: {
                uid: "",
                title: "暂无标题",
                visible: true,
                icon: "xiaohongshu",
                subtitle: "",
                backgroundColor: "",
                fontColor: "",
                borderSize: "",
                url: "",
            },
        },
    },
    {
        kind: "Weibo",
        name: "新浪微博",
        icon: "weibo",
        description: "新浪微博",
        default: {
            apiVersion: "v1",
            kind: "Weibo",
            spec: {
                title: "暂无标题",
                visible: true,
                icon: "weibo",
                subtitle: "",
                backgroundColor: "",
                fontColor: "",
                borderSize: "",
                url: "",
            },
        },
    },
    {
        kind: "ZhiHu",
        name: "知乎",
        icon: "zhihu",
        description:
            "展示你在知乎的账号，让访问者可以直接了解你在知乎上的影响力以及分享的知识。",
        default: {
            apiVersion: "v1",
            kind: "ZhiHu",
            spec: {
                id: "",
                title: "暂无标题",
                visible: true,
                icon: "zhihu",
                subtitle: "",
                backgroundColor: "",
                fontColor: "",
                borderSize: "",
                url: "",
            },
        },
    },
    {
        kind: "AchievementCollected",
        name: "收集成就",
        icon: "achievement-collected",
        description:
            "展示你收集的数字成就，让访问者可以更加直观地了解你的能力、兴趣爱好、经历等。",
        default: {
            apiVersion: "v1",
            kind: "AchievementCollected",
            spec: {
                visible: true,
            },
        },
    },
    {
        kind: "AchievementIssued",
        name: "发行成就",
        icon: "achievement-issued",
        description:
            "展示你发行的数字成就，让访问者可以更加直观地了解你发行过的活动。",
        default: {
            apiVersion: "v1",
            kind: "AchievementIssued",
            spec: {
                visible: true,
            },
        },
    },
];

export function getModuleNameByKind(kind) {
    const item = getModuleByKind(kind);
    return item ? item.name : "";
}

export function getModuleByKind(kind) {
    for (let item of moduleConfigs) {
        if (item.kind.toLowerCase() === kind.toLowerCase()) {
            return item;
        }
    }
    return null;
}

export function getModuleIconByKind(kind) {
    const item = getModuleByKind(kind);
    return item ? item.icon : "";
}
