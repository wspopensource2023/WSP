<template>
  <v-dialog
      scroll-strategy="reposition"
      v-model="visible"
      scrim="black"
      width="450"
  >
    <v-container>
      <div class="tw-rounded-xl tw-p-5 tw-bg-surface">
        <h3>输入提取码</h3>
        <v-card class="tw-mt-2">
          <v-card-actions style="padding: 0.625rem 1rem">
            <div class="tw-w-full">
              <div>
                <v-text-field
                    type="text"
                    label="提取码"
                    variant="outlined"
                    v-model="code"
                    placeholder="请输入8位提取码"
                />
              </div>
              <div>
                <v-btn
                    class="tw-w-full"
                    variant="tonal"
                    @click="verify"
                >验证
                </v-btn
                >
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-dialog>
</template>
<script>
import {apiService} from "@/apis/apis";
import {useRoute} from "vue-router";

export default {
  props: {
    conditionId: "",
  },
  data() {
    const route = useRoute();
    return {
      visible: false,
      code: "",
      badge_id: route.params.id,
    };
  },
  components: {},
  methods: {
    show() {
      this.visible = true;
    },
    async verify() {
      const res = await apiService.VerifyCondition(this.badge_id, this.conditionId, {"invitation_code": this.code});
      console.log(res)
      if (res) {
        this.visible = false;
        this.$emit("success");
      }
    },
  },
};
</script>
<style>
</style>

