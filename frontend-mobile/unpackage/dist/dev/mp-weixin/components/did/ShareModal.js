"use strict";
const common_vendor = require("../../common/vendor.js");
const library_util = require("../../library/util.js");
require("../../library/apis.js");
require("../../library/consts.js");
require("../../store/storage.js");
const SPIcon = () => "../base/SPIcon.js";
const QRCodeModal = () => "./QRCodeModal.js";
const _sfc_main = {
  components: {
    SPIcon,
    QRCodeModal
  },
  props: {
    profile: {}
  },
  data() {
    return {
      qrcodeImageUri: "",
      options: [
        {
          name: "复制链接",
          icon: "link",
          click: async () => {
            const text = this.getProfileShareURL();
            common_vendor.index.setClipboardData({
              data: text,
              success: function() {
                common_vendor.index.showToast({
                  title: `复制成功`,
                  icon: "success"
                });
              }
            });
          }
        },
        {
          name: "复制文本",
          icon: "clipboard",
          click: async () => {
            const shareURL = this.getProfileShareURL();
            const text = `欢迎收藏我的数字身份 ${shareURL}`;
            common_vendor.index.setClipboardData({
              data: text,
              success: function() {
                common_vendor.index.showToast({
                  title: `复制成功`,
                  icon: "success",
                  duration: 3e4
                });
              }
            });
          }
        },
        {
          name: "二维码",
          icon: "qrcode",
          click: async () => {
            await this.$refs.QRCodeModal.show();
          }
        }
      ]
    };
  },
  methods: {
    show() {
      this.$refs.share.open("bottom");
    },
    hide() {
      this.$refs.share.close();
    },
    getProfileName() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.name;
    },
    getProfileDescription() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.description;
    },
    getProfileShareURL() {
      var _a, _b, _c, _d;
      console.log("getProfileShareURL", library_util.getShareLink((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.slug));
      return library_util.getShareLink((_d = (_c = this.profile) == null ? void 0 : _c.spec) == null ? void 0 : _d.slug);
    },
    getProfileAvatar() {
      var _a, _b;
      return (_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.avatar;
    }
  }
};
if (!Array) {
  const _component_SPIcon = common_vendor.resolveComponent("SPIcon");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_QRCodeModal = common_vendor.resolveComponent("QRCodeModal");
  (_component_SPIcon + _easycom_uni_popup2 + _component_QRCodeModal)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.show && $options.show(...args)),
    b: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    c: common_vendor.f($data.options, (option, k0, i0) => {
      return {
        a: "15893f38-1-" + i0 + ",15893f38-0",
        b: common_vendor.p({
          config: option.icon
        }),
        c: common_vendor.t(option.name),
        d: common_vendor.o(option.click, option),
        e: option
      };
    }),
    d: common_vendor.sr("share", "15893f38-0"),
    e: common_vendor.sr("QRCodeModal", "15893f38-2"),
    f: common_vendor.p({
      profile: $props.profile
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ShareModal.vue"]]);
wx.createComponent(Component);
