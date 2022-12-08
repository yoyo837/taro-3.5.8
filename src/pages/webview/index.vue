<script setup>
import useRoute from '@/hooks/useRoute';
const route = useRoute();
const { url } = route.query;
</script>

<template>
  <web-view
    v-if="url"
    :src="url"
  ></web-view>
  <view
    v-else
    class="py-8 text-center"
  >
    <nut-icon name="loading"></nut-icon>
  </view>
</template>
