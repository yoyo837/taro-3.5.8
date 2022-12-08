<script setup>
import { inject, reactive, ref } from 'vue';
import SrvTag from '@/components/SrvTag/index.vue';
import { checkMobile } from '@/utils/validator';
import { redirectTo, RSAEncrypt } from '@/utils/utils';
import useFetch from '@/hooks/useFetch';
import useRoute from '@/hooks/useRoute';
import styles from './index.module.scss';

const form = ref({});
const formRef = ref();
const verifyComp = ref();

const pageData = reactive({
  smsMode: false,
});

const srvInfo = inject('$srvInfo');
const { $webStore, $webStoreKey } = inject('$global');
const { postJSON } = useFetch();
const route = useRoute();

const toLogin = async () => {
  const { validate } = formRef.value;
  const { valid } = await validate();
  if (!valid) {
    return;
  }
  verifyComp.value.open();
};

function confirm(verifyResult) {
  postJSON('/pub/auth/login/mobilePwd', {
    mobile: RSAEncrypt(form.value.mobile),
    pwd: RSAEncrypt(form.value.password),
    neValid: verifyResult,
  }).then(data => {
    const { accessToken } = data || {};
    if (accessToken) {
      $webStore.appStore.put($webStoreKey.accessToken, accessToken);
    } else {
      alert('未能正确响应用户token');
    }
    const targetUrl = route.query.redirectURL || `/user/my`;
    redirectTo({
      url: targetUrl,
    });
  });
}

function switchSmsLogin() {
  pageData.smsMode = !pageData.smsMode;
  form.value = {};
}

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
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
};
</script>

<template>
  <PageLayout>
    <view :class="styles.container">
      <view
        class="flex justify-between content-center"
        :class="styles.greetings"
      >
        <text :class="styles.say">您好，请登录</text>
        <PageLink url="/user/register">
          <text :class="styles.toReg">
            <text>去注册</text>
            <Iconfont
              name="youfu"
              :size="22"
            />
          </text>
        </PageLink>
      </view>
      <view>
        <nut-form
          ref="formRef"
          :model-value="form"
          :rules="formRules"
          :class="styles.form"
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
        </nut-form>
        <view class="flex justify-between content-center text-xs mt-2">
          <PageLink url="/user/forgot">
            <view>忘记密码</view>
          </PageLink>
          <!-- // 0=手机密码,1=验证码,2=微信 -->
          <template v-if="srvInfo.loginTypes?.includes(1)">
            <view
              class="text-xs"
              @click="switchSmsLogin"
            >
              {{ pageData.smsMode ? '账号密码登陆' : '短信登陆' }}
            </view>
          </template>
        </view>
        <nut-button
          class="mt-5"
          type="primary"
          size="large"
          block
          @click="toLogin"
        >
          马上登陆
        </nut-button>
        <NeVerify
          ref="verifyComp"
          @confirm="confirm"
        >
        </NeVerify>
      </view>
    </view>
    <SrvTag>
      {{ srvInfo.srvName }}
    </SrvTag>
  </PageLayout>
</template>
