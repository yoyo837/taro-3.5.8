<script setup>
import { onMounted, ref } from 'vue';
import { asyncInjectScript, isNumber } from '@/utils/utils';
import styles from './index.module.scss';

const amapPlugins = [];
const amapJsApiKey = 'xxx';

const domId = 'base-map';
const amapApiVersion = '2.0';
const amapCallBackName = 'AmapJSSDKInitCallback';
const mapInstance = ref();

const props = defineProps({
  lat: Number,
  lng: Number,
  height: [String, Number],
});

const isOk = isNumber(props.lat) && isNumber(props.lng);

const emit = defineEmits(['onInit']);

onMounted(() => {
  // window上的global方法每次都重写一下，使其scope引用到新的vm实例上来，修复非刷新打开地图mapReady等变量指向问题
  window[amapCallBackName] = () => {
    const AMap = window.AMap;
    if (document.querySelector(`#${domId}`) == null) {
      return;
    }
    mapInstance.value = new AMap.Map(domId, {
      resizeEnable: true,
      zoom: 11,
      // center: isGroup ? undefined : [this.lng, this.lat],
      center: [props.lng, props.lat],
    });
    emit('onInit', AMap, mapInstance);
  };
  if (window.AMap) {
    window[amapCallBackName]();
    return;
  }
  asyncInjectScript(
    `https://webapi.amap.com/maps?v=${amapApiVersion}&key=${amapJsApiKey}&plugin=${amapPlugins.join(
      ','
    )}&callback=${amapCallBackName}`,
    'AMap'
  );
});
</script>

<template>
  <view
    :class="styles.mapWrapper"
    :style="`height: ${props.height}`"
  >
    <view
      v-if="isOk"
      :id="domId"
      class="map_container"
      :class="styles.mapContainer"
    >
    </view>
    <!-- <view :class="styles.mapText">
      <text :class="styles.h1">{{ pageData.address.name }}</text>
      <text>{{ pageData.address.desc }}</text>
    </view> -->
  </view>
</template>
