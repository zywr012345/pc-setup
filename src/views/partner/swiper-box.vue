<!--
 Page: swiper-box.vue [456094]
 From: 2023-04-11 16:00:19 Ywr
 Remark: 自定义轮播
-->
<template>
  <div class="swiper-my-box" >
    <div class="swiper-my" id="swiper-my"
      :style="{'transform': `translate3d(${cha}px, 0px, 0px)`, 'transition': `all ${transitionTime}ms`}">
      <MedicalUnionSD></MedicalUnionSD>
      <ShanongMap></ShanongMap>
      <cooperative-partner ></cooperative-partner>
      <scientific ></scientific>
      <classic-case ></classic-case>
      <MedicalUnionSD ></MedicalUnionSD>
      <ShanongMap></ShanongMap>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
import ShanongMap from './child/map.vue';
import CooperativePartner from './child/cooperative-partner.vue';
import Scientific from './child/scientific.vue';
import ClassicCase from './child/classic-case.vue';
import MedicalUnionSD from './child/medical-union-sd.vue';

let xObj = ref(0);
let startObj = ref(0);

let oldNum = 5;
let num = oldNum + 2;
let currentIndex = 0;

let transitionTime = ref(0.6);

const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

let cha = ref(0);
cha.value = -width * (currentIndex + 1);

let ka = false;

/*
* 2023-04-11 13:47:21 Ywr
* 鼠标进入
*/
const funMouseDown = (e) => {
  if (e.target.className.indexOf('can-scroll') === -1) {
    ka = true;
    clearInterval(Timer);
    Timer = null;
    transitionTime.value = 0;
    startObj.value  = cha.value;
    if (e.type === 'mousedown') {
      xObj.value = e.clientX || e.screenX;
    }
    else {
      xObj.value = e.changedTouches[0].clientX;
    }
  }
}

const funMouseMove = (e) => {
  if (ka) {
    if (e.type === 'mousemove') {
      cha.value = startObj.value - xObj.value + (e.clientX || e.screenX);
    }
    else {
      cha.value = startObj.value - xObj.value + (e.changedTouches[0].clientX);
    }
  }
}
/*
* 2023-04-11 13:47:01 Ywr
* 鼠标离开
*/
const funMouseUp = (e) => {
  ka = false;
  if (e.target.className.indexOf('can-scroll') === -1) {
    let size;
    if (e.type === 'mouseup') {
      size = xObj.value - (e.pageX || e.screenX);
    }
    else {
      size = xObj.value - (e.changedTouches[0].clientX);
    }
    transitionTime.value = 200;
    if (size < -10) {
      --currentIndex;
      cha.value = -width * (currentIndex + 1);

      if (currentIndex === -1) {
        currentIndex = oldNum - 1;
        setTimeout(() => {
          transitionTime.value = 0;
          cha.value = -width * (currentIndex + 1);
        }, transitionTime.value);
      }
    }
    else if (size > 10) {
      ++currentIndex;
      cha.value = -width * (currentIndex + 1);
      if (currentIndex === oldNum) {
        currentIndex = 0;
        setTimeout(() => {
          transitionTime.value = 0;
          cha.value = -width * (currentIndex + 1);
        }, transitionTime.value);
      }
    }

    play();
  }
}
let Timer;
const play = () => {
  Timer = setInterval(() => {
    const Swiper = document.getElementById('swiper-my');
    console.log(Swiper.getBoundingClientRect());
    currentIndex++;
    transitionTime.value = 200;
    cha.value = -width * (currentIndex);
    if (currentIndex === oldNum + 1) {
      setTimeout(() => {
        currentIndex = 0;
        transitionTime.value = 0;
        cha.value = -width * (currentIndex + 1);
      }, transitionTime.value);
    }
  }, 2000);
}

onMounted(()=> {
  nextTick(() => {
    const Swiper = document.getElementById('swiper-my');
    Swiper.onmousedown = funMouseDown;
    Swiper.onmousemove = funMouseMove;
    Swiper.onmouseup = funMouseUp;
    Swiper.ontouchstart = funMouseDown;
    Swiper.ontouchmove = funMouseMove;
    Swiper.ontouchend = funMouseUp;

    play();
  })
})
</script>

<style lang="scss">
.swiper-my-box {
  width: 100%;
  height: fit-content;

  .swiper-my {
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;

    transition: all .6s;
  }
}
</style>
