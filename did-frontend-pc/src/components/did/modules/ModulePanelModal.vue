<template>
    <v-dialog scroll-strategy="reposition" v-model="visible" scrim="black" width="650">
        <div class="tw-relative tw-rounded-xl tw-pt-3 tw-px-3 tw-pb-6" style="background: rgb(20 20 20)">
            <ModulePanel :profile="profile" :config="config"></ModulePanel>
        </div>
    </v-dialog>
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
            visible: false,
            config: {},
        };
    },
    methods: {
        show(item) {
            this.visible = true;
            this.config = item;
        },
    },
};
</script>