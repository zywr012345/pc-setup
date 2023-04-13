<!--
 Page: Company.vue [831327]
 From: 2023-04-03 11:02:09 Ywr
 Remark: 公司介绍
-->
<template>
  <div class="sn-page company-introduce">
    <!-- 左上角标题 -->
    <img class="head" src="../../../../static/img/head/head-gsjs.png" alt="">

    <!-- 介绍 -->
    <div class="introduce">
      <ul class="sn-f-s-c">
        <li class="sn-f-s-c" v-for="(obj, i) in dataList" :key="i">
          <img :src="obj.icon" alt="">
          <div class="sn-f-col-b-s msg">
            <p class="name">{{ obj.name }}</p>
            <p>{{ obj.remark }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script name="Company"></script>

<script setup>
import {ref, reactive} from 'vue';
import { fun } from '@/common/utils/global-config';

const str = ref('name');
const dataList = reactive([
  {
    name: '服务宗旨',
    remark: '用户价值最大化',
    icon: fun.utils.Require('../../../../static/img/gsjs/fwzz.png')
  },
  {
    name: '企业理念',
    remark: '移动改变医疗，掌医守护健康',
    icon: fun.utils.Require('../../../../static/img/gsjs/qyln.png')
  },
  {
    name: '企业使命',
    remark: '把自己做好，将客户做强',
    icon: fun.utils.Require('../../../../static/img/gsjs/qysm.png')
  },
  {
    name: '企业愿景',
    remark: '中国移动医疗行业领军品牌',
    icon: fun.utils.Require('../../../../static/img/gsjs/qyyj.png')
  }
])

</script>

<style lang="scss">
.company-introduce {
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-image: url('../../../../static/img/bg/gsjs.png');

  // 左上角头部图片
  .head {
    margin-top: 69px;
    margin-left: 50px;
    width: 412px;
    height: 120px;
  }

  // 介绍
  .introduce {
    margin-top: 123px;
    margin-left: 107px;
    font-size: 24px;
    line-height: 36px;
    font-weight: 400;
    color: $white1;

    >ul {
      flex-wrap: wrap;
      max-width: 1970px;

      // 单项
      >li {
        width: 764px;
        height: 181px;
        background: $lineargradient3;
        border-radius: 15px;
        padding: 42px 52px;
        margin-right: 129px;
        margin-bottom: 91px;

        // 图标
        >img {
          width: 97px;
          height: fit-content;
          margin-right: 52px;
        }

        // 文字介绍
        .msg {
          height: 100%;

          .name {
            font-size: 32px;
            line-height: 48px;
            font-weight: 600;
            color: $white;
          }
        }
      }
    }
  }
}
</style>
