<template>
  <PageLayout>
    <div class="h-90px px-15px py-10px border-b border-default">
      <div class="text-title text-18px">title</div>
      <div class="text-body">name</div>
      <div class="flex justify-between">
        <div class="text-body">time</div>
        <div class="text-main w-100px text-center border-l border-default">活动详情</div>
      </div>
    </div>
    <div>
      <nut-tabs v-model="activeTab">
        <nut-tabpane
          title="报名人员"
          class="p-20px bg-default"
        >
          <Card
            title-text="成员"
            class="bg-white"
            shadow
            border
          >
            <div>body</div>
          </Card>
        </nut-tabpane>
        <nut-tabpane
          class="p-0"
          title="参赛选手"
        >
          <div>2</div>
        </nut-tabpane>
        <nut-tabpane
          title="活动相册"
          class="p-0"
        >
          <div>3</div>
        </nut-tabpane>
        <nut-tabpane
          class="p-0"
          title="名单认证"
        >
          <div>4</div>
        </nut-tabpane>
      </nut-tabs>
    </div>
    <FixFoot class="h-60px">
      <nut-button type="primary">11</nut-button>
    </FixFoot>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue';
// import MatchInfoCard from '@/components/match/MatchInfoCard.vue';
// import RankInfoCard from '@/components/match/RankInfoCard.vue';
import usePageMounted from '@/hooks/useOnPageMounted';
// import ScrollListWrapper from '@/components/common/ScrollListWrapper.vue';
import { getBoundingClientRectAsync } from '@/utils/utils';

const activeTab = ref('0');
const infoRef = ref();
const infoContainerHeight = ref(``);
// const rankInfoList = ref([]);

usePageMounted(() => {
  getBoundingClientRectAsync(infoRef.value).then(data => {
    infoContainerHeight.value = `100vh - ${data?.top}px - 60px`;
  });
});
</script>
