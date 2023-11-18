"use strict";
const common_vendor = require("../../common/vendor.js");
const library_apis = require("../../library/apis.js");
require("../../store/storage.js");
require("../../library/consts.js");
const SPIcon = () => "../base/SPIcon.js";
const _sfc_main = {
  components: {
    SPIcon
  },
  props: {
    profile: {}
  },
  data() {
    return {
      qrcodeImageUri: ""
    };
  },
  computed: {
    filename() {
      const title = this.profile.spec.slug;
      return `${title} - xxxxxx.com.png`;
    }
  },
  methods: {
    hide() {
      this.$refs.modal.close();
    },
    download() {
      const self = this;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", this.qrcodeImageUri, true);
      xhr.responseType = "blob";
      xhr.onload = function(e) {
        if (this.status == 200) {
          var blob = new Blob([this.response], { type: "image/png" });
          var downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = self.filename;
          downloadLink.click();
        }
      };
      xhr.send();
    },
    saveImage() {
      common_vendor.index.getSetting({
        success: (res) => {
          if (res.authSetting["scope.writePhotosAlbum"]) {
            this.downloadImage();
          } else {
            common_vendor.index.authorize({
              scope: "scope.writePhotosAlbum",
              success: () => {
                this.downloadImage();
              },
              fail: () => {
                common_vendor.index.showToast({
                  title: "请打开保存相册权限，再点击保存小程序码",
                  icon: "none",
                  duration: 3e3
                });
                setTimeout(() => {
                  common_vendor.index.openSetting({
                    //调起客户端小程序设置界面,让用户开启访问相册
                    success: (res2) => {
                      console.log("res", res2);
                    }
                  });
                }, 3e3);
              }
            });
          }
        }
      });
    },
    downloadImage() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.downloadFile({
        url: this.qrcodeImageUri,
        success: (res) => {
          common_vendor.index.hideLoading();
          if (res.statusCode === 200) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                common_vendor.index.showToast({
                  title: "保存成功",
                  icon: "success"
                });
              },
              fail: function() {
                console.log("aaaa");
                common_vendor.index.showToast({
                  title: "保存失败",
                  icon: "error"
                });
              }
            });
          }
        },
        fail: (err) => {
          console.log("err:", err);
          common_vendor.index.showToast({
            title: "保存失败",
            icon: "error"
          });
        }
      });
    },
    async show() {
      common_vendor.index.showLoading({
        title: "获取二维码中"
      });
      try {
        const res = await library_apis.apiService.GetProfileShareQRImage(this.profile.spec.profileId);
        this.qrcodeImageUri = res.image_uri;
        this.$refs.modal.open("bottom");
      } finally {
        common_vendor.index.hideLoading();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.show && $options.show(...args)),
    b: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    c: $data.qrcodeImageUri,
    d: common_vendor.o((...args) => $options.hide && $options.hide(...args)),
    e: common_vendor.o(($event) => $options.saveImage()),
    f: common_vendor.sr("modal", "31c547d9-0")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/github/xxxxxx/frontend-wap/frontend-wap/components/did/QRCodeModal.vue"]]);
wx.createComponent(Component);
