<template>
  <div class="page-container">
    <div class="page-container-top">
      <div class="form-box">
        <el-form>
          <div class="title">矿石储量管理</div>
          <div class="content">
            <el-form-item>
              <div class="content-box">
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>可采储量：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.canMineAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>年度计划开采：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.planMineAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>年度实际开采：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.yearMinedAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>核实储量：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.checkAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>已采储量：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.minedAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>保有储量：</span>
                  </div>
                  <div class="form-input">
                    <el-input-number v-model="form.reserveAmount" :controls="false" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="form-button"><el-button type="infor" style="float: right; margin: 0 40px 40px 0px" size="medium" @click="saveChuliang">保存</el-button></div>
        </el-form>
      </div>
      <div class="form-box">
        <el-form>
          <div class="title">开采量管理</div>
          <div class="content">
            <el-form-item>
              <div class="content-box">
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>今日开采量：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>当月开采量：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>昨日开采量：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>上月开采量：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
                <div class="form-time">
                  <span>时间：</span>
                  <div class="form-input">
                    <el-date-picker
                      v-model="form.minedAmount"
                      type="daterange"
                      style="width: 100%;margin-right: 90px;"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    />
                  </div>
                </div>
                <div class="form-today">
                  <span>日开采量：</span>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                    至
                    <el-input v-model="form.minedAmount" style="width: 200px" />
                    <span>t</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="form-button"><el-button type="infor" style="float: right; margin: 25px 40px 40px 0px" size="medium">保存</el-button></div>
        </el-form>
      </div>
    </div>
    <div class="page-container-bottom">
      <div class="form-box">
        <el-form>
          <div class="title">绿色矿山管理</div>
          <div class="content">
            <el-form-item>
              <div class="content-box-bottom">
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>累计绿化覆盖面积：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px;float: left;" />
                    <span>km²</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>矿山总面积：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px;float: left;" />
                    <span>km²</span>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-img">
                    <img src="http://223.244.87.184:7072/static/images/reserves1.png">
                    <span>覆盖率：</span>
                  </div>
                  <div class="form-input">
                    <el-input v-model="form.minedAmount" style="width: 200px;float: left;" />
                    <span>%</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="form-button"><el-button type="infor" size="medium">保存</el-button></div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { saveMineReserve, myMine } from '@/api/mine.js'
export default {
  name: 'ZuJi',
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async saveChuliang() {
      console.log(this.$store.state.user.companyId)
      this.form.companyId = localStorage.getItem('companyId') || this.$store.state.user.companyId

      const res = await saveMineReserve(this.form)
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }
    },
    async getInfo() {
      const params = {
        companyId: this.$store.state.user.companyId
      }
      const res = await myMine(params)
      if (res.code === 200) {
        this.form = {
          id: res.data.mineReserve.id,
          canMineAmount: res.data.mineReserve.canMineAmount,
          checkAmount: res.data.mineReserve.checkAmount,
          minedAmount: res.data.mineReserve.minedAmount,
          reserveAmount: res.data.mineReserve.reserveAmount,
          planMineAmount: res.data.mineReserve.planMineAmount,
          yearMinedAmount: res.data.mineReserve.yearMinedAmount
        }
        console.log(this.form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
