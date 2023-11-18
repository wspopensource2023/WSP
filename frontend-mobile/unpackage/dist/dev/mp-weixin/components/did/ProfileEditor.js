"use strict";
const library_util = require("../../library/util.js");
const common_vendor = require("../../common/vendor.js");
require("../../library/consts.js");
const GroupZen = () => "./modules/Group/Zen.js";
const SortableView = () => "../base/SortableView.js";
const ModuleView = () => "./modules/ModuleView.js";
const ModuleZen = () => "./modules/ModuleZen.js";
const IconFont = () => "../base/IconFont.js";
const SPIcon = () => "../base/SPIcon.js";
const MetadataZen = () => "./modules/Metadata/Zen.js";
const hyhDragableList = () => "../hyh-dragable-list/hyh-dragable-list.js";
const ModuleCreateModal = () => "./modules/ModuleCreateModal.js";
const _sfc_main = {
  components: {
    GroupZen,
    SortableView,
    ModuleView,
    IconFont,
    SPIcon,
    ModuleZen,
    MetadataZen,
    hyhDragableList,
    ModuleCreateModal
  },
  props: { profile: {} },
  data() {
    return {
      sortableGroupSelector: ".draggable-module-group .module-group-container",
      sortableItemSelector: ".draggable-module-item",
      sortableItemHandler: ".draggable-module-item-handler",
      firstGroupItem: {},
      firstGroup: [],
      lifeList: []
    };
  },
  created() {
    this.getFirstGroup();
  },
  methods: {
    createModule(item) {
      this.firstGroupItem = item;
      this.$refs.ModuleCreateModal.show();
    },
    changeHanlder(e) {
      var _a, _b;
      let arr = (((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.children) || []).slice(0, 1);
      arr[0].spec.children = e;
    },
    clickModuleZen(info) {
      this.$emit("editing", info);
    },
    editing(info) {
      this.$emit("editing", info);
    },
    getGroups() {
      var _a, _b;
      return (((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.children) || []).slice(0, 1);
    },
    getFirstGroup() {
      var _a, _b;
      let arr = (((_b = (_a = this.profile) == null ? void 0 : _a.spec) == null ? void 0 : _b.children) || []).slice(0, 1);
      this.firstGroup = JSON.parse(JSON.stringify(arr));
    },
    getItemsCount() {
      var _a, _b;
      const groups = this.getGroups();
      let count = 0;
      for (let item of groups) {
        count += ((_b = (_a = item == null ? void 0 : item.spec) == null ? void 0 : _a.children) == null ? void 0 : _b.length) || 0;
      }
      return count;
    },
    isSorting(target) {
      return library_util.$closest(target, this.sortableItemHandler);
    },
    touchstart(event) {
      console.log("!!!!!touchstart", event, event.srcElement);
      if (!this.isSorting(event.srcElement)) {
        return;
      }
      event.preventDefault();
      const cursorX = event.touches[0].clientX;
      const cursorY = event.touches[0].clientY;
      this.$refs.sortable.touchstart(cursorX, cursorY, event.currentTarget);
    },
    touchmove(event) {
      const cursorX = event.touches[0].clientX;
      const cursorY = event.touches[0].clientY;
      this.$refs.sortable.touchmove(event, cursorX, cursorY);
    },
    touchend(event) {
      this.$refs.sortable.touchend();
    },
    onModuleSorted(groupId, itemId, position) {
      console.log(
        `groupId=${groupId}, itemId=${itemId}, position.index=${position.index}, position.direction=${position.direction}, position.groupId=${position.groupId}`
      );
      const groups = this.getGroups();
      const group = groups[groupId];
      const targetGroup = groups[position.groupId];
      const item = group.spec.children[itemId];
      group.spec.children.splice(itemId, 1);
      if (groupId === position.groupId && position.index > itemId) {
        position.index--;
      }
      if (position.direction === 0) {
        targetGroup.spec.children.splice(position.index, 0, item);
      }
      if (position.direction === 1) {
        targetGroup.spec.children.splice(position.index + 1, 0, item);
      }
      console.log("config", this.profile);
    }
  }
};
if (!Array) {
  const _component_MetadataZen = common_vendor.resolveComponent("MetadataZen");
  const _component_ModuleZen = common_vendor.resolveComponent("ModuleZen");
  const _component_hyhDragableList = common_vendor.resolveComponent("hyhDragableList");
  const _component_ModuleCreateModal = common_vendor.resolveComponent("ModuleCreateModal");
  (_component_MetadataZen + _component_ModuleZen + _component_hyhDragableList + _component_ModuleCreateModal)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.editing({})),
    b: common_vendor.o($options.editing),
    c: common_vendor.p({
      profile: $props.profile
    }),
    d: common_vendor.f($data.firstGroup, (groupItem, groupIndex, i0) => {
      return {
        a: common_vendor.w(({
          item,
          index
        }, s1, i1) => {
          return {
            a: common_vendor.o(($event) => $options.clickModuleZen({
              type: "profile.editModule",
              config: item,
              groupIndex,
              moduleIndex: index
            }), groupIndex),
            b: "40cf63c8-2-" + i0 + "-" + i1 + "," + ("40cf63c8-1-" + i0),
            c: common_vendor.p({
              profile: $props.profile,
              config: item,
              groupIndex,
              moduleIndex: index
            }),
            d: i1,
            e: s1
          };
        }, {
          name: "d",
          path: "d[" + i0 + "].a",
          vueId: "40cf63c8-1-" + i0
        }),
        b: common_vendor.sr("hyhDragable", "40cf63c8-1-" + i0, {
          "f": 1
        }),
        c: common_vendor.o($options.changeHanlder, groupIndex),
        d: "40cf63c8-1-" + i0,
        e: common_vendor.p({
          list: groupItem.spec.children,
          clickClose: true
        }),
        f: common_vendor.o(($event) => $options.createModule(groupItem), groupIndex),
        g: groupIndex
      };
    }),
    e: common_vendor.sr("ModuleCreateModal", "40cf63c8-3"),
    f: common_vendor.p({
      profile: $props.profile,
      config: $data.firstGroupItem
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-40cf63c8"], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/ProfileEditor.vue"]]);
wx.createComponent(Component);
