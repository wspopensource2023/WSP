<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        type="primary"
        @click="dialogVisible = true"
      >创建成就</el-button>
      <el-dialog :visible.sync="dialogVisible" title="创建成就">
        <el-form>
          <!-- 表单控件 -->
          <el-form-item label="选择活动名称">
            <el-select
              v-model="form.campaign_id"
              placeholder="选择活动名称"
              value-key="campaign_name"
            >
              <el-option
                v-for="campaign in campaignList"
                :key="campaign.campaign_id"
                :label="campaign.campaign_name"
                :value="campaign.campaign_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="徽章上传">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="upload_image"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-form-item>
          <el-form-item label="发行数量">
            <el-input
              v-model.number="form.issuance_quantity"
              type="number"
            />
          </el-form-item>
          <el-form-item label="成就名">
            <el-input v-model="form.achievement_name" />
          </el-form-item>

          <el-form-item label="成就概要">
            <el-input v-model="form.achievement_summary" />
          </el-form-item>

          <el-form-item label="活动介绍">
            <el-input
              v-model="form.achievement_introduction"
              type="textarea"
              :autosize="{ minRows: 8 }"
            />
          </el-form-item>

          <el-form-item label="活动tag">
            <el-tag
              v-for="tag in form.achievement_tags"
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

          <el-form-item label="发行人account id">
            <el-input v-model="form.issuer_account_id" />
          </el-form-item>
          <el-form-item label="发行开始日期">
            <el-date-picker
              v-model="form.issuance_start_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :clearable="false"
              :picker-options="{
                firstDayOfWeek: 1,
                locale: 'zh-CN',
              }"
            />
          </el-form-item>
          <el-form-item label="发行结束日期">
            <el-date-picker
              v-model="form.issuance_end_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :clearable="false"
              :picker-options="{
                firstDayOfWeek: 1,
                locale: 'zh-CN',
              }"
            />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitForm"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          align="center"
          label="成就图片"
          min-width="15%"
        >
          <template slot-scope="{ row }">
            <img
              :src="row.achievement_image"
              style="max-width: 60px; max-height: 60px"
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发行开始日期"
          min-width="20%"
        >
          <template slot-scope="{ row }">
            <span>{{ row.issuance_start_time }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="发行结束日期"
          min-width="20%"
        >
          <template slot-scope="{ row }">
            <span>{{ row.issuance_end_time }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="数量" min-width="7%">
          <template slot-scope="{ row }">
            <span>{{ row.issuance_quantity }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="成就名称"
          min-width="20%"
        >
          <template slot-scope="{ row }">
            <span>{{ row.achievement_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="成就详情"
          min-width="30%"
        >
          <template slot-scope="{ row }">
            <span
              style="
                                display: inline-block;
                                max-width: 100px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            "
              :title="row.achievement_introduction"
            >{{ row.achievement_introduction }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="库存" min-width="20%">
          <template slot-scope="{ row }">
            <span>{{ row.stock }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="发行人account"
          min-width="20%"
        >
          <template slot-scope="{ row }">
            <span>{{ row.issuer_account_id }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="编辑" min-width="20%">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              @click="edit_achievement(row)"
            >编辑成就</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="editDialogVisible" title="编辑成就">
      <el-form>
        <el-form-item label="徽章上传">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="upload_update_achieventment_image"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="currentRow.achievement_image"
              :src="currentRow.achievement_image"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="发行数量">
          <el-input
            v-model.number="currentRow.issuance_quantity"
            type="number"
          />
        </el-form-item>
        <el-form-item label="成就名">
          <el-input v-model="currentRow.achievement_name" />
        </el-form-item>
        <el-form-item label="活动介绍">
          <el-input
            v-model="currentRow.achievement_introduction"
            type="textarea"
            :autosize="{ minRows: 8 }"
          />
        </el-form-item>
        <el-form-item label="发行人account id">
          <el-input v-model="currentRow.issuer_account_id" />
        </el-form-item>
        <el-form-item label="发行开始日期">
          <el-date-picker
            v-model="currentRow.issuance_start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            :clearable="false"
            :picker-options="{ firstDayOfWeek: 1, locale: 'zh-CN' }"
          />
        </el-form-item>
        <el-form-item label="发行结束日期">
          <el-date-picker
            v-model="currentRow.issuance_end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            :clearable="false"
            :picker-options="{ firstDayOfWeek: 1, locale: 'zh-CN' }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm">确 定</el-button>
      </div>
    </el-dialog>
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
import {
  createBadge,
  listBadge,
  uploadImage,
  updateAchievement
} from '@/api/achievement'
import { listCampaign } from '@/api/campaign'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DragTable',
  components: { Pagination },
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
        limit: 10
      },
      listCampaignQuery: {
        skip: 1,
        limit: 100,
        campaign_type: 'campaign'
      },
      currentRow: {},
      param: null,
      dialogVisible: false,
      editDialogVisible: false,
      imageUrl: '',
      achievement_desc_image: '',
      form: {
        achievement_image: '',
        contract_address: '',
        issuer: '',
        issuance_start_time: null,
        issuance_end_time: null,
        issuance_quantity: '',
        issuance_mode: '',
        achievement_name: '',
        achievement_introduction: '',
        achievement_summary: '',
        stock: '',
        issuer_account_id: '',
        achievement_desc_image: '',
        achievement_tags: []
      },
      inputVisible: false,
      inputValue: '',
      campaignList: []
    }
  },
  created() {
    this.getList()
    this.listCampaign()
  },
  methods: {

    handleClose(tag) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.form.achievement_tags.splice(this.form.achievement_tags.indexOf(tag), 1)
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
        this.form.achievement_tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    updateForm() {
      // 更新表单逻辑
      updateAchievement(this.currentRow).then((response) => {
        this.editDialogVisible = false
        this.getList()
      })
    },
    submitForm() {
      // 提交表单逻辑
      createBadge(this.form).then((response) => {
        this.dialogVisible = false
        this.getList()
      })
    },
    searchContList() {
      this.getList()
    },
    getList() {
      listBadge(this.listQuery).then((response) => {
        this.list = response.data.achievement_list
        this.total = response.data.total_count
      })
    },
    listCampaign() {
      listCampaign(this.listCampaignQuery).then((response) => {
        this.campaignList = response.data.campaign_list
      })
    },
    beforeAvatarUpload(file) {
      return true
    },
    upload_image(avatar) {
      uploadImage(avatar.file, avatar.filename).then((response) => {
        this.form.imageUrl = response.image_uri
        this.imageUrl = response.image_uri
        this.form.achievement_image = response.image_uri
      })
    },
    upload_update_achieventment_image(avatar) {
      uploadImage(avatar.file, avatar.filename).then((response) => {
        this.currentRow.achievement_image = response.image_uri
        this.form.achievement_image = response.image_uri
      })
    },
    edit_achievement(row) {
      this.currentRow = row
      this.editDialogVisible = true
    }
  }
}
</script>

  <style>
.sortable-ghost {
    opacity: 0.8;
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
    border-color: #409eff;
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
