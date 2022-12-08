<template>
  <div>{{ info.title }}</div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  cardInfo: {
    type: Object,
    require: true,
  },
});

const info = reactive(props.cardInfo);

// const activeTab = ref('0');
// const filterInfo = reactive({
//   options: [
//     { text: '全部商品', value: 0 },
//     { text: '新款商品', value: 1 },
//     { text: '活动商品', value: 2 },
//   ],
//   value: 0,
// });
</script>
