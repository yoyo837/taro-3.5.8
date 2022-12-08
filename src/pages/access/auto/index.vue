<script setup>
import useRoute from '@/hooks/useRoute';
import { mergeUrlQuery, redirectTo } from '@/utils/utils';
const route = useRoute();
const { redirect, ...otherQuery } = route.query;

function goToRedirect() {
  redirectTo({
    url: mergeUrlQuery(redirect || '/', otherQuery),
  });
}

goToRedirect();
</script>

<template>
  <PageLayout>
    <AccessLoadingHolder />
  </PageLayout>
</template>
