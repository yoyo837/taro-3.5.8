<script setup>
import useRoute from '@/hooks/useRoute';
const route = useRoute();
const { srvId } = route.query;
</script>

<template>
  <PageLayout>
    <PageLink url="/user/my">{{ srvId }}</PageLink>
  </PageLayout>
</template>
