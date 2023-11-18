"use strict";
const common_vendor = require("../../../common/vendor.js");
const library_apis = require("../../../library/apis.js");
const store_storage = require("../../../store/storage.js");
require("../../../library/consts.js");
const Profile = () => "../../../components/did/modules/Profile/Profile.js";
const ProfileEditor = () => "../../../components/did/ProfileEditor.js";
const ShareModal = () => "../../../components/did/ShareModal.js";
const ThemeEditor = () => "../../../components/did/ThemeEditor.js";
const ModuleConfigModal = () => "../../../components/did/modules/ModuleConfigModal.js";
const ProfileDeleteModal = () => "../../../components/did/ProfileDeleteModal.js";
const MetadataConfig = () => "../../../components/did/modules/Metadata/Config.js";
const LoginModal = () => "../loginModal.js";
const _sfc_main = {
  components: {
    Profile,
    ProfileEditor,
    ThemeEditor,
    ModuleConfigModal,
    ProfileDeleteModal,
    MetadataConfig,
    ShareModal,
    LoginModal
  },
  data() {
    return {
      profileId: -1,
      profile: {
        spec: {
          style: {}
        }
      },
      // editing 
      editingType: "",
      editingConfig: {},
      editingGroupIndex: -1,
      editingModuleIndex: -1
    };
  },
  computed: {
    slug() {
      var _a, _b;
      return ((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.slug) || "";
    },
    accountId() {
      const storage = store_storage.useStorage();
      return storage.$state.accountId;
    }
  },
  async onLoad(options) {
    this.profileId = options.profileId;
    console.log("profileId", this.profileId);
    await this.loadProfile();
  },
  methods: {
    clickAvatar() {
      this.$refs.editModal.open("bottom");
      this.editing({
        type: "profile.metadata",
        config: {},
        groupIndex: -1,
        moduleIndex: -1
      });
    },
    deleteProfile() {
      var _a, _b;
      const profileId = (_b = (_a = this == null ? void 0 : this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.profileId;
      if (!profileId) {
        common_vendor.index.switchTab({
          url: "/app/mobile/did/list"
        });
        return;
      }
      this.$refs.ProfileDeleteModal.show();
    },
    back() {
      common_vendor.index.switchTab({
        url: "/app/mobile/did/list"
      });
    },
    showShare() {
      this.$refs.ShareModal.show();
    },
    async saveProfile() {
      if (!this.accountId) {
        this.$refs.LoginModal.show();
      }
      console.log(">>>>>>>>> 保存！", this.profile.spec.profileId);
      const res = await library_apis.apiService.UpdateProfile(
        this.profile
      );
      if (res) {
        const profileId = res == null ? void 0 : res.profile_id;
        if (profileId) {
          this.profileId = profileId;
          this.profile.spec.profileId = profileId;
          common_vendor.index.navigateTo({
            url: `/app/mobile/did/edit?profileId=${profileId}`
          });
        }
      }
      common_vendor.index.showToast({
        title: `保存成功！`,
        icon: "none",
        duration: 3e3
      });
    },
    editing(info) {
      console.log("switch edit page", info);
      this.editingConfig = info.config;
      this.editingType = info.type;
      this.editingGroupIndex = info.groupIndex;
      this.editingModuleIndex = info.moduleIndex;
      console.log("update editing type", {
        "editingType": this.editingType,
        "editingGroupIndex": this.editingGroupIndex,
        "editingModuleIndex": this.editingModuleIndex
      });
      if (!this.editingType) {
        this.$refs.editModal.close();
        this.$refs.ModuleConfigModal.close();
      }
      if (this.editingType === "profile.editModule") {
        this.editingType = "profile";
        this.$refs.ModuleConfigModal.show();
      }
    },
    onEditModalChange(event) {
      if (!event.show) {
        this.editingType = "";
      }
    },
    showEditor(type) {
      if (this.editingType === type)
        return;
      this.editingType = type;
      this.$refs.editModal.open("bottom");
    },
    isEditingType(type) {
      return this.editingType === type;
    },
    isLooseEditingType(type) {
      return this.editingType && this.editingType.indexOf(type) === 0;
    },
    getTabClass(tab) {
      if (this.isLooseEditingType(tab)) {
        return {
          "tw-text-indigo-400": true,
          "tw-bg-indigo-500": true,
          "tw-bg-opacity-10": true
        };
      }
      return {
        "tw-opacity-60": true,
        "tw-text-white": true
      };
    },
    async loadProfile() {
      if (this.profileId) {
        try {
          const res = await library_apis.apiService.GetProfileByID(this.profileId);
          this.profile = res.profile;
          return;
        } catch (e) {
          console.error("apiService.GetProfileByID", e);
          common_vendor.index.showToast({
            title: `加载个人资料失败`,
            icon: "none",
            duration: 3e3
          });
        }
      }
      this.profile = store_storage.getDefaultProfile();
    }
  }
};
if (!Array) {
  const _component_Profile = common_vendor.resolveComponent("Profile");
  const _component_ProfileEditor = common_vendor.resolveComponent("ProfileEditor");
  const _component_ThemeEditor = common_vendor.resolveComponent("ThemeEditor");
  const _component_MetadataConfig = common_vendor.resolveComponent("MetadataConfig");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_ModuleConfigModal = common_vendor.resolveComponent("ModuleConfigModal");
  const _component_ProfileDeleteModal = common_vendor.resolveComponent("ProfileDeleteModal");
  const _component_ShareModal = common_vendor.resolveComponent("ShareModal");
  const _component_LoginModal = common_vendor.resolveComponent("LoginModal");
  (_component_Profile + _component_ProfileEditor + _component_ThemeEditor + _component_MetadataConfig + _easycom_uni_popup2 + _component_ModuleConfigModal + _component_ProfileDeleteModal + _component_ShareModal + _component_LoginModal)();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.back && $options.back(...args)),
    b: $options.slug
  }, $options.slug ? {
    c: common_vendor.o((...args) => $options.deleteProfile && $options.deleteProfile(...args))
  } : {}, {
    d: $options.slug
  }, $options.slug ? {
    e: common_vendor.o((...args) => $options.showShare && $options.showShare(...args))
  } : {}, {
    f: common_vendor.o((...args) => $options.saveProfile && $options.saveProfile(...args)),
    g: !$options.isLooseEditingType("profile")
  }, !$options.isLooseEditingType("profile") ? {} : {}, {
    h: $options.isLooseEditingType("profile")
  }, $options.isLooseEditingType("profile") ? {} : {}, {
    i: common_vendor.o(($event) => $options.showEditor("profile")),
    j: common_vendor.n($options.getTabClass("profile")),
    k: !$options.isLooseEditingType("theme")
  }, !$options.isLooseEditingType("theme") ? {} : {}, {
    l: $options.isLooseEditingType("theme")
  }, $options.isLooseEditingType("theme") ? {} : {}, {
    m: common_vendor.o(($event) => $options.showEditor("theme")),
    n: common_vendor.n($options.getTabClass("theme")),
    o: common_vendor.o($options.clickAvatar),
    p: common_vendor.p({
      profile: $data.profile
    }),
    q: $options.isEditingType("profile")
  }, $options.isEditingType("profile") ? {
    r: common_vendor.o($options.editing),
    s: common_vendor.p({
      profile: $data.profile
    })
  } : {}, {
    t: $options.isEditingType("theme")
  }, $options.isEditingType("theme") ? {
    v: common_vendor.o($options.editing),
    w: common_vendor.p({
      profile: $data.profile
    })
  } : {}, {
    x: $options.isEditingType("profile.metadata")
  }, $options.isEditingType("profile.metadata") ? {
    y: common_vendor.o($options.editing),
    z: common_vendor.p({
      profile: $data.profile
    })
  } : {}, {
    A: common_vendor.sr("editModal", "6e4975c6-1"),
    B: common_vendor.o($options.onEditModalChange),
    C: common_vendor.sr("ModuleConfigModal", "6e4975c6-5"),
    D: common_vendor.o($options.editing),
    E: common_vendor.p({
      profile: $data.profile,
      config: $data.editingConfig,
      groupIndex: $data.editingGroupIndex,
      moduleIndex: $data.editingModuleIndex
    }),
    F: common_vendor.sr("ProfileDeleteModal", "6e4975c6-6"),
    G: common_vendor.p({
      profile: $data.profile
    }),
    H: common_vendor.sr("ShareModal", "6e4975c6-7"),
    I: common_vendor.p({
      profile: $data.profile
    }),
    J: common_vendor.sr("LoginModal", "6e4975c6-8")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/app/mobile/did/edit.vue"]]);
wx.createPage(MiniProgramPage);
