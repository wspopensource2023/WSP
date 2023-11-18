<template>
  <div>
    <v-expansion-panel-title>
      <template #actions>
        <div v-if="status !== 'finished'">
          <v-btn
            @click.prevent="showDialogCodeVerify"
            class="v-size--small"
            variant="tonal"
            v-if="!verifyStatus"
          >
            输入提取码
          </v-btn>
        </div>
        <div class="tw-flex tw-items-center" v-if="status === 'finished'">
          <v-btn
            @click.prevent="showDialogCodeList"
            class="v-size--small tw-mr-3"
            variant="tonal"
            v-if="isIssuer"
          >
            管理提取码
          </v-btn>
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
          <div class="tw-flex tw-items-center tw-font-extrabold">
            {{ condition.condition_template.condition_name }}
          </div>
        </div>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      {{ getConditionDescription() }}
    </v-expansion-panel-text>
    <DialogCodeList
      ref="DialogCodeList"
      :achievementId="achievementId"
      :conditionId="conditionId"
    ></DialogCodeList>
    <DialogCodeVerify
      ref="DialogCodeVerify"
      :conditionId="conditionId"
      @success="onSuccess"
    ></DialogCodeVerify>
  </div>
</template>
<script>
import DialogCodeVerify from "@/components/Condition/DialogCodeVerify.vue";
import DialogCodeList from "@/components/Condition/DialogCodeList.vue";
import { apiService } from "@/apis/apis";
import { useStorage } from "@/stores/storage";
export default {
  data() {
    const { state } = useStorage();
    return {
      verifyStatus: false,
      state,
    };
  },
  props: {
    condition: {},
    title: "",
    conditionId: "",
    achievementId: "",
    status: "",
    tag: "",
    desc: "",
    params: {},
  },
  components: {
    DialogCodeVerify,
    DialogCodeList,
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
    showDialogCodeVerify() {
      if (this.state.jwt) {
        this.$refs.DialogCodeVerify.show();
      } else {
        this.$router.replace({
          name: "login",
        });
      }
    },
    showDialogCodeList() {
      if (this.state.jwt) {
        this.$refs.DialogCodeList.show();
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
    async isIssuer() {
      const res = await apiService.VerifyIssuer(this.achievementId);
      return res.is_issuer;
    },
  },
};
</script>
