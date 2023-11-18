import {showLoadingToast} from "vant";

export function isTransparent(color: string) {
    if (color === "transparent") {
        return true;
    }
    const parsed = parseRGBA(color);
    return parsed && parsed.opacity === 0;
}

export function parseBoxShadow(css: string) {
    try {
        const shadowRegex =
            /(?<color>(rgb\(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\)|rgba\(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(?:0?\.\d+|1(\.0+)?))|#(?:[0-9a-fA-F]{3}){1,2}(?:[0-9a-fA-F]{2})?)\s+(?<xOffset>-?\d+px)\s+(?<yOffset>-?\d+px)\s+(?<blurRadius>\d+px)\s+(?<spreadRadius>-?\d+px)?/;
        // @ts-ignore
        const shadowValues = css.match(shadowRegex).groups;
        return {
            color: shadowValues.color,
            xOffset: shadowValues.xOffset,
            yOffset: shadowValues.yOffset,
            blurRadius: shadowValues.blurRadius,
            spreadRadius: shadowValues.spreadRadius || "0px",
        };
    } catch (e) {
        return null;
    }
}

export function parseRGBA(color: string) {
    color = color || "#000";
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(color)) {
        let hex = color.substring(1);
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("");
        }
        // @ts-ignore
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

export function openLink(link: string) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.click();
}

// parse background image
export function parseBackgroundImage(value: any) {
    const regex = /url\((.*?)\)/;
    const match = value.match(regex);
    if (!match) {
        return null;
    }
    let [, uri] = match;
    return uri;
}

// parseBackdropBlur is used to parse:
// backdrop-filter: blur(40px);
export function parseBackdropBlur(value: any) {
    const regex = /blur\((\d+)px\)/;
    const match = value.match(regex);
    if (!match) {
        return null;
    }
    let [, blurRadius] = match;
    blurRadius = parseInt(blurRadius);
    return blurRadius;
}

export function showToast(data: object) {
    // @ts-ignore
    window.showToast(data);
}

export function copyClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast({
        icon: "mdi-check-circle-outline",
        message: `已经将 ${text} 复制到剪切板`,
    });
}

export function getShareLink(slug: string) {
    return `${window.location.origin}/${slug}`;
}

export function getShoreShareLink(slug: string) {
    return `${window.location.host}/pages/PageProfile?did=${slug}`;
}

export async function withLoading(fn: Function, loadingText: string = '') {
    window.showLoading(loadingText)
    let data;
    try {
        data = await fn()
    } finally {
        window.hideLoading()
    }
    return data;
}


// https://www.zhihu.com/people/xxxxxx
// https://m.zhihu.com/people/xxxxxx
export function parseZhihuUID(s: string) {
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
export function parseXiaohongshuUID(s: string) {
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
export function parseWeiboUID(s: string) {
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
export function parseBilibiliUID(s: string) {
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