"use strict";
const common_vendor = require("../../common/vendor.js");
const library_apis = require("../../library/apis.js");
require("../../store/storage.js");
require("../../library/consts.js");
const SPIcon = () => "../base/SPIcon.js";
const SearchInput = () => "../base/SearchInput.js";
const _sfc_main = {
  components: {
    SPIcon,
    SearchInput
  },
  props: {
    profile: {}
  },
  data() {
    return {
      keywords: "",
      profiles: []
    };
  },
  computed: {
    hasResult() {
      return this.profiles && this.profiles.length;
    }
  },
  watch: {
    keywords() {
      this.profiles = [];
    }
  },
  methods: {
    jumpProfile(slug) {
      common_vendor.index.navigateTo({
        url: `/app/mobile/did/detail?did=${slug}`
      });
    },
    async search() {
      console.log("!!!!!", this.keywords);
      if (!this.keywords) {
        common_vendor.index.showToast({
          title: `请输入搜索关键词`,
          icon: "none",
          duration: 3e3
        });
        return;
      }
      const res = await library_apis.apiService.SearchProfile(this.keywords);
      if (!res || !res.count || !res.items) {
        common_vendor.index.showToast({
          title: `没有搜索到相关数字身份`,
          icon: "none",
          duration: 3e3
        });
        return;
      }
      this.profiles = res.items || [];
      console.log("res", res);
    },
    show() {
      this.$refs.modal.open("bottom");
    },
    hide() {
      this.$refs.modal.close();
    }
  }
};
if (!Array) {
  const _component_SearchInput = common_vendor.resolveComponent("SearchInput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_SearchInput + _easycom_uni_popup2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.show && $options.show(...args)),
    b: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    c: common_vendor.o($options.search),
    d: common_vendor.o(($event) => $data.keywords = $event),
    e: common_vendor.p({
      placeholder: "请输入数字身份ID",
      modelValue: $data.keywords
    }),
    f: !$options.hasResult
  }, !$options.hasResult ? {} : {}, {
    g: $options.hasResult
  }, $options.hasResult ? {
    h: common_vendor.f($data.profiles, (profile, k0, i0) => {
      var _a, _b, _c, _d;
      return {
        a: (_a = profile == null ? void 0 : profile.spec) == null ? void 0 : _a.avatar,
        b: common_vendor.t((_b = profile == null ? void 0 : profile.spec) == null ? void 0 : _b.title),
        c: common_vendor.t((_c = profile == null ? void 0 : profile.spec) == null ? void 0 : _c.slug),
        d: common_vendor.t((_d = profile == null ? void 0 : profile.spec) == null ? void 0 : _d.description),
        e: common_vendor.o(($event) => $options.jumpProfile(profile.spec.slug), profile),
        f: profile
      };
    })
  } : {}, {
    i: common_vendor.sr("modal", "094d3202-0")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/SearchModal.vue"]]);
wx.createComponent(Component);
