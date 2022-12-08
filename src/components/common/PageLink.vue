<script setup>
import { mergeUrlQuery, getRouterUrl } from '@/utils/utils';
import useRoute from '@/hooks/useRoute';

const props = defineProps({
  url: String,
});

const route = useRoute();

const { srvId } = route.query;

const innerUrl = getRouterUrl(props.url);

const useUrl = mergeUrlQuery(innerUrl, {
  srvId,
});
</script>

<template>
  <navigator
    v-bind="props"
    :url="useUrl"
  >
    <slot></slot>
  </navigator>
</template>
