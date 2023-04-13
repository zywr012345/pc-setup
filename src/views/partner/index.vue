<!--
 Page: index.vue [134445]
 From: 2023-04-04 15:12:34 Ywr
 Remark: 合作伙伴-案例
-->
<template>
  <div class="sn-page homepage" @click="funGoPath">
  </div>
</template>
<script setup>

import { useRouter } from 'vue-router';
const router = useRouter();
const funGoPath = () => {
  router.push({ path: '/partner/introduce' });
}
</script>

<style lang="scss">
.homepage {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('../../../static/partner/index-bg.png');
}
</style>
