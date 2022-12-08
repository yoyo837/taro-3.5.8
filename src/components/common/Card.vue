<template>
  <div
    v-bind="$attrs"
    :class="`${round ? 'rounded-4px' : ''} ${roundXL ? 'rounded-8px' : ''} ${shadow ? 'shadow-md' : ''} ${
      border ? 'border border-default' : ''
    }`"
  >
    <!-- windicss不支持动态拼接 但可以动态条件 -->
    <div
      v-if="titleText"
      class="p-10px border-b border-default leading-14px flex justify-between"
    >
      <div class="flex items-center">
        <Iconfont
          v-if="titleIcon"
          :type="titleIcon"
        />
        {{ titleText }}
      </div>
      <slot name="rightText" />
    </div>
    <div class="p-10px bg-white rounded-sm">
      <slot />
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  border: Boolean,
  shadow: Boolean,
  titleText: String,
  round: Boolean,
  roundXL: Boolean,
});

const { border, shadow, titleText, round } = toRefs(props);
</script>
