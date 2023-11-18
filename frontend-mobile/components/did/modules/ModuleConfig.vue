<template>
    <div>
        <Link @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('link')" :config="config" />
        <Bilibili @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('bilibili')" :config="config" />
        <Story @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('story')" :config="config" />
        <ZhiHu @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('zhihu')" :config="config" />
        <XiaoHongShu @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex"
            @delete="deleteModule" v-if="match('xiaohongshu')" :config="config" />
        <Weibo @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('weibo')" :config="config" />
        <Title @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex" @delete="deleteModule"
            v-if="match('title')" :config="config" />
        <AchievementCollected @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex"
            @delete="deleteModule" v-if="match('AchievementCollected')" :config="config" />
        <AchievementIssued @back="back" @confirm="confirm" :groupIndex="groupIndex" :moduleIndex="moduleIndex"
            @delete="deleteModule" v-if="match('AchievementIssued')" :config="config" />
    </div>
</template> 

<script>
import Title from "@/components/did/modules/Title/Config.vue";
import Link from "@/components/did/modules/Link/Config.vue";
import Story from "@/components/did/modules/Story/Config.vue";
import ZhiHu from "@/components/did/modules/Zhihu/Config.vue";
import XiaoHongShu from "@/components/did/modules/Xiaohongshu/Config.vue";
import Bilibili from "@/components/did/modules/Bilibili/Config.vue";
import Weibo from "@/components/did/modules/Weibo/Config.vue";
import AchievementCollected from "@/components/did/modules/AchievementCollected/Config.vue";
import AchievementIssued from "@/components/did/modules/AchievementIssued/Config.vue";

export default {
    name: "ModuleConfig",
    props: {
        profile: {},
        config: {},
        groupIndex: -1,
        moduleIndex: -1,
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
        back() {
            this.$emit('back')
        },
        confirm() {
            this.$emit('confirm')
        },
        match(kind) {
            return this.config?.kind?.toLowerCase() === kind.toLowerCase();
        },
        deleteModule() {
            console.log('收到删除信号', this.groupIndex, this.moduleIndex, '正在删除...')
            if (this.groupIndex === -1 || this.moduleIndex === -1) return;
            try {
                const group = this.profile.spec.children[this.groupIndex];
                const modules = group.spec.children;
                modules.splice(this.moduleIndex, 1);
                this.$emit("delete", {});
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style></style>
