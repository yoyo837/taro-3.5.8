<script setup>
import { setNavigationBarColor } from '@tarojs/taro';
import { inject, watch } from 'vue';
import style from './index.module.scss';

const hex = () => {}
const blackOrWhite = hex;

const props = defineProps({
  bgColor: [String, Boolean],
  title: null,
});

const { $updatePageTitle } = inject('$global');

watch(
  props,
  val => {
    const title = val.title?.value?.toString();
    if (title != null) {
      $updatePageTitle(title);
    }
    const useBgColor = val.bgColor || '#ffffff';
    setNavigationBarColor({
      backgroundColor: hex(useBgColor).toLowerCase(),
      frontColor: blackOrWhite(useBgColor).toLowerCase(),
    });
  },
  {
    immediate: true,
  }
);

const srvInfo = inject('$srvInfo');
</script>

<template>
  <view
    class="fixed-width"
    :class="style.pageLayout"
    :style="`backgroundColor: ${props.bgColor === true ? 'var(--default-bg-color)' : props.bgColor}`"
  >
    <slot v-if="srvInfo.srvState > 0"></slot>
    <AccessLoadingHolder v-else-if="srvInfo.srvState === 0" />
    <view
      v-else
      class="py-8 text-center"
    >
      暂未开通业务
    </view>
  </view>
</template>
