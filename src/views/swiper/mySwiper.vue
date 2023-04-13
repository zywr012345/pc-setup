<style lang="scss">
.wc-swiper-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.wc-default-swiper-box {
  height: 100%;
  width: 100%;
  display: flex;
}
// 分页
.wc-pagination {
	position: absolute;
	bottom: 10px;
	height: 18px;
	width: 100%;
	background: transparent;
	display: flex;
	align-items:center;
	justify-content: center;
	.wc-dot {
		height: 8px;
		width: 8px;
		background: #000;
		opacity: 0.2;
		margin: 0 5px;
		border-radius: 50%;
	}
	.wc-dot-active {
		opacity: 1;
		background: #3498db;
	}
}
</style>

<template>
  <div class="wc-swiper-container" @touchmove="fn">
      <div class="wc-default-swiper-box" :class="box" @transitionend="transitionend" @touchstart="s" @touchmove="m" @touchend="e" @mousedown="s" @mousemove="m" @mouseup="e">
    <slot/>
      </div>

      <slot name="pagination">
        <!-- 默认提供了一个 pagination -->
    <div class="wc-pagination" v-if="pagination">
      <div class="wc-dot" v-for="(value, key) in reallySlidesNumber" :key="key" :class="{'wc-dot-active': currentSlide== key}">
      </div>
    </div>
      </slot>
      <!-- 这两个就不默认提供了 -->
      <slot name="arrowLeft"/>
      <slot name="arrowRight"/>

      <!-- 当你需要在全局的内容里面加一些玩意的时候 -->
      <slot name="g"/>
  </div>
</template>

<script name="mySwiper"></script>
<script setup>
import { reactive, ref, onMounted, defineProps, defineEmits, defineExpose  } from 'vue';

function toArray(arraylike) {
  return Array.prototype.slice.call(arraylike);
}
const emit = defineEmits(["transitionend"]);

const props = defineProps( {
  /*一次滑动的默认时间*/
  duration: {
    default: 500
  },
  /*两次滑动的间隔时间*/
  interval: {
    default: 2500
  },
  /*是否自动播放*/
  autoplay: {
    default: true
  },
  /*用户滑动多少距离, 翻页*/
  therehold: {
    default: 110
  },
  defaultSlide: {
    default: 0
  },
  pagination: {
    default: true
  },
  /* 有时候全屏滚动, 的确想要禁用垂直方向的滚动的时候 */
  vLock: {
    type: Boolean,
    required: false, //是否必传
    default: false
  }
});

let swiper = null
let swiperWidth = 0;
let slides = null;
let slidesNumber = 0;
let reallySlidesNumber = ref(0);
let currentSlide = 0;
let timer = null;
let userDuration = 200;
let pos = {
  startX: 0,
  moveX: 0,
  endX: 0,
  local: 0,
  distance: 0
};
let moving = false;
let unlock = false;
let activeId = '';
let mousedown = false;
let isOnly = false;


let box = ref('');

onMounted(() =>{
  box.value = 'wc-swiper-box-' + Math.random().toFixed(2)*1000;
  setTimeout(()=>{
    /*初始化的时候, 拿到所有的 DOM 元素以及相关属性*/
    initElement();

    if (isOnly) {
      return;
    }
    /*克隆两个节点, 用来实现 loop 效果*/
    cloneSlide();
    /*克隆结束之后, 需要设置默认显示的slide*/
    setDefaultSlide();
    /*
      ## start
      设置默认slide之后, 就需要开始设置定时器, 自动轮播
    */
    if (props.autoplay) {
      play();
    }

  }, 100);
})

/*阻止容器的上下滚动, 并且只有在水平方向上面滚动超过 10px 才可以阻止 */
function fn (e) {
  if (props.vLock || Math.abs(pos.startX - pos.moveX) > 10) {
    e.preventDefault();
  }
};

