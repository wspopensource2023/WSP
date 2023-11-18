<template>
    <div>
        <div v-if="loading">
            <v-skeleton-loader class="tw-rounded-xl tw-select-none" :loading="loading" height="120"
                type="avatar, list-item-two-line"></v-skeleton-loader>
        </div>
        <div v-show="!loading" @click="editing"
            class="hover:tw-border-white tw-border-transparent tw-border-solid tw-border-2 tw-bg-white tw-bg-opacity-5 tw-px-2 tw-py-2 tw-rounded-xl tw-select-none">
            <div>
                <div class="tw-flex tw-items-center tw-text-white tw-text-opacity-60">
                    <img class="tw-w-5 tw-h-5 tw-opacity-50"
                        src="https://static.xxxxxx.com/8a425ed3cb10f4e174967dee6f662aa434aa3cec738e7109fa58e2ecac524b54"
                        alt="">
                    <span class="tw-ml-1.5 tw-text-sm tw-mb-0.5">基础资料</span>
                </div>
                <div class="tw-flex tw-items-center tw-justify-between">
                    <div class="tw-mt-2 tw-pb-2 tw-flex tw-items-center tw-truncate">
                        <div class="tw-w-14 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0 tw-mr-3 tw-ml-1">
                            <img :src="getAvatar()" class="tw-rounded-full tw-h-12 tw-w-12" />
                        </div>
                        <div class="tw-flex tw-flex-col">
                            <div class="tw-text-base tw-flex">
                                <div style="max-width: 11rem" class="tw-truncate">
                                    {{ getTitle() }}
                                </div>
                                <div
                                    class="tw-flex tw-items-center tw-ml-3 tw-px-3 tw-text-sm tw-text-indigo-400 tw-bg-indigo-500 tw-rounded-lg tw-text-center tw-bg-opacity-10">
                                    <span class="tw-truncate">{{ getLink() }}</span>
                                </div>
                            </div>
                            <div class="tw-w-56 tw-truncate tw-opacity-50 tw-text-sm tw-mt-1">
                                {{ getDescription() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        profile: {},
    },
    data() {
        return {
            loading: false
        }
    },
    created() { },
    methods: {
        editing() {
            this.$emit("editing", {
                type: 'profile.metadata',
                config: {},
                groupIndex: -1,
                moduleIndex: -1
            });
        },
        getAvatar() {
            return this.profile?.spec?.avatar;
        },
        getTitle() {
            return this.profile?.spec?.title;
        },
        getDescription() {
            return this.profile?.spec?.description;
        },
        isLinkAvaliable() {
            return this.profile?.spec?.slug;
        },
        getLink() {
            if (this.isLinkAvaliable()) {
                return 'xxxxxx.com/' + this.profile?.spec?.slug;
            }
            return '点击设置个性域名'
        },
        clickLink() {
            if (!this.isLinkAvaliable()) {
                this.editing();
            }
        }
    }
};
</script>