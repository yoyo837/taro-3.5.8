<script setup>
import styles from './index.module.scss';
</script>

<template>
  <div
    class="text-center fixed-width"
    :class="styles.srvTag"
  >
    <PageLink url="/">
      <view :class="styles.btn">
        <Iconfont
          name="home"
          :size="22"
        />
        <slot></slot>
      </view>
    </PageLink>
  </div>
</template>
