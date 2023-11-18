<template>
    <div class="tw-px-1">
        <div class="tw-flex tw-mt-2 tw-mb-2 tw-items-center">
            <div class="tw-w-12 tw-flex tw-items-center tw-justify-center tw-mr-3">
                <SPIcon class="tw-ml-2 tw-w-12 tw-h-12" :config="getIcon()"></SPIcon>
            </div>
            <div class="tw-h-12 tw-flex tw-flex-col tw-text-left tw-justify-center">
                <span class="tw-text-base">小红书</span>
                <span class="tw-text-xs tw-text-white tw-text-opacity-50">2亿人的生活经验，都在小红书</span>
            </div>
        </div>
        <div style="border-bottom: 1px solid #ffffff07" class="tw-my-3"></div>
        <div>
            <TextBox class="tw-mb-3" label="标题" :value="getTitle()"></TextBox>
            <TextareaBox class="tw-mb-3" label="描述" :value="getSubtitle()"></TextareaBox>
            <TextBox class="tw-mb-3" label="账号ID" :value="config.spec.uid"></TextBox>
            <ButtonBox class="tw-mb-3" @click="copy(config.spec.url)" label="复制可以在浏览器访问的链接">
                <img class="tw-mt-0.5 tw-w-4 tw-h-4"
                    src="https://static.xxxxxx.com/6596fd440b55064e9b314a71b82d0966ad872c9354e7671477cbd691a829c47c"
                    alt="">
            </ButtonBox>
            <ButtonBox @click="open(config.spec.url)" label="在浏览器中访问">
                <img class="tw-mt-0.5 tw-w-4 tw-h-4"
                    src="https://static.xxxxxx.com/c490e44a1408c1baff5e49144079334c8ed75d71ff93e005d8ebf7b3136cdb6a"
                    alt="">
            </ButtonBox>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import TextBox from "@/components/base/TextBox.vue";
import ButtonBox from "@/components/base/ButtonBox.vue";
import TextareaBox from "@/components/base/TextareaBox.vue";
import { openLink, copyClipboard } from "@/library/util";
export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        SPIcon,
        IconFont,
        TextBox,
        ButtonBox,
        TextareaBox
    },
    data() {
        return {};
    },
    methods: {
        copy(data) {
            copyClipboard(data);
            this.$refs.toast.show(`${data} 已经复制到剪切板`);
        },
        open(url) {
            openLink(url);
        },
        getIcon() {
            return this.config?.spec?.icon;
        },
        getTitle() {
            return this.config?.spec?.title;
        },
        getSubtitle() {
            return this.config?.spec?.subtitle;
        },
        confirm() {
            this.$emit('confirm')
        },
        back() {
            this.$emit('back')
        },
    },
};
</script>
