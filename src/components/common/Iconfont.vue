<script setup>
const props = defineProps({
  name: String,
  size: Number,
});
</script>

<template>
  <nut-icon
    font-class-name="iconfont"
    class-prefix="icon"
    :name="props.name"
    :size="size"
  />
</template>
