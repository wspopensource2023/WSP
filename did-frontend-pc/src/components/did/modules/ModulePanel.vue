<template>
    <div class="tw-mb-2">
        <Story v-if="match('story')" :profile="profile" :config="config"></Story>
        <Link v-if="match('link')" :profile="profile" :config="config">
        </Link>
        <Bilibili v-if="match('bilibili')" :profile="profile" :config="config"></Bilibili>
        <Weibo v-if="match('weibo')" :profile="profile" :config="config"></Weibo>
        <Xiaohongshu v-if="match('xiaohongshu')" :profile="profile" :config="config"></Xiaohongshu>
        <Zhihu v-if="match('zhihu')" :profile="profile" :config="config"></Zhihu>
        <AchievementCollected v-if="match('AchievementCollected')" :profile="profile" :config="config">
        </AchievementCollected>
        <AchievementIssued v-if="match('AchievementIssued')" :profile="profile" :config="config"></AchievementIssued>
    </div>
</template>

<script>
import Story from "@/components/did/modules/Story/Panel.vue";
import Link from "@/components/did/modules/Link/Panel.vue";
import Bilibili from "@/components/did/modules/Bilibili/Panel.vue";
import Weibo from "@/components/did/modules/Weibo/Panel.vue";
import Xiaohongshu from "@/components/did/modules/Xiaohongshu/Panel.vue";
import Zhihu from "@/components/did/modules/Zhihu/Panel.vue";
import AchievementCollected from "@/components/did/modules/AchievementCollected/Panel.vue";
import AchievementIssued from "@/components/did/modules/AchievementIssued/Panel.vue";
import SPIcon from "@/components/base/SPIcon.vue";

export default {
    props: {
        profile: {},
        config: {},
    },
    components: {
        Story,
        SPIcon,
        Link,
        Bilibili,
        Weibo,
        Xiaohongshu,
        Zhihu,
        AchievementCollected,
        AchievementIssued,
    },
    data() {
        return {};
    },
    methods: {
        match(kind) {
            return this.config?.kind?.toLowerCase() === kind.toLowerCase();
        },
    },
};
</script>

<style></style>
