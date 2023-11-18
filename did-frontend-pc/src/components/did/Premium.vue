<template>
    <div>
        <div
            @click="showActivateModal"
            v-if="!activated"
            class="tw-px-3 tw-transition tw-duration-300 tw-cursor-pointer tw-rounded hover:tw-text-white-400 hover:tw-bg-white-500 hover:tw-bg-opacity-10 tw-items-center tw-justify-center tw-text-white tw-text-opacity-50 tw-bg-white tw-bg-opacity-5 tw-flex tw-flex-row tw-items-center tw-justify-center">
            <v-icon size="1rem" icon="mdi-diamond-stone"></v-icon>
            <span class="tw-ml-1 tw-mb-0.5">尚未激活会员</span>
        </div>
        <div
            v-if="activated"
            class="tw-px-3 tw-transition tw-duration-300 tw-cursor-pointer tw-rounded  hover:tw-bg-opacity-20 tw-items-center tw-justify-center tw-text-indigo-400 tw-bg-indigo-500 tw-bg-opacity-10 tw-flex tw-flex-row tw-items-center tw-justify-center">
            <v-icon size="1rem" icon="mdi-diamond-stone"></v-icon>
            <span class="tw-ml-1 tw-mb-0.5">会员生效中</span>
        </div>
        <ActivatePremiumModal :profile="profile" ref="ActivatePremiumModal"></ActivatePremiumModal>
    </div>
</template>

<script>
import {useStorage} from "@/stores/storage";
import ActivatePremiumModal from "@/components/did/ActivatePremiumModal.vue";
export default {
    props: {
        profile: {},
    },
    components: {
        ActivatePremiumModal
    },
    created() {
    },
    computed: {
        activated() {
            const {state} = useStorage();
            return state?.account?.is_premium_activated;
        },
    },
    methods: {
        showActivateModal() {
            this.$refs.ActivatePremiumModal.show();
        }
    }
}
</script>