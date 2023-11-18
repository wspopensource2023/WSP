<template>
    <v-snackbar content-class="tw-top-5" :content-props="{
        style: 'bottom: initial; min-width: 0; border-radius: 5px; color: rgba(0,0,0,0.8); height: 20px',
    }" position="fixed" rounded :timeout="duration" :color="color" v-model="visible">
        <div class="tw-cursor-default tw-flex">
            <v-icon v-if="icon" class="tw-mr-2" :icon="icon"></v-icon>
            {{ message }}
        </div>
    </v-snackbar>
</template>

<script>
import { merge } from "lodash";

export default {
    props: {},
    components: {},
    data() {
        return {
            icon: "",
            message: "",
            color: "#fff",
            visible: false,
            duration: 3000,
            presets: {
                success: {
                    icon: "mdi-alert-circle-check",
                    color: "#fff",
                    duration: 3000,
                },
                error: {
                    icon: "mdi-alert",
                    color: "#fff",
                    duration: 3000,
                },
                warn: {
                    icon: "mdi-alert",
                    color: "#FFF",
                    duration: 3000,
                },
                info: {
                    icon: "",
                    color: "#FFF",
                    duration: 3000,
                },
            },
        };
    },
    created() {
        const self = this;
        window.showToast = function (options) {
            // 如果options是string类型，那么直接调用self.show
            if (typeof options === "string") {
                self.duration = 3000;
                self.show(options);
                return;
            }
            options = merge({}, self.presets[options.type || "info"], options);
            self.icon = options.icon;
            self.color = options.color;
            self.duration = options.duration || 3000;
            self.show(options.message);
        };
    },
    methods: {
        show(message) {
            console.log("show message", message);
            this.message = message;
            this.visible = true;
        },
    },
};
</script>
