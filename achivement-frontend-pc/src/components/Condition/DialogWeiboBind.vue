<template>
  <v-dialog
      scroll-strategy="reposition"
      v-model="visible"
      scrim="black"
      width="450"
  >
    <v-container>
      <div class="tw-rounded-xl tw-p-5 tw-bg-surface">
        <h3>绑定微博账号</h3>
        <v-card class="tw-mt-2" title="步骤一">
          <v-card-text>
            请点击下面的按钮，来帮助你在微博上发布验证消息
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <v-btn variant="tonal" @click="postWeibo"
            >发布验证微博
            </v-btn
            >
          </v-card-actions>
        </v-card>

        <v-divider class="tw-mt-3"></v-divider>

        <v-card class="tw-mt-2" title="步骤二">
          <v-card-text>
            <!--                      todo 可以贴图用于引导  -->
            在你发布的微博上点击右上角的小箭头，找到“复制微博地址”，将复制好的链接粘贴到这里，单击验证按钮来验证你的帐户
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <div class="tw-w-full">
              <div>
                <v-text-field
                    type="text"
                    label="微博链接"
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
<script lang="ts">
import {apiService} from "@/apis/apis";
import {useStorage} from "@/stores/storage";
import {useRoute} from "vue-router";

export default {
  props: {
    config: {},
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
      const res = await apiService.VerifyWeiboBind({"post_uri": this.postUrl});
      if (res) {
        this.visible = false;
        this.$emit("bindSuccess");
      }
    },
    postWeibo() {
      const {state} = useStorage();
      const title =
          `%23xxxxxx%23 验证我的微博账号 did:${state.accountId} @xxxxxx`;
      const url = "https://xxxxxx.com";
      const image = "";
      const link = `https://service.weibo.com/share/share.php?title=${title}&pic=${image}&url=${url}`;
      window.open(link);
    },
  },
};
</script>
<style>
</style>

