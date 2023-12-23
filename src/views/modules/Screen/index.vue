<template>
  <div>
    <div class="big_Screen">
      <div class="mainbox">
        <div class="clearfix nav1">
          <div style="width: 100%;position: relative;">
            <div class="title" style="background-color: #0a2a47;"><img>
              <div class="area">
                <el-dropdown trigger="click" placement="bottom">
                  <span class="el-dropdown-link">
                    <i class="el-icon-s-unfold" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><div @click="showPanel = !showPanel">{{ showPanel ? '隐藏面板' : '展示面板' }}</div></el-dropdown-item>
                    <el-dropdown-item><div @click="loginout">退出登录</div></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="box">
              <div class="boxnav mapc" style="height: calc(100vh - 50px); position: relative">
                <div class="map"><map-for :mine-list="ScaleOfProduction" /></div>
              </div>
            </div>
            <div style="position: absolute;left:0;top: 50px;">
              <div v-show="showPanel" class="box">
                <div class="tit">矿产</div>
                <div class="boxnav" style="height: 220px;width: 300px;">
                  <div class="yqlist">
                    <ul class="clearfix">
                      <li>
                        <div class="yq" @click="handleClick">{{ outCount }}</div>
                        <span class="titleColor">露天开采矿山数量</span>
                      </li>
                      <li>
                        <div class="yq" @click="handleClick">{{ mineCount }}</div>
                        <span>采矿权数量</span>
                      </li>
                      <li>
                        <div class="yq" @click="handleClick">{{ onCount }}</div>
                        <span>生产矿山数量</span>
                      </li>
                      <li>
                        <div class="yq" @click="handleClick">{{ underCount }}</div>
                        <span>地下开采矿山数量</span>
                      </li>
                      <li>
                        <div class="yq" @click="handleClick">{{ findCount }}</div>
                        <span>探矿权数量</span>
                      </li>
                      <li>
                        <div class="yq" @click="handleClick">{{ offCount }}</div>
                        <span>停产矿山数量</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-show="showPanel" class="box">
                <div class="tit">矿权管理</div>
                <div class="boxnav" style="height: 190px;width: 300px;margin-left: 10px;overflow-y: auto;">
                  <div class="topRec_List">
                    <dl style="display:flex;justify-content: space-between;margin-bottom:10px">
                      <dd style="width: 100%;">矿山名称</dd>
                      <dd>到期日</dd>
                    </dl>
                    <div class="marquee-view">
                      <div class="maquee">
                        <ul>
                          <li v-for="(item, index) in ScaleOfProduction" :key="index">
                            <!-- <div class="caikuangtitle"> -->
                            <div class="block" :style="{ backgroundColor: item.color }" />
                            <div style="display: flex;justify-content: space-between;width: 90%;" @click="gotoDetails(item.id)">
                              <span> {{ item.name }}</span>
                              <span>{{ item.endTitme | formatDate }}</span>
                            </div>
                          <!-- </div> -->
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- <div id="echart5" class="boxnav" style="height: 220px;width: 300px;margin-left: 10px;" /> -->
              </div>
              <div v-show="showPanel" class="box">
                <div class="tit">绿色矿山</div>
                <div class="boxnav" style="height: 100px;width: 300px;margin-left: 10px;overflow-y: auto;">
                  <div class="topRec_List">
                    <dl style="display:flex;justify-content: space-between;margin-bottom:10px">
                      <dd style="width: 100%;">矿山名称</dd>
                      <dd>状态</dd>
                    </dl>
                    <div class="marquee-view">
                      <div class="maquee">
                        <ul>
                          <li v-for="(item, index) in ScaleOfProduction" :key="index">
                            <div class="block" :style="{ backgroundColor: item.color }" />
                            <div style="display: flex;justify-content: space-between;width: 82%;">
                              <span> {{ item.name }}</span>
                              <span>{{ item.blueMine==='1'? "已审批":item.blueMine==='2'? "已申报":item.blueMine==='3'? "未申报":'' }}</span>
                            </div>

                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute;right: 0;top: 50px;">
            <div v-show="showPanel" class="box">
              <div class="tit">储量动态管理</div>
              <div class="boxnav" style="height: 195px;width: 100%;margin-left: 10px;overflow-y: auto;padding: 5px;">
                <div class="topRec_List">
                  <dl style="height: 25px;">
                    <dd>公司名称</dd>
                    <dd>生产能力(万吨/年)</dd>
                    <dd>保有量(万吨)</dd>
                  </dl>
                  <div class="maquee">
                    <ul>
                      <li v-for="(item,index) in dataList" :key="index">
                        <div class="block" :style="{backgroundColor:item.color}" />
                        <div :title="item.name">{{ item.name | ellipsis }}</div>
                        <div>{{ item.productScale }}</div>
                        <div @click="handleClick()">{{ item.ownership }}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div v-show="showPanel" class="box">
              <div class="tit">资源概况</div>
              <div ref="echart3" class="boxnav" style="height: 195px;width: 300px;margin-left: 10px;overflow-y: auto;" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import MapFor from './map.vue'
