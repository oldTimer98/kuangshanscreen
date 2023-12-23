<template>
  <div class="map">
    <div class="maptitle">
      <div
        v-for="(item, index) in mapRouter"
        :key="index"
        class="item"
        @click="backFun(item, index)"
      >
        {{ item === '宣城市' ? '宣城市' : item }}
        <span v-if="mapRouter.length > 1 && index < mapRouter.length - 1">
          >
        </span>
      </div>
    </div>
    <div id="myMap" ref="myMap" class="hotMap" />
  </div>
</template>

<script type="text/javascript">
import * as echarts from 'echarts'
import cityMap from '../../../../public/static/map/china-main-city-map.js'
// import cityName from '../../../../public/static/map/name.js'
import mapMixin from './mapOption.js'
import request from '@/utils/request'
import { mcList } from '@/api/mine'

export default {
  mixins: [mapMixin],
  props: ['mineList'],
  data() {
    return {
      chart: '',
      loading: null,
      name: '',
      mapRouter: ['宣城市'],
      cityList: {},
      mapType: 0,
      cityNameList: {},
      pathList: []
      // dataList: this.mineList
    }
  },
  computed: {
    // mapColor() {
    //   return this.$store.state.market.mapColor
    // },
  },
  watch: {
    // mapColor(val, old) {
    //   if (this.mapType != 0) this.restChart()
    // },
    // mineList: {
    //   immediate: true,
    //   handler(nv, ov) {
    //     console.log(nv)
    //     this.$set(this, 'dataList', nv)
    //     this.restChart()
    //   }
    // }
  },
  mounted() {
    for (const item in cityMap) {
      this.cityList[cityMap[item]] = item
    }
    console.log(this.cityList)
    this.$nextTick(() => {
      this.initMapData()
    })
    window.addEventListener('resize', () => {
      if (this.mapChart) {
        this.mapChart.resize()
      }
    })
  },
  updated() {},
  created() {
    this.getInfo()
  },
  beforeDestroy() {
    if (!this.mapChart) {
      return
    }
    this.mapChart.dispose()
    this.mapChart = null
  },
  methods: {
    async getInfo() {
      const params = {
        page: 1,
        limit: 10000
      }
      const res = await mcList(params)
      if (res.code === 200) {
        debugger
        this.dataList = res.data.datas
        debugger
        this.restMap()
        this.restChart()
      }
    },
    restMap() {
      const _this = this
      if (this.mapChart) this.mapChart.dispose()
      this.mapChart = echarts.init(this.$refs.myMap)
      this.mapChart.on('click', function(param) {
        if (param.componentType === 'series') {
          window.open('/#/threeD?cid=' + param.data.mineId)
        }
        if (param.componentType !== 'geo') {
          return
        }
        if (_this.mapRouter.length > 1) {
          return
        }
        if (!cityMap[param.name]) {
          return
        }
        _this.mapRouter.push(param.name)
        _this.initMapData()
      })
    },
    backFun(item, num) {
      const roter = []
      this.mapRouter.map((item, index) => {
        console.log(num, index)
        if (num + 1 > index) roter.push(item)
      })
      this.mapRouter = roter
      this.initMapData()
    },
    famratData(mapJson) {
      var mapData = []
      for (var i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name
          // id:mapJson.features[i].id
        })
      }
      return mapData
    },
    restChart(index) {
      this.mapType = index
      console.log('========')
      console.log(this.pageParam)
      this.initMapData()
    },
    initMapData: async function() {
      const level = this.mapRouter.length
      const name = this.mapRouter[level - 1]
      const param = {
        level: level
      }
      if (level === 2) {
        param.province_code = cityMap[this.mapRouter[1]]
      } else if (level === 3) {
        param.city_code = cityMap[this.mapRouter[2]]
      }
      const id = cityMap[name]
      if (!this.cityList[name]) {
        const ctiyData = await request({
          url: '/static/map/' + id + '.json',
          method: 'get'
        })
        console.log(ctiyData)
        if (ctiyData) {
          this.cityList[name] = ctiyData
        } else {
          this.$message.error('服务器内部错误，请联系系统管理员！')
          return
        }
      }
      console.log(this.mapType)
      let list = []
      if (this.mineList) {
        debugger
        list = this.mineList.map(item => {
          if (item.lat && item.lng) {
            return {
              name: item.name,
              mineId: item.id,
              value: [item.lat, item.lng, item.totalAmount - item.minedAmount]
            }
          }
        })
        console.log(list, this.dataList)
      }
      // list.push({ name: '宁国市', value: ['118.98349', '30.6238', 25] })
      this.registerAndsetOption(
        id,
        name,
        this.cityList[name], list,
        level
      )
    },
    registerAndsetOption(id, name, mapJson, list = [], level) {
      echarts.registerMap(name, mapJson)

      const option = this.getSeries(id, name, list, level, mapJson)
      console.log(option)
      this.restMap()
      this.mapChart.setOption(option, true)
      this.mapChart.resize()
    },
    getSeries(id, name, list, level, mapJson) {
      const option = {
        tooltip: {
          trigger: 'item'
        }}

      option.geo = {
        type: 'map',
        map: name,
        label: {
          emphasis: { show: true, color: '#fff' },
          show: true,
          color: '#c3ecff'
        },
        zoom: 1.0,
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#00186E',
            borderColor: '#195BB9',
            borderWidth: 1
          },
          emphasis: { areaColor: '#2B91B7' }
        }
      }
      option.series = [{
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // symbol: 'diamond',
        showEffectOn: 'render',
        rippleEffect: {
          period: 15,
          scale: 6,
          brushType: 'fill'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: function(params) {
              return 'rgba(255, 235, 59, .7)'
            },
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: list,
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            console.log(params)
            let val = params.value[2]
            console.log(val)
            if (window.isNaN(val)) {
              val = 0
            }
            const txtCon =
                "<div style='text-align:left'>" + params.name + ':<br />保有储量：' + val.toFixed(2) + '万吨</div>'
            return txtCon
          }
        }
      }]
      //  option.geo.regions = regions

      return option
    }
  }
}
</script>

<style lang="scss" scoped>
  .hotMap {
    width: 100%;
    min-height: calc(100vh - 50px);
     background: url("../../../assets/images/background.png") no-repeat;
     //background-size: cover;
  }
  .maptitle {
    z-index: 200;
    position: absolute;
    top: 10px;
    color: #fff;
    font-size: 16px;
    
    padding: 0 10px;
    line-height: 40px;
    text-align: center;
    width: 100%;
  }
  .maptitle .item {
    display: inline-block;
    cursor: pointer;
    border-bottom: 1px #fff solid;
  }
  .maptitle span {
    padding: 0 10px;
  }
  #myMap{
      min-height: calc(100vh);

  }
</style>
