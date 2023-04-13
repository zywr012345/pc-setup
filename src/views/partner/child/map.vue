<!--
 Page: map.vue [126914]
 From: 2023-04-04 15:26:42 Ywr
 Remark: 山东地图
-->
<template>
  <div class="sn-page map-style" >
    <!-- 标题 -->
    <img class="head" src="../../../../static/partner/head/map.png" alt="">

    <!-- 数据 -->
    <div class="sn-f-e-c data-box" v-show="!showCity">
      <!-- 左侧地图 -->
      <div id="ShanDongDom"></div>

      <!-- 右侧数据 -->
      <div class="list-box">
        <ul>
          <li class="sn-f-e-c" v-for="(obj, i) in wheatList" :key="i">
            <img src="../../../../static/partner/map/wheat-left.png" alt="">
            <div class="sn-f-col-b-c">
              <p>{{ obj.num }}</p>
              {{ obj.name }}
            </div>
            <img src="../../../../static/partner/map/wheat-right.png" alt="">
          </li>
        </ul>
      </div>
    </div>

    <!-- 数据 -->
    <div class="sn-f-s-c city-cont" v-show="showCity">
      <!-- 左侧地图 -->
      <div @click="funHiddenCity">
        <div id="CityDom"></div>
      </div>

      <!-- 右侧数据 -->
      <div class="list-box">
        <ul class="sn-f-s-c">
          <li class="sn-f-s-c" v-for="(obj, i) in cityList" :key="i">
            <div class="icon"></div>
            <div class="name">{{ obj.name }}</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script setup name="ShanongMap">
import { ref, reactive, onMounted, nextTick } from 'vue';
import { fun } from '@/common/utils/global-config';
import * as echarts from 'echarts';
import shandongJson from '../../../../static/js/echarts/alimap/shandong.json';

let ShanDongEchart = reactive({}); // 山东省地图实例
let CityEchart = reactive({}); // 市区地图实例

const styleObj = { // 地图样式
  color: '#fff',
  areaColor: { // 地图色
    type: 'linear',
    x: 0,
    y: 1,
    x2: 0,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: '#00259b' // 100% 处的颜色
      },
      {
        offset: 1,
        color: '#d5dfff' // 0% 处的颜色
      }
    ]
  }
};

const showCity = ref(false); // 展示市区
const wheatList = reactive([ // 麦穗区数据
  {
    num: 28,
    name: '患者数量'
  },
  {
    num: 28,
    name: '医疗合作单位'
  },
  {
    num: 28,
    name: '合作伙伴'
  }
]);

const MetaList = [// 市区医院数据
  {
    name: '山东大学齐鲁儿童医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学齐鲁儿童医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  },
  {
    name: '山东大学省立医院'
  }
];
let cityList = reactive([]); // 医院列表

// 可视区域高宽
let whObj = {
  width: 1920,
  height: 1080
};

(() => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const ftSize = width / 1920; // 字体
  whObj = {
    width,
    height,
    ftSize
  }
  console.log(whObj);
})();

onMounted(() => {
  funDrawingShanDong();
});

/*
* 2023-04-07 09:39:47 Ywr
* 山东省地图
*/
const funDrawingShanDong = () => {
  const airData = [];
  const width = whObj.width * (0.6274);
  const height = whObj.height * (0.66648);
  ShanDongEchart = echarts.init(document.getElementById('ShanDongDom'), 'dark', {
    width,
    height
  });

  const res = {...shandongJson};
  echarts.registerMap('shandongMap', res);
  res.features.forEach((el, i) => {
    airData.push(
      {
        name: el.properties.name,
        adcode: el.properties.adcode,
        index: i
      }
    );
  });

  const option = {
    backgroundColor: 'transparent', // 背景透明
    geo: {
      type: 'map', // 类型
      map: 'shandongMap', // 地图名称
      roam: false, // 允许缩放、拖动
      zoom: 1.2, // 默认缩放比例
      label: {
        left: 'left',
        show: true, // 展示标签
        fontSize: whObj.ftSize * 18,
        color: '#fff'
      },
      itemStyle: styleObj,
      emphasis: {
        label: {
          left: 'left',
          show: true, // 展示标签
          fontSize: whObj.ftSize * 22,
          color: 'blue'
        },
        itemStyle: styleObj
      },
      select: {
        label: {
          show: true, // 展示标签
          fontSize: whObj.ftSize * 18,
          color: '#fff'
        },
        itemStyle: styleObj
      }
    },

    series: [
      {
        // showLegendSymbol: true,
        data: airData,
        geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
        type: 'map',
        selectedMode: 'single'
      }
    ]
  };

  ShanDongEchart.setOption(option);

  funBindClick();
};

