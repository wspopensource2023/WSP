<template>
  <v-dialog
      scroll-strategy="reposition"
      v-model="visible"
      scrim="black"
      width="450"
  >
    <v-container>
      <div class="tw-rounded-xl tw-p-5 tw-bg-surface">
        <h3>发布Bilibili动态</h3>
        <v-card class="tw-mt-2" title="步骤一">
          <v-card-text>
            请点击下面的按钮，来帮助你在B站上发布带有
            <span class="tw-text-blue-500 tw-mx-1 tw-font-bold"
            >#{{ tag }}#</span
            >
            的动态
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <v-btn variant="tonal" @click="postBilibili">发布</v-btn>
          </v-card-actions>
        </v-card>

        <v-divider class="tw-mt-3"></v-divider>

        <v-card class="tw-mt-2" title="步骤二">
          <v-card-text>
            在你发布的动态上点击右上角的小箭头，找到“复制地址”，将复制好的链接粘贴到这里，单击验证按钮来验证
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <div class="tw-w-full">
              <div>
                <v-text-field
                    type="text"
                    label="动态链接"
                    variant="outlined"
                    v-model="postUrl"
                    placeholder="请输入链接"
                />
              </div>
              <div>
                <v-btn
                    class="tw-w-full"
                    variant="tonal"
                    :disabled="!verifiable"
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
    tag: "",
  },
  data() {
    const route = useRoute();
    return {
      visible: false,
      postUrl: "",
      badge_id: route.params.id,
    };
  },
  components: {},
  computed: {
    verifiable() {
      // 通过正则验证postUrl是不是正确的微博链接
      return /^https?:\/\/.*?$/.test(this.postUrl);
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    async verify() {
      if (!this.postUrl) return;
      const res = await apiService.VerifyCondition(this.badge_id, this.conditionId, {"post_uri": this.postUrl});
      console.log(res)
      if (res) {
        this.visible = false;
        this.$emit("success");
      }
    },
    postBilibili() {
      const link = `https://t.bilibili.com/`
      window.open(link);
    },
  },
};
</script>
<style>
</style>