/*滑动到指定的页面*/
const slideTo = (index) => {
  if (!moving) {
    let currentSlide = Math.round(Math.abs(left())/swiperWidth);
    /* 如果索引值不合法 或者和目前的值相等 */
    if (index > slidesNumber - 2 - 1 || index < 0 || currentSlide == index + 1) {
      return;
    }
    moving = true;
    clearTimeout(timer);
    /*
      说明要往右边滑动
      注意这里不管需要滑动多少个, duration 都是 300, 这个如果需要, 可以
      自己根据起点/终点计算出一个合适的值.
    */
    transitionDuration(300);

    translateX(-swiperWidth * (index + 1));
  }
};
function next () {
  if (!moving) {
    clearTimeout(timer);
    moving = true;
    transitionDuration(userDuration)
    translateX(left() - swiperWidth);
  }
};
function previous () {
  if (!moving) {
    clearTimeout(timer);
    moving = true;
    transitionDuration(userDuration)
    translateX(left() + swiperWidth);
  }
};
function initElement () {
  /* 因为传递过来的是个字符串, 所以要手动加点 */
  swiper = document.querySelector('.' + box.value);
  swiperWidth = swiper.clientWidth;
  slides = toArray(swiper.children);
  slidesNumber = slides.length;
  /*实际的 slide 个数, 因为 slidesNumber 会在后面重新赋值*/
  reallySlidesNumber.value = slides.length;

  /* 如果就仅仅只有一个 slide, 那么不克隆, 不绑定, 就纯展示就可以了 */

  if ( reallySlidesNumber.value === 1) {
    isOnly = true;
  }

};
function cloneSlide () {
  let head = slides[0].cloneNode(slides[0], true);
  let tail = slides[slidesNumber - 1].cloneNode(slides[slidesNumber-1], true);
  swiper.appendChild(head);
  swiper.insertBefore(tail, slides[0]);
  /*克隆节点之后, 需要重置一些属性*/
  slides = toArray(swiper.children);
  slidesNumber = slides.length;
};
/* 根据用户给定的 props.defaultSlide 设置 init slide 的值 */
function setDefaultSlide () {

  /*
    一切用户给定的值, 都是从 0 - x 开始, 比如用户数据里面有 6个数据
    那么给定的就是 0 - 5
    但是我们内部运算的时候, 实际上我们的索引能到 0 - 7
    0 是实际的 5 的拷贝, 7 实际上是实际的0的拷贝
    所以当用户给定的 props.defaultSlide =0, 我们实际上是要让展示内部索引为 1 的元素

  */

  /* 如果用户设置了一个非法值, 直接抛出异常*/
  if (props.defaultSlide < 0 || props.defaultSlide > slidesNumber - 2 - 1) {
    throw new Error('[wc-swiper:Error]: You have set a wrong props.defaultSlide value with props.defaultSlide = ' + props.defaultSlide);
  }
  translateX(-swiperWidth * (props.defaultSlide + 1));
  //
  // currentSlide = props.defaultSlide;
};
/*
  ## start
*/
function play () {
  timer = setTimeout(()=>{
    clearTimeout(timer);
    moving = true;
    unlock = false;
    transitionDuration(props.duration);
    translateX(- (swiperWidth + Math.abs(left())));
  }, props.interval);
};
function transitionend () {
  transitionDuration(0);

  /*
    一次滑动结束之后, 通过计算, 实际上我们可以拿到当前处于内部索引的第几个 slide
    拿到这个 currentSlide 我们就知道当前是不是滚动到最后一个了
  */
  let currentSlide = Math.round(Math.abs(left())/swiperWidth);

  currentSlide = currentSlide - 1;
  /* 如果滚动到最后一个, 那么就要瞬间跳转一下, 到外部看起来的第一个, 内部的*/
  if (currentSlide == slidesNumber - 1) {

    translateX(-swiperWidth);
    currentSlide = 0;

  }
  if (currentSlide == 0) {
    translateX(-swiperWidth * (slidesNumber - 2))
    currentSlide = slidesNumber - 3;
  }

  emit('transitionend', currentSlide);
  /*
    防止极限操作, 用户在滑动结束之后事件还没发送出去又滑动导致计算
    结果错误, 所以等事件发出去之后再解开
  */
  moving = false;
  /*
    ##start
  */
  if (props.autoplay) {
    play();
  }
};
/*toushstart handler*/
function s (e) {
  if (isOnly) {
    return;
  }

  if (e.type === 'mousedown' && !moving) {
    mousedown = true;
    pos.startX = e.pageX;
    pos.local = left();
    clearTimeout(timer);
    transitionDuration(0);
  } else{
    activeId = toArray(e.changedTouches)[0].identifier;
    if (!moving) {
      let active = e.touches.length - 1;
      clearTimeout(timer);
      transitionDuration(0);
      unlock = true;
      pos.startX = e.touches[active].clientX;
      /* 一次 touch 的 起始local 点, 是固定的 */
      pos.local = left();
    }
  }
};
/*toushmove handler*/
function m (e) {

  if (isOnly) {
    return;
  }

  if (e.type === 'mousemove' && mousedown && !moving) {
    pos.moveX = e.pageX;
    pos.distance = pos.moveX - pos.startX;
    translateX(pos.local + pos.distance);
  } else {
    if (!moving && unlock) {
      let active = e.touches.length - 1;
      pos.moveX = e.touches[active].clientX;
      pos.distance = pos.moveX - pos.startX;
      translateX(pos.local + pos.distance);
    }
  }
};
/*toushend handler*/
function e (e) {

  if (isOnly) {
    return;
  }

  if (e.type === 'mouseup' && mousedown && !moving) {
    mousedown = false;
    pos.endX = e.pageX;
    pos.distance = pos.endX - pos.startX;
    recover();
  } else {
    let curId = toArray(e.changedTouches)[0].identifier;
    if (!moving && unlock && (curId == activeId)) {
      unlock = false;
      pos.endX = e.changedTouches[0].clientX;
      pos.distance = pos.endX - pos.startX;
      recover();
    }
  }
};
/*响应用户滚动行为*/
function recover () {
  transitionDuration(userDuration);
  let distance = Math.abs(left()) % swiperWidth;
  let point = [];
  let direction = ''
  /*
    主要是为了拿到当前状态下面, swiper 距离正常状态的, 左右移动的距离分别是多少. 
  */
  if (left() > 0) {
    point = [distance, swiperWidth - distance];
  } else {
    point = [swiperWidth - distance, distance];
  }
  if (pos.distance > 0) {
    direction = 'to-right';
  } else if (pos.distance < 0){
    direction = 'to-left';
  } else {
    direction = 'none';
  }
  if (direction == 'none') {
    if (props.autoplay) {
      play();
    }
  }
  if (direction === 'to-right') {
    moving = true;
    /*说明需要向右边移动*/
    if (point[0] > props.therehold) {
      translateX(left() + point[1]);
      let next = (left() + point[1]) / swiperWidth;
      if (Math.abs(next) === 0) {
        unlock = false;
      }
    } else {
      translateX(left() - point[0]);
    }
  }
  if (direction === 'to-left') {
    moving = true;
    if (point[1] > props.therehold) {
      translateX(left() - point[0]);
      let next = (left() - point[0]) / swiperWidth;
      if (Math.abs(next) === slidesNumber - 1) {
        unlock = false;
      }
    } else {
      translateX(left() + point[1]);
    }
  }
};
function translateX (value) {
  swiper.style.transform = 'translate3d(' + value + 'px, 0, 0)';
};
function transitionDuration (ms) {
  swiper.style.transitionDuration = ms + 'ms';
};
function left () {
  return swiper.getBoundingClientRect().left;
};

defineExpose({slideTo})
</script>