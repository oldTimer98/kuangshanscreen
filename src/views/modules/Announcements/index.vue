<template>
  <div class="table-container" style="margin: 20px;">
    <el-form
      ref="form"
      :model="myForm"
      label-width="80px"
      style="background-color: #e5f6ff;"
      @submit.native.prevent
    >

      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="5">
          <el-form-item label="主标题">
            <el-input
              v-model="myForm.title"
              placeholder="请输入主标题"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="文章作者">
            <el-input
              v-model="myForm.author"
              placeholder="请输入文章作者"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="是否反馈">
            <el-select v-model="myForm.feedback" clearable>
              <el-option label="是" value="0" />
              <el-option label="否" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="5">
          <el-form-item label="是否反馈">
            <el-select v-model="myForm.feedback" clearable>
              <el-option label="是" value="0" />
              <el-option label="否" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="是否推荐">
            <el-select v-model="myForm.commended" clearable>
              <el-option label="是" value="0" />
              <el-option label="否" value="1" />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="是否置顶">
            <el-select v-model="myForm.topped" clearable>
              <el-option label="是" value="0" />
              <el-option label="否" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="float: left; margin: 5px 0">
      <el-button
        icon="el-icon-search"
        type="primary"
        native-type="submit"
        @click="handleQuery"
      >
        查询
      </el-button>
    </div>
    <div style="float: right; margin: 5px 0">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        新增通知
      </el-button>
      <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
        删除
      </el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      border
      background
      :element-loading-text="elementLoadingText"
      :height="450"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @selection-change="setSelectRows"
      @row-dblclick="cellClick"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="主标题"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="副标题"
        prop="subTitle"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="文章简介"
        prop="info"
        align="center"
        width="120"
      />

      <!-- <el-table-column
        show-overflow-tooltip
        label="文章作者"
        prop="author"
        align="center"
        width="120"
      /> -->
      <el-table-column
        show-overflow-tooltip
        label="标题图"
        prop="picurlAttaUrl"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.picurlAttaUrl" fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>

      <!-- <el-table-column
        show-overflow-tooltip
        label="文章内容"
        prop="content"
        align="center"
        width="120"
      >
      <template slot-scope="scope">
        <div v-html="scope.row.content" />
      </template>
      </el-table-column> -->

      <el-table-column
        show-overflow-tooltip
        label="是否要反馈"
        prop="feeckback"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.feedback==='是'?'success':'danger'">{{ scope.row.feedback }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="是否推荐"
        prop="commended"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.commended==='是'?'success':'danger'">{{ scope.row.commended }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="是否置顶"
        prop="topped"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.topped==='是'?'success':'danger'">{{ scope.row.topped }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="发布方式"
        prop="publishType"
        width="120"
        align="center"
      />
      <!-- <el-table-column
        show-overflow-tooltip
        label="是否发布"
        prop="published"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.disabled==='是'?'success':'danger'">{{ scope.row.published }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="200"
        fixed="right"
        align="center"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            v-if="row.feedback === '是'"
            @click="handleFankui(row)"
          >
            反馈
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit-outline"
            @click="handleEdit(row)"
          />
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right">
      <el-pagination
        :background="background"
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!-- //视频查看 -->
    <el-dialog :title="FankuiTitle" :visible.sync="dialogTableVisible" width="900px">
      <el-table
        v-if="FankuiTitle==='反馈列表'"
        :data="FankuiData"
        border
        background
        :element-loading-text="elementLoadingText"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
      <el-table-column
          show-overflow-tooltip
          prop="companyName"
          label="公司名称"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          prop="title"
          label="反馈标题"
          align="center"
        />

        <el-table-column
          show-overflow-tooltip
          label="反馈状态"
          prop="status"
          align="center"
        />

        <el-table-column
          show-overflow-tooltip
          label="反馈内容"
          prop="remarks"

          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="反馈附件"
          prop="attaId"
          align="center"
        >
          <template slot-scope="scope">
            <a v-if="scope.row.attaId" style="color: blue;" :href="(scope.row.attaId)[0].attaUrl">{{ (scope.row.attaId)[0].name }}</a>
            <!--   <span v-if="scope.row.attaId" style="margin-left: 10px">{{ (scope.row.attaId)[0].attaUrl }}</span> -->
          </template>
        </el-table-column>
      </el-table>

      <div style="float: right">
        <el-pagination
          v-if="FankuiTitle==='反馈列表'"
          :background="background"
          :current-page="fankuiform.pageNo"
          :layout="layout"
          :page-sizes="[5, 10]"
          :page-size="fankuiform.pageSize"
          :total="fankuitotal"
          @current-change="handleCurrentChangefankui"
          @size-change="handleSizeChangefankui"
        />

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <table-edit ref="edit" @getInfo="getInfo" />
  </div>
