<template>
  <v-dialog v-model="visible" title="请裁剪图片" persistent :width="1200">
    <v-card>
      <v-card-title> 请裁剪图片 </v-card-title>
      <a-row>
        <a-col :xs="24" :md="24" :style="{ height: '600px' }">
          <vue-cropper
            ref="cropper"
            :img="img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
          >
          </vue-cropper>
        </a-col>
      </a-row>
      <v-card-actions style="justify-content: end">
        <v-btn
          @click="cancelHandel"
          variant="tonal"
          min-width="100px"
          class="mr-4"
          >取消</v-btn
        >
        <v-btn
          min-width="100px"
          variant="tonal"
          class="btn-bg-color"
          @click="okHandel"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { VueCropper } from "vue-cropper";
import "vue-cropper/dist/index.css";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      visible: false,
      img: null, //要裁剪的图像资源 可选项: url地址 || base64 || blob
      confirmLoading: false,
      options: {
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 180, //默认生成截图框宽度
        autoCropHeight: 180, //默认生成截图框高度
        fixedBox: true, //是否固定截图框大小 不允许改变
      },
      previews: {},
    };
  },
  methods: {
    edit(image) {
      this.visible = true;
      this.img = image;
    },
    // 取消截图
    cancelHandel() {
      this.confirmLoading = false;
      this.visible = false;
      this.$emit("cropper-no");
    },
    // 确认截图
    okHandel() {
      const that = this;
      that.confirmLoading = true;
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        that.$emit("ok", data);
      });
    },
    closeHandel() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.cropper-wrapper {
  width: 100%;
  height: 400px;
}
.btn-bg-color {
  background: #4335e6;
  color: #ffffff;
}
</style>
