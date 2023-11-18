<template>
  <div>
    <v-expansion-panel-title>
      <template #actions>
        <div class="tw-flex" v-if="status !== 'finished'">
          <v-btn
            @click.prevent="showDialogWeiboBind"
            class="v-size--small tw-mr-3"
            variant="tonal"
            v-if="!weiboUid && !bindingStatus"
          >
            绑定微博
          </v-btn>
          <v-btn
            @click.prevent="showDialogWeiboTag"
            class="v-size--small"
            variant="tonal"
            v-if="status === 'unfinished' && !verifyStatus"
          >
            发布微博
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
      <div>
        在 新浪微博 (weibo.com) 发布一条带有
        <span class="tw-text-blue-500 tw-mx-1 tw-font-bold">#{{ tag }}#</span>
        话题的微博
      </div>
    </v-expansion-panel-text>

    <DialogWeiboTag
      ref="DialogWeiboTag"
      :conditionId="conditionId"
      :tag="tag"
      @success="onSuccess"
    ></DialogWeiboTag>
    <DialogWeiboBind
      ref="DialogWeiboBind"
      :conditionId="conditionId"
      @bindSuccess="onBindingSuccess"
    ></DialogWeiboBind>
  </div>
</template>
<script>
import DialogWeiboTag from "@/components/Condition/DialogWeiboTag.vue";
import DialogWeiboBind from "@/components/Condition/DialogWeiboBind.vue";
import { useStorage } from "@/stores/storage";
export default {
  data() {
    const { state } = useStorage();
    return {
      verifyStatus: false,
      bindingStatus: false,
      state,
    };
  },
  props: {
    condition: {},
    weiboUid: {},
    conditionId: "",
    status: "",
    tag: "",
    desc: "",
    params: {},
  },
  components: {
    DialogWeiboTag,
    DialogWeiboBind,
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
    showDialogWeiboTag() {
      if (this.state.jwt) {
        this.$refs.DialogWeiboTag.show();
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    showDialogWeiboBind() {
      if (this.state.jwt) {
        this.$refs.DialogWeiboBind.show();
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    onSuccess() {
      this.$emit("success");
      this.verifyStatus = true;
    },
    onBindingSuccess() {
      this.bindingStatus = true;
    },
  },
};
</script>
