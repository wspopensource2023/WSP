<template>
    <div class="tw-mt-2 tw-cursor-default tw-select-none">
        <div @click="clickModule">
            <Title v-if="match('title')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></Title>
            <Link v-if="match('link')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex">
            </Link>
            <Bilibili v-if="match('bilibili')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></Bilibili>
            <Story v-if="match('story')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></Story>
            <Weibo v-if="match('weibo')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></Weibo>
            <ZhiHu v-if="match('zhihu')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></ZhiHu>
            <XiaoHongShu v-if="match('xiaohongshu')" :profile="profile" :config="config" :groupIndex="groupIndex"
                :moduleIndex="moduleIndex"></XiaoHongShu>
            <AchievementCollected v-if="match('AchievementCollected')" :profile="profile" :config="config"
                :groupIndex="groupIndex" :moduleIndex="moduleIndex"></AchievementCollected>
            <AchievementIssued v-if="match('AchievementIssued')" :profile="profile" :config="config"
                :groupIndex="groupIndex" :moduleIndex="moduleIndex"></AchievementIssued>
        </div>
    </div>
</template>

<script>
import Link from '@/components/did/modules/Link/Zen.vue'
import Bilibili from '@/components/did/modules/Bilibili/Zen.vue'
import Story from '@/components/did/modules/Story/Zen.vue'
import Weibo from '@/components/did/modules/Weibo/Zen.vue'
import ZhiHu from '@/components/did/modules/Zhihu/Zen.vue'
import XiaoHongShu from '@/components/did/modules/Xiaohongshu/Zen.vue'
import Title from '@/components/did/modules/Title/Zen.vue'
import AchievementCollected from '@/components/did/modules/AchievementCollected/Zen.vue'
import AchievementIssued from '@/components/did/modules/AchievementIssued/Zen.vue'
import SPIcon from '@/components/base/SPIcon.vue'

export default {
    props: {
        groupIndex: -1,
        moduleIndex: -1,
        profile: {},
        config: {},
    },
    components: {
        Link,
        Bilibili,
        Story,
        Weibo,
        ZhiHu,
        XiaoHongShu,
        SPIcon,
        Title,
        AchievementCollected,
        AchievementIssued,
    },
    data() {
        return {}
    },
    methods: {
				clickModule(){
					this.$emit('clickModuleZen')
				},
        deleteModule() {
            if (this.groupIndex === -1 || this.moduleIndex === -1) return
            try {
                const group = this.profile.spec.children[this.groupIndex]
                const modules = group.spec.children
                modules.splice(this.moduleIndex, 1)
            } catch (e) {
                console.error(e)
            }
        },
        match(kind) {
            return this.config?.kind?.toLowerCase() === kind?.toLowerCase()
        },
    },
}
</script>

<style></style>
