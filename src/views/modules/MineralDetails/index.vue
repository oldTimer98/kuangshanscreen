<template>
  <div class="table-container" style="margin: 20px">
    <el-tabs type="border-card">
      <el-tab-pane label="储量概况">
        <el-table
          :show-header="false"
          :data="tableData1"
          border
          style="width: 100%"
        >
          <el-table-column width="180" prop="name" align="center" />
          <el-table-column prop="value" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="储量信息">
        <el-table
          :show-header="false"
          :data="tableData2"
          border
          style="width: 100%"
        >
          <el-table-column width="180" prop="name" align="center" />
          <el-table-column prop="value" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="矿权信息">
        <el-table
          :show-header="false"
          :data="tableData3"
          border
          style="width: 100%"
        >
          <el-table-column width="180" prop="name" align="center" />
          <el-table-column prop="value" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="相关文件" class="file_tab">
        <div v-if="dataForm.licenseUrl" class="file_style">
          <el-image
            class="img"
            :src="dataForm.licenseUrl"
            :preview-src-list="[dataForm.licenseUrl]"
          />
          <span>营业执照</span>
        </div>
        <div v-if="dataForm.mineLicenseId" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.mineLicenseId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.mineLicenseId)[0].url]"
          />
          <span>采矿许可证</span>
        </div>
        <div v-if="dataForm.amountReportId" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.amountReportId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.amountReportId)[0].url]"
          />
          <span>储量报告审查意见</span>
        </div>
        <div v-if="dataForm.devReportId" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.devReportId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.devReportId)[0].url]"
          />
          <span>开发利用方案审查意见</span>
        </div>
        <div v-if="dataForm.priceReportId" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.priceReportId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.priceReportId)[0].url]"
          />
          <span>价款评估报告审查意见</span>
        </div>
        <div v-if="dataForm.envAuditId " class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.envAuditId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.envAuditId)[0].url]"
          />
          <span>生态环境治理报告审查意见</span>
        </div>
        <div v-if="dataForm.securityId=='undefined'" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.securityId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.securityId)[0].url]"
          />
          <span>安全许可证</span>
        </div>
        <div v-if="dataForm.envReportId=='undefined'" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.envReportId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.envReportId)[0].url]"
          />
          <span>环保批复</span>
        </div>
        <div v-if="dataForm.otherId=='undefined'" class="file_style">
          <el-image
            class="img"
            :src="JSON.parse(dataForm.otherId)[0].url"
            :preview-src-list="[JSON.parse(dataForm.otherId)[0].url]"
          />
          <span>其它上传</span>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { exDetailApi } from '@/api/mine'
import { formatDate } from '@/utils/index'
export default {
  name: 'MineralDetails',
  components: {},
  props: {},
  data() {
    return {
      size: '',
      dataForm: {}
    }
  },
  computed: {
    tableData1() {
      return [
        {
          name: '矿山名称',
          value: this.dataForm.name

        },
        {
          name: '矿产地址',
          value: this.dataForm.address
        },
        {
          name: '企业联系人',
          value: this.dataForm.contractPerson
        },
        {
          name: '企业联系电话',
          value: this.dataForm.contractTel
        },
        {
          name: '手机号',
          value: this.dataForm.phone
        },
        {
          name: '面积',
          value: this.dataForm.area
        },
        {
          name: '矿物类型',
          value: this.dataForm.mineType
        },
        {
          name: '矿权类别',
          value: this.dataForm.devType
        },
        {
          name: '已开采量',
          value: this.dataForm.minedAmount
        },
        {
          name: '矿物品味',
          value: this.dataForm.oreGrade
        },
        {
          name: '绿色矿山申报',
          value: this.dataForm.blueMine

        }
      ]
    },
    tableData2() {
      return [
        {
          name: '保有量',
          value: this.dataForm.ownership

        },
        {
          name: '总储量',
          value: this.dataForm.totalAmount
        },
        {
          name: '经度',
          value: this.dataForm.lng
        },
        {
          name: '纬度',
          value: this.dataForm.lat
        },
        {
          name: '矿产状态',
          value: this.dataForm.status
        },
        {
          name: '开采方式',
          value: this.dataForm.devMethod
        },
        {
          name: '损毁土地面积',
          value: this.dataForm.ruinArea
        },
        {
          name: '已复垦土地面积',
          value: this.dataForm.reclaimArea
        },
        {
          name: '所在行政区',
          value: this.dataForm.govId
        }
      ]
    },
    tableData3() {
      return [
        {
          name: '开采权开始时间',
          value: formatDate(this.dataForm.startTime)
        },
        {
          name: '开采权结束时间',
          value: formatDate(this.dataForm.endTitme)
        },
        {
          name: '矿权获取方式',
          value: this.dataForm.mineGetType
        },
        {
          name: '矿区使用费',
          value: this.dataForm.mineUseFee
        },
        {
          name: '生产能力',
          value: this.dataForm.productScale
        },
        {
          name: '矿业权出让',
          value: this.dataForm.incomePaymentType
        },
        {
          name: '开矿范围',
          value: this.dataForm.mineRange
        }

      ]
    }

  },
  watch: {},
  created() {
    this.getDetails(this.$route.query.id)
  },
  mounted() {},
  methods: {
    async getDetails(id) {
      const res = await exDetailApi(id)
      if (res.code === 200) {
        this.dataForm = res.data
      }
    }

  }

}
</script>

<style lang="scss" scoped>

::v-deep .el-table td:nth-child(1){
  background-color:  #F5F7FA;
  font-weight: 600;
}
.file_tab{
  display: flex;
  justify-content: space-around;
}
.img{
  width: 150px;
  height:150px;
}
  .file_style{
  width: 150px;
  height: 150px;
  margin-bottom: 50px;
  text-align: center;
    font-weight: 600;
  }

</style>
