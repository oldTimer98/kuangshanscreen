<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="1000px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="储量概况" name="first">
          <el-row :gutter="30" type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="矿山名称" prop="name">
                <el-input
                  v-model.trim="form.name"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业联系人" prop="contractPerson">
                <el-input
                  v-model.trim="form.contractPerson"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="企业联系电话" prop="contractTel">
                <el-input
                  v-model.trim="form.contractTel"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex" justify="space-between">

            <el-col :span="8">
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model.trim="form.phone"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="矿产地址" prop="address">
                <el-input
                  v-model.trim="form.address"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="面积" prop="area">
                <el-input
                  v-model.trim="form.area"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="30" type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="矿物类型" prop="mineType">
                <el-select v-model="form.mineType" placeholder="请选择">
                  <el-option
                    v-for="item in MineralType"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="矿权类别" prop="devType">
                <el-select v-model="form.devType " placeholder="请选择">
                  <el-option
                    v-for="item in MineralCategories"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已开采量" prop="minedAmount">
                <el-input
                  v-model.trim="form.minedAmount"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                >
                  <template slot="append">万吨</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex">
            <el-col :span="8">
              <el-form-item label="绿色矿山申报" prop="blueMine">
                <el-select v-model="form.blueMine " placeholder="请选择">
                  <el-option
                    v-for="item in blueMine"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="矿山品味" prop="oreGrade">
                <el-input
                  v-model.trim="form.oreGrade"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="储量信息" name="second">
          <el-row :gutter="30" type="flex" justify="space-between">

            <el-col :span="8">
              <el-form-item label="保有量" prop="ownership">
                <el-input
                  v-model.trim="form.ownership"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                >
                  <template slot="append">万吨</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总储量" prop="totalAmount">
                <el-input
                  v-model.trim="form.totalAmount"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                >
                  <template slot="append">万吨</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度" prop="lng">
                <el-input
                  v-model.trim="form.lng"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="纬度" prop="lat">
                <el-input
                  v-model.trim="form.lat"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="矿产状态" prop="status">
                <el-select v-model="form.status " placeholder="请选择">
                  <el-option
                    v-for="item in MineralStatus"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开采方式" prop="devMethod">
                <el-select v-model="form.devMethod " placeholder="请选择">
                  <el-option
                    v-for="item in MiningWay"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="损毁土地面积" prop="ruinArea">
                <el-input
                  v-model.trim="form.ruinArea"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已复垦土地面积" prop="reclaimArea">
                <el-input
                  v-model.trim="form.reclaimArea"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在行政区" prop="govId">
                <el-select v-model="form.govId " placeholder="请选择">
                  <el-option
                    v-for="item in District"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="矿权信息" name="third">
          <el-row :gutter="30" type="flex" justify="space-between">
            <el-col :span="8">
              <el-form-item label="开采权开始时间" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :disabled="queryhandle"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开采权结束时间" prop="endTitme">
                <el-date-picker
                  v-model="form.endTitme"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :disabled="queryhandle"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="矿权获取方式" prop="mineGetType">
                <el-select v-model="form.mineGetType " placeholder="请选择">
                  <el-option
                    v-for="item in mineralrights"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30" type="flex" justify="space-between">

            <el-col :span="8">
              <el-form-item label="矿区使用费" prop="mineUseFee">
                <el-input
                  v-model.trim="form.mineUseFee"
                  autocomplete="off"
                  clearable
                  placeholder="请输入金额"
                  :disabled="queryhandle"
                >
                  <template slot="append">元/年</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生产能力" prop="productScale">
                <el-input
                  v-model.trim="form.productScale"
                  autocomplete="off"
                  clearable
                  :disabled="queryhandle"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="矿业权出让" prop="incomePaymentType">
                <el-select v-model="form.incomePaymentType " placeholder="请选择">
                  <el-option
                    v-for="item in disposalway"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value"
                    :disabled="queryhandle"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="mineAdd">
            <el-row :gutter="30">
              <el-col :span="24">
                <el-divider content-position="center">开矿范围</el-divider>
                <el-button v-if="!queryhandle" style="float: right;margin: -15px 5px 5px 5px;" type="primary" icon="el-icon-plus" @click="addMineal">新增</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-for="(item, index) in mineRangeList" :key="index" :span="8">
                <el-form-item label="开矿范围" prop="mineRange">
                  <el-input
                    v-model.trim="item.startRange"
                    style="width: 35%;"
                    autocomplete="off"
                    clearable
                    :disabled="queryhandle"
                  />
                  -
                  <el-input
                    v-model.trim="item.endRange"
                    style="width: 35%;"
                    autocomplete="off"
                    clearable
                    :disabled="queryhandle"
                  />
                  <i v-if="!queryhandle" class="el-icon-delete" style="margin-left: 10px;color: red;" @click="deleteMineList(index)" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文件上传" name="fourth">
          <el-row>
            <el-col :span="24">
              <el-divider content-position="center">资料上传</el-divider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="display: flex;justify-content: flex-start;background-color: #e6e5e1;">
              <el-form-item label="营业执照" style="display: flex;flex-direction: column;" prop="licenseId">
                <div style="margin: 0px 0 0 -50px;">
                  <upload-img :img-data.sync="form.licenseUrl" :img-id.sync="form.licenseId" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-divider content-position="center">文件上传</el-divider>
            </el-col>
          </el-row>
          <el-row style="display: flex;align-items: flex-start;flex-wrap: wrap;">
            <el-col :span="24">
              <el-form-item label="采矿许可证" prop="mineLicenseId" label-width="135px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -85px;">
                  <Upload :file-id.sync="form.mineLicenseId" />
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="储量报告审查意见" prop="amountReportId" label-width="180px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -130px;">
                  <Upload :file-id.sync="form.amountReportId" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开发利用方案审查意见" prop="devReportId" label-width="200px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -150px;">
                  <Upload :file-id.sync="form.devReportId" />
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="价款评估报告审查意见" prop="priceReportId" label-width="200px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -150px;">
                  <Upload :file-id.sync="form.priceReportId" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="生态环境治理报告审查意见" prop="envAuditId" label-width="220px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -170px;">
                  <Upload :file-id.sync="form.envAuditId" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="安全许可证" label-width="135px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -85px;">
                  <Upload :file-id.sync="form.securityId" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="环保批复" label-width="135px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -85px;">
                  <Upload :file-id.sync="form.envReportId" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="其它上传" label-width="135px" style="display: flex;flex-flow: column;background-color: #e6e5e1;">
                <div style="margin: 0 0 0 -85px;">
                  <Upload :file-id.sync="form.otherId" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-upload
        action="#"
        accept=".xml"
        :multiple="false"
        :show-file-list="false"
        :http-request="httpRequest"
      >
        <el-button type="primary" style="position: absolute;right:20px;top:80px;">
          导入
        </el-button>
      </el-upload>
    </el-form>
    <div v-if="!queryhandle" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
