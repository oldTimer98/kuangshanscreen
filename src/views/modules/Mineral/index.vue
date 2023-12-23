<template>
  <div class="table-container" style="margin: 20px">
    <el-form
      ref="form"
      :model="myForm"
      label-width="100px"
      style="background-color: #e5f6ff;"
      @submit.native.prevent
    >
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="8">
          <el-form-item label="企业名称">
            <el-input
              v-model="myForm.name"
              placeholder="请输入企业名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="矿物类型" prop="mineType">
            <el-select v-model="myForm.mineType" placeholder="请选择矿物类型" clearable>
              <el-option
                v-for="item in MineralType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="矿权类别" prop="devType">
            <el-select v-model="myForm.devType " placeholder="请选择矿权类别" clearable>
              <el-option
                v-for="item in MineralCategories"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
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
        添加矿山
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
      <div />
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="矿山名称"
        align="center"
        width="120"
      >
        <template #default="{ row }">
          <a
            style="cursor: pointer;"
            href="javascript:void(0)"
            type="primary"
            icon="el-icon-edit-outline"
            @click="viewGis(row.id)"
          >{{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="企业联系人"
        prop="contractPerson"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="企业联系电话"
        prop="contractTel"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="手机号"
        prop="phone"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿产地址"
        prop="address"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="面积"
        prop="area"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿物类型"
        prop="mineType"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿权类别"
        prop="devType"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="总储量"
        prop="totalAmount"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿物品味"
        prop="oreGrade"
        align="center"
        width="120"
      />

      <el-table-column
        show-overflow-tooltip
        label="已开采量"
        prop="minedAmount"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="保有量"
        prop="baoAmount"
        align="center"
        width="120"
      />
      <el-table-column
        show-overflow-tooltip
        label="经度"
        prop="lng"
        width="120"
        align="center"
      />

      <el-table-column
        show-overflow-tooltip
        label="维度"
        prop="lat"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿产状态"
        prop="status"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="开采方式"
        prop="devMethod"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="损毁土地面积"
        prop="ruinArea"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="已复垦土地面积"
        prop="reclaimArea"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="所在行政区"
        prop="govId"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="开采权开始时间"
        prop="startTime"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="开采权结束时间"
        prop="endTitme"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿权获取方式"
        prop="mineGetType"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿区使用费"
        prop="mineUseFee"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="矿业权出让"
        prop="incomePaymentType"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="开矿范围"
        prop="mineRange"
        width="120"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        label="操作"
        :width="optionWith"
        align="center"
        fixed="right"
      >
        <template slot="header">
          <div @click="changeOptionWith">
            <span>操作</span>
            <i
              :class="optionWith==='160'?'el-icon-arrow-right':'el-icon-arrow-left'"
            />
          </div>
        </template>
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="handleVideo(row)"
          >
            视频
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="handlePerson(row)"
          >
            人员
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
    <table-edit ref="edit" @getInfo="getInfo" />
    <!-- //视频查看 -->
    <el-dialog :title="videoTitle" :visible.sync="dialogTableVisible" width="900px">
      <el-table
        v-if="videoTitle==='设备列表'"
        :data="videoData"
        border
        background
        :element-loading-text="elementLoadingText"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >

        <el-table-column
          show-overflow-tooltip
          prop="userId"
          label="用户"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备名称"
          prop="name"
          align="center"
          width="120"
        />

        <el-table-column
          show-overflow-tooltip
          label="所属公司"
          prop="companyId"
          align="center"
          width="120"
        />

        <el-table-column
          show-overflow-tooltip
          label="设备类型"
          prop="deviceType"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="经度"
          prop="lng"
          align="center"
          width="120"
        />

        <el-table-column
          show-overflow-tooltip
          label="维度"
          prop="lat"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备值1"
          prop="value"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备值2"
          prop="value2"
          width="120"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备状态"
          prop="status"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备地址"
          prop="address"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img v-if="scope.row.address" style="width: 98px; height: 60px;cursor: pointer" src="../../../assets/images/video-bgc.png" @click="handelvideo(scope.row)">
            <!-- <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div> -->
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          label="备注信息"
          prop="remarks"
          width="120"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="是否在线"
          prop="online"
          width="120"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备标签"
          prop="label1"
          width="120"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备标签2"
          prop="label2"
          width="120"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="设备标签3"
          prop="label3"
          width="120"
          align="center"
        />
      </el-table>

      <el-dialog :title="titleName" :visible.sync="dialogVisiblevideo" :show-close="false" width="400px" append-to-body class="mydialog">
        <div v-if="dialogVisiblevideo" style="position: relative;">
          <div style="position: absolute; right: 10px; top:10px; z-index: 11;cursor: pointer;background-color: black;border-radius: 10px;color: #fff;">
            <i class="el-icon-close" @click="closedDialog" /></div>
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
          />
        </div>
      </el-dialog>

      <el-table
        v-if="videoTitle==='人员列表'"
        :data="personData"
        border
        background
        :element-loading-text="elementLoadingText"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column
          show-overflow-tooltip
          prop="name"
          label="姓名"
          align="center"
          width="120"
        />
        <el-table-column
          show-overflow-tooltip
          label="员工编号"
          prop="workerNo"
          align="center"
        />

        <el-table-column
          show-overflow-tooltip
          label="设备"
          prop="deviceId"
          align="center"
        />

        <el-table-column
          show-overflow-tooltip
          label="身份证"
          prop="idCard"
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="性别"
          prop="sex"
          align="center"
        />
      </el-table>
      <div style="float: right">
        <el-pagination
          v-if="videoTitle==='设备列表'"
          :background="background"
          :current-page="videoform.pageNo"
          :layout="layout"
          :page-sizes="[5, 10]"
          :page-size="videoform.pageSize"
          :total="totalVideo"
          @current-change="handleCurrentChangevideo"
          @size-change="handleSizeChangevideo"
        />
        <el-pagination
          v-if="videoTitle==='人员列表'"
          :background="background"
          :current-page="personform.pageNo"
          :layout="layout"
          :page-sizes="[5, 10]"
          :page-size="personform.pageSize"
          :total="totalperson"
          @current-change="handleCurrentChangeperson"
          @size-change="handleSizeChangeperson"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableEdit from './components/tableEdit'
import { delCompany, mcList, pageListMinePerson, deviceList } from '@/api/mine'
import { formatDate } from '@/utils/index'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit,
    videoPlayer
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
      imgShow: true,
      companyId: '',
      optionWith: '160',
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
      dialogTableVisible: false,
      videoData: [],
      videoform: {
        pageNo: 1,
        pageSize: 5
      },
      totalVideo: 0,
      personData: [],
      personform: {
        pageNo: 1,
        pageSize: 5
      },
      totalperson: 0,
      videoTitle: '',
      titleName: '',
      dialogVisiblevideo: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: '' // url地址
          }
        ],
        poster: require('../../../assets/images/bgc2.png'), // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      videoID: '',
      peopleID: '',
      MineralType: [{ id: 1, value: '方解石' }, { id: 2, value: '铜矿' }, { id: 3, value: '萤石' }, { id: 4, value: '页岩' }, { id: 5, value: '灰岩' }],
      MineralCategories: [{ id: 1, value: '采矿权' }, { id: 2, value: '探矿权' }]

    }
  },
  computed: {
    addVisible() {
      return localStorage.getItem('userType')
    },
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {
    this.getInfo()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    // 查看视频
    handleVideo(row) {
      console.log(row)
      this.videoTitle = '设备列表'
      this.videoID = row.id
      this.getvideo(row)
      this.dialogTableVisible = true
    },
    handleCurrentChangevideo(val) {
      this.videoform.pageNo = val
      this.getvideo()
    },
    handleSizeChangevideo(val) {
      this.videoform.pageSize = val
      this.getvideo()
    },
    handelvideo(row) {
      console.log(row.address, '11111')
      this.playerOptions.sources[0].src = row.address
      this.titleName = row.name
      this.dialogVisiblevideo = true
    },
    closedDialog() {
      this.$refs.videoPlayer.player.pause() // 暂停
      this.titleName = ''
      this.dialogVisiblevideo = false
    },
    onPlayerPlay(player) {
      player.play()
    },
    // 查看人员
    handlePerson(row) {
      console.log(row)
      this.videoTitle = '人员列表'
      this.peopleID = row.id
      this.getperson(row)
      this.dialogTableVisible = true
    },
    handleCurrentChangeperson(val) {
      this.personform.pageNo = val
      this.getperson()
    },
    handleSizeChangeperson(val) {
      this.personform.pageSize = val
      this.getperson()
    },
    // 查看详情
    cellClick(row) {
      console.log('--------------------------')
      console.log(row)
      console.log('--------------------------')
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
      if (row.id) {
        console.log(row.id)
        this.$confirm('你确定要删除当前项吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async() => {
          console.log(1111)
          const res = await delCompany(row.id)
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
          const ids = this.selectRows.map((item) => item.id).join()
          this.$confirm('你确定要删除选中项吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(async() => {
            const res = await delCompany(ids)
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
          this.$message({
            type: 'error',
            message: '未选中任何行'
          })
          return false
        }
      }
    },
    handleSizeChange(val) {
      console.log(val)
      this.queryForm.pageSize = val
      this.getInfo()
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val
      this.getInfo()
    },
    viewGis(id) {
      this.$router.push({
        path: '/threeD',
        query: {
          cid: id,
          name: name
        }
      })
    },
    // 查询
    handleQuery() {
      this.queryForm.pageNo = 1
      this.getInfo()
    },
    // 获取列表数据
    async getInfo() {
      const params = {

        name: this.myForm.name || null,
        contractPerson: this.myForm.contractPerson || null,
        contractTel: this.myForm.contractTel || null,
        phone: this.myForm.phone || null,
        area: this.myForm.area || null,
        mineType: this.myForm.mineType || null,
        totalAmount: this.myForm.totalAmount || null,
        minedAmount: this.myForm.minedAmount || null,
        lng: this.myForm.lng || null,
        lat: this.myForm.lat || null,
        page: this.queryForm.pageNo || null,
        limit: this.queryForm.pageSize || null
      }
      const res = await mcList(params)
      if (res.code === 200) {
        this.list = res.data.datas.map(item => {
          return {
            name: item.name || null,
            contractPerson: item.contractPerson || null,
            contractTel: item.contractTel || null,
            phone: item.phone || null,
            area: item.area || null,
            address: item.address || null,
            mineType: item.mineType === 1 ? '方解石' : '铜矿' || null,
            devType: item.devType === '1' ? '采矿权' : '探矿权' || null, // 矿产类别
            status: item.status === '1' ? '生产矿山' : '停产矿山' || null, // 矿产状态
            devMethod: item.devMethod === '1' ? '地下开采' : '露天开采' || null, // 开采方式
            mineGetType: item.mineGetType === '1' ? '协议出让' : null || null, // 矿权获取方式
            incomePaymentType: item.incomePaymentType === '1' ? '一次性付款' : null || null, // 矿业权出让
            totalAmount: item.totalAmount || null, // 总储量
            minedAmount: item.minedAmount || null, // 已开采量
            lng: item.lng || null,
            lat: item.lat || null,

            ruinArea: item.ruinArea || null, // 损毁土地面积
            reclaimArea: item.reclaimArea || null, // 已复垦土地面积
            govId: item.govId || null, // 所在行政区
            startTime: formatDate(item.startTime) || null, // 开采权开始时间
            endTitme: formatDate(item.endTitme) || null, // 开采权结束时间
            mineUseFee: item.mineUseFee || null, // 矿区使用费
            productScale: item.productScale || null, // 生产规模
            baoAmount: item.totalAmount - item.minedAmount || null,
            mineRange: item.mineRange === 'null,null' ? '' : item.mineRange || '',
            licenseUrl: item.licenseUrl,
            mineLicenseId: JSON.parse(item.mineLicenseId),
            securityId: JSON.parse(item.securityId),
            envReportId: JSON.parse(item.envReportId),
            amountReportId: JSON.parse(item.amountReportId),
            devReportId: JSON.parse(item.devReportId),
            priceReportId: JSON.parse(item.priceReportId),
            envAuditId: JSON.parse(item.envAuditId),
            otherId: JSON.parse(item.otherId),
            id: item.id
          }
        })
        this.total = res.data.total
      }
    },
    async getvideo() {
      const resDevice = await deviceList({ page: this.videoform.pageNo || null, limit: this.videoform.pageSize || null, companyId: this.videoID || null })
      if (resDevice.code === 200) {
        this.videoData = resDevice.data.datas
        this.totalVideo = resDevice.data.total
      }
    },
    async getperson() {
      const resPerson = await pageListMinePerson({ page: this.personform.pageNo || null, limit: this.personform.pageSize || null, companyId: this.peopleID || null })
      if (resPerson.code === 200) {
        this.personData = resPerson.data.datas
        this.totalperson = resPerson.data.total
      }
    },
    // 改变操作宽度
    changeOptionWith() {
      if (this.optionWith === '160') {
        this.optionWith = '300'
      } else {
        this.optionWith = '160'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .el-table th.el-table__cell > .cell {
    font-weight: 600;
  }

  .mydialog{
    ::v-deep .el-dialog__body{
      padding:0;
    }
    ::v-deep .el-dialog__header {
        background-color: #000001;
        // opacity: 0.5;
        padding: 5px;
        padding-bottom: 10px;
        height: 30px;
    }
     ::v-deep .el-dialog{
       background-color: transparent !important;
    }
     ::v-deep .el-dialog__title {
        color: #ffffff;
        font-size: 15px;
        margin-left: 15px;
    }
     ::v-deep .el-dialog__headerbtn .el-dialog__close {
        color: transparent !important;
    }
    ::v-deep .video-js .vjs-big-play-button{
      top:40%;
      left:40%
    }
    ::v-deep .video-js .vjs-tech {
        height: 99%;
    }
    ::v-deep .vjs-error .vjs-error-display:before {
        color: #fff;
        content: '';
        font-family: Arial, Helvetica, sans-serif;
        font-size: 4em;
        left: 0;
        line-height: 1;
        margin-top: -0.5em;
        position: absolute;
        text-shadow: 0.05em 0.05em 0.1em #000;
        text-align: center;
        top: 50%;
        vertical-align: middle;
        width: 100%;
    }

  }

</style>
