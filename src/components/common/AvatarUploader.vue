<template>
  <section>
    <div
      class="my-10px flex flex-col items-center"
      @click="onAvatarClick"
    >
      <image
        class="w-[100px] h-[100px] rounded-[50%] border-4 border-white"
        :src="imgUrl"
        alt="avatar"
      />
      <div
        v-if="showEdit"
        class="text-center text-12px mt-8px"
      >
        更换头像
      </div>
    </div>
    <CustUploader
      ref="singleUploader"
      :auto-upload="currentAction === 2 ? false : true"
      @hide-pop="hidePop"
    >
    </CustUploader>
    <!-- <nut-uploader
      url="xxxx"
      :source-type="['camera']"
      >1111</nut-uploader
    > -->
  </section>
  <ActionSheet
    v-model:visible="isPopShow"
    :actions="actions"
    position="bottom"
    round
    cancel-text="取消"
    @select="onSelect"
    @cancel="hidePop"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import ActionSheet from '@/components/common/ActionSheet.vue';
import CustUploader from '@/components/common/CustUploader.vue';

// import useFetch from '@/hooks/useFetch';

// const { postJSON } = useFetch();
// const emit = defineEmits(['update:modelValue']);

const actions = [
  { name: '选择照片', key: 1 },
  { name: '拍照', key: 2 },
];
const currentAction = ref(1);
const singleUploader = ref();

const props = defineProps({
  showEdit: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
  },
});

const imgUrl = computed(() => props.modelValue);
const isPopShow = ref(false);

const onAvatarClick = () => {
  if (props.showEdit) {
    isPopShow.value = true;
  }
};

const handleShooting = () => {
  singleUploader.value.sourceType = ['camera'];
  currentAction.value = 2;
  singleUploader.value.handleShowSelect();
};

const handleSelectPic = () => {
  currentAction.value = 1;
  singleUploader.value.handleShowSelect();
};

const hidePop = () => {
  isPopShow.value = false;
};

const onSelect = key => {
  if (key === 1) {
    handleSelectPic();
  } else {
    handleShooting();
  }
};
</script>
