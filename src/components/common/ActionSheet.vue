<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <nut-popup v-bind="$attrs">
      <div
        v-for="action in props.actions"
        :key="action.key"
        class="h-50px leading-50px text-center border-b border-default"
        @click="emit('select', action.key)"
      >
        {{ action.name }}
      </div>
      <div class="h-8px bg-gray"></div>
      <div
        v-if="props.cancelText"
        class="h-50px leading-50px text-center"
        @click="emit('cancel')"
      >
        {{ props.cancelText }}
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'select']);
const props = defineProps({
  actions: {
    type: Array,
    required: true,
    default: () => [],
  },
  cancelText: {
    type: String,
    default: '',
  },
});
</script>
