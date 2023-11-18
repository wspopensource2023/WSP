<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 10px" />
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="更新时间" min-width="20%">
        <template slot-scope="{row}">
          <span>{{ row.updated_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="slug" min-width="20%">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号" min-width="20%">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="account_id" min-width="20%">
        <template slot-scope="{row}">
          <span>{{ row.account_id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="操作" min-width="20%">
          <template slot-scope="{row}">
              <el-button type="danger" @click="open(row.profile_id)" v-if="row.status!=1">
              拉黑
            </el-button>
            <el-button type="primary" @click="w_click(row.profile_id)" v-if="row.status==1">
              拉白
            </el-button>
          </template>
        </el-table-column> -->

      <!-- <el-table-column align="center" label="拉黑原因" min-width="20%">
          <template slot-scope="{row}">
            <span>{{ row.reason }}</span>
          </template>
        </el-table-column> -->

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.skip" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { profileList, black, white } from '@/api/overview'
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
      param: null

    }
  },
  created() {
    this.getList()
  },
  methods: {
    searchContList() {
      this.getList()
    },
    getList() {
      profileList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
      })
    },
    b_click(account_id, reason) {
      this.param = { 'profile_id': account_id, 'reason': reason }
      black(this.param).then(response => {
        this.getList()
      })
    },
    w_click(account_id) {
      this.param = { 'profile_id': account_id }
      white(this.param).then(response => {
        this.getList()
      })
    },
    open(profile_id) {
      this.$prompt('请输入拉黑原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.b_click(profile_id, value)
      })
    }
  }
}
</script>

  <style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
  </style>

  <style scoped>
  .icon-star{
    margin-right:2px;
  }
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .show-d{
    margin-top: 15px;
  }
  </style>

