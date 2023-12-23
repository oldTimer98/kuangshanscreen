var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF',
  '#33FFCC'
];
var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
var storehouse='path://M453.48 122.26l-331.02 328.2c-15.52 15.39-24.24 36.26-24.24 58.02v335.24c0 45.32 37.05 82.05 82.75 82.05h662.04c45.7 0 82.75-36.74 82.75-82.05V508.48c0-21.76-8.72-42.63-24.24-58.02L570.5 122.26c-32.3-32.04-84.7-32.04-117.02 0z m182.65 639.41H387.87v-82.05h248.26v82.05z m0-164.1H387.87v-82.05h248.26v82.05z';
export  default {
  data() {
    return{

    }
  },
  methods: {
    toolTip(){
      return  {
        show : true,
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          console.log(params)
          if (params.seriesType == "effectScatter"||params.seriesType == "scatter") {
            let item = params.data.value[2];
            if(item.type=='storehouse'){
              return '仓库：'+params.data.name;
            }
            let str=item.img_url?("<div style='width:200px; height: 150px;overflow: hidden;background: url("+item.img_url+")no-repeat;background-size: cover' /></div><br/>"):'';
            return str+"客商：" + params.data.name + "<br/>发货金额：" + (item.send_money || 0) + "元<br/>回款金额：" + (item.back_money || 0) + "<br/>退货率：" + ((item.returnRate || 0) * 100).toFixed(2) + '%';
          } else if (params.seriesType == "lines") {
            return params.data.fromName + "⇾" + params.data.toName;
          } else {
            return params.name;
          }
        }
      }
    },
    convertData (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];

        var fromCoord = [dataItem.sale_lgn, dataItem.sale_lat];
        var toCoord = [dataItem.receive_lgn, dataItem.receive_lat];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.sale_area_name, toName: dataItem.custom_name, coords: [fromCoord, toCoord],
            value: dataItem.sale_num, dataItem:{...dataItem}});
        }
      }
      return res;
    },
    levelOneLine(item,color){
     // color='#fff'
      let data=this.convertData(item[1]);
        return [{
          name: item[0], type: 'lines', zlevel: 1,
          effect: {
            show: true, period: 6, trailLength: 0.7, color: color, //arrow箭头的颜色
            symbolSize: 3},
          lineStyle: {
            normal: {color:color, width: 0, curveness: 0.3}
          },
          data:data
        },{
          name: item[0], type: 'lines', zlevel: 1, symbol: ['none', 'none'],
          symbolSize: 10,
          effect: {show: true, period: 6, trailLength: 0, symbol: planePath,symbolSize: 15,color:color},
          lineStyle: {
           color:color, width: 1, opacity: 1, curveness: 0.3,
            shadowColor: 'rgba(255, 255, 255, 1)',
            shadowBlur: 8
          },
          data: data
        }
        ]
    },
    scatter(name,item,color){
      return{
        name: name, type: 'scatter', coordinateSystem: 'geo', zlevel: 2,
        label: {
          normal: {show: false, position: 'right', formatter:"{b}"}
        },
        symbol: 'pin',
        symbolSize: 20,
        itemStyle: {
          normal: {color:color,},
          emphasis: {areaColor: '#2B91B7'}
        },
        data: item
      }
    },
    effectScatter(name,item,color){
      return {
        name: name, type: 'effectScatter', coordinateSystem: 'geo', zlevel: 2,
        rippleEffect: {
        brushType: 'stroke',
          scale: 2 //波纹圆环最大限制，值越大波纹越大
      },
        label: {
          normal: {show: false, position: 'right', formatter:"{b}"}
        },
        symbol: 'circle',
          symbolSize: 5,
        itemStyle: {
        normal: {color:color,},
        emphasis: {areaColor: '#2B91B7'}
      },
        data: item
      }
    },
    lineOneMap(names,data){
     let list ={}
     data.map(item=>{
        let name=item.sale_area_name;
        if(name&&item.custom_name&&item.sale_lat&&item.receive_lat){
          if(list[name]){list[name].push(item);}else{list[name]=[item];}
        }
      })
      let m = [],series = [];
      for (let i in list) {m.push([i, list[i]])}
      m.forEach((item, i)=>{
        console.log(item);
        console.log('------');
        let line=this.levelOneLine(item,'#fff')
        series.push(line[0],line[1],this.scatter(item[0], item[1].map(function(dataItem) {
          return {
            name: dataItem.custom_name,
            value: [dataItem.receive_lgn,dataItem.receive_lat, dataItem]
          };
        }),'#fff'),this.storeSign(item));
      });
      return {tooltip:this.toolTip(),series:series};
    },
    storeSign(line){
      let dataItem={...line[1][0],type:'storehouse'},color='red';
      return {
        name: line[0], type: 'scatter', coordinateSystem: 'geo', zlevel: 3,
        label: {
          normal: {show: false, position: 'right', formatter:"{b}"}
        },
        symbol: storehouse,
        symbolSize: 13,
        itemStyle: {
          normal: {color:color,},
        },
        data:[{name:line[0],value: [dataItem.sale_lgn,dataItem.sale_lat, dataItem]}]
      }
    },
    lineProvinceMap(id,name,list,level){
        let code= String(id).substr(0,2*(level-1));
        let hasStoreList=[],notList=[];
       list.map(item=>{
          if(code==String(item.area_code).substr(0,2*(level-1))){
            hasStoreList.push(item);
          }else{
            notList.push(item)
          }
        })
        let op=this.lineOneMap(name,hasStoreList);
        op.series.push(this.scatter(name,notList.map((dataItem)=>{
          return{
            name: dataItem.custom_name,
            value: [dataItem.receive_lgn,dataItem.receive_lat, dataItem]
          }
        })))
        return op
    }
  },
  mounted(){
  console.log('mounted')
  }
}
