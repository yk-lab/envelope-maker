<script lang="ts" setup>
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

interface Emits {
  (event: 'update:form', form: DestForm & SenderForm): void;
}

defineEmits<Emits>();

interface Props {
  createPdf: () => void;
  resetDest: () => void;
  resetSender: () => void;
}

withDefaults(defineProps<Props>(), {});

const state = defineModel<DestForm & SenderForm>({ required: true });
</script>

<template>
  <UForm
    :state="state"
    class="@container space-y-6"
    @submit="createPdf"
  >
    <fieldset class="space-y-4">
      <legend class="text-lg">
        宛先
      </legend>

      <LazyDestFormItems v-model="state" />
    </fieldset>

    <fieldset class="space-y-4">
      <legend class="text-lg">
        差出人
      </legend>

      <LazySenderFormItems v-model="state" />
    </fieldset>

    <div class="flex flex-col @md:flex-row gap-3 justify-stretch @md:items-center @md:justify-between">
      <UButton
        type="submit"
        class="px-4"
        color="primary"
      >
        封筒を作成する
      </UButton>
      <UButton
        type="button"
        class="px-4"
        color="warning"
        icon="i-material-symbols-refresh"
        @click="resetDest"
      >
        宛先をリセット
      </UButton>
      <UButton
        type="button"
        class="px-4"
        color="warning"
        icon="i-material-symbols-refresh"
        @click="resetSender"
      >
        差出人をリセット
      </UButton>
    </div>
  </UForm>
</template>
