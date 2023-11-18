"use strict";
const common_vendor = require("../../common/vendor.js");
const library_apis = require("../../library/apis.js");
const store_storage = require("../../store/storage.js");
const library_consts = require("../../library/consts.js");
const LoginModal = () => "../../app/mobile/loginModal.js";
const _sfc_main = {
  props: {
    profile: {}
  },
  components: {
    LoginModal
  },
  data() {
    return {
      backgroundMode: "image",
      backgroundImages: [
        "https://static.xxxxxx.com/b65406bac2a3ebb7228111b6933f0ad85af0d28008601f6553350a2c890c4d46",
        "https://static.xxxxxx.com/36cbf951c96f1fc9bb32b61819f0e63236de676035bb5e9d95b3576328f99899",
        "https://static.xxxxxx.com/f77a67d61f953743dce2be48d684e1a8ae56dbf16c52f1c203bed23a401152b8",
        "https://static.xxxxxx.com/e01ffcfbcdcb42fa3593339511baf13f5dd138a4366b22237a23dee298f41ee4",
        "https://static.xxxxxx.com/b92f3b021f6e0cdda604cf3ca109aea30d75767d8e06833882acbeac7a814fe1",
        "https://static.xxxxxx.com/1d83024625bf12fa6a0b53926e71c00332abd129dbff20b095b584f0d3210bd9",
        "https://static.xxxxxx.com/52f64a740a1a8671ed5247e830845a9348de171bf584956392be5016d320bfa5",
        "https://static.xxxxxx.com/d1282ca637eeb86e0bff93d6add7640e46b42efb817afc9efd60440f311300c5"
      ],
      backgroundColors: [
        "rgb(0,0,0)",
        "rgb(28,152,141)",
        "rgb(29,52,96)",
        "rgb(48,58,47)",
        "rgb(47,48,69)",
        "rgb(53,74,95)",
        "rgb(67,66,136)",
        "rgb(89,102,119)",
        "rgb(95,181,156)",
        "rgb(110,68,88)",
        "rgb(113,221,247)",
        "rgb(121,89,100)",
        "rgb(128,147,241)",
        "rgb(145,184,191)",
        "rgb(151,223,177)",
        "rgb(176,237,232)",
        "rgb(177,135,233)",
        "rgb(214,200,189)",
        "rgb(222,239,184)",
        "rgb(240,255,250)",
        "rgb(245,175,248)",
        "rgb(254,157,114)",
        "rgb(254,198,247)",
        "rgb(255,104,119)",
        "rgb(255,215,215)",
        "rgb(255,253,132)",
        "rgb(255,255,255)"
      ],
      backgroundVideos: [
        {
          poster: "https://static.xxxxxx.com/bdde105734f74ac03b9450e82dfd7560fc989efcf80fbcd90e9284b36dcb200d",
          video: "https://static.xxxxxx.com/2eeb89af088b0d0cb51f8cc3999fd61305f574e8628125b92a1f6f87fb2a38e5"
        },
        {
          poster: "https://static.xxxxxx.com/c86a7ade03a0e10d10f72e3b85295170978364ae716e2a8680aae3accbadce6d",
          video: "https://static.xxxxxx.com/7c523b19916702fb37738261c8a172ebe32153acace7d863269344a0a88ddb14"
        },
        {
          poster: "https://static.xxxxxx.com/c52e426fdaca8d978edaaa1ad94faef5441abb153db63e8d0056fa087679b5b3",
          video: "https://static.xxxxxx.com/5b4881c29fd290e94fe1d35a03c46774fabb7c3736e081c174514875734496eb"
        },
        {
          poster: "https://static.xxxxxx.com/37fb507887b006f321aeb42a22b7ad629f1ce4d6db76cce8cd6f12d35b74a1e5",
          video: "https://static.xxxxxx.com/1e2f8295758a50131d35bbd42cc3dd064444bd48811219249fb58c2752a8cb19"
        },
        {
          poster: "https://static.xxxxxx.com/69eeb0e2cadf9fb7d390ddf82a447c9026473551e69d44de68a140dabe7cb7b7",
          video: "https://static.xxxxxx.com/d489c496af8ce2c2d794e14a52a2bcf840bd20fde254723f0230f4f93cadb998"
        },
        {
          poster: "https://static.xxxxxx.com/adb0b5b3cd63c0d0b4f03a620a49e877e11d076df493636fa9402b27237930c3",
          video: "https://static.xxxxxx.com/16d1789c8f9ab209074006ab6ec74f0ae9591de348837708bb0341e9e086af76"
        },
        {
          poster: "https://static.xxxxxx.com/d507b191ef6c8ef043c7a6f9d9934e0a18433f689063a59ebe570d3cc5bd454b",
          video: "https://static.xxxxxx.com/dd2f32a25ac7d007ad0fdd9531aeb03024ce1b5f762886223b1b489670355a8f"
        },
        {
          poster: "https://static.xxxxxx.com/2adccf3998ff044a18aecf6e595b7657552b75fc2335dd0683dec8e82eab70af",
          video: "https://static.xxxxxx.com/7ffae414ef69a76c91c399017621dc2e9093ad0f79348c82f59e78124a7f3ea9"
        },
        {
          poster: "https://static.xxxxxx.com/53b0aadc6b889c2103d250c8bea76c6a91b23117e88f98e58ad482c6fef85a75",
          video: "https://static.xxxxxx.com/2327c75b93058efa9832cd185c06923d49116b9abadfe36f2811d94f8776ba52"
        }
      ]
    };
  },
  created() {
    this.backgroundMode = this.getBackgroundMode();
  },
  computed: {
    accountId() {
      const { accountId } = store_storage.useStorage();
      return accountId;
    },
    style: {
      get() {
        var _a, _b;
        return ((_b = (_a = this == null ? void 0 : this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.style) || {};
      },
      set(value) {
        this.profile.spec.style = value;
      }
    }
  },
  methods: {
    showLoginModal() {
      this.$refs.LoginModal.show();
    },
    uploadImage() {
      if (!this.accountId) {
        this.showLoginModal();
        return;
      }
      this.$refs.imageUploader.choose();
    },
    uploadVideo() {
      if (!this.accountId) {
        this.showLoginModal();
        return;
      }
      this.$refs.videoUploader.choose();
    },
    async chooseImage(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      common_vendor.index.showLoading({
        title: "上传中"
      });
      try {
        const filepath = tempFilePaths[0];
        const res = await library_apis.apiService.UploadImage(filepath);
        const imageUri = (res == null ? void 0 : res.image_uri) || "";
        if (imageUri) {
          this.selectBackgroundImage(imageUri);
        }
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    async chooseVideo(data) {
      const tempFilePaths = data == null ? void 0 : data.tempFilePaths;
      if (!tempFilePaths || !tempFilePaths.length)
        return;
      common_vendor.index.showLoading({
        title: "上传中"
      });
      try {
        const filepath = tempFilePaths[0];
        const res = await library_apis.apiService.UploadVideo(filepath);
        const videoUri = (res == null ? void 0 : res.video_uri) || "";
        if (videoUri) {
          this.selectBackgroundVideo(videoUri, "");
        }
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // background
    switchBackgroundMode(value) {
      if (this.backgroundMode === value)
        return;
      this.backgroundMode = value;
      this.setBackgroundMode(value);
    },
    isBackgroundMode(value) {
      return this.backgroundMode === value;
    },
    getBackgroundActiveClass(value) {
      if (this.isBackgroundMode(value)) {
        return {
          "tw-border-white": true
        };
      }
      return {};
    },
    getBackgroundImageStyle(image, upload) {
      if (!image)
        return {};
      let style = {
        "background": `url(${image}) no-repeat center center`,
        "background-size": "cover"
      };
      if (!upload && this.getBackgroundImage() === image) {
        style["border"] = "2px solid #fff";
      }
      return style;
    },
    getBackgroundVideoStyle(poster) {
      if (!poster)
        return {};
      let style = {
        "background": `url(${poster}) no-repeat center center`,
        "background-size": "cover"
      };
      if (this.getBackgroundVideoPoster() === poster) {
        style["border"] = "2px solid #fff";
      }
      return style;
    },
    getBackgroundColorStyle(color) {
      if (!color)
        return {};
      let style = {
        "background": color
      };
      if (this.getBackgroundColor() === color) {
        style["border"] = "2px solid #fff";
      }
      return style;
    },
    getBackgroundMode() {
      return this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE] || "image";
    },
    setBackgroundMode(mode) {
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_MODE] = mode;
    },
    getBackgroundImage() {
      return this.getSafeNetworkResource(this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE]);
    },
    getSafeNetworkResource(value) {
      if (typeof value == "string" && value.indexOf("http") === 0) {
        return value;
      }
      return "";
    },
    selectBackgroundImage(image) {
      this.setBackgroundMode("image");
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_IMAGE] = image;
    },
    getBackgroundColor() {
      return this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR];
    },
    selectBackgroundColor(color) {
      this.setBackgroundMode("color");
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_COLOR] = color;
    },
    getBackgroundVideo() {
      return this.getSafeNetworkResource(this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO]);
    },
    getBackgroundVideoPoster() {
      return this.getSafeNetworkResource(this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO_POSTER]);
    },
    selectBackgroundVideo(video, poster) {
      this.setBackgroundMode("video");
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO] = video;
      this.style[library_consts.PROFILE_CONSTS.KEY_PROFILE_BACKGROUND_VIDEO_POSTER] = poster;
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _component_v_icon = common_vendor.resolveComponent("v-icon");
  const _component_LoginModal = common_vendor.resolveComponent("LoginModal");
  (_easycom_uni_file_picker2 + _component_v_icon + _component_LoginModal)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.switchBackgroundMode("image")),
    b: common_vendor.n($options.getBackgroundActiveClass("image")),
    c: common_vendor.o(($event) => $options.switchBackgroundMode("color")),
    d: common_vendor.n($options.getBackgroundActiveClass("color")),
    e: common_vendor.o(($event) => $options.switchBackgroundMode("video")),
    f: common_vendor.n($options.getBackgroundActiveClass("video")),
    g: $options.isBackgroundMode("image")
  }, $options.isBackgroundMode("image") ? {
    h: common_vendor.s($options.getBackgroundImageStyle($options.getBackgroundImage(), true)),
    i: common_vendor.o((...args) => $options.uploadImage && $options.uploadImage(...args)),
    j: common_vendor.sr("imageUploader", "20129ef1-0"),
    k: common_vendor.o($options.chooseImage),
    l: common_vendor.p({
      sourceType: ["album"],
      ["del-icon"]: false,
      ["file-mediatype"]: "image",
      limit: "1",
      ["disable-preview"]: true
    }),
    m: common_vendor.f($data.backgroundImages, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.selectBackgroundImage(item), item),
        b: item,
        c: common_vendor.s($options.getBackgroundImageStyle(item, false))
      };
    })
  } : {}, {
    n: $options.isBackgroundMode("color")
  }, $options.isBackgroundMode("color") ? {
    o: common_vendor.p({
      size: "1.8rem",
      icon: "mdi-format-color-fill"
    }),
    p: common_vendor.f($data.backgroundColors, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.selectBackgroundColor(item), item),
        b: item,
        c: common_vendor.s($options.getBackgroundColorStyle(item))
      };
    })
  } : {}, {
    q: $options.isBackgroundMode("video")
  }, $options.isBackgroundMode("video") ? common_vendor.e({
    r: $options.getBackgroundVideo()
  }, $options.getBackgroundVideo() ? {
    s: $options.getBackgroundVideo()
  } : {}, {
    t: common_vendor.sr("videoUploader", "20129ef1-2"),
    v: common_vendor.o($options.chooseVideo),
    w: common_vendor.p({
      sourceType: ["album"],
      ["del-icon"]: false,
      ["file-mediatype"]: "video",
      limit: "1",
      ["disable-preview"]: true
    }),
    x: common_vendor.o((...args) => $options.uploadVideo && $options.uploadVideo(...args)),
    y: common_vendor.f($data.backgroundVideos, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.selectBackgroundVideo(item.video, item.poster), item),
        b: item,
        c: common_vendor.s($options.getBackgroundVideoStyle(item.poster, false))
      };
    })
  }) : {}, {
    z: common_vendor.sr("LoginModal", "20129ef1-3")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ThemeBackground.vue"]]);
wx.createComponent(Component);
