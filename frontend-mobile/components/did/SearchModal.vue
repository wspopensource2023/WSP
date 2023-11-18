<template>
    <div>
        <div @click="show">
            <slot></slot>
        </div>
        <uni-popup ref="modal">
            <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%); "
                class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
                    <div>搜索数字身份</div>
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
                <div class="tw-pt-3 tw-pb-24">
                    <div>
                        <SearchInput v-model="keywords" @search="search" placeholder="请输入数字身份ID">
                        </SearchInput>
                    </div>
                    <div v-if="!hasResult">
                        <div class="tw-text-center tw-text-white/60 tw-text-sm tw-py-8">
                            <img class="tw-w-28 tw-h-28"
                                src="https://static.xxxxxx.com/e004bfac0ba7c2df24d955e01ff37beb5dcc5600b8ced38c5fe292a966f449f4"
                                alt="">
                            <div class="tw-text-sm tw-opacity-30">请输入搜索关键词进行搜索</div>
                        </div>
                    </div>
                    <div v-if="hasResult" class="tw-mt-2 tw-pb-5">
                        <div class="tw-transition tw-duration-300 tw-mt-3 hover:tw-border-white tw-border-solid tw-border-2 tw-border-transparent tw-bg-white tw-rounded-2xl tw-bg-opacity-5 tw-py-4 tw-px-3 tw-rounded-lg"
                            @click="jumpProfile(profile.spec.slug)" v-for="profile in profiles" :key="profile">
                            <div class="tw-flex tw-items-center tw-flex-row tw-flex-shrink-0">
                                <div
                                    class="tw-mr-2 tw-cursor-pointer tw-mr-2 tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
                                    <img :src="profile?.spec?.avatar" class="tw-w-14 tw-h-14 tw-rounded-full" />
                                </div>
                                <div style="width: calc(100% - 4rem);">
                                    <div class="tw-text-lg tw-cursor-pointer tw-flex tw-flex-row">
                                        <div class="tw-whitespace-nowrap">
                                            {{ profile?.spec?.title }}
                                        </div>
                                        <div
                                            class="tw-flex tw-truncate tw-items-center tw-ml-2 tw-px-2 tw-text-sm tw-text-indigo-400 tw-bg-indigo-500 tw-rounded-lg tw-text-center tw-bg-opacity-10">
                                            <span>xxxxxx.com/{{
                                                profile?.spec?.slug
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="tw-opacity-50 tw-text-base tw-mt-0.5 tw-truncate tw-cursor-pointer">
                                        {{ profile?.spec?.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tw-text-sm tw-text-center tw-mt-3 tw-opacity-30">
                            只展示最多10条搜索记录
                        </div>
                    </div>
                </div>

            </div>
        </uni-popup>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import { apiService } from "@/library/apis";
import SearchInput from "@/components/base/SearchInput.vue";

export default {
    components: {
        SPIcon,
        SearchInput
    },
    props: {
        profile: {},
    },
    data() {
        return {
            keywords: '',
            profiles: []
        };
    },
    computed: {
        hasResult() {
            return this.profiles && this.profiles.length
        }
    },
    watch: {
        keywords() {
            this.profiles = [];
        }
    },
    methods: {
        jumpProfile(slug) {
            uni.navigateTo({
                url: `/app/mobile/did/detail?did=${slug}`
            });
        },
        async search() {
            console.log('!!!!!', this.keywords)
            if (!this.keywords) {
                uni.showToast({
                    title: `请输入搜索关键词`,
                    icon: 'none',
                    duration: 3000
                })
                return
            }
            const res = await apiService.SearchProfile(this.keywords);
            if (!res || !res.count || !res.items) {
                uni.showToast({
                    title: `没有搜索到相关数字身份`,
                    icon: 'none',
                    duration: 3000
                })
                return
            }
            this.profiles = res.items || [];
            console.log('res', res)
        },
        show() {
            this.$refs.modal.open("bottom");
        },
        hide() {
            this.$refs.modal.close();
        },
    },
};
</script>

<style></style>