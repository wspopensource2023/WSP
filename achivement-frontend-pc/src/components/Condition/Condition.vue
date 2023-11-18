<template>
    <div :class="finishedStyle">
        <PanelWeiboTag
            :condition="condition"
            :status="condition.status"
            :tag="parseTag()"
            :weiboUid="userInfo.bind.weibo_uid"
            :desc="condition.condition_template.condition_description"
            :conditionId="condition.condition_template.condition_template_id"
            :params="condition.issuer_params"
            @success="onSuccess"
            v-if="
                condition.condition_template.condition_name ==
                '微博 - 发布话题微博'
            "
        ></PanelWeiboTag>
        <PanelBilibiliTag
            :condition="condition"
            :status="condition.status"
            :tag="parseTag()"
            :bilibiliUid="userInfo.bind.bilibili_uid"
            :desc="condition.condition_template.condition_description"
            :conditionId="condition.condition_template.condition_template_id"
            :params="condition.issuer_params"
            @success="onSuccess"
            v-if="
                condition.condition_template.condition_name ==
                'B站 - 发布话题动态'
            "
        ></PanelBilibiliTag>
        <PanelCode
            :condition="condition"
            :status="condition.status"
            :achievementId="condition.achievement_id"
            :conditionId="condition.condition_template.condition_template_id"
            :title="condition.condition_template.condition_name"
            :desc="condition.condition_template.condition_description"
            :params="condition.issuer_params"
            @success="onSuccess"
            v-if="condition.condition_template.condition_name == '校验码'"
        ></PanelCode>
    </div>
</template>

<script lang="ts">
import PanelWeiboTag from "@/components/Condition/PanelWeiboTag.vue";
import PanelBilibiliTag from "@/components/Condition/PanelBilibiliTag.vue";
import PanelCode from "@/components/Condition/PanelCode.vue";

export default {
    data() {
        return {
            status: false,
        };
    },

    components: {
        PanelWeiboTag,
        PanelBilibiliTag,
        PanelCode,
    },
    props: {
        userInfo: {},
        condition: {},
    },
    computed: {
        finishedStyle() {
            if (this.condition.status === "finished" || this.status) {
                return "active";
            } else {
                return "inactive";
            }
        },
    },
    methods: {
        onSuccess() {
            this.status = true;
        },
        parseTag() {
            const issue = JSON.parse(
                JSON.stringify(this.condition.issuer_params)
            );
            return issue.tag || "";
        },
    },
};
</script>

<style>
.active {
}

.inactive {
    color: white;
}
</style>
