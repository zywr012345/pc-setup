<!--
 Page: classic-case.vue [964013]
 From: 2023-04-07 16:45:49 Ywr
 Remark: 经典案例
-->
<template>
  <div class="sn-page classic-case">
    <!-- 标题 -->
    <img class="head" src="../../../../static/partner/head/jdal.png" alt="">

    <div class="data-box">
      <div class="sn-f-c-c title">
        已经合作过100+家知名企业
      </div>
      <ul class="sn-f-s-c">
        <li class="sn-f-s-c" v-for="(obj, i) in dataList" :key="i">
          <img class="icon-img" :src="obj.icon" alt="">
          <div>{{ obj.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup name="ClassicCase">
import { fun } from '@/common/utils/global-config';
import { reactive } from 'vue';

const dataList = reactive([
  {
    name: '济南市中心医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/jnszxyy.png')
  },
  {
    name: '青岛市市立医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/qdsslyy.png')
  },
  {
    name: '济宁市第一人民医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/jnsdyrmyy.png')
  },
  {
    name: '聊城市人民医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/lcsrmyy.png')
  },
  {
    name: '滨州医学院附属医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/bzyxyfzsyy.png')
  },
  {
    name: '潍坊市益都中心医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/wfsydzxyy.png')
  },
  {
    name: '泰安市妇幼保健院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/tasfybjy.png')
  },
  {
    name: '山东大学附属生殖医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/sddxfzsszsyy.png')
  },
  {
    name: '济南市人民医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/jnsrmyy.png')
  },
  {
    name: '泰安市中心医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/taszxyy.png')
  },
  {
    name: '滕州市中心人民医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/tzszxrmyy.png')
  },
  {
    name: '山东大学齐鲁医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/sddxqjlyy.png')
  },
  {
    name: '山东中医药大学附属医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/sdzyydxfzsyy.png')
  },
  {
    name: '烟台毓璜顶医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/ytyhdyy.png')
  },
  {
    name: '济南千佛山医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/jnqbsyy.png')
  },
  {
    name: '山东大学齐鲁儿童医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/sddxqletyy.png')
  },
  {
    name: '山东省立医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/sdsxlyy.png')
  },
  {
    name: '德州市立医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/dzslyy.png')
  },
  {
    name: '烟台市烟台山医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/ytsytsyy.png')
  },
  {
    name: '滨州市人民医院',
    icon: fun.utils.Require('../../../../static/partner/classic-case/bzsrmyy.png')
  }
]);
</script>

<style lang="scss">
.classic-case {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../../../../static/partner/bg/jdal.png');
  // background: linear-gradient(136deg, #040c19 0%, #0d1d36 100%);
  // background: linear-gradient(136deg, rgba(4, 12, 25, 0.75) 0%, rgba(13, 29, 54, 0.75) 100%);
  // opacity: 0.75;

  .head {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    width: 430px;
    height: 136px;
    margin-bottom: 17px;
  }

  .data-box {
    .title {
      font-size: 44px;
      line-height: 44px*3/2;
      font-weight: 600;
      color: $orange;
      margin: 73px 0 71px 0;
    }

    ul {
      margin: 0 auto;
      flex-wrap: wrap;
      width: 1545px;

      li {
        width: 294px;
        height: 93px;
        background: $white;
        margin-right: 15px;
        margin-bottom: 24px;
        padding: 13px 17px;

        img {
          width: 76px;
          height: 76px;
          margin-right: 12px;
        }

        div {
          flex: 1;
          font-size: 18px;
          line-height: 18px*3/2;
          font-weight: 400;
          color: $black;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
