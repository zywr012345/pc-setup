<template>
	<div class="wc-slide" @click="clickHandler">
		<slot/>
	</div>
</template>

<script name="mySlide"></script>
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(["click"]);

const click = () => {
  emit('click');
}
</script>

<style lang="scss">
.wc-slide {
	height: 100%;
  width: 100%;
  flex-shrink: 0;
  z-index: 10;
  /* 遇见过一次图片宽度很宽超过 slide 导致下一个 slide 也会有这个图片 */
  overflow: hidden;

  img {
    /* pc 端干掉图片的默认拖动效果 */
    -webkit-user-drag: none;
  }
}
</style>