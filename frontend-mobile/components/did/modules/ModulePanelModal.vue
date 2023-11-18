<template>
    <uni-popup ref="modal">
        <div class="tw-relative tw-rounded-t-xl tw-pt-3 tw-px-3 tw-pb-6"
            style="background: linear-gradient(180deg, #252525 0%, #181818 100%);">
            <div class="tw-absolute tw-top-0 tw-right-3">
                <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-py-3 tw-opacity-60">
                    <div @click="hide"
                        class="tw-flex tw-items-center tw-justify-center tw-w-4 tw-h-4 tw-bg-white tw-bg-opacity-10 tw-rounded-full tw-p-0.5">
                        <img class="tw-w-3 tw-h-3"
                            src="https://static.xxxxxx.com/63d2ad6ca4076d87299a85e2373bb5ad53a73ab1857c51c33930790f5cb3090e" />
                    </div>
                </div>
            </div>
            <ModulePanel :profile="profile" :config="config"></ModulePanel>
        </div>
    </uni-popup>
</template>
<script>
import ModulePanel from "@/components/did/modules/ModulePanel.vue";
export default {
    components: {
        ModulePanel,
    },
    props: {
        profile: {},
    },
    data() {
        return {
            config: {},
        };
    },
    methods: {
        show(item) {
            console.log('show', item)
            this.config = item;
            this.$refs.modal.open('bottom');
        },
        hide() {
            this.$refs.modal.close()
        }
    },
};
</script>