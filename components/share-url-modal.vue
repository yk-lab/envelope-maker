<script lang="ts" setup>
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

defineProps<{
  formData: DestForm & SenderForm;
}>();

const isOpen = defineModel<boolean>('open', { default: false });
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="URLを共有"
    :ui="{
      content: 'max-w-3xl',
      footer: 'justify-end',
    }"
  >
    <template #body>
      <share-url
        :form-data="formData"
      />
    </template>
    <template #footer>
      <UButton
        color="neutral"
        variant="ghost"
        @click="isOpen = false"
      >
        閉じる
      </UButton>
    </template>
  </UModal>
</template>
