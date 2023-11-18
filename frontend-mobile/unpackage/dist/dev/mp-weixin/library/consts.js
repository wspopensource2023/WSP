"use strict";
const PROFILE_CONSTS = {
  KEY_PROFILE_TEXT_ALIGN: "profile.text.align",
  KEY_PROFILE_BACKGROUND_IMAGE: "profile.background.image",
  KEY_PROFILE_BACKGROUND_MODE: "profile.background.mode",
  KEY_PROFILE_BACKGROUND_COLOR: "profile.background.color",
  KEY_PROFILE_BACKGROUND_VIDEO: "profile.background.video",
  KEY_PROFILE_BACKGROUND_VIDEO_POSTER: "profile.background.video_poster",
  DEFAULT_ACCOUNT_AVATAR: "https://xxxxxxxx/default_avatar.png",
  DEFAULT_ACCOUNT_BANNER: "https://static.xxxxxx.com/images/9214b8c6b205da3c1ecbd2faf63260bdb8653ddf78373f58584f9a7f751a473c.jpg",
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
      identity: "",
      style: {},
      children: [
        {
          apiVersion: "v1",
          kind: "Group",
          spec: {
            visible: true,
            style: {
              "profile.text.align": "center",
              "profile.background.mode": "color",
              "profile.background.color": "rgb(47,48,69)"
            },
            children: [
              {
                apiVersion: "v1",
                kind: "Story",
                spec: {
                  icon: "title",
                  title: "欢迎来到我的数字名片",
                  subtitle: "Welcome!",
                  content: "欢迎来到我的数字名片，我会在这里分享我的社交媒体、个人简介、作品集、联系方式等信息，请持续关注哦！"
                }
              }
            ]
          }
        }
      ]
    }
  }
};
const MODULE_CONFIGS = [
  {
    kind: "Link",
    name: "链接",
    icon: "link",
    description: "添加一个链接，让访问者可以直接点击进入你想要分享的网页或者社交媒体页面。",
    default: {
      apiVersion: "v1",
      kind: "Link",
      spec: {
        title: "暂无标题",
        visible: true,
        icon: "link",
        subtitle: "",
        url: ""
      }
    }
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
        style: {}
      }
    }
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
        content: ""
      }
    }
  },
  {
    kind: "Bilibili",
    name: "哔哩哔哩",
    icon: "https://static.xxxxxx.com/72f5b3d7f935d506f0c98c0df24cd03841513441f83f4ca5b9b31460c06db7d6",
    description: "展示你在B站的账号，让访问者可以了解你在B站的影响力以及作品。",
    default: {
      apiVersion: "v1",
      kind: "Bilibili",
      spec: {
        uid: "",
        title: "暂无标题",
        visible: true,
        icon: "https://static.xxxxxx.com/72f5b3d7f935d506f0c98c0df24cd03841513441f83f4ca5b9b31460c06db7d6",
        subtitle: "",
        url: ""
      }
    }
  },
  {
    kind: "XiaoHongShu",
    name: "小红书",
    icon: "https://static.xxxxxx.com/images/7a0f0164f9a1d6118fff9b46b683c34e8f5489b817fd7bf747c18e1166f415ac",
    description: "展示你在小红书的账号信息，让访问者可以了解你在小红书上的影响力以及分享的内容。",
    default: {
      apiVersion: "v1",
      kind: "XiaoHongShu",
      spec: {
        uid: "",
        title: "暂无标题",
        visible: true,
        icon: "https://static.xxxxxx.com/images/7a0f0164f9a1d6118fff9b46b683c34e8f5489b817fd7bf747c18e1166f415ac",
        subtitle: "",
        url: ""
      }
    }
  },
  {
    kind: "Weibo",
    name: "新浪微博",
    icon: "https://static.xxxxxx.com/89815ca17833a76349ce3d97afc4a56986db65b824f53279f7194bec76188099",
    description: "新浪微博",
    default: {
      apiVersion: "v1",
      kind: "Weibo",
      spec: {
        title: "暂无标题",
        visible: true,
        icon: "https://static.xxxxxx.com/89815ca17833a76349ce3d97afc4a56986db65b824f53279f7194bec76188099",
        subtitle: "",
        url: ""
      }
    }
  },
  {
    kind: "ZhiHu",
    name: "知乎",
    icon: "https://static.xxxxxx.com/8c56fb75d90cbbfc4d55e9d81981f9954c57fddadf2f0e5e8b9d146bf1ccf1ee",
    description: "展示你在知乎的账号，让访问者可以直接了解你在知乎上的影响力以及分享的知识。",
    default: {
      apiVersion: "v1",
      kind: "ZhiHu",
      spec: {
        id: "",
        title: "暂无标题",
        visible: true,
        icon: "https://static.xxxxxx.com/8c56fb75d90cbbfc4d55e9d81981f9954c57fddadf2f0e5e8b9d146bf1ccf1ee",
        subtitle: "",
        url: ""
      }
    }
  }
];
function getBaseURL() {
  return "https://xxxxxx.com";
}
function getModuleByKind(kind) {
  var _a;
  for (let item of MODULE_CONFIGS) {
    if (((_a = item.kind) == null ? void 0 : _a.toLowerCase()) === (kind == null ? void 0 : kind.toLowerCase())) {
      return item;
    }
  }
  return null;
}
exports.MODULE_CONFIGS = MODULE_CONFIGS;
exports.PROFILE_CONSTS = PROFILE_CONSTS;
exports.getBaseURL = getBaseURL;
exports.getModuleByKind = getModuleByKind;
