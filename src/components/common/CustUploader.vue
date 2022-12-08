<template>
  <div>
    <!-- 默认post参数名file 通过name属性修改 data是额外参数 -->
    <nut-uploader
      id="uploader"
      ref="uploader"
      v-bind="$attrs"
      :url="computedUrl"
      :headers="computedheader"
      :data="computedData"
      @change="handleUploadChange"
      @failure="handleUploadFail"
      @success="handleUploadSuccess"
    >
      <!-- 空Span为覆盖样式 -->
      <span v-if="props.isPost"></span>
    </nut-uploader>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { appStore } from '@/utils/store';
import { alert } from '@/utils/popup';
import useRoute from '@/hooks/useRoute';

const { getIsomorphismUrl } = inject('$global');

const uploader = ref();
const {
  query: { srvId },
} = useRoute();

const emit = defineEmits(['hidePop']);

const props = defineProps({
  // 1图片 2文件 14视频
  type: {
    type: Number,
    default: 1,
  },
  isImg: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '/pub/file/uploadFile',
  },
});

const computedData = computed(() => {
  return props.isImg ? { fileType: props.type } : {};
});

const computedUrl = computed(() => {
  // 判断下 小程序走全路径
  return getIsomorphismUrl(`/srv${srvId}/api${props.url}`);
});

const computedheader = computed(() => {
  return {
    'Access-Token': appStore.get(`Access-Token`),
  };
});

const handleUploadChange = (fileList, event) => {
  console.log(fileList, event);
};

const handleUploadFail = (data, option, fileItem) => {
  console.log(option, fileItem);
  const d = JSON.parse(data.data);
  alert(d.msg);
  emit('hidePop');
};

const handleUploadSuccess = (data, option, fileItem) => {
  console.log(data, option, fileItem);
};

const handleShowSelect = () => {
  console.log(uploader.value);
  uploader.value.chooseImage();
};

defineExpose({ handleShowSelect });
</script>
