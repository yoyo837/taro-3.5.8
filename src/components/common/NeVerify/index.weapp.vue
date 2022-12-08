<script setup>
import { ref } from 'vue';
import { getCurrentInstance } from '@tarojs/taro';

const getNeCaptchaConfig = () => {};
const { page } = getCurrentInstance();

const domId = 'ne-captcha';
const emit = defineEmits(['confirm']);
const props = defineProps({
  index: Number,
  // 是否表单模式
  formMode: Boolean,
});
// 防重复点击阻断标记
const block = ref();
const { captchaId } = getNeCaptchaConfig(props.index);

function open() {
  if (block.value) {
    alert('正在初始化验证，请勿重复操作');
    return;
  }
  const ins = page.selectComponent(`#${domId}`);
  ins.popup();
}

function handleCaptchaVerify(ev) {
  const [err, validate] = ev.detail;
  // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
  if (err) {
    return;
  } // 停顿一下等动画结束

  setTimeout(() => {
    if (props.formMode) {
      // eslint-disable-next-line no-console
      console.log('拼图验证,表单模式待完成');
      return;
    }
    emit('confirm', {
      validate,
      // 先写死, 后面去掉
      neValidType: 1,
    });
  }, 500);
}

defineExpose({
  open,
});
</script>

<template>
  <ne-captcha
    :id="domId"
    :captcha-id="captchaId"
    width="640rpx"
    @verify="handleCaptchaVerify"
  >
  </ne-captcha>
</template>
