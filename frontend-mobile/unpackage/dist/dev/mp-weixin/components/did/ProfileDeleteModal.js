"use strict";
const common_vendor = require("../../common/vendor.js");
const library_apis = require("../../library/apis.js");
require("../../store/storage.js");
require("../../library/consts.js");
const SPIcon = () => "../base/SPIcon.js";
const IconFont = () => "../base/IconFont.js";
const TextInput = () => "../base/TextInput.js";
const _sfc_main = {
  props: {
    profile: {}
  },
  components: {
    SPIcon,
    IconFont,
    TextInput
  },
  data() {
    return {
      confirmText: "",
      visible: false
    };
  },
  methods: {
    getConfirmDisabled() {
      return this.confirmText !== this.getConfirmText();
    },
    async deleteProfile() {
      var _a, _b;
      const profileId = (_b = (_a = this == null ? void 0 : this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.profileId;
      if (profileId) {
        await library_apis.apiService.DeleteProfile(this.profile.spec.profileId);
        common_vendor.index.showToast({
          title: `删除成功！`,
          icon: "none",
          duration: 3e3
        });
      }
      common_vendor.index.switchTab({
        url: "/app/mobile/did/list"
      });
    },
    getConfirmText() {
      var _a, _b, _c, _d;
      return ((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.slug) || ((_d = (_c = this.profile) == null ? void 0 : _c.spec) == null ? void 0 : _d.profileId) || "我确定";
    },
    hide() {
      this.$refs.deleteModal.close();
    },
    show() {
      this.$refs.deleteModal.open("bottom");
    }
  }
};
if (!Array) {
  const _component_TextInput = common_vendor.resolveComponent("TextInput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_TextInput + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    b: common_vendor.t($options.getConfirmText()),
    c: common_vendor.o(($event) => $data.confirmText = $event),
    d: common_vendor.p({
      label: "提示词",
      placeholder: "请输入确认提示词",
      modelValue: $data.confirmText
    }),
    e: common_vendor.o(($event) => $options.hide()),
    f: $options.getConfirmDisabled(),
    g: common_vendor.o(($event) => $options.deleteProfile("color")),
    h: common_vendor.sr("deleteModal", "158cd92f-0")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ProfileDeleteModal.vue"]]);
wx.createComponent(Component);
