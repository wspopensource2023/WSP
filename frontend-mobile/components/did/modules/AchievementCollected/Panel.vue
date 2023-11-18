<template>
    <div class="module tw-p-1 tw-text-left">
        <div class="tw-flex tw-flex-row tw-items-center tw-justify-center tw-text-sm">
            <div>收集的数字成就</div>
        </div>
        <div class="module-content tw-relative tw-mt-2">
            <div class="tw-flex tw-flex-col tw-truncate">
                <div @click="jumpAchievementDetail(item.achievement_id)"
                    class="tw-flex tw-flex-row tw-mb-3 tw-overflow-hidden tw-px-2 tw-py-1" v-for="item of achievements"
                    :key="item">
                    <div class="tw-w-16 tw-h-16 tw-flex-shrink-0">
                        <img class="tw-w-full tw-h-full tw-rounded-full" :src="item.achievement_image"
                            :alt="item.achievement_name" />
                    </div>
                    <div class="tw-h-16 tw-flex tw-flex-col tw-ml-2 tw-justify-center tw-overflow-hidden">
                        <div class="tw-truncate tw-text-base tw-mb-1">
                            {{ item.achievement_name }}
                        </div>
                        <div class="tw-flex tw-flex-row tw-items-center">
                            <img class="tw-w-4 tw-h-4 tw-rounded-full tw-mr-1" :src="item.issuer.avatar" alt="">
                            <span class="tw-truncate tw-text-sm tw-opacity-60">{{ item.issuer.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="module-footer">
            <div class="tw-text-sm tw-text-center tw-mt-3 tw-opacity-30">
                只展示最多10条记录
            </div>
        </div>
    </div>
</template>

<script>
import SPIcon from "@/components/base/SPIcon.vue";
import {
    apiService
} from '@/library/apis.js'

export default {
    props: {
        config: {},
        profile: {},
    },
    components: {
        SPIcon,
    },
    data() {
        return {
            achievements: [],
        };
    },
    async mounted() {
        await this.loadAchievements();
    },
    computed: {
        accountId() {
            return this.profile?.spec?.accountId;
        },
    },
    methods: {
        async jumpAchievementDetail(achievementId) {
            uni.navigateTo({ url: `/app/mobile/achievement/detail?achievementId=${achievementId}`, })
        },
        async loadAchievements() {
            const res = await apiService.ListCollectedAchievement(
                this.accountId,
                1,
                10
            );
            this.achievements = res.achievement_list;
        },
    },
};
</script>

<style></style>
