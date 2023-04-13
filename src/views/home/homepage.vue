<!--
 Page: homepage.vue [755773]
 From: 2023-03-31 16:12:48 Ywr
 Remark: 第一屏-首页
-->
<template>
  <div class="sn-page homepage">
    <!-- 标题 -->
    <div class="title-introduce" >
      <img src="../../../static/img/zjsn.png" alt="" @click="$router.push({ path: '/partner' })">
      <div class="introduce">为医院、医生、医药、医保等行业客户提供互联网医疗服务解决方案的科技服务型公司！</div>
    </div>

    <!-- 入口按钮 -->
    <div class="btn-box" >
      <ul class="sn-f-s-c btn-ul">
        <li class="sn-f-s-c single" v-for="(obj, i) in entranceList" :key="i" :style="{'background-image': `url('../../../static/img/btn-bg.png')` }"
          @click="funGoPath(i)">
          <div class="icon-box">
            <img :src="fun.utils.Require(obj.icon)">
          </div>
          <div class="name">{{ obj.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import {useRouter} from 'vue-router'
import { fun } from '@/common/utils/global-config';

const router = useRouter()
  const entranceList = reactive([
    {
      name: '公司介绍',
      icon: '../../../static/img/gsjs.png'
    },
    {
      name: '团队介绍',
      icon: '../../../static/img/tdjs.png'
    },
    {
      name: '发展历程',
      icon: '../../../static/img/fzlc.png'
    },
    {
      name: '公司战略',
      icon: '../../../static/img/gszl.png'
    },
    {
      name: '产业结构',
      icon: '../../../static/img/cyjg.png'
    },
    {
      name: '公司荣誉',
      icon: '../../../static/img/gsry.png'
    }
  ]);

  /*
  * 2023-04-03 09:16:18 Ywr
  * 路由跳转
  */
  const funGoPath = (index) => {
    router.push({
      path: '/introduce',
      query: {
        index: index
      }
    });
  }
</script>

<style lang="scss">
.homepage {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../../../static/img/homepage.png');

  // 标题 + 介绍
  .title-introduce {
    margin-top: 90px;
    margin-left: 119px;

    img {
      width: 567px;
      height: 197px;
    }

    .introduce {
      width: 989px;
      font-size: 35px;
      line-height: 52.5px;
      font-weight: 400;
      color: $white;
    }
  }

  // 入口按钮
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 1920px;
    // height: 497px;
    border-top: 2px solid #fff;
    backdrop-filter: blur(15px);

    .btn-ul {
      max-width: 1170px;
      flex-wrap: wrap;
      margin-left: 119px;
      margin-top: 50px;
      margin-bottom: 21px;

      .single {
        width: 354px;
        height: 111px;
        background-image: url('../../../static/img/homepage.png');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 34px;
        margin-bottom: 29px;

        .icon-box {
          margin: 0 45px 0 56px;

          img {
            width: 51px;
            height: fit-content;
          }
        }

        .name {
          color: #fff;
          font-size: 32px;
          line-height: 32px*3/2;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
