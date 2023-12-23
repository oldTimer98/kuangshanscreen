<template>
  <div>
    <div style="float: left">
      <el-tabs
        v-model="activeName"
        type="card"
        style="width: 400px"
        @tab-click="handleClick"
      >
        <el-tab-pane label="点标绘" name="first">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="primary"
                  size="mini"
                  circle
                  icon="el-icon-circle-plus-outline"
                  @click="() => remove(node, data)"
                ></el-button>
                <el-button
                  type="primary"
                  size="mini"
                  circle
                  icon="el-icon-circle-plus-outline"
                  @click="() => remove(node, data)"
                ></el-button>
                <el-button
                  type="primary"
                  circle
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  @click="() => remove(node, data)"
                ></el-button>
              </span>
            </span>
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="面标绘" name="second">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="primary"
                  size="mini"
                  circle
                  icon="el-icon-circle-plus-outline"
                  @click="() => remove(node, data)"
                ></el-button>
                <el-button
                  type="primary"
                  size="mini"
                  circle
                  icon="el-icon-circle-plus-outline"
                  @click="() => remove(node, data)"
                ></el-button>
                <el-button
                  type="primary"
                  circle
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  @click="() => remove(node, data)"
                ></el-button>
              </span>
            </span>
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 20px;
      "
    >
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-row type="flex" justify="justify-between">
          <el-col :span="6">
            <el-form-item>
              <el-input
                v-model="queryForm.title"
                placeholder="请输入用户名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="handleQuery"
              >
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        ref="tableSort"
        v-loading="listLoading"
        :data="list"
        border
        background
        :element-loading-text="elementLoadingText"
        :height="height"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        @selection-change="setSelectRows"
      >
        <el-table-column
          show-overflow-tooltip
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="序号"
          width="95"
          align="center"
        >
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="name"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="样式"
          prop="username"
          align="center"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :fit="fit"
          ></el-image>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="name"
          label="描述"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="操作"
          width="180px"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit-outline"
              @click="handleEdit(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="handleDelete(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-left: 200px">
        <el-pagination
          :background="background"
          :current-page="queryForm.pageNo"
          :layout="layout"
          :page-size="queryForm.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <table-edit ref="edit"></table-edit>
    </div>
  </div>
</template>

<script>
  let id = 1000
  // import { getList, doDelete } from '@/api/table'
  import TableEdit from './components/tableEdit'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      const data = [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ]
      return {
        data: JSON.parse(JSON.stringify(data)),
        data: JSON.parse(JSON.stringify(data)),
        imgShow: true,
        list: [
          {
            name: 'mmmm',
            username: '2222',
            role: '管理员',
            phone: '1311111111',
          },
        ],
        imageList: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        activeName: 'first',
      }
    },

    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      //新增
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      //编辑
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      //删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              // this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        // this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        // this.fetchData()
      },
      //查询
      handleQuery() {
        this.queryForm.pageNo = 1
        // this.fetchData()
      },
      // async fetchData() {
      //   this.listLoading = true
      //   const { data, totalCount } = await getList(this.queryForm)
      //   this.list = data
      //   const imageList = []
      //   data.forEach((item, index) => {
      //     imageList.push(item.img)
      //   })
      //   this.imageList = imageList
      //   this.total = totalCount
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 500)
      // },
      testMessage() {
        this.$baseMessage('test1', 'success')
      },
      testALert() {
        this.$baseAlert('11')
        this.$baseAlert('11', '自定义标题', () => {
          /* 可以写回调; */
        })
        this.$baseAlert('11', null, () => {
          /* 可以写回调; */
        })
      },
      testConfirm() {
        this.$baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
        )
      },
      testNotify() {
        this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                Append
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                Delete
              </el-button>
            </span>
          </span>
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-button--mini.is-circle {
    padding: 3px;
  }
  ::v-deep .el-tree-node__content {
    padding-right: 50px;
  }
  ::v-deep .el-table th.el-table__cell > .cell {
    font-weight: 600;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
