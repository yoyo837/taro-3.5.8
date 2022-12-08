<script setup>
import useRoute from '@/hooks/useRoute';
const route = useRoute();
const { srvId } = route.query;
</script>

<template>
  <PageLayout bg-color="red">
    <PageLink url="/user/my">{{ srvId }}</PageLink>
    测试地图:
    <AMap
      :lat="22.720889"
      :lng="114.246884"
    ></AMap>
  </PageLayout>
</template>
