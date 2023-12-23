<template>
  <div class="bg-pan-bottom">
    <div class="title"><span>矿山编辑</span></div>
    <div class="form-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="margin: 20px 80px;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">

            <el-row>
              <el-col :span="12">
                <el-form-item label="矿山名称" prop="name">
                  <el-input
                    v-model.trim="form.name"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业联系人" prop="contractPerson">
                  <el-input
                    v-model.trim="form.contractPerson"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="企业联系电话" prop="contractTel">
                  <el-input
                    v-model.trim="form.contractTel"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model.trim="form.phone"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="矿产地址" prop="address">
                  <el-input
                    v-model.trim="form.address"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面积" prop="area">
                  <el-input
                    v-model.trim="form.area"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="矿物类型" prop="mineType">
                  <el-select v-model="form.mineType" placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in MineralType"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="矿产类别" prop="devType">
                  <el-select v-model="form.devType " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in MineralCategories"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="储量信息" name="second">

            <el-row>
              <el-col :span="12">
                <el-form-item label="已开采量" prop="minedAmount">
                  <el-input
                    v-model.trim="form.minedAmount"
                    autocomplete="off"
                    clearable
                  >
                    <template slot="append">万吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保有量">
                  <el-input
                    v-model.trim="ownership"
                    autocomplete="off"
                    clearable
                  >
                    <template slot="append">万吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="总储量" prop="totalAmount">
                  <el-input
                    v-model.trim="form.totalAmount"
                    autocomplete="off"
                    clearable
                  >
                    <template slot="append">万吨</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="经度" prop="lng">
                  <el-input
                    v-model.trim="form.lng"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="纬度" prop="lat">
                  <el-input
                    v-model.trim="form.lat"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="矿产状态" prop="status">
                  <el-select v-model="form.status " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in MineralStatus"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="开采方式" prop="devMethod">
                  <el-select v-model="form.devMethod " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in MiningWay"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="损毁土地面积" prop="ruinArea">
                  <el-input
                    v-model.trim="form.ruinArea"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="已复垦土地面积" prop="reclaimArea">
                  <el-input
                    v-model.trim="form.reclaimArea"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在行政区" prop="govId">
                  <el-select v-model="form.govId " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in District"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="矿权信息" name="third">
            <el-row>
              <el-col :span="12">
                <el-form-item label="开采权开始时间" prop="startTime">
                  <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开采权结束时间" prop="endTitme">
                  <el-date-picker
                    v-model="form.endTitme"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="矿权获取方式" prop="mineGetType">
                  <el-select v-model="form.mineGetType " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in mineralrights"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="矿区使用费" prop="mineUseFee">
                  <el-input
                    v-model.trim="form.mineUseFee"
                    autocomplete="off"
                    clearable
                    placeholder="请输入金额"
                  >
                    <template slot="append">元/年</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="生产能力" prop="productScale">
                  <el-input
                    v-model.trim="form.productScale"
                    autocomplete="off"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="矿业权出让" prop="incomePaymentType">
                  <el-select v-model="form.incomePaymentType " placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in disposalway"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-divider content-position="center">开矿范围</el-divider>
                <el-button style="float: right;margin: -15px 5px 5px 5px;" type="primary" icon="el-icon-plus" @click="addMineal">新增</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col v-for="(item, index) in mineRangeList" :key="index" :span="8">
                <el-form-item label="开矿范围" prop="mineRange">
                  <el-input
                    v-model.trim="item.startRange"
                    style="width: 40%;"
                    autocomplete="off"
                    clearable
                  />
                  -
                  <el-input
                    v-model.trim="item.endRange"
                    style="width: 40%;"
                    autocomplete="off"
                    clearable
                  />
                  <i class="el-icon-delete" style="margin-left: 10px;color: red;" @click="deleteMineList(index)" />
                </el-form-item>

              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="文件上传" name="forth">

            <el-row>
              <el-col :span="24">
                <el-divider content-position="center">资料上传</el-divider>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="display: flex;justify-content: flex-start;background-color: #e6e5e1;">
                <el-form-item label="营业执照" style="display: flex;flex-direction: column;">
                  <div style="margin: 0px 0 0 -50px;">
                    <upload-img :img-data.sync="list.licenseUrl" :img-id.sync="form.licenseId" />
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
          <!-- <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
        </el-tabs>
      </el-form>
    </div>

    <div slot="footer" class="dialog-footer" style="float: right;margin-right: 100px;">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload/upload.vue'