/*
* 2023-04-10 13:48:35 Ywr
* 省级地图绑定点击事件
*/
const funBindClick = () => {
  // 点击市区事件
  ShanDongEchart.on('click', (params) => {
    // 显示城市
    showCity.value = true;
    cityList = [...MetaList].splice(0, params.data.index + 5);
    // 移除省级点击事件
    ShanDongEchart.off('click');
    CityEchart && CityEchart.clear && CityEchart.clear();
    // 绘制市区地图
    setTimeout(() => {
      funDrawingCity(params.data.index);
    }, 4);
  });
};

/*
* 2023-04-07 17:23:33 Ywr
* 城市地图
*/
const funDrawingCity = index => {
  const width = whObj.width * (655 * 100 / 192000);
  const height = whObj.height * (655 * 100 / 108000);
  CityEchart = echarts.init(document.getElementById('CityDom'), 'dark', {
    width,
    height
  });
  let res = { ...shandongJson };
  res = {
    features: [res.features[index]],
    type: 'FeatureCollection'
  };
  const centerArr = res.features[0].properties.center;

  echarts.registerMap('CityMapName', res);

  const option = {
    backgroundColor: 'transparent',
    geo: {
      type: 'map', // 类型
      map: 'CityMapName', // 地图名称
      roam: false, // 允许缩放、拖动
      zoom: 1.2, // 默认缩放比例
      label: {
        left: 'left',
        show: true, // 展示标签
        fontSize: whObj.ftSize * 42,
        color: '#ffffff'
      },
      itemStyle: styleObj,
      emphasis: {
        label: {
          show: true, // 展示标签
          fontSize: whObj.ftSize * 42,
          color: '#00259b'
        },
        itemStyle: styleObj
      },
      select: {
        label: {
          show: true, // 展示标签
          fontSize:whObj.ftSize * 42,
          color: '#ffffff'
        },
        itemStyle: styleObj
      }
    },

    xAxis: {
      show: false,
      type: 'value',
      scale: true // 缩放： 脱离0值比例
    },
    yAxis: {
      show: false,
      type: 'value',
      scale: true // 缩放： 脱离0值比例
    },

    series: [
      {
        geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
        type: 'map',
        selectedMode: 'single'
      },
      {
        type: 'effectScatter',
        showEffectOn: 'render', // render emphasis
        rippleEffect: {
          scale: 2
        },
        data: [centerArr],
        symbolSize:whObj.ftSize * 22,
        itemStyle: {
          color: '#00ffd8'
        }
      }
    ]
  };
  CityEchart.setOption(option);
}

/*
* 2023-04-07 17:46:29 Ywr
* 点击地图
*/
const funHiddenCity = () => {
  showCity.value = false;
  nextTick(() => {
    funBindClick();
  });
}
</script>

<style lang="scss">
.map-style {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../../../../static/partner/bg/map.png');

  .head {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    width: 430px;
    height: 136px;
  }

  .data-box {
    width: 100%;

    .list-box {
      margin-right: 205px;
      // margin-left: 183px;
      margin-left: 83px;

      ul {
        li {
          font-size: 32px;
          line-height: 32px*3/2;
          font-weight: 400;
          color: $white;
          align-items: flex-end;
          margin-bottom: 36px;

          img {
            width: 71px;
            height: 125px;
          }

          div {
            width: 304px;

            p {
              font-size: 107px;
              line-height: 107px*3/2;
              font-weight: 400;
            }
          }
        }
      }
    }
  }

  .city-cont {
    width: 100%;
    margin-top: 54px;
    margin-left: 150px;
    align-items: flex-start;

    .list-box {
      // margin-left: 176px;
      margin-left: 200px;
      max-height: 660px;
      overflow-y: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      ul {
        width: 920px;
        flex-wrap: wrap;

        li {
          margin-bottom: 20px;
          margin-right: 51px;

          .name {
            width: 360px;
            font-size: 32px;
            line-height: 32px*3/2;
            font-weight: 400;
            color: $white;
          }

          .icon {
            width: 25px;
            height: 25px;
            background: $lineargradient7;
            border: 1px solid $blue11;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
