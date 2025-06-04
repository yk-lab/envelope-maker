<script lang="ts" setup></script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <USeparator
      class="h-px mt-12"
    />
    <SiteFooter />
  </UApp>
</template>