import { mcList, pageListArticle, summaryData, summaryMineType } from '@/api/mine'
import { formatDate } from '@/utils/index'
export default {
  name: 'Home',
  components: {
    MapFor
  },
  filters: {
    formatDate,
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 10) + '...'
      }
      return value
    }
  },
  data() {
    return {
      t: null,
      aList: [],
      mineTypeList: [],
      showPanel: true,
      data: [5, 12, 23, 89, 78, 23],
      titlename: ['泾县', '宁国', '广德', '旌德', '宣州', '郎溪'],
      ScaleOfProduction: [],
      outCount: '',
      offCount: '',
      onCount: '',
      underCount: '',
      mineCount: '',
      findCount: ''
    }
  },
  computed: {
    nameForMeial() {
      return this.ScaleOfProduction.map(item => item.name)
    },
    listForMeial() {
      return this.ScaleOfProduction.map(item => item.productScale)
    },
    chuForMeial() {
      const newlist = this.ScaleOfProduction.map(item => item.ownership).sort((a, b) => a - b)
      console.log(newlist)
      return newlist
    },
    dataList() {
      const newList = this.ScaleOfProduction.map((item, index) => {
        return {
          ownership: item.ownership,
          name: item.name,
          productScale: item.productScale,
          color: Number(item.productScale) >= Number(item.ownership) ? 'red' : (Number(item.productScale) >= Number(item.ownership) * 2 ? 'yellow' : 'green')
        }
      }).sort((a, b) => a.ownership - b.ownership)
      console.log(newList)
      return newList
    },
    // 其中“保有储量”小于等于“生产能力”的呈现红色字体，“保有储量”小于“生产规模”两倍以内的数值显示黄色字体，“保有储量”大于等于2倍“生产规模”数值的绿色字体
    colorInfo() {
      return this.listForMeial.map((item, index) => {
        if (Number(item) >= this.chuForMeial[index]) {
          return 'red'
        } else if (Number(item) >= this.chuForMeial[index] * 2) {
          return 'yellow'
        } else if (Number(item) * 2 <= this.chuForMeial[index]) {
          return 'green'
        }
      })
    },
    Datetimeof() {
      const nowTime = new Date().getTime()

      if (this.ScaleOfProduction) {
        return this.ScaleOfProduction.map((item, index) => {
          if (item.endTitme) {
            const Toutime = nowTime - item.endTitme
            const day = Math.floor(Toutime / 86400000)
            return day
          }
        })
      }
      return ''
    }
  },
  watch: {},
  mounted() {
    this.setMyEchart2() // 页面挂载完成后执行
  },
  created() {
    this.getInfo()
  },
  methods: {
    // 跳转详情页
    gotoDetails(id) {
      this.$router.push({
        path: '/mineraldetails',
        query: {
          id
        }
      })
    },
    setMyEchart2() {
      const echart2 = document.getElementById('echart2') // 通过ref获取到DOM节点
      if (echart2) {
        const thisChart = echarts.init(echart2) // 利用原型调取Echarts的初始化方法
        const option = {
          grid: {
            left: '0',
            top: '0',
            right: '0',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            show: false
          },
          yAxis: [
            {
              show: true,
              data: this.titlename,
              inverse: true,
              axisLine: { show: false },
              splitLine: { show: false },
              axisTick: { show: false },
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            {
              show: false,
              inverse: true,
              data: this.data,
              axisLabel: { textStyle: { color: '#fff' }},
              axisLine: { show: false },
              splitLine: { show: false },
              axisTick: { show: false }
            }
          ],
          series: [
            {
              name: '条',
              type: 'bar',
              yAxisIndex: 0,
              data: this.data,
              barWidth: 15,
              itemStyle: {
                normal: {
                  barBorderRadius: 50,
                  color: '#1089E7'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{c}',
                  textStyle: { color: 'rgba(255,255,255,.5)' }
                }
              }
            }
          ]
        } // {}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
        thisChart.setOption(option) // 将编写好的配置项挂载到Echarts上
        window.addEventListener('resize', function() {
          thisChart.resize() // 页面大小变化后Echarts也更改大小
        })
      }
    },
    setMyEchart4() {
      const that = this
      console.log(that.listForMeial)
      const echart4 = document.getElementById('echart4') // 通过ref获取到DOM节点
      if (echart4) {
        const thisChart = echarts.init(echart4) // 利用原型调取Echarts的初始化方法
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
          },
          legend: {
            data: ['生产能力', '保有储量'],
            right: 10,
            top: 12,
            textStyle: {
              color: function(value, index) {
                return that.colorInfo[index]
              }
            },
            itemWidth: 12,
            itemHeight: 10
            // itemGap: 35
          },
          xAxis: {
            type: 'category',
            data: that.nameForMeial,
            axisLine: {
              lineStyle: {
                color: 'white'
              }
            },
            axisLabel: {
              // interval: 0,
              // formatter: function(c) { // axisLabel里的formatter为function自己做文本截断
              //   for (var i in c) {
              //     return c.substring(0, 3) // 截取X轴坐标值的长度
              //   }
              // },
              textStyle: {
                fontFamily: 'Microsoft YaHei',
                color: function(value, index) {
                  for (const i in that.nameForMeial) {
                    if (value === that.nameForMeial[i]) {
                      return that.colorInfo[i]
                    }
                  }
                }
              }
            }
          },
          dataZoom: [
            {
              show: true,
              height: 12,
              xAxisIndex: [0],
              bottom: '8%',
              start: 80,
              end: 90,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#d3dee5'
              },
              textStyle: {
                color: '#fff'
              },
              borderColor: '#90979c'
            }
            // {
            //   type: 'inside',
            //   show: true,
            //   height: 15,
            //   start: 99,
            //   end: 99
            // }
          ],
          yAxis: {
            type: 'value',
            splitLine: {
              // 分割线
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLine: {
              // ---坐标轴 轴线
              show: false, // ---是否显示
              lineStyle: {
                color: 'white'
              }
            }
          },
          series: [
            {
              name: '生产能力',
              type: 'bar',
              data: that.listForMeial,
              barWidth: '10%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#fccb05'
                    },
                    {
                      offset: 1,
                      color: '#f5804d'
                    }
                  ]),
                  barBorderRadius: 12
                }
              }
            },
            {
              name: '保有储量',
              type: 'bar',
              data: that.chuForMeial,
              barWidth: '10%',

              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#8bd46e'
                    },
                    {
                      offset: 1,
                      color: '#09bcb7'
                    }
                  ]),
                  barBorderRadius: 11
                }
              }
            }
          ]
        } // {}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
        thisChart.setOption(option) // 将编写好的配置项挂载到Echarts上
        window.addEventListener('resize', function() {
          thisChart.resize() // 页面大小变化后Echarts也更改大小
        })
      }
    },
    setMyEchart3() {
      const echart3 = this.$refs.echart3 // 通过ref获取到DOM节点

      if (echart3) {
        const thisChart = echarts.init(echart3) // 利用原型调取Echarts的初始化方法
        const option = {
          tooltip: {
            trigger: 'item'

          },
          series: [
            {
              name: '资源概况',
              type: 'pie',
              radius: '50%',
              data: [
                { value: this.mineTypeList[0].mineLeftTotal, name: '方解石' },
                { value: this.mineTypeList[1].mineLeftTotal, name: '铜矿' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }// {}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
        thisChart.setOption(option) // 将编写好的配置项挂载到Echarts上
        window.addEventListener('resize', function() {
          thisChart.resize() // 页面大小变化后Echarts也更改大小
        })
      }
    },
    handleClick() {
      this.$router.push({ path: '/mineral' })
    },
    async getInfo() {
      let params = {
        page: 1,
        limit: 10000
      }
      const res = await mcList(params)
      if (res.code === 200) {
        if (res.data.datas.length > 0) {
          const nowTime = new Date().getTime()
          let day
          this.ScaleOfProduction = res.data.datas.map(item => {
            day = Math.floor((nowTime - item.endTitme) / 86400000)
            return {
              id: item.id || null,
              productScale: item.productScale || null, // 生产能力
              totalAmount: item.totalAmount || null, // 总储量
              minedAmount: item.minedAmount || null, // 可采储量
              ownership: item.totalAmount - item.minedAmount || null,
              endTitme: item.endTitme || null, // 到期时间
              name: item.name || null, // 矿山名称
              lat: item.lat || null, // 纬度
              lng: item.lng || null, // 经度
              govId: item.govId || null, // 城市名
              color: day < 182 ? 'red' : day > 182 && day < 365 ? 'yellow' : day > 365 ? 'green' : 'white',
              blueMine: item.blueMine || null
            }
          })
          this.$forceUpdate()
          console.log('111111111111111map')
          console.log(this.ScaleOfProduction)
          this.setMyEchart4()
          // this.listCopy()
        }
      }
      const resSummary = await summaryData()
      if (resSummary.code === 200) {
        for (let i = 0; i < resSummary.data.length; i++) {
          if (resSummary.data[i].type === '1') {
            this.outCount = resSummary.data[i].value
          } else if (resSummary.data[i].type === '2') {
            this.offCount = resSummary.data[i].value
          } else if (resSummary.data[i].type === '3') {
            this.onCount = resSummary.data[i].value
          } else if (resSummary.data[i].type === '4') {
            this.underCount = resSummary.data[i].value
          } else if (resSummary.data[i].type === '5') {
            this.mineCount = resSummary.data[i].value
          } else if (resSummary.data[i].type === '6') {
            this.findCount = resSummary.data[i].value
          }
        }
      }
      params = { page: 1, limit: 5 }
      const resArticle = await pageListArticle(params)
      if (resArticle.code === 200) {
        this.aList = resArticle.data.data.map(item => {
          return {
            title: item.title,
            subTitle: item.subTitle,
            info: item.info,
            author: item.author,
            picurlAttaUrl: item.picurlAttaUrl,
            content: item.content,
            remarks: item.remarks,
            disabled: item.disabled === 0 ? '否' : '是',
            commended: item.commended === 0 ? '否' : '是',
            topped: item.topped === 0 ? '否' : '是',
            publishType: item.publishType === 0 ? '草稿' : '发布',

            id: item.id
          }
        })
        this.total = res.data.count
      }
      const resMineType = await summaryMineType()
      if (resMineType.code === 200) {
        debugger
        this.mineTypeList = resMineType.data
        // this.total = res.data.count
        this.setMyEchart3()
      }
    },
    async loginout() {
      const userType = localStorage.getItem('userType')
      window.localStorage.clear()
      await this.$store.dispatch('user/logout')
      if (userType === '0') {
        this.$router.push(`/loginDo?redirect=${this.$route.fullPath}`)
      } else {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
    // 列表无缝滚动
    // listCopy() {
    // this.ScaleOfProduction = this.ScaleOfProduction.concat(JSON.parse(JSON.stringify(this.ScaleOfProduction)))
    // }
  }
}
</script>
<style scoped lang="scss">
@import './style.scss';
div::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  /**/
}
.marquee-view {
  overflow: hidden;
}
/* 通过CSS3动画滚动marquee */
.marquee-view .maquee {
  animation: move 12s linear infinite;
  margin-top: 10px;
}

@keyframes move {
  0% {
  }
  100% {
    transform: translateY(-50%);
  }
}
/* 3.鼠标经过marquee 就停止动画 */
.marquee-view .maquee:hover {
  animation-play-state: paused;
}
</style>
