<!--
 Page: introduce.vue [493793]
 From: 2023-04-03 10:30:22 Ywr
 Remark: 公司介绍-轮播
-->
<template>
  <div class="sn-page introduce"
    @mousedown="funMouseDown" @touchstart="funMouseDown"
    @mouseup="funMouseUp" @touchend="funMouseUp">
    <company v-show="currentPage === 0"></company>
    <team v-show="currentPage === 1"></team>
    <history v-show="currentPage === 2"></history>
    <strategy v-show="currentPage === 3"></strategy>
    <industrial-structure v-show="currentPage === 4"></industrial-structure>
    <honor v-show="currentPage === 5" @getPreviewSrc="getPreviewSrc"></honor>

    <!-- 底部切换按钮 -->
    <div class="switch-btn-box">
      <ul class="my-btn">
        <li class="sn-f-s-c" @click="router.back()">
          <img src="../../../static/img/switch-btn/sy.png" alt="">
          <div>首页</div>
        </li>
        <li class="sn-f-s-c" :class='{active: i === currentPage}'
          v-for="(item, i) in switchList" :key="i" @click="funClickBtn(i)">
          <img :src="item.icon" alt="">
          <div>{{ item.name }}</div>
        </li>
      </ul>
    </div>

    <!-- 预览证书 -->
    <div class="sn-f-c-c preview-box" v-show="previewSrc" @click="previewSrc = ''">
      <img :src="previewSrc" alt="">
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { fun } from '@/common/utils/global-config';

import Company from './child/company.vue';
import Team from './child/team.vue';
import History from './child/history.vue';
import Strategy from './child/strategy.vue';
import IndustrialStructure from './child/industrial-structure.vue';
import Honor from './child/honor.vue';

const route = useRoute();
const router = useRouter();
let previewSrc = ref('') // honor组件中 预览图片
let currentPage = ref(+route.query.index || 0) // 当前下标项


const switchList = reactive([
  {
    name: '公司介绍',
    icon: fun.utils.Require('../../../static/img/switch-btn/gsjs.png')
  },
  {
    name: '团队介绍',
    icon: fun.utils.Require('../../../static/img/switch-btn/tdjs.png')
  },
  {
    name: '发展历程',
    icon: fun.utils.Require('../../../static/img/switch-btn/fzlc.png')
  },
  {
    name: '公司战略',
    icon: fun.utils.Require('../../../static/img/switch-btn/gszl.png')
  },
  {
    name: '产业结构',
    icon: fun.utils.Require('../../../static/img/switch-btn/cyjg.png')
  },
  {
    name: '公司荣誉',
    icon: fun.utils.Require('../../../static/img/switch-btn/gsry.png')
  }
])

let xObj = ref(0);


/*
* 2023-04-03 10:37:12 Ywr
* 点击按钮切换
*/
const funClickBtn = (i) => {
  console.log(i);
  currentPage.value = i;
  console.log(currentPage.value);
}

/*
* 2023-04-06 14:41:16 Ywr
* 获取子组件预览
*/
const getPreviewSrc = (src) => {
  previewSrc.value = src;
}

/*
* 2023-04-11 13:47:21 Ywr
* 鼠标进入
*/
const funMouseDown = (e) => {
  (e.target.className.indexOf('can-scroll') === -1) && (xObj.value = e.clientX || e.screenX);
}

/*
* 2023-04-11 13:47:01 Ywr
* 鼠标离开
*/
const funMouseUp = (e) => {
  if (e.target.className.indexOf('can-scroll') === -1) {
    if (xObj.value < (e.clientX || e.screenX)) {
      currentPage.value === 0 ? currentPage.value = switchList.length - 1 : currentPage.value--;
      console.log('你好');
    }
    else if (xObj.value > (e.clientX || e.screenX)) {
      currentPage.value == switchList.length-1 ? currentPage.value = 0 : currentPage.value++;
      console.log('你好你好你好你好');
    }
  }
}
</script>

<style lang="scss">
.introduce {
  // 底部切换按钮
  .switch-btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    text-align: center;
    border-top: 2px solid $border;
    backdrop-filter: blur(10px);

    .my-btn {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 50px auto;
      width: fit-content;

      li {
        background-image: url('../../../static/img/switch-btn/bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        min-width: 156px;
        width: fit-content;
        height: 61px;
        margin-right: 15px;
        padding-right: 20px;
        color: $white;
        font-size: 18px;
        line-height: 27px;
        font-weight: bold;

        img {
          width: 32px;
          height: fit-content;
          margin-left: 20px;
          margin-right: 15px;
        }
      }

      .active {
        background-image: url('../../../static/img/switch-btn/bg-active.png');
      }
    }
  }

  // 预览证书
  .preview-box {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $mask1;
    overflow-x: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    img {
      height: 900px;
      width: fit-content;
    }
  }
}
</style>
