<template>
    <div>
        <div :class="childClassName">
            <div class="tw-flex tw-h-full tw-items-center tw-justify-center">
                <SPIcon size="20px" :config="icon"></SPIcon>
            </div>
        </div>
    </div>
</template>
<script>
import SPIcon from "./SPIcon.vue";

export default {
    props: {
        icon: "",
        value: false,
    },
    data() {
        return {};
    },
    computed: {
        childClassName() {
            let classNames = ["tw-w-full", "tw-rounded", "tw-h-full"];
            if (this.value) {
                classNames.push("tw-bg-blue-500");
            } else {
                classNames.push("tw-bg-gray-800");
            }
            return classNames.join(" ");
        },
    },
    components: {
        SPIcon,
    },
};
</script>

<style>
</style>
