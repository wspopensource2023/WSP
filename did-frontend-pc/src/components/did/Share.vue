<template>
    <v-dialog scroll-strategy="reposition" v-model="visible" scrim="black" width="450">
        <div class="tw-rounded-xl tw-p-5" style="background: rgb(20 20 20)">
            <div class="tw-text-l tw-mb-3">分享数字名片</div>
            <div v-for="item in items" :key="item">
                <v-hover v-slot="{ isHovering, props }">
                    <div v-bind="props" @click="item.click" :class="getItemClass(isHovering)">
                        <div class="tw-mr-5">
                            <SPIcon size="3rem" :config="item.icon"></SPIcon>
                        </div>
                        <div class="tw-text-l tw-w-full tw-block">
                            {{ item.name }}
                        </div>
                        <div>
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </div>
                    </div>
                </v-hover>
            </div>
        </div>
    </v-dialog>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { copyClipboard, getShareLink } from "@/library/util";
import { apiService } from "@/apis/apis";

export default {
    props: {
        profile: {},
    },
    data() {
        const self = this;
        return {
            visible: false,
            items: [
                {
                    name: "分享到微博",
                    icon: "weibo",
                    click: () => {
                        const title = "欢迎收藏我的数字身份";
                        const url = this.getProfileShareURL();
                        const image = this.getProfileAvatar();
                        const link = `https://service.weibo.com/share/share.php?title=${title}&pic=${image}&url=${url}`;
                        window.open(link);
                    },
                },
                {
                    name: "分享到QQ空间",
                    icon: "qzone",
                    click: () => {
                        const title = `${this.getProfileName()}的数字身份`;
                        const desc = "欢迎收藏我的数字身份";
                        const summary = this.getProfileDescription();
                        const url = this.getProfileShareURL();
                        const image = this.getProfileAvatar();
                        const link = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${title}&desc=${desc}&summary=${summary}&pics=${image}&url=${url}`;
                        window.open(link);
                    },
                },
                {
                    name: "复制分享链接",
                    icon: "link",
                    click: async () => {
                        const text = this.getProfileShareURL();
                        copyClipboard(text);
                    },
                },
                {
                    name: "复制分享文本",
                    icon: "clipboard",
                    click: async () => {
                        const text = `欢迎收藏我的数字身份 ${this.getProfileShareURL()}`;
                        copyClipboard(text);
                    },
                },
                {
                    name: "下载分享二维码",
                    icon: "qrcode",
                    click: async () => {
                        await self.downloadQRCodeImage();
                    },
                },
            ],
        };
    },
    components: {
        SPIcon,
    },
    methods: {
        show() {
            this.visible = true;
        },
        getItemClass(isHovering) {
            let classNames = [
                "tw-flex",
                "tw-flex-row",
                "tw-p-3",
                "tw-justify-between",
                "tw-items-center",
                "tw-transition-colors",
                "tw-rounded-xl"
            ];
            if (isHovering) {
                return classNames
                    .concat([
                        "tw-bg-white",
                        "tw-bg-opacity-10",
                        "tw-rounded-xl",
                        "tw-cursor-pointer",
                    ])
                    .join(" ");
            }
            return classNames.join(" ");
        },
        getProfileName() {
            return this.profile?.spec?.name;
        },
        getProfileDescription() {
            return this.profile?.spec?.description;
        },
        getProfileShareURL() {
            return getShareLink(this.profile?.spec?.slug);
        },
        getProfileAvatar() {
            return this.profile?.spec?.avatar;
        },
        download() {

        },
        async downloadQRCodeImage() {
            const res = await apiService.GetProfileShareQRImage(
                this.profile.spec.profileId
            );
            if (!res.image_uri) {
                showToast({
                    message: "获取二维码失败",
                    type: "error",
                });
                return;
            }
            const self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', res.image_uri, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    var blob = new Blob([this.response], { type: 'image/png' });
                    var downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = `${self.profile.spec.title}的数字身份.png`;
                    downloadLink.click();
                }
            };
            xhr.send();
        },
    },
};
</script>
<style></style>