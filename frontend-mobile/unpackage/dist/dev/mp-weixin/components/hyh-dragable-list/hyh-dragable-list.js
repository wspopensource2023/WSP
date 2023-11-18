"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "hyh-dragable-list",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    clickClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const dragData = common_vendor.reactive({
      activeItem: null,
      activeY: -1e3,
      isDrag: false,
      dragTargetY: 0,
      dataList: [],
      rowHeight: 0,
      dragTargetX: 0,
      slideItem: null,
      slideWidth: 1e3
      // show: true,
      // moreVisible: false
    });
    let sortedList = [];
    common_vendor.watch(
      () => props.list,
      (newList) => {
        setList(newList);
      },
      { deep: true, immediate: true }
    );
    common_vendor.onMounted(() => {
      getRowHeight();
    });
    expose({ getRowHeight, setList });
    function getRowHeight() {
      const selectorQeury = common_vendor.index.createSelectorQuery().in(common_vendor.getCurrentInstance().ctx);
      new Promise((resolve, reject) => {
        selectorQeury.select(".mv-box").boundingClientRect((rect) => {
          resolve(rect);
        }).exec();
      }).then((val) => {
        dragData.rowHeight = val.height + 8;
        setList(props.list);
      });
      new Promise((resolve, reject) => {
        selectorQeury.select(".slide-area").boundingClientRect((rect) => {
          resolve(rect);
        }).exec();
      }).then((val) => {
        dragData.slideWidth = val.width;
      });
    }
    function touchstart(e) {
      dragData.dragTargetY = e.touches[0].pageY;
      dragData.dragTargetX = e.touches[0].pageX;
    }
    function longtap(item) {
      dragData.activeItem = item;
      item.disabled = false;
      dragData.isDrag = true;
      item.isActive = true;
    }
    function touchmove(e, item) {
      if (!dragData.isDrag) {
        let newX = e.touches[0].pageX;
        let dx = newX - dragData.dragTargetX;
        if (dx < -70) {
          if (dragData.slideItem && item.index !== dragData.slideItem.index) {
            dragData.slideItem.left = 0;
          }
          dragData.slideItem = item;
          dragData.slideItem.left = -dragData.slideWidth;
        } else if (dx > 50) {
          if (dragData.slideItem === item) {
            dragData.slideItem.left = 0;
          }
        }
        return;
      }
      let newY = e.touches[0].pageY;
      let d = newY - dragData.dragTargetY;
      dragData.dragTargetY = newY;
      let prevIndex = dragData.activeItem.index - 1;
      let nextIndex = dragData.activeItem.index + 1;
      if (prevIndex >= 0 && d < 0) {
        let pItem = getItemByIndex(prevIndex);
        if (dragData.activeY > -1e3 && dragData.activeY <= pItem.y) {
          swapArray(pItem);
        }
      } else if (nextIndex < props.list.length && d > 0) {
        let nItem = getItemByIndex(nextIndex);
        if (dragData.activeY >= nItem.y) {
          swapArray(nItem);
        }
      }
    }
    function touchend(item) {
      if (!dragData.isDrag)
        return;
      if (dragData.activeY > -1e3) {
        dragData.activeItem.y = dragData.activeY;
      }
      dragData.isDrag = false;
      dragData.activeItem.isActive = false;
      common_vendor.nextTick$1(() => {
        dragData.activeItem.y = dragData.activeItem.index * dragData.rowHeight;
        dragData.activeItem.disabled = true;
        dragData.activeItem = null;
        dragData.activeY = -1e3;
      });
      if (sortedList.length) {
        emit("change", sortedList);
        sortedList = [];
      }
    }
    function changeHandler(e) {
      if (e.detail.source === "" || !e.currentTarget.dataset.active)
        return;
      dragData.activeY = e.detail.y;
    }
    function slideClick() {
      if (props.clickClose) {
        dragData.slideItem.left = 0;
      }
    }
    function getItemByIndex(index) {
      return dragData.dataList.find((item) => {
        return item.index === index;
      });
    }
    function swapArray(item) {
      let index = dragData.activeItem.index;
      dragData.activeItem.index = item.index;
      item.index = index;
      common_vendor.nextTick$1(() => {
        item.y = item.index * dragData.rowHeight;
      });
      sortedList = [];
      dragData.dataList.forEach((dItem) => {
        let target = getItemByIndex(dItem.index).data;
        sortedList[dItem.index] = deepClone(target);
      });
    }
    function setList(list) {
      dragData.dataList = list.map((item, index) => {
        return {
          // 原来的数据存储在data中
          data: item,
          isActive: false,
          y: index * dragData.rowHeight,
          x: 0,
          index,
          disabled: true,
          left: 0
        };
      });
    }
    function deepClone(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      let cloneObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (typeof obj[i] === "object" && obj[i] !== null) {
            cloneObj[i] = deepClone(obj[i]);
          } else {
            cloneObj[i] = obj[i];
          }
        }
      }
      return cloneObj;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dragData.dataList, (item, index, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              item: item.data,
              index: item.index
            }, i0),
            c: "btn-" + i0,
            d: common_vendor.r("btn", {
              btnItem: item.data
            }, i0),
            e: common_vendor.o(slideClick, index),
            f: "translate(" + item.left + "px)",
            g: index,
            h: item.isActive ? 1 : "",
            i: item.isActive ? true : false,
            j: item.disabled,
            k: item.isActive ? false : true,
            l: item.x,
            m: item.y,
            n: common_vendor.o(touchstart, index),
            o: common_vendor.o(($event) => longtap(item), index),
            p: common_vendor.o(($event) => touchmove($event, item), index),
            q: common_vendor.o(($event) => touchend(), index),
            r: common_vendor.o(changeHandler, index)
          };
        }),
        b: -dragData.slideWidth + "px",
        c: dragData.rowHeight + "px",
        d: __props.list.length * dragData.rowHeight + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/hyh-dragable-list/hyh-dragable-list.vue"]]);
wx.createComponent(Component);
