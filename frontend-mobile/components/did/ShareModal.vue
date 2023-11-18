<template>
    <div>
        <div @click="show">
            <slot></slot>
        </div>
        <uni-popup ref="share">
            <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
                class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
                    <div>立即分享给好友</div>
                    <div class="tw-absolute tw-top-0 tw-right-0">
                        <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                            <div @click="hide"
                                class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                                <img class="tw-w-3 tw-h-3"
                                    src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tw-overflow-x-auto tw-overflow-y-hidden tw-grid tw-grid-cols-4 tw-pt-3 tw-pb-5 tw-px-3">
                    <div class="tw-flex tw-justify-center tw-flex-shrink-0 tw-flex-col tw-mr-5 tw-mb-3"
                        @click="option.click" v-for="option of options" :key="option">
                        <div class="tw-w-10 tw-h-10 tw-table tw-mx-auto tw-mb-2">
                            <SPIcon class="tw-w-full tw-h-full" :config="option.icon"></SPIcon>
                        </div>
                        <div class="tw-whitespace-nowrap tw-text-center">
                            {{ option.name }}
                        </div>
                    </div>
                </div>
            </div>
        </uni-popup>
        <QRCodeModal ref="QRCodeModal" :profile="profile"></QRCodeModal>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { getShareLink } from "@/library/util";
import { apiService } from "../../library/apis";
import QRCodeModal from "./QRCodeModal.vue";

export default {
    components: {
        SPIcon,
        QRCodeModal
    },
    props: {
        profile: {},
    },
    data() {
        return {
            qrcodeImageUri: '',
            options: [
				// #ifdef H5
                {
                    name: "微博",
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
                    name: "QQ空间",
                    icon: "qzone",
                    click: () => {
                        const profileName = this.getProfileName();
                        const title = `${profileName}的数字身份`;
                        const desc = "欢迎收藏我的数字身份";
                        const summary = this.getProfileDescription();
                        const url = this.getProfileShareURL();
                        const image = this.getProfileAvatar();
                        const link = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${title}&desc=${desc}&summary=${summary}&pics=${image}&url=${url}`;
                        window.open(link);
                    },
                },
				// #endif
				
                {
                    name: "复制链接",
                    icon: "link",
                    click: async () => {
                        const text = this.getProfileShareURL();
                        uni.setClipboardData({
                            data: text,
                            success: function () {
                                uni.showToast({
                                    title: `复制成功`,
                                    icon: "success",
                                });
                            },
                        });
                    },
                },
                {
                    name: "复制文本",
                    icon: "clipboard",
                    click: async () => {
                        const shareURL = this.getProfileShareURL();
                        const text = `欢迎收藏我的数字身份 ${shareURL}`;
                        uni.setClipboardData({
                            data: text,
                            success: function () {
                                uni.showToast({
                                    title: `复制成功`,
                                    icon: "success",
                                    duration: 30000,
                                });
                            },
                        });
                    },
                },
                {
                    name: "二维码",
                    icon: "qrcode",
                    click: async () => {
                        await this.$refs.QRCodeModal.show();
                    },
                },
            ],
        };
    },
    methods: {
        show() {
            this.$refs.share.open("bottom");
        },
        hide() {
            this.$refs.share.close();
        },
        getProfileName() {
            return this.profile?.spec?.name;
        },
        getProfileDescription() {
            return this.profile?.spec?.description;
        },
        getProfileShareURL() {
			console.log("getProfileShareURL",getShareLink(this.profile?.spec?.slug))
            return getShareLink(this.profile?.spec?.slug);
        },
        getProfileAvatar() {
            return this.profile?.spec?.avatar;
        },
    },
};
</script>

<style></style>