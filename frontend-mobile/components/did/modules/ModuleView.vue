<template>
    <div>
        <Link v-if="match('link')" :profile="profile" :config="config" />
        <Story v-if="match('story')" :profile="profile" :config="config" />
        <ZhiHu v-if="match('zhihu')" :profile="profile" :config="config" />
        <XiaoHongShu v-if="match('xiaohongshu')" :profile="profile" :config="config" />
        <Bilibili v-if="match('bilibili')" :profile="profile" :config="config" />
        <Weibo v-if="match('weibo')" :profile="profile" :config="config" />
        <Title v-if="match('title')" :profile="profile" :config="config" />
        <AchievementCollected v-if="match('AchievementCollected')" :profile="profile" :config="config" />
        <AchievementIssued v-if="match('AchievementIssued')" :profile="profile" :config="config" />
    </div>
</template>

<script>
import Link from "@/components/did/modules/Link/View.vue";
import Story from "@/components/did/modules/Story/View.vue";
import ZhiHu from "@/components/did/modules/Zhihu/View.vue";
import XiaoHongShu from "@/components/did/modules/Xiaohongshu/View.vue";
import Bilibili from "@/components/did/modules/Bilibili/View.vue";
import Weibo from "@/components/did/modules/Weibo/View.vue";
import Title from "@/components/did/modules/Title/View.vue";
import AchievementCollected from "@/components/did/modules/AchievementCollected/View.vue";
import AchievementIssued from "@/components/did/modules/AchievementIssued/View.vue";
export default {
    props: {
        profile: {},
        config: {},
    },
    components: {
        Link,
        Story,
        ZhiHu,
        XiaoHongShu,
        Bilibili,
        Weibo,
        Title,
        AchievementCollected,
        AchievementIssued,
    },
    data() {
        return {};
    },
    methods: {
        match(kind) {
            return this.config?.kind?.toLowerCase() === kind?.toLowerCase();
        },
    },
};
</script>

<style></style>