</template>

<script>
import { pageListArticle, delArticle, feedbackList } from '@/api/mine'
import TableEdit from './components/tableEdit'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      userType: localStorage.getItem('userType'),
      imgShow: true,
      list: [],
      listLoading: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      myForm: {},
      queryForm: {
        pageNo: 1,
        pageSize: 10
      },
      QueryOrAddOrEdit: {
        query: '详情',
        add: '新增',
        edit: '编辑'
      },
      FankuiTitle: '',
      FankuiData: [],
      fankuiform: {
        pageNo: 1,
        pageSize: 5
      },
      fankuitotal: 0,
      dialogTableVisible: false,
      fankuiid: ''
    }
  },
  computed: {},
  created() {
    this.getInfo()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    handleFankui(row) {
      this.FankuiTitle = '反馈列表'
      this.fankuiid = row.id
      this.getfankui()
      this.dialogTableVisible = true
    },
    async getfankui() {
      const params = {
        articleId: this.fankuiid,
        page: this.fankuiform.pageNo || null,
        limit: this.fankuiform.pageSize || null
      }
      const resfankui = await feedbackList(params)
      if (resfankui.code === 200) {
        this.FankuiData = resfankui.data.datas.map(item => {
          return {
            attaId: JSON.parse(item.attaId),
            remarks: item.remarks,
            status: item.status,
            title: item.title,
            companyName: item.companyName
          }
        })
        console.log('getfankui', this.FankuiData)
        this.fankuitotal = resfankui.data.total
      }
    },
    handleCurrentChangefankui(val) {
      this.fankuiform.pageNo = val
      this.getfankui()
    },
    handleSizeChangefankui(val) {
      this.fankuiform.pageSize = val
      this.getfankui()
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    // 查看详情
    cellClick(row) {
      const queryOrrow = {
        query: this.QueryOrAddOrEdit.query,
        row: row
      }
      this.$refs['edit'].showEdit(queryOrrow)
    },
    // 新增
    handleAdd() {
      const addOrrow = {
        add: this.QueryOrAddOrEdit.add
      }
      this.$refs['edit'].showEdit(addOrrow)
    },
    // 编辑
    handleEdit(row) {
      const eidtOrrow = {
        edit: this.QueryOrAddOrEdit.edit,
        row: row
      }
      this.$refs['edit'].showEdit(eidtOrrow)
    },
    // 删除
    handleDelete(row) {
      console.log(row)
      if (row.id) {
        console.log(row.id)
        this.$confirm('你确定要删除当前项吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async() => {
          console.log(1111)
          const res = await delArticle(row.id)
          console.log(res)
          this.getInfo()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.id)
          console.log(ids)
          this.$confirm('你确定要删除选中项吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            ids.forEach(async(item) => {
              const res = await delArticle(item)
              console.log(res)
            })
            this.getInfo()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '未选中任何行'
          })
          return false
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val
      this.getInfo()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.getInfo()
    },
    // 查询
    handleQuery() {
      this.queryForm.pageNo = 1
      this.getInfo()
    },
    // 获取数据
    async getInfo() {
      const params = {
        title: this.myForm.title || null,
        subTitle: this.myForm.subTitle || null,
        info: this.myForm.info || null,
        author: this.myForm.author || null,
        picurl: this.myForm.picurl || null,
        content: this.myForm.content || null,
        remarks: this.myForm.remarks || null,
        disabled: this.myForm.feedback === '是' ? 1 : 0 || null,
        commended: this.myForm.commended === '是' ? 1 : 0 || null,
        topped: this.myForm.topped === '是' ? 1 : 0 || null,
        publishType: this.myForm.publishType === '发布' ? 1 : 0 || null,
        published: this.myForm.published || null,
        page: this.queryForm.pageNo || null,
        limit: this.queryForm.pageSize || null
      }
      const res = await pageListArticle(params)
      if (res.code === 200) {
        this.list = res.data.data.map(item => {
          return {
            title: item.title,
            subTitle: item.subTitle,
            info: item.info,
            author: item.author,
            picurlAttaUrl: item.picurlAttaUrl,
            content: item.content,
            remarks: item.remarks,
            feedback: item.feedback === '1' ? '是' : '否',
            commended: item.commended === '1' ? '是' : '否',
            topped: item.topped === '1' ? '是' : '否',
            publishType: item.publishType === '0' ? '草稿' : '发布',
            // published: item.published === 0 ? '否' : '是',
            id: item.id
          }
        })
        this.total = res.data.count
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
