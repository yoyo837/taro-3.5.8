<script setup>
import { ref, watch } from 'vue';
import { nextTick } from '@tarojs/taro';
import { alert } from '@/utils/popup';

const popUpNeCaptcha = () => {};

const props = defineProps({
  group: String,
  scene: String,
  index: {
    default: 1,
    type: Number,
  },
  modelValue: String,
  // 是否表单模式
  formMode: Boolean,
});

const emit = defineEmits(['confirm', 'update:modelValue']);
const smsCode = ref('');
const domId = 'ne-captcha';
// 防重复点击阻断标记
const block = ref();
function open() {
  if (block.value) {
    alert('正在初始化验证，请勿重复操作');
    return;
  }
  block.value = true;
  nextTick(async () => {
    let data;
    try {
      data = await popUpNeCaptcha(domId, {
        group: props.group,
        scene: props.scene,
        captchaStyleIndex: props.index,
        onClose: ins => {
          block.value = false;
          ins?.destroy();
        },
      });
    } catch (err) {
      block.value = false;
      // eslint-disable-next-line no-console
      console.warn(err);
      alert('网络异常，请重试');
      return;
    }
    if (props.formMode) {
      // eslint-disable-next-line no-console
      console.log('拼图验证,表单模式待完成');
      return;
    }
    const { validate } = data;
    emit('confirm', {
      validate,
      // 先写死, 后面去掉
      neValidType: 1,
    });
    // FIXME: 表单模式的其他逻辑
    // await this.$http.post(this.url || '/commonSms/send.do', {
    //   ...this.params,
    //   mobile: this.ignoreMobile ? null : this.codeKey,
    //   actionCode: this.action,
    //   ...data,
    // });
    // alert('发送成功，请注意查收');
    // this.smsCode = '';
    // this.disBtn();
    // // 自动 close
    // // this.close();
    // this.focus();
  });
}

watch(smsCode, val => {
  emit('update:modelValue', val);
});

defineExpose({
  open,
});
</script>

<template>
  <view :id="domId"></view>
  <template v-if="formMode">
    <nut-input
      v-model="smsCode"
      font-class-name="iconfont"
      class-prefix="icon"
      left-icon="login-pwd"
      placeholder="请输入短信验证码"
      center
    >
      <template #button>
        <!-- TODO 倒计时&验证码 -->
        <nut-button
          size="small"
          type="primary"
          >获取验证码
        </nut-button>
      </template>
    </nut-input>
  </template>
</template>

<style lang="scss">
.yidun--popup {
  // 容器padding 15, 距离屏幕边界15
  // 强行覆盖style效果
  width: calc(100vw - 30px - 30px) !important;
  max-width: 640px !important;
}
</style>