import UploadImg from '@/components/Upload/uploadImg.vue'
import { myMine, save } from '@/api/mine'
import { formatDate } from '@/utils/index'
export default {
  name: 'TableEdit',
  components: {
    UploadImg,
    Upload
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入矿山名称' }],
        minedAmount: [{ required: true, trigger: 'blur', message: '请输入已开采量' }],
        totalAmount: [{ required: true, trigger: 'blur', message: '请输入总储量' }],
        startTime: [{ required: true, trigger: 'blur', message: '请输入开采权开始时间' }],
        endTitme: [{ required: true, trigger: 'blur', message: '请输入开采权结束时间' }],
        licenseId: [{ required: true, trigger: 'blur', message: '营业执照不能为空' }],
        mineLicenseId: [{ required: true, trigger: 'blur', message: '采矿许可证不能为空' }],
        devReportId: [{ required: true, trigger: 'blur', message: '开发利用方案审查意见不能为空' }],
        amountReportId: [{ required: true, trigger: 'blur', message: '储量报告审查意见不能为空' }],
        priceReportId: [{ required: true, trigger: 'blur', message: '价款评估报告审查意见不能为空' }],
        envAuditId: [{ required: true, trigger: 'blur', message: '生态环境治理报告审查意见不能为空' }]
      },
      title: '',
      dialogFormVisible: false,
      MineralType: [{ id: 1, value: '方解石' }, { id: 2, value: '铜矿' }],
      MineralCategories: [{ id: 1, value: '采矿权' }, { id: 2, value: '探矿权' }],
      MineralStatus: [{ id: 1, value: '生产矿山' }, { id: 2, value: '停产矿山' }],
      MiningWay: [{ id: 1, value: '地下开采' }, { id: 2, value: '露天开采' }],
      District: [{ id: 1, value: '泾县' }, { id: 2, value: '宣州区' }, { id: 3, value: '郎溪县' }, { id: 4, value: '广德县' }, { id: 5, value: '宁国市' }, { id: 6, value: '旌德县' }, { id: 7, value: '绩溪县' }],
      disposalway: [{ id: 1, value: '一次性付款' }],
      mineralrights: [{ id: 1, value: '协议出让' }],
      mineRangeList: [{ startRange: null, endRange: null }],
      list: {},
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
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await myMine()
      if (res.code === 200) {
        const mineRangeTo = res.data.mineRange.split(';')
        this.mineRangeList = mineRangeTo.map(item => {
          return {
            startRange: item.split(',')[0],
            endRange: item.split(',')[1]
          }
        })
        this.form = {
          name: res.data.name || null,
          contractPerson: res.data.contractPerson || null,
          contractTel: res.data.contractTel || null,
          phone: res.data.phone || null,
          area: res.data.area || null,
          address: res.data.address || null,
          mineType: res.data.mineType === 1 ? '方解石' : '铜矿' || null,
          devType: res.data.devType === '1' ? '采矿权' : '探矿权' || null, // 矿产类别
          totalAmount: res.data.totalAmount || null, // 总储量
          minedAmount: res.data.minedAmount || null, // 已开采量
          lng: res.data.lng || null,
          lat: res.data.lat || null,
          status: res.data.status === '1' ? '生产矿山' : '停产矿山' || null, // 矿产状态
          devMethod: res.data.devMethod === '1' ? '地下开采' : '露天开采' || null, // 开采方式
          ruinArea: res.data.ruinArea || null, // 损毁土地面积
          reclaimArea: res.data.reclaimArea || null, // 已复垦土地面积
          govId: res.data.govId || null, // 所在行政区
          startTime: formatDate(res.data.startTime) || null, // 开采权开始时间
          endTitme: formatDate(res.data.endTitme) || null, // 开采权结束时间
          mineGetType: res.data.mineGetType === '1' ? '协议出让' : null || null, // 矿权获取方式
          mineUseFee: res.data.mineUseFee || null, // 矿区使用费
          productScale: res.data.productScale || null, // 生产能力
          incomePaymentType: res.data.incomePaymentType === '1' ? '一次性付款' : null || null, // 矿业权出让
          // mineRange: this.mineRangeList || null,
          licenseUrl: res.data.licenseUrl,
          mineLicenseId: JSON.parse(res.data.mineLicenseId),
          securityId: JSON.parse(res.data.securityId),
          envReportId: JSON.parse(res.data.envReportId),
          amountReportId: JSON.parse(res.data.amountReportId),
          devReportId: JSON.parse(res.data.devReportId),
          priceReportId: JSON.parse(res.data.priceReportId),
          envAuditId: JSON.parse(res.data.envAuditId),
          otherId: JSON.parse(res.data.otherId),
          id: res.data.id
        }
        this.$store.commit('user/SET_COMPANYID', res.data.id)
        localStorage.setItem('companyId', res.data.id)
        console.log(this.form)
      }
    },
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
    close() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('getInfo')
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 编辑保存,新增保存
    save() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const params = {
            name: this.form.name || null,
            contractPerson: this.form.contractPerson || null,
            contractTel: this.form.contractTel || null,
            phone: this.form.phone || null,
            area: this.form.area || null,
            address: this.form.address || null,
            mineType: this.form.mineType === '方解石' ? 1 : 2 || null,
            devType: this.form.devType === '采矿权' ? 1 : 2 || null, // 矿产类别
            totalAmount: this.form.totalAmount || null, // 总储量
            minedAmount: this.form.minedAmount || null, // 已开采量
            lng: this.form.lng || null,
            lat: this.form.lat || null,
            status: this.form.status === '生产矿山' ? 1 : 2 || null, // 矿产状态
            devMethod: this.form.devMethod === '地下开采' ? 1 : 2 || null, // 开采方式
            ruinArea: this.form.ruinArea || null, // 损毁土地面积
            reclaimArea: this.form.reclaimArea || null, // 已复垦土地面积
            govId: this.form.govId || null, // 所在行政区
            startTime: formatDate(this.form.startTime) || null, // 开采权开始时间
            endTitme: formatDate(this.form.endTitme) || null, // 开采权结束时间
            mineGetType: this.form.mineGetType === '协议出让' ? 1 : null || null, // 矿权获取方式
            mineUseFee: this.form.mineUseFee || null, // 矿区使用费
            productScale: this.form.productScale || null, // 生产能力
            incomePaymentType: this.form.incomePaymentType === '一次性付款' ? 1 : null || null, // 矿业权出让
            mineRange: this.mineRange || null,
            licenseId: this.form.licenseId,
            mineLicenseId: JSON.stringify(this.form.mineLicenseId),
            securityId: JSON.stringify(this.form.securityId),
            envReportId: JSON.stringify(this.form.envReportId),
            amountReportId: JSON.stringify(this.form.amountReportId),
            devReportId: JSON.stringify(this.form.devReportId),
            priceReportId: JSON.stringify(this.form.priceReportId),
            envAuditId: JSON.stringify(this.form.envAuditId),
            otherId: JSON.stringify(this.form.otherId),
            id: this.form.id
          }

          const res = await save(params)
          console.log(res)
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
          }
          // this.$refs['form'].resetFields()

          this.getInfo()
          // this.form = this.$options.data().form
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bg-pan-bottom {
  min-height: calc(100vh - 50px);

}

.title {
  position: relative;
  // background: rgb(228,245,252);
  background: -moz-linear-gradient(top,  rgba(228,245,252,1) 0%, rgba(191,232,249,1) 50%, rgba(159,216,239,1) 51%, rgba(42,176,237,1) 100%);
  background: -webkit-linear-gradient(top,  rgba(228,245,252,1) 0%,rgba(191,232,249,1) 50%,rgba(159,216,239,1) 51%,rgba(42,176,237,1) 100%);
  background: linear-gradient(to bottom,  rgba(228,245,252,1) 0%,rgba(191,232,249,1) 50%,rgba(159,216,239,1) 51%,rgba(42,176,237,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e4f5fc', endColorstr='#2ab0ed',GradientType=0 );
  width: 100%;
  height: 100px;

  & span {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    color: #55557f;
    font-size: 20px;
  }
}
.form-box{

}
</style>
