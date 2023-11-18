<template>
    <uni-popup ref="editModal">
        <div style="background: linear-gradient(180deg, #252525 0%, #181818 100%) "
            class="tw-rounded-t-xl tw-text-white tw-px-3 tw-overflow-hidden">
            <div class="tw-relative tw-flex tw-flex-row tw-items-center tw-justify-center tw-py-3 tw-text-sm">
                <div> {{ title }}</div>
            </div>
            <div style="height: 28rem" class="tw-overflow-y-auto tw-pb-3">
                <ModuleConfig :profile="profile" @back="back" @confirm="confirm" @delete="onDelete" :config="config"
                    :groupIndex="groupIndex" :moduleIndex="moduleIndex"></ModuleConfig>
            </div>
        </div>
    </uni-popup>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconFont from "@/components/base/IconFont.vue";
import ModuleConfig from "@/components/did/modules/ModuleConfig.vue";
import _ from "lodash";
import { MODULE_CONFIGS, getModuleByKind } from '@/library/consts.js';
export default {
    props: {
        config: {},
        profile: {},
        groupIndex: -1,
        moduleIndex: -1
    },
    components: {
        SPIcon,
        IconFont,
        ModuleConfig
    },
    data() {
        return {}
    },
    computed: {
        title() {
            const item = getModuleByKind(this.config.kind);
            if (item) {
                return `编辑` + item.name + '模块';
            }
            return '编辑内容'
        }
    },
    methods: {
        show() {
            this.$refs.editModal.open('bottom')
        },
        confirm() {
            this.$refs.editModal.close()
        },
        onDelete() {
            this.back()
        },
        back() {
            this.$refs.editModal.close()
        },
    }
}
</script>