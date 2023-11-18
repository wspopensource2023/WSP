<template>
    <div>
        <div @click="showModal(value)"
            class="tw-bg-white tw-bg-opacity-[0.02] tw-rounded-lg tw-h-12 tw-items-center tw-flex tw-justify-between tw-transition tw-duration-300 hover:tw-border-white tw-border-transparent tw-border-solid tw-border tw-pr-2.5">
            <div class="tw-ml-5 tw-text-white tw-text-opacity-50 tw-whitespace-nowrap">图标</div>
            <div class="tw-flex tw-justify-end tw-pr-2">
                <SPIcon v-if="modelValue" class="tw-w-6 tw-h-6" :config="modelValue"></SPIcon>
                <img v-if="!modelValue" class="tw-w-6 tw-h-6"
                    src="https://static.xxxxxx.com/dd59fc3fba842e8626db37e42327a43db2475eed4e7585e9f0788caac90ebf43" />
            </div>
        </div>
        <IconSelectorModal @confirm="onIconSelected" ref="IconSelectorModal"></IconSelectorModal>
    </div>
</template>
<script>
import SPIcon from "@/components/base/SPIcon.vue";
import IconSelectorModal from '@/components/base/IconSelectorModal.vue';

export default {
    props: {
        modelValue: '',
    },
    components: {
        SPIcon,
        IconSelectorModal
    },
    methods: {
        showModal() {
            this.$refs.IconSelectorModal.show(this.modelValue)
        },
        onIconSelected(value) {
			console.log("onIconSelected", value)
            this.$emit('update:modelValue', value)
        }
    }
}
</script>