import { getBaseURL } from "@/library/consts";

export function getCurrentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}

export function isTransparent(color) {
    if (color === "transparent") {
        return true;
    }
    const parsed = parseRGBA(color);
    return parsed && parsed.opacity === 0;
}

export function parseRGBA(color) {
    color = color || "#000";
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(color)) {
        let hex = color.substring(1);
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }
        let [r, g, b] = hex.match(/.{2}/g).map((h) => parseInt(h, 16));
        color = `rgb(${r},${g},${b})`;
    }
    let [match, r, g, b, _, opacity] =
        color.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*\.?\d+)\s*)?\)$/i
        ) || [];
    if (match) {
        return {
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            opacity: opacity ? parseFloat(opacity) : 1,
        };
    } else {
        return null;
    }
}

export function parseBoxShadow(value) {
    const regex =
        /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*(\d(?:\.\d+)?))?\) (-?\d+px) (-?\d+px) (-?\d+px) (-?\d+px)/;
    const match = value.match(regex);
    if (!match) {
        return null;
    }
    const [
        ,
        red,
        green,
        blue,
        ,
        alpha,
        hOffset,
        vOffset,
        blurRadius,
        spreadRadius,
    ] = match;
    const color = alpha
        ? `rgba(${red}, ${green}, ${blue}, ${alpha})`
        : `rgb(${red}, ${green}, ${blue})`;
    return {
        color,
        hOffset,
        vOffset,
        blurRadius,
        spreadRadius,
    };
}

export async function withLoading(fn, loadingText) {
    uni.showLoading(loadingText)
    let data;
    try {
        data = await fn()
    } finally {
        uni.hideLoading()
    }
    return data;
}


// parseBackdropBlur is used to parse:
// backdrop-filter: blur(40px);
export function parseBackdropBlur(value) {
    const regex = /blur\((\d+)px\)/;
    const match = value.match(regex);
    if (!match) {
        return null;
    }
    let [, blurRadius] = match;
    blurRadius = parseInt(blurRadius);
    return blurRadius;
}

// parse background image
export function parseBackgroundImage(value) {
    const regex = /url\((.*?)\)/;
    const match = value.match(regex);
    if (!match) {
        return null;
    }
    let [, uri] = match;
    return uri;
}

export function copyClipboard(data) {
    uni.setClipboardData({
        data: data,
        success: () => {
            uni.showToast({
                title: `已经将 ${data} 复制到剪贴板`,
                icon: "success",
            });
        },
    });
}

export function openLink(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.click();
}

export function getShareLink(slug) {
    return `${getBaseURL()}/${slug}`;
}

export const dateFormat = (dateObj, format) => {
    let date = {
        "M+": dateObj.getMonth() + 1,
        "d+": dateObj.getDate(),
        "h+": dateObj.getHours(),
        "m+": dateObj.getMinutes(),
        "s+": dateObj.getSeconds(),
        "q+": Math.floor((dateObj.getMonth() + 3) / 3),
        "S+": dateObj.getMilliseconds(),
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
                RegExp.$1.length === 1
                    ? date[k]
                    : ("00" + date[k]).substr(("" + date[k]).length)
            );
        }
    }
    return format;
};

export function getShoreShareLink(slug) {
    return `${window.location.host}/${slug}`;
}

export function $closest(element, className) {
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

export function $children(element, selector) {
    return Array.from(element.querySelectorAll(selector));
}


// https://www.zhihu.com/people/xxxxxx
// https://m.zhihu.com/people/xxxxxx
export function parseZhihuUID(s) {
    for (const pattern of [
        /zhihu\.com\/people\/(\w+)/,
        /^(\w+)$/
    ]) {
        const matches = s.match(pattern);
        if (matches && matches.length > 1) {
            return matches[1];
        }
    }
    return "";
}

// https://www.xiaohongshu.com/user/profile/636e9b7d000000002401764b
// https://m.xiaohongshu.com/user/profile/636e9b7d000000002401764b
export function parseXiaohongshuUID(s) {
    for (const pattern of [
        /xiaohongshu\.com\/user\/profile\/(\w+)/,
        /^(\w+)$/
    ]) {
        const matches = s.match(pattern);
        if (matches && matches.length > 1) {
            return matches[1];
        }
    }
    return "";
}

// https://weibo.com/u/7875501696
// https://m.weibo.cn/u/3308458192
export function parseWeiboUID(s) {
    for (const pattern of [
        /weibo\.com\/u\/(\w+)/,
        /weibo\.cn\/u\/(\w+)/,
        /^(\w+)$/
    ]) {
        const matches = s.match(pattern);
        if (matches && matches.length > 1) {
            return matches[1];
        }
    }
    return "";
}


// https://space.bilibili.com/3546557857139682?spm_id_from=333.1007.0.0
// https://m.bilibili.com/space/3546557857139682
export function parseBilibiliUID(s) {
    for (const pattern of [
        /space\.bilibili\.com\/(\w+)/,
        /m\.bilibili\.com\/space\/(\w+)/,
        /^(\w+)$/
    ]) {
        const matches = s.match(pattern);
        if (matches && matches.length > 1) {
            return matches[1];
        }
    }
    return "";
}