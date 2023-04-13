<!--
 Page: introduce.vue [493793]
 From: 2023-04-03 10:30:22 Ywr
 Remark: 公司介绍-轮播
-->
<template>
  <div class="sn-page introduce"
    @mousedown="funMouseDown" @touchstart="funMouseDown"
    @mouseup="funMouseUp" @touchend="funMouseUp">
    <div class="sn-f-f-c" >
      <ShanongMap></ShanongMap>
      <cooperative-partner ></cooperative-partner>
      <scientific ></scientific>
      <classic-case ></classic-case>
      <MedicalUnionSD  @getPreviewSrc="getPreviewSrc"></MedicalUnionSD>
      <ShanongMap></ShanongMap>
    </div>

    <ShanongMap v-if="currentPage === 0"></ShanongMap>
    <cooperative-partner v-show="currentPage === 1"></cooperative-partner>
    <scientific v-show="currentPage === 2"></scientific>
    <classic-case v-show="currentPage === 3"></classic-case>
    <MedicalUnionSD v-show="currentPage === 4"  @getPreviewSrc="getPreviewSrc"></MedicalUnionSD>

    <!-- 底部切换按钮 -->
    <div class="switch-btn-box">
      <ul class="my-btn">
        <li class="sn-f-s-c" @click="funGoHome">
          <img src="../../../static/partner/switch-btn/sy.png" alt="">
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
import { reactive, ref } from 'vue';
import {useRouter} from 'vue-router'
import { fun } from '@/common/utils/global-config';
import ShanongMap from './child/map.vue';
import CooperativePartner from './child/cooperative-partner.vue';
import Scientific from './child/scientific.vue';
import ClassicCase from './child/classic-case.vue';
import MedicalUnionSD from './child/medical-union-sd.vue';

let previewSrc = ref(''); // honor组件中 预览图片
let currentPage = ref(0); // honor组件中 预览图片
let xObj = ref(0);

const switchList = reactive([
  {
    name: '医疗合作',
    icon: fun.utils.Require('../../../static/partner/switch-btn/ylhz.png')
  },
  {
    name: '战略合作',
    icon: fun.utils.Require('../../../static/partner/switch-btn/zlhz.png')
  },
  {
    name: '科研机构',
    icon: fun.utils.Require('../../../static/partner/switch-btn/kyjg.png')
  },
  {
    name: '经典案例',
    icon: fun.utils.Require('../../../static/partner/switch-btn/jdal.png')
  },
  {
    name: '医联山东',
    icon: fun.utils.Require('../../../static/partner/switch-btn/ylsd.png')
  }
]);
const router = useRouter();

const funGoHome = () =>{
  router.go(-1);
};

/*
* 2023-04-03 10:37:12 Ywr
* 点击按钮切换
*/
const funClickBtn = i => {
  currentPage.value = i;
}

/*
* 2023-04-06 14:41:16 Ywr
* 获取子组件预览
*/
const getPreviewSrc = src => {
  previewSrc.value = src;
}

/*
* 2023-04-11 13:47:21 Ywr
* 鼠标进入
*/
const funMouseDown = (e) => {
  console.log(e);
  (e.target.className.indexOf('can-scroll') === -1) && (xObj.value = e.clientX || e.screenX);
}

/*
* 2023-04-11 13:47:01 Ywr
* 鼠标离开
*/
const funMouseUp = (e) => {
  if (e.target.className.indexOf('can-scroll') === -1) {
    let size = xObj.value - (e.clientX || e.screenX);
    if (size < -10) {
      currentPage.value === 0 ? currentPage.value = switchList.length - 1 : currentPage.value--;
    }
    else if (size > 10) {
      currentPage.value == switchList.length-1 ? currentPage.value = 0 : currentPage.value++;
    }
  }
}
</script>

<style lang="scss">
.introduce {
  background: #1f40aa;

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
        min-width: 156px;
        height: 61px;
        margin-right: 15px;
        padding-right: 20px;
        background: $blue2;
        color: $white;
        font-size: 18px;
        line-height: 27px;
        font-weight: bold;
        // transition: all .1s;

        img {
          width: 32px;
          height: fit-content;
          margin-left: 20px;
          margin-right: 15px;
        }
      }

      .active {
        background: linear-gradient(180deg, $blue3 0%, $blue4 100%);
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
