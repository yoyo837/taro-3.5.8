<template>
  <PageLayout>
    <div
      class="h-175px px-12px pt-8px flex justify-between text-white font-bold"
      :class="[hasBg ? '' : 'bg-gradient-to-r from-[#b3e7d0] to-[#5fcdb6]']"
      :style="{
        backgroundImage: userInfo.background,
      }"
    >
      <div>
        <div>
          <Iconfont
            class="inline-block text-white"
            color="#fff"
            name="home"
          />
          首页
        </div>
      </div>
      <div>
        <Iconfont
          name="login-acc"
          color="#fff"
          @click="handleChangeBg"
        />
      </div>
    </div>
    <div class="p-12px w-full absolute top-80px">
      <Card shadow>
        <CustAvatar
          v-model="userInfo.memberInfo.avatar"
          show-info
        >
          <div class="text-18px text-title text-center">
            {{ userInfo.memberInfo.realName }}/{{ userInfo.memberInfo.mobile }}
          </div>
          <div class="flex">
            <div
              v-for="g in filterGrid"
              :key="g.to"
              class="flex-1 text-center"
            >
              <PageLink :url="g.to">
                <Iconfont name="login-acc" />
                <div class="text-14px">{{ g.name }}</div>
              </PageLink>
            </div>
          </div>
        </CustAvatar>
        <!-- <Grid>
          <GridItem
            v-for="grid in userGrid"
            :key="grid.to"
            :to="`/user/${grid.to}`"
          >
            <div class="flex flex-col items-center">
              <i
                class="iconfont"
                :class="grid.icon"
              ></i>
              <div>{{ grid.name }}</div>
            </div>
          </GridItem>
        </Grid> -->
      </Card>
      <div class="mt-10px">
        <!-- <Cell
          title="我的账户"
          is-link
          :to="'/user/account'"
        /> -->
      </div>
      <!-- <CellGroup class="mt-10">
        <Cell
          v-for="menu in userMenus"
          :key="menu.to"
          :title="menu.name"
          :to="menu.to"
          is-link
        >
          <template #icon>
            <Iconfont :type="menu.icon" />
          </template>
        </Cell>
      </CellGroup>
      <Uplaoder
        ref="uploadRef"
        v-model="fileList"
        :type="1"
        :preview-image="false"
        :only-upload="true"
      /> -->
    </div>
  </PageLayout>
</template>

<script setup>
import { reactive, computed, ref, watch, inject } from 'vue';
import Iconfont from '@/components/common/Iconfont.vue';
import Card from '@/components/common/Card.vue';
import useOnPageMounted from '@/hooks/useOnPageMounted';
import useFetch from '@/hooks/useFetch';
import CustAvatar from '@/components/common/CustAvatar.vue';

const { get, post } = useFetch();

const { isAvailableMenu } = inject('$srvInfo');
const fileList = ref([]);
const uploadRef = ref();
const userInfo = reactive({
  background: '',
  memberInfo: {},
  roles: [],
});

const userGrid = [
  {
    name: '账户',
    icon: 'icon-pt-home',
    to: '/user/account',
    auth: 'user_my_account',
  },
  {
    name: '卡券',
    icon: 'icon-pt-home',
    to: '/user/pubservice',
    auth: 'user_my_card',
  },
  {
    name: '积分',
    icon: 'icon-pt-home',
    to: '/user/integral',
    auth: 'user_my_integral',
  },
  {
    name: '签到',
    icon: 'icon-pt-home',
    to: '/user/sign',
    auth: 'user_my_signIn',
  },
];

// 菜单
// const userMenus = [
//   {
//     name: '我的订单',
//     icon: 'icon-pt-home',
//     to: '/order',
//     auth: 'user_my_deal',
//   },
//   {
//     name: '我的团队',
//     icon: 'icon-pt-home',
//     to: '/team',
//     auth: 'user_my_team',
//   },
//   {
//     name: '我的活动',
//     icon: 'icon-pt-home',
//     to: '/event',
//     auth: 'user_my_event',
//   },
//   {
//     name: '我的考试',
//     icon: 'icon-pt-home',
//     to: '/exam/my',
//     auth: 'user_my_exam',
//   },
//   {
//     name: '反馈',
//     icon: 'icon-pt-home',
//     to: '/user/feedback',
//     auth: 'user_my_feedback',
//   },
//   {
//     name: '设置',
//     icon: 'icon-pt-home',
//     to: '/user/setting',
//     auth: 'user_my_setting',
//   },
// ];

const hasBg = computed(() => userInfo.background.length > 5);
const filterGrid = computed(() => userGrid.filter(g => !isAvailableMenu(g.auth)));
// const filterMenus = computed(() => userMenus.filter(g => !isAvailableMenu(g.auth)));

const handleChangeBg = () => {
  uploadRef.value.chooseFile();
};

watch(fileList, val => {
  post('/memberCenter/updateBackground', { fileKey: val[val.length - 1].fileKey }).then(res => {
    console.log(res);
  });
});

useOnPageMounted(() => {
  get('/memberCenter/getMyInfo').then(res => {
    Object.assign(userInfo, { ...res, background: `url('//cdnstatic.ydmap.cn/images/female.png')` });
  });
});
</script>
