"use strict";
const common_vendor = require("../common/vendor.js");
const library_consts = require("./consts.js");
function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
function copyClipboard(data) {
  common_vendor.index.setClipboardData({
    data,
    success: () => {
      common_vendor.index.showToast({
        title: `已经将 ${data} 复制到剪贴板`,
        icon: "success"
      });
    }
  });
}
function openLink(link) {
  const anchor = document.createElement("a");
  anchor.href = link;
  anchor.target = "_blank";
  anchor.click();
}
function getShareLink(slug) {
  return `${library_consts.getBaseURL()}/${slug}`;
}
const dateFormat = (dateObj, format) => {
  let date = {
    "M+": dateObj.getMonth() + 1,
    "d+": dateObj.getDate(),
    "h+": dateObj.getHours(),
    "m+": dateObj.getMinutes(),
    "s+": dateObj.getSeconds(),
    "q+": Math.floor((dateObj.getMonth() + 3) / 3),
    "S+": dateObj.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length)
      );
    }
  }
  return format;
};
function $closest(element, className) {
  if (!element) {
    return null;
  }
  if (element.matches && element.matches(className)) {
    return element;
  }
  if (element.parentNode) {
    return $closest(element.parentNode, className);
  }
  return null;
}
function $children(element, selector) {
  return Array.from(element.querySelectorAll(selector));
}
exports.$children = $children;
exports.$closest = $closest;
exports.copyClipboard = copyClipboard;
exports.dateFormat = dateFormat;
exports.getCurrentPage = getCurrentPage;
exports.getShareLink = getShareLink;
exports.openLink = openLink;
