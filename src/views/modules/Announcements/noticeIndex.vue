<template>
  <div class="app-container">
    <!-- <div class="admtitle"><i class="fsm2"></i>通知公告</div> -->
    <!-- 政策公告选项 -->
    <div class="policyNotice-select">
      <el-form
        ref="form"
        :model="myForm"
        label-width="80px"
        style="background-color: #e5f6ff;"
        @submit.native.prevent
      >
        <el-row :gutter="10" type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item label="标题">
              <el-input
                v-model="searchVO.title"
                placeholder="请输入标题"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 政策公告列表 -->
    <div class="policyNotice-lists">
      <div
        v-for="(item, index) in lists"
        :key="index"
        class="list"
        @click="goarticle('/announcements/notice', item)"
      >
        <el-row type="flex" align="middle" justify="space-between">
          <div class="list-title">{{ item.title }}</div>
          <div class="list-time">{{ item.createDate }}</div>
        </el-row>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      :current-page="page.num"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px; text-align: center"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { pageListArticle } from '@/api/mine'
export default {
  name: 'Notice',
  data() {
    return {
      page: {
        limit: 10,
        num: 1
      },
      total: 1,
      lists: [],
      searchVO: {
        title: ''
      },
      myForm: {}
    }
  },
  created() {
    this.listRequest()
    // this.enmusRequest();
  },
  methods: {
    handleQuery() {
      this.listRequest()
    },
    handleSizeChange(value) {
      this.page.limit = value
      localStorage.setItem('pageSize', value)
      localStorage.setItem('currentPage', 1)
      this.listRequest()
    },
    handleCurrentChange(value) {
      this.page.num = value
      localStorage.setItem('currentPage', value)
      this.listRequest()
    },
    // 跳转详情页
    goarticle(path, date) {
      const id = date.id
      this.$router.push({ path: path, query: { id: id }})
    },
    async listRequest() {
      const self = this
      var currentSize = parseInt(localStorage.getItem('pageSize'))
      if (currentSize) {
        self.page.limit = currentSize
      }

      var currentPage = parseInt(localStorage.getItem('currentPage'))
      if (currentPage) {
        self.page.num = currentPage
      }

      const params = {
        limit: this.page.limit,
        page: this.page.num,
        ...this.searchVO
      }
      const res = await pageListArticle(params)
      if (res.code !== 200) return this.$message.info(res.message)
      const data = res.data
      this.lists = data.data
      this.total = data.count
    }
    // async enmusRequest() {
    //     const res = await enmusApi();
    //     if (res.code !== 200) return this.$message.error(res.message);
    //     this.selectOptions = res.data;
    // },
  }
}
</script>
<style lang="scss" scoped>
.policyNotice-select {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .select-list {
    flex-wrap: wrap;
    margin-bottom: 10px;
    cursor: pointer;
    .selectLable {
      font-weight: bold;
      font-size: 16px;
      color: #143280;
      margin-right: 20px;
    }
    .slectLists{
      flex: 1;
    }
    .slectLists span {
      padding: 4px 12px;
      font-size: 14px;
      display: inline-block;
      border-radius: 5px;
      margin:5px 10px 5px 0;
      color: #787878;
      border: 1px solid #999;
      &.selected {
        color: #409eff;
        border: 1px solid #409eff;
      }
    }
  }
  .select-list:last-of-type {
    margin-bottom: 0px;
  }
}
.policyNotice-lists {
  padding: 20px 40px 0px 40px;
  box-sizing: border-box;
  .list {
    padding: 16px 0px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    .list-title {
      font-size: 15px;
      color: #333333;
    }
    &:hover {
      .list-title {
        font-weight: bold;
        color: #143280;
      }
    }
    .list-time {
      font-size: 14px;
      color: #c3c3c3;
    }
  }

}
.app-container {background:transparent !important;padding:30px 0 !important}
</style>
