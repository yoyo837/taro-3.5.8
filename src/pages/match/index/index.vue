<template>
  <PageLayout>
    <div class="h-200px relative">
      <div class="z-10 absolute transform top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div>
          <nut-avatar
            size="large"
            icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          ></nut-avatar>
        </div>
        <div class="text-center text-white text-16px mt-10px mb-12px font-bold">名称</div>
        <div class="text-center text-white text-12px">时间</div>
      </div>
      <image
        class="w-full h-full filter blur-lg"
        src="//camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
    </div>
    <div>
      <nut-tabs v-model="activeTab">
        <nut-tabpane
          title="赛程"
          class="p-0"
        >
          <div
            ref="infoRef"
            :style="{ height: `calc(${infoContainerHeight})` }"
          >
            <div class="flex text-descr text-14px py-14px">
              <div class="mx-10px">全部</div>
              <div class="mx-10px">未开始</div>
              <div class="mx-10px">进行中</div>
              <div class="mx-10px">已结束</div>
            </div>
            <div class="bg-default px-12px py-16px">
              <div class="text-14px text-body">时间阿斯顿</div>
              <MatchInfoCard :card-info="cardInfo"></MatchInfoCard>
              <div class="h-120vh"></div>
            </div>
          </div>
        </nut-tabpane>
        <nut-tabpane
          class="p-0"
          title="排行榜"
        >
          <!-- groupDataId: [100_215], -->
          <ScrollListWrapper
            v-model="rankInfoList"
            list-url="/match/team/squad/versus/getGroupTeamRankList"
            :style="{ height: `calc(${infoContainerHeight})` }"
            :params="{
              competitionRelId: 100_075,
            }"
          >
            <RankInfoCard
              v-for="rankInfo in rankInfoList"
              :key="rankInfo?.groupDataId"
              :rank-info="rankInfo"
            ></RankInfoCard>
          </ScrollListWrapper>
        </nut-tabpane>
      </nut-tabs>
    </div>
    <FixFoot class="h-60px">
      <nut-button type="primary">11</nut-button>
    </FixFoot>
  </PageLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import MatchInfoCard from '@/components/match/MatchInfoCard.vue';
import RankInfoCard from '@/components/match/RankInfoCard.vue';
import usePageMounted from '@/hooks/useOnPageMounted';
import ScrollListWrapper from '@/components/common/ScrollListWrapper.vue';
import { getBoundingClientRectAsync } from '@/utils/utils';

const activeTab = ref('0');
const infoRef = ref();
const infoContainerHeight = ref(``);
const rankInfoList = ref([]);
const cardInfo = reactive({
  title: '111',
  platform: '222',
});

usePageMounted(() => {
  getBoundingClientRectAsync(infoRef.value).then(data => {
    infoContainerHeight.value = `100vh - ${data?.top}px - 60px`;
  });
});
</script>
