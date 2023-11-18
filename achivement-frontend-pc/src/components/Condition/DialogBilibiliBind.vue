<template>
  <v-dialog
      scroll-strategy="reposition"
      v-model="visible"
      scrim="black"
      width="450"
  >
    <v-container>
      <div class="tw-rounded-xl tw-p-5 tw-bg-surface">
        <h3>绑定B站账号</h3>
        <v-card class="tw-mt-2" title="步骤一">
          <v-card-text>
            请先复制下面这段话：
          </v-card-text>
          <v-card-text>
            #xxxxxx# 验证我的B站账号 did:{{uid}} @xxxxxx
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <v-btn variant="tonal" @click="copyToClipboard"
            >复制
            </v-btn>
          </v-card-actions>
          <v-snackbar top v-model="snackbar" :timeout="timeout" >已复制到剪切板</v-snackbar>
        </v-card>

        <v-card class="tw-mt-2" title="步骤二">
          <v-card-text>
            请点击下面的按钮，来帮助你在B站上发布验证消息
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <v-btn variant="tonal" @click="postBilibili"
            >发布验证消息
            </v-btn
            >
          </v-card-actions>
        </v-card>

        <v-divider class="tw-mt-3"></v-divider>

        <v-card class="tw-mt-2" title="步骤三">
          <v-card-text>
            <!--                      todo 可以贴图用于引导  -->
            在你发布的动态上链接粘贴到这里，单击验证按钮来验证你的帐户
          </v-card-text>
          <v-card-actions style="padding: 0.625rem 1rem">
            <div class="tw-w-full">
              <div>
                <v-text-field
                    type="text"
                    label="B站链接"
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
import {useRoute} from "vue-router";
import {useStorage} from "@/stores/storage";
import copy from "ant-design-vue/es/_util/copy-to-clipboard";

export default {
  props: {
    config: {},
  },
  data() {
    const route = useRoute();
    const {state} = useStorage();
    return {
      visible: false,
      snackbar: false,
      timeout: 1500,
      postUrl: "",
      badge_id: route.params.id,
      uid: state.accountId,
    };
  },
  computed: {
    verifiable() {
      // 通过正则验证postUrl是不是正确的微博链接
      return /^https?:\/\/.*?$/.test(this.postUrl);
    },
  },
  methods: {
    copy,
    show() {
      this.visible = true
    },
    async verify() {
      const res = await apiService.VerifyBilibiliBind({"post_uri": this.postUrl})
      if (res) {
        this.$emit('bindSuccess')
        this.visible = false
      }
    },
    postBilibili() {
      window.open('https://t.bilibili.com')
    },
    copyToClipboard() {
      const text = "#xxxxxx# 验证我的 B站账号 did:" + this.uid + " @xxxxxx ";
      copy(text);
      this.snackbar = true;
    }

  },
};

</script>

<style scoped>

</style>
