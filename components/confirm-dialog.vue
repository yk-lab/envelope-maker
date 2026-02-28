<template>
  <UModal
    :title="title"
    :description="message"
    :close="{ onClick: () => emit('close', false) }"
    :ui="{
      footer: 'justify-end',
    }"
  >
    <template #footer>
      <UButton
        :color="cancelColor"
        variant="ghost"
        @click="emit('close', false)"
      >
        {{ cancelText }}
      </UButton>
      <UButton
        :color="confirmColor"
        @click="emit('close', true)"
      >
        {{ confirmText }}
      </UButton>
    </template>
  </UModal>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  cancelColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}>(), {
  confirmText: '確認',
  cancelText: 'キャンセル',
  confirmColor: 'primary',
  cancelColor: 'neutral',
});

const emit = defineEmits<{
  close: [boolean];
}>();
</script>
