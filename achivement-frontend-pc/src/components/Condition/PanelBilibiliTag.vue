<template>
  <div>
    <v-expansion-panel-title>
      <template #actions>
        <div class="tw-flex tw-flex-row" v-if="status !== 'finished'">
          <v-btn
            @click.prevent="showDialogBilibiliBind"
            class="v-size--small tw-mr-3"
            variant="tonal"
            v-if="!bilibiliUid && !bindingStatus"
          >
            绑定Bilibili账号
          </v-btn>
          <v-btn
            @click.prevent="showDialogBilibiliTag"
            class="v-size--small"
            variant="tonal"
            v-if="status === 'unfinished' && !verifyStatus"
          >
            发布Bilibili动态
          </v-btn>
        </div>
        <div v-if="status === 'finished'">
          <div class="tw-flex tw-flex-row tw-w-16 tw-items-center tw-text-xs">
            <div>
              <v-icon class="tw-mr-1" color="teal" icon="mdi-check"></v-icon>
            </div>
            <div class="tw-font-semibold">已完成</div>
          </div>
        </div>
      </template>
      <div class="tw-w-full">
        <div class="tw-flex tw-items-center tw-font-extrabold">
          {{ condition.condition_template.condition_name }}
        </div>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      在bilibili弹幕视频网站(bilibili.com)发布一条带有
      <span class="tw-text-blue-500 tw-mx-1 tw-font-bold">#{{ tag }}#</span>
      话题的动态
    </v-expansion-panel-text>
    <DialogBilibiliTag
      ref="DialogBilibiliTag"
      :conditionId="conditionId"
      :tag="tag"
      @success="onSuccess"
    ></DialogBilibiliTag>
    <DialogBilibiliBind
      ref="DialogBilibiliBind"
      :conditionId="conditionId"
      @bindSuccess="onBindingSuccess"
    ></DialogBilibiliBind>
  </div>
</template>
<script>
import DialogBilibiliTag from "@/components/Condition/DialogBilibiliTag.vue";
import DialogBilibiliBind from "@/components/Condition/DialogBilibiliBind.vue";
import { useStorage } from "@/stores/storage";
export default {
  data() {
    const { state } = useStorage();
    return {
      bindingStatus: false,
      verifyStatus: false,
      state,
    };
  },
  props: {
    condition: {},
    bilibiliUid: {},
    conditionId: "",
    status: "",
    tag: "",
    desc: "",
    params: {},
  },
  components: {
    DialogBilibiliTag,
    DialogBilibiliBind,
  },
  methods: {
    getConditionDescription() {
      const template = this.desc;
      const params = this.params || {};
      let description = template;
      for (let item in params) {
        description = description.replace(
          new RegExp(`\{\{${item}\}\}`, "g"),
          params[item]
        );
      }
      console.log(">>>", template, params, description);
      return description;
    },
    showDialogBilibiliTag() {
      if (this.state.jwt) {
        this.$refs.DialogBilibiliTag.show();
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    showDialogBilibiliBind() {
      if (this.state.jwt) {
        this.$refs.DialogBilibiliBind.show();
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    onBindingSuccess() {
      this.bindingStatus = true;
    },
    onSuccess() {
      this.$emit("success");
      this.verifyStatus = true;
    },
  },
};
</script>
