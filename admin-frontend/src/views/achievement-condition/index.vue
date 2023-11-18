<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="dialogVisible = true">成就绑定条件</el-button>
      <el-dialog :visible.sync="dialogVisible" title="成就绑定条件">
        <el-form>
          <el-form-item label="选择成就名称">
            <el-select
              v-model="form.achievement_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getAchievementList"
              :loading="loading"
            >
              <el-option
                v-for="campaign in achievement_list"
                :key="campaign.achievement_id"
                :label="campaign.achievement_name"
                :value="campaign.achievement_id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="选择模版名称">
            <el-select
              v-model="form.condition_template_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getConditionTemplateList"
              :loading="loading"
            >
              <el-option
                v-for="campaign in condition_template_list"
                :key="campaign.condition_template_id"
                :label="campaign.condition_name"
                :value="campaign.condition_template_id"
              />
            </el-select>
          </el-form-item>

          <el-input v-model="textarea" type="textarea" :rows="10" placeholder="issuer_params" />

        </el-form>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="成就名称" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.achievement_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="条件模版名称" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.condition_name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="issuer_params" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.issuer_params }}</span>
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
import { listConditionTemplate } from '@/api/condition-template'
import { listBadge } from '@/api/achievement'
import { createAchievementCondition, listAchievementCondition } from '@/api/achievement-condition'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
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
        limit: 10,
        keyword: ''
      },
      param: null,
      dialogVisible: false,

      loading: false,
      textarea: '',

      achievement_list: [],
      condition_template_list: [],
      form: {
        achievement_id: '',
        condition_template_id: '',
        issuer_params: ''
      },
      ach_map: {},
      con_map: {}
    }
  },
  created() {
    this.getList(),
    this.getAchievementList(),
    this.getConditionTemplateList()
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
      this.form.issuer_params = this.textarea
      createAchievementCondition(this.form).then(response => {
        this.dialogVisible = false
        this.getList()
      })
    },
    searchContList() {
      this.getList()
    },
    getList() {
      listAchievementCondition(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    getAchievementList(keyword) {
      this.listQuery.keyword = keyword
      listBadge(this.listQuery).then(response => {
        this.achievement_list = response.data.achievement_list
        for (let i = 0; i < this.achievement_list.length; i++) {
          this.ach_map[this.achievement_list[i].achievement_id] = this.achievement_list[i].achievement_name
        }
      })
    },
    getAchievementNamebyId(id) {
      return this.ach_map[id]
    },
    getConditionTemplateList(keyword) {
      this.listQuery.keyword = keyword
      listConditionTemplate(this.listQuery).then(response => {
        this.condition_template_list = response.data
        for (let i = 0; i < this.condition_template_list.length; i++) {
          this.con_map[this.condition_template_list[i].condition_template_id] = this.condition_template_list[i].condition_name
        }
      })
    },
    click() {
      handleFeedback(this.param).then(response => {
        this.getList()
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
</style>
