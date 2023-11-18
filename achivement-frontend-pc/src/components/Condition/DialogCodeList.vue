<template>
  <div>
    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card class="tw-p-5">
        <div class="tw-mb-3 tw-text-lg">提取码列表</div>
        <div class="tw-flex tw-flex-row tw-items-center">
          <v-select
          :hide-details="true"
          class="tw-mr-3"
          density="compact"
          variant="outlined"
          v-model="selected" :items="options" label="请选择" @update:modelValue="onPageChange">
          </v-select>
          <div class="tw-h-full">
            <v-btn variant="tonal" @click="createCode">生成提取码</v-btn>
          </div>
        </div>
        <div class="tw-mt-3">
          <v-data-table
            density="compact"
          :server-items-length="total" :headers="headers" :items="items"
                        hide-default-footer
                        :loading="loading" >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination
                    density="compact"
                    v-model="pagination.page"
                    :length="pagination.pageStop"
                    @update:modelValue="onPageChange"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {apiService} from "@/apis/apis";

export default {
  data() {
    return {
      dialogVisible: false, // 弹窗是否可见
      selected: null, // 当前选中项
      options: ["未提取", "已提取"], // 可选项列表
      headers: [
        {title: "提取码", key: "invitation_code"},
        {title: "提取人", key: "receiver_account_id"},
        {title: "提取状态", key: "status"},
        {title: "提取时间", key: "receive_time"}
      ],
      items: [],
      pagination: {
        itemsPerPage: 10,
        page: 1,
        pageStart:1,
        pageStop:1,
      },
      total: 0,
      loading: false,
    };
  },
  props: {
    achievementId: "",
    conditionId: "",
  },


  methods: {
    show() {
      this.dialogVisible = true;
    },
    async getCodeList() {
      let status = "created"
      if (this.selected === '未提取') {
        status = "created";
      } else if (this.selected === '已提取') {
        status = "received";
      }
      const data = await apiService.ListInvitationCode(this.achievementId, this.conditionId, this.pagination.page, this.pagination.itemsPerPage, status);
      this.total = data.total_count;
      let item_list = [];
      data.data.forEach((e) => {
        let item = {};
        item.invitation_code = e.invitation_code;
        item.receiver_account_id = e.receiver_account_id ? e.receiver_account_id : "-";
        item.receive_time = e.receive_time ? e.receive_time : "-";
        item.status = e.status === "created" ? "未提取" : "已提取";
        item_list.push(item)
      });
      this.items = item_list;
      this.pagination.pageStop = Math.ceil(this.total / this.pagination.itemsPerPage);
    },
    onPageChange() {
      this.getCodeList();
    },
    async createCode() {
      const res = await apiService.CreateInvitationCode(this.achievementId, this.conditionId, 10);
      if (res) {
        return this.getCodeList()
      }
    }

  }
}
</script>