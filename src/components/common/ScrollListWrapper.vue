<template>
  <scroll-view
    :scroll-y="true"
    v-bind="$attrs"
    :lower-threshold="100"
    @scrolltolower="lower"
  >
    <slot></slot>
    <div
      v-if="isLoading"
      class="w-full text-12px text-descr flex justify-center items-center"
    >
      <nut-icon name="loading"></nut-icon>加载中
    </div>
    <div
      v-if="isDone"
      class="w-full text-12px text-descr text-center my-8px"
    >
      {{ finishedText }}
    </div>
  </scroll-view>
</template>

<script setup>
import { toRefs, onMounted, ref } from 'vue';
import useFetch from '@/hooks/useFetch';

const { get } = useFetch();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  listUrl: {
    type: String,
    required: true,
  },
  params: Object,
  pageSize: {
    type: Number,
    default: 10,
  },
  finishedText: {
    type: String,
    default: '没有啦~',
  },
});

const isDone = ref(false);
const isLoading = ref(true);
// const count = ref(0);
// eslint-disable-next-line no-unused-vars
const pageInfo = ref({
  page: 0,
  total: 0,
});

const lower = () => {
  if (isDone.value) return;
  loadListData();
};

// eslint-disable-next-line no-unused-vars
const { modelValue, listUrl, pageSize, finishedText, params } = toRefs(props);

const loadListData = () => {
  isLoading.value = true;
  get(listUrl.value, {
    page: pageInfo.value.page + 1,
    pageSize: pageSize.value,
    ...params.value,
  })
    .then(data => {
      pageInfo.value = {
        page: data.page || 1,
        totla: data.total || 0,
      };
      // 这里可能放非rows的 列表数据
      const d = data.rows ?? data;
      emit('update:modelValue', [...modelValue.value, ...d]);
      if (!data.total) {
        isDone.value = true;
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onMounted(() => {
  loadListData();
});
</script>
