<template>
  <div :class="`fixed bottom-0 w-full max-w-3xl px-12px flex items-center ${border ? 'shadow-sm' : ''}`">
    <slot />
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  border: {
    type: Boolean,
    default: true,
  },
});

const { border } = toRefs(props);
// windicss 要别处使用过对应的 h-${height} 等拼装类 才能动态使用 最好直接外层class控制
</script>
