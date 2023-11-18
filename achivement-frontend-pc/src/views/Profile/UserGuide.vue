<script lang="ts" setup>
import { ref, computed } from "vue";
import SelectIdentity from "@/components/Profile/UserGuide/SelectIdentity.vue";
import AddSocialMedia from "@/components/Profile/UserGuide/AddSocialMedia.vue";
import SelectTheme from "@/components/Profile/UserGuide/SelectTheme.vue";
import SetDomain from "@/components/Profile/UserGuide/SetDomain.vue";

const step = ref(0);
const steps = ref([
    {
        name: "请选择你的社交身份",
        next() {
            step.value++;
        },
    },
    {
        name: "请添加社交媒体",
        prev() {
            step.value--;
        },
        next() {
            step.value++;
        },
    },
    {
        name: "请选择你的主题",
        prev() {
            step.value--;
        },
        next() {
            step.value++;
        },
    },
    {
        name: "请选择你的社交域名",
        prev() {
            step.value--;
        },
        next() {
            step.value++;
        },
        complete() {},
    },
]);

const currentStep = computed(() => {
    return steps.value[step.value];
});
</script>
<template>
    <div class="tw-h-full">
        <div class="tw-absolute tw-top-0 tw-left-0 tw-w-full">
            <v-progress-linear
                :model-value="(100 * step) / steps.length"
                color="deep-purple-accent-2"
                height="10"
                striped
            ></v-progress-linear>
        </div>
        <div class="tw-relative tw-top-20">
            <div
                class="tw-w-3/4 mx-auto tw-p-5 tw-h-30 bg-lighten2 tw-rounded-lg"
            >
                <div>
                    {{ currentStep.name }}
                </div>
                <div>
                    <div class="tw-p-5">
                        <SelectIdentity v-if="step === 0"></SelectIdentity>
                        <AddSocialMedia v-if="step === 1"></AddSocialMedia>
                        <SelectTheme v-if="step === 2"></SelectTheme>
                        <SetDomain v-if="step === 3"></SetDomain>
                    </div>
                </div>
                <div class="tw-flex tw-flex-row-reverse">
                    <div class="tw-flex tw-flex-row">
                        <v-btn
                            class="tw-mr-3"
                            rounded="pill"
                            v-if="currentStep.prev"
                            @click="currentStep.prev"
                        >
                            上一步
                        </v-btn>
                        <v-btn
                            v-if="currentStep.skip"
                            class="tw-mr-3"
                            rounded="pill"
                            color="primary"
                            @click="currentStep.skip"
                        >
                            跳过
                        </v-btn>
                        <v-btn
                            class="tw-mr-3"
                            rounded="pill"
                            color="primary"
                            v-if="currentStep.next"
                            @click="currentStep.next"
                        >
                            下一步
                        </v-btn>
                        <v-btn
                            class="tw-mr-3"
                            v-if="currentStep.complete"
                            rounded="pill"
                            color="primary"
                        >
                            完成
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
</style>