import Upload from '@/components/Upload/upload.vue'
import UploadImg from '@/components/Upload/uploadImg.vue'
import { save } from '@/api/mine'
export default {
  name: 'TableEdit',
  directives: { elDragDialog },
  components: {
    UploadImg,
    Upload
  },
  data() {
    return {
      form: {},
      xmlObj: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入矿山名称' }],
        contractPerson: [{ required: true, trigger: 'blur', message: '请输入企业联系人' }],
        contractTel: [{ required: true, trigger: 'blur', message: '请输入企业联系电话' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        address: [{ required: true, trigger: 'blur', message: '请输入矿产地址' }],
        area: [{ required: true, trigger: 'blur', message: '请输入面积' }],
        mineType: [{ required: true, trigger: 'blur', message: '请输入矿物类型' }],
        devType: [{ required: true, trigger: 'blur', message: '请输入矿产类别' }],
        minedAmount: [{ required: true, trigger: 'blur', message: '请输入已开采量' }],
        blueMine: [{ required: true, trigger: 'blur', message: '请输入绿色矿山申报' }],
        oreGrade: [{ required: true, trigger: 'blur', message: '请输入矿山品味' }],
        totalAmount: [{ required: true, trigger: 'blur', message: '请输入总储量' }],
        //ownership: [{ required: true, trigger: 'blur', message: '请输入保有量' }],
        lng: [{ required: true, trigger: 'blur', message: '请输入经度' }],
        lat: [{ required: true, trigger: 'blur', message: '请输入纬度' }],
        status: [{ required: true, trigger: 'blur', message: '请输入矿产状态' }],
        devMethod: [{ required: true, trigger: 'blur', message: '请输入开采方式' }],
        govId: [{ required: true, trigger: 'blur', message: '请输入所在行政区' }],
        startTime: [{ required: true, trigger: 'blur', message: '请输入开采权开始时间' }],
        endTitme: [{ required: true, trigger: 'blur', message: '请输入开采权结束时间' }],
        mineGetType: [{ required: true, trigger: 'blur', message: '请输入矿权获取方式' }],
        mineUseFee: [{ required: true, trigger: 'blur', message: '请输入矿区使用费' }],
        productScale: [{ required: true, trigger: 'blur', message: '请输入生产能力' }],
        incomePaymentType: [{ required: true, trigger: 'blur', message: '请输入矿业权出让' }],
        licenseId: [{ required: true, trigger: 'blur', message: '营业执照不能为空' }],
        mineLicenseId: [{ required: true, trigger: 'blur', message: '采矿许可证不能为空' }],
        devReportId: [{ required: true, trigger: 'blur', message: '开发利用方案审查意见不能为空' }],
        amountReportId: [{ required: true, trigger: 'blur', message: '储量报告审查意见不能为空' }],
        priceReportId: [{ required: true, trigger: 'blur', message: '价款评估报告审查意见不能为空' }],
        envAuditId: [{ required: true, trigger: 'blur', message: '生态环境治理报告审查意见不能为空' }]
      },
      title: '',
      queryhandle: false,
      dialogFormVisible: false,
      MineralType: [{ id: 1, value: '方解石' }, { id: 2, value: '铜矿' }, { id: 3, value: '萤石' }, { id: 4, value: '页岩' }, { id: 5, value: '灰岩' }],
      MineralCategories: [{ id: 1, value: '采矿权' }, { id: 2, value: '探矿权' }],
      blueMine: [{ id: 1, value: 1, label: '已审批' }, { id: 2, value: 2, label: '已申报' }, { id: 3, value: 3, label: '未申报' }],
      value1: '',
      MineralStatus: [{ id: 1, value: '生产矿山' }, { id: 2, value: '停产矿山' }],
      MiningWay: [{ id: 1, value: '地下开采' }, { id: 2, value: '露天开采' }],
      District: [{ id: 1, value: '泾县' }, { id: 2, value: '宣州区' }, { id: 3, value: '郎溪县' }, { id: 4, value: '广德县' }, { id: 5, value: '宁国市' }, { id: 6, value: '旌德县' }, { id: 7, value: '绩溪县' }],
      disposalway: [{ id: 1, value: '一次性付款' }],
      mineralrights: [{ id: 1, value: '协议出让' }],
      mineRangeList: [{ startRange: null, endRange: null }],
      activeName: 'first'
    }
  },
  computed: {
    ownership() {
      if (this.form.totalAmount && this.form.minedAmount) {
        return this.form.totalAmount - this.form.minedAmount
      }
      return 0
    },
    mineRange() {
      return this.mineRangeList.map((item, index) => {
        return item.startRange + ',' + item.endRange
      }).join(';')
    }
  },
  created() {},
  methods: {
    addMineal() {
      this.mineRangeList.push({
        startRange: null,
        endRange: null
      })
    },
    deleteMineList(index) {
      this.mineRangeList.splice(index, 1)
      console.log(this.mineRangeList)
      console.log(index)
    },
    showEdit(val) {
      if (val.add === '新增') {
        this.title = val.add
        this.mineRangeList = [{ startRange: null, endRange: null }]
      } else if (val.edit === '编辑') {
        this.title = val.edit
        const mineRange = val.row.mineRange.split(';')
        this.mineRangeList = mineRange.map(item => {
          return {
            startRange: item.split(',')[0],
            endRange: item.split(',')[1]
          }
        })
        console.log(val.row)
        this.form = Object.assign({}, val.row)
      } else if (val.query === '详情') {
        this.title = val.query
        this.queryhandle = true
        const mineRange = val.row.mineRange.split(';')
        this.mineRangeList = mineRange.map(item => {
          return {
            startRange: item.split(',')[0],
            endRange: item.split(',')[1]
          }
        })
        console.log(val.row.mineRange)
        this.form = Object.assign({}, val.row)
      }
      this.dialogFormVisible = true
    },
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.queryhandle = false
      this.dialogFormVisible = false
      this.$emit('getInfo')
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 编辑保存,新增保存
    save() {
      console.log('this.mineRange', this.mineRange)
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          this.form.mineRange = this.mineRange
          console.log(this.form.mineType)
          this.form.mineType = this.form.mineType === '方解石' ? 1 : 2 || null
          this.form.devType = this.form.devType === '采矿权' ? 1 : 2 || null // 矿产类别
          this.form.status = this.form.status === '生产矿山' ? 1 : 2 || null // 矿产状态
          this.form.devMethod = this.form.devMethod === '地下开采' ? 1 : 2 || null // 开采方式
          this.form.mineGetType = this.form.mineGetType === '协议出让' ? 1 : null || null // 矿权获取方式
          this.form.incomePaymentType = this.form.incomePaymentType === '一次性付款' ? 1 : null || null // 矿业权出让
          this.form.mineLicenseId = JSON.stringify(this.form.mineLicenseId)
          this.form.securityId = JSON.stringify(this.form.securityId)
          this.form.envReportId = JSON.stringify(this.form.envReportId)
          this.form.amountReportId = JSON.stringify(this.form.amountReportId)
          this.form.devReportId = JSON.stringify(this.form.devReportId)
          this.form.priceReportId = JSON.stringify(this.form.priceReportId)
          this.form.envAuditId = JSON.stringify(this.form.envAuditId)
          this.form.otherId = JSON.stringify(this.form.otherId)
          delete this.form.baoAmount
          delete this.form.licenseUrl
          delete this.form.ownership
          const res = await save(this.form)
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('getInfo')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },

    httpRequest(e) {
      const file = e.file
      if (!file) {
        // 没有文件
        return false
      } else if (!/\.xml$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xml格式')
        return false
      }
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      const t = this
      reader.onload = function(evt) {
        try {
          var fileString = evt.target.result // 读取文件内容
          t.xmlObj = t.$x2js.xml2js(fileString).APP
          t.$emit('getInfo')
          t.$set(t.form, 'name', t.xmlObj.DATA.NA_MINE_NAME)
          t.$set(t.form, 'contractPerson', t.xmlObj.DATA.NA_LEGAL_REPRESENTATIVE)
          t.$set(t.form, 'contractTel', t.xmlObj.DATA.NA_TEL)
          t.$set(t.form, 'phone', t.xmlObj.DATA.NA_TEL)
          t.$set(t.form, 'address', t.xmlObj.DATA.NA_ADDRESS)
          t.$set(t.form, 'area', t.xmlObj.DATA.QT_DIGINGS_AREA)
          t.$set(t.form, 'devType', t.xmlObj.HEADER.APP_CATEGORY)
          t.$set(t.form, 'totalAmount', t.xmlObj.DATA.QT_RESERVES_TOTAL)
          t.$set(t.form, 'ruinArea', t.xmlObj.DATA.QT_DAMAGE_LAND)
          t.$set(t.form, 'reclaimArea', t.xmlObj.DATA.QT_RECLAIM_VALUE)
          t.$set(t.form, 'govId', t.xmlObj.DATA.QT_CANTON)
          t.$set(t.form, 'startTime', t.xmlObj.DATA.DT_OLD_START)
          t.$set(t.form, 'endTitme', t.xmlObj.DATA.DT_OLD_END)
          t.$set(t.form, 'mineGetType', t.xmlObj.DATA.NA_MINE_KIND)
          t.$set(t.form, 'incomePaymentType', t.xmlObj.DATA.NA_COST_STYLE)
        } catch (error) {
          this.$message.error('解析错误')
          return false
        }
      }
    } }
}
</script>
<style scoped="scoped" lang="scss">
.mineAdd{
  border:1px solid #283655
}
.title{
  text-align: center;
  font-size: 24px;
}
</style>
