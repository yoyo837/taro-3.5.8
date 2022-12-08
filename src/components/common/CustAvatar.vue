<template>
  <div class="mt-5px">
    <AvatarUploader v-bind="$attrs"></AvatarUploader>
    <slot v-if="props.showInfo"></slot>
  </div>
</template>

<script setup>
import AvatarUploader from '@/components/common/AvatarUploader.vue';
const props = defineProps({
  showInfo: {
    type: Boolean,
    default: true,
  },
});
</script>
