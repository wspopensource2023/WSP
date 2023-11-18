<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="dialogVisible = true">创建活动</el-button>
      <el-dialog :visible.sync="dialogVisible" title="创建活动" center>
        <el-form label-position="top">
          <!-- 表单控件 -->
          <el-form-item label="发行人account id">
            <el-input v-model="form.issuer_account_id" />
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="form.campaign_name" />
          </el-form-item>
          <el-form-item label="活动概要">
            <el-input v-model="form.campaign_summary" />
          </el-form-item>
          <el-form-item label="活动介绍">
            <!-- <el-input v-model="form.campaign_introduction" /> -->
            <div style="border: 1px solid #ccc;">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :default-config="toolbarConfig"
                :mode="mode"
              />
              <Editor
                v-model="form.campaign_introduction"
                style="height: 500px; overflow-y: hidden;"
                :default-config="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div>
          </el-form-item>
          <el-form-item label="活动tag">
            <el-tag
              v-for="tag in form.campaign_tags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="活动图片上传">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="upload_image"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="发行人account id" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.issuer_account_id }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="活动名称" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.campaign_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="活动图片" min-width="15%">
          <template slot-scope="{row}">
            <img :src="row.campaign_image" style="max-width: 60px; max-height: 60px;">
          </template>
        </el-table-column>

        <el-table-column align="center" label="活动介绍" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.campaign_introduction }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="活动概要" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.campaign_summary }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="徽章列表" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.achievement_ids }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.skip"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { listBadge, uploadImage } from '@/api/achievement'
import { createCampaign, listCampaign } from '@/api/campaign'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: 'DragTable',
  components: { Pagination, Editor, Toolbar },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {

      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        skip: 0,
        limit: 10,
        campaign_type: 'campaign'
      },
      param: null,
      dialogVisible: false,
      imageUrl: '',
      form: {
        campaign_image: '',
        campaign_introduction: '',
        campaign_summary: '',
        campaign_name: '',
        issuer_account_id: '',
        campaign_tags: []
      },
      inputVisible: false,
      inputValue: '',

      // 编辑器配置
      toolbarConfig: { },
      editor: null,
      html: '<p>hello</p>',
      mode: 'default', // or 'simple'
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {}
        }
      },
      uploadImage: ''
    }
  },
  created() {
    this.initEditor()
    this.getList()
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    initEditor() {
      const that = this
      this.editorConfig.MENU_CONF.uploadImage = {
        onBeforeUpload(file) {
          return file
        },
        async customUpload(file, insertFn) {
          await that.uploadImg(file)
          insertFn(that.uploadImage)
        }
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    async uploadImg(file) {
      await uploadImage(file, file.name).then(response => {
        this.uploadImage = response.image_uri
      })
    },

    handleClose(tag) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.campaign_tags.splice(this.form.campaign_tags.indexOf(tag), 1)
      }).catch(() => {
      })
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.campaign_tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitForm() {
      // 提交表单逻辑
      createCampaign(this.form).then(response => {
        this.dialogVisible = false
        this.getList()
      })
    },
    searchContList() {
      this.getList()
    },
    getList() {
      listCampaign(this.listQuery).then(response => {
        this.list = response.data.campaign_list
        this.total = response.data.total_count
      })
    },
    click(doc_id) {
      this.param = { 'doc_id': doc_id }
      handleFeedback(this.param).then(response => {
        this.getList()
      })
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // return isJPG;
      return true
    },
    upload_image(avatar) {
      uploadImage(avatar.file, avatar.filename).then(response => {
        this.form.imageUrl = response.image_uri
        this.imageUrl = response.image_uri
        this.form.campaign_image = response.image_uri
      })
    }
  }
}
</script>

<style>

.sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
    margin-right: 2px;
}

.drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.show-d {
    margin-top: 15px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

