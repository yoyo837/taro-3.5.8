<template>
  <!-- <PageLayout> -->
  <div>
    <nut-tabs v-model="activeTab">
      <nut-tabpane
        title="待执裁"
        class="p-0"
      >
        <!-- <MatchInfoCard :card-info="cardInfo"></MatchInfoCard> -->
      </nut-tabpane>
      <nut-tabpane
        class="p-0"
        title="已完成"
      >
        <!-- groupDataId: [100_215], -->
        <!-- <ScrollListWrapper
          v-model="rankInfoList"
          list-url="/match/team/squad/versus/getGroupTeamRankList"
          :style="{ height: `calc(${infoContainerHeight})` }"
          :params="{
            competitionRelId: 100_075,
          }"
        >
        </ScrollListWrapper> -->
      </nut-tabpane>
    </nut-tabs>
  </div>
  <!-- </PageLayout> -->
</template>

<script setup>
import { ref } from 'vue';
// import MatchInfoCard from '@/components/match/MatchInfoCard.vue';
import usePageMounted from '@/hooks/useOnPageMounted';
// import ScrollListWrapper from '@/components/common/ScrollListWrapper.vue';
import { getBoundingClientRectAsync } from '@/utils/utils';

const activeTab = ref('0');
const infoRef = ref();
const infoContainerHeight = ref(``);
// const rankInfoList = ref([]);

usePageMounted(() => {
  getBoundingClientRectAsync(infoRef.value).then(data => {
    infoContainerHeight.value = `100vh - ${data?.top}px`;
  });
});
</script>
