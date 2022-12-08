<script setup>
import amapFile from '@/libs/amap/amap-wx';
// amapFile api 在这里 https://developer.amap.com/api/wx/reference/core
import { CDN_STATIC_HOST, isNumber } from '@/utils/utils';
import { reactive, onMounted } from 'vue';
import styles from './index.weapp.module.scss';

const props = defineProps({
  lat: Number,
  lng: Number,
  height: [String, Number],
});

const isOk = isNumber(props.lat) && isNumber(props.lng);

const pageData = reactive({
  markers: [
    {
      latitude: props.lat,
      longitude: props.lng,
    },
  ],
  address: {},
});

const myAmapFun = new amapFile.AMapWX({ key: 'e8c333b1a051a9d0daf976aa3b663a99' });

onMounted(() => {
  myAmapFun.getRegeo({
    iconPath: `https:${CDN_STATIC_HOST}/images/portal/mark_bsx-h.png`,
    iconWidth: 74,
    iconHeight: 128,
    success(list) {
      const { name, desc } = list[0] || {};
      pageData.address = {
        name,
        desc,
      };
    },
    fail(info) {
      const { errCode, errMsg } = info || {};
      pageData.address = {
        name: 'Regeo失败',
        desc: `${errCode}:${errMsg}`,
      };
    },
  });
});
</script>

<template>
  <view
    :class="styles.mapWrapper"
    :style="`height: ${props.height}`"
  >
    <view
      v-if="isOk"
      class="map_container"
      :class="styles.mapContainer"
    >
      <map
        id="map"
        :class="styles.map"
        :longitude="props.lng"
        :latitude="props.lat"
        :scale="14"
        :show-location="true"
        :markers="pageData.markers"
        bindmarkertap="makertap"
      ></map>
    </view>
    <view :class="styles.mapText">
      <text :class="styles.h1">{{ pageData.address.name }}</text>
      <text>{{ pageData.address.desc }}</text>
    </view>
  </view>
</template>
