<script setup>
import { ref } from 'vue';
import useRouter from '@/hooks/useRouter';
import { checkMobile } from '@/utils/validator';

// import { navigateTo } from '@/utils/utils';
// import styles from './index.module.scss';
// import useFetch from '@/hooks/useFetch';
// import useOnPageMounted from '@/hooks/useOnPageMounted';
const { back } = useRouter();
const form = ref({});
const formRef = ref();
const formRules = {
  mobile: [
    {
      required: true,
      message: '请输入您的手机号',
    },
    {
      min: 11,
      max: 11,
      message: '请输入合法的手机号码',
      validator: checkMobile,
    },
  ],
  smsCode: [
    {
      required: true,
      message: '请输入验证码',
    },
    {
      min: 6,
      max: 6,
      message: '请输入正确验证码',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入新密码',
    },
  ],
  newpassword: [
    {
      required: true,
      message: '请确认新密码',
    },
  ],
};
// const { get } = useFetch();

// useOnPageMounted(() => {

// });

const handleSubmit = async () => {
  const { validate } = formRef.value;
  const { valid } = await validate();
  if (!valid) {
    return;
  }
  console.log(form.value);
};
</script>

<template>
  <PageLayout>
    <div class="pt-40px px-12px flex justify-between">
      <div class="text-24px text-default font-bold">找回密码</div>
      <div
        class="text-18px text-main font-bold leading-24px"
        @click="back()"
      >
        去登录
      </div>
    </div>
    <div class="px-15px">
      <nut-form
        ref="formRef"
        :model-value="form"
        :rules="formRules"
      >
        <nut-form-item
          prop="mobile"
          class="p-0"
        >
          <nut-input
            v-model="form.mobile"
            font-class-name="iconfont"
            class-prefix="icon"
            left-icon="login-acc"
            pattern="[0-9]*"
            placeholder="请输入手机号"
          />
        </nut-form-item>
        <nut-form-item
          prop="smsCode"
          class="p-0"
        >
          <NeVerify
            ref="verifyComp"
            v-model="form.smsCode"
            form-mode
          >
          </NeVerify>
        </nut-form-item>
        <nut-form-item
          prop="password"
          class="p-0"
        >
          <nut-input
            v-model="form.password"
            font-class-name="iconfont"
            class-prefix="icon"
            left-icon="login-pwd"
            placeholder="请收入密码"
          />
        </nut-form-item>
        <nut-form-item
          prop="password"
          class="p-0"
        >
          <nut-input
            v-model="form.newpassword"
            font-class-name="iconfont"
            class-prefix="icon"
            left-icon="login-pwd"
            placeholder="请收入密码"
          />
        </nut-form-item>
      </nut-form>
      <nut-button
        class="mt-5"
        type="primary"
        size="large"
        block
        @click="handleSubmit"
      >
        马上登陆
      </nut-button>
    </div>
  </PageLayout>
</template>
