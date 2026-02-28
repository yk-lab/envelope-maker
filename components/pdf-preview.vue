<script lang="ts" setup>
import type { Template } from '@pdfme/common';
import { watchDebounced } from '@vueuse/core';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

const pdf = usePdf();

const {
  schemas,
  formData,
} = defineProps<{
  schemas: Template['schemas'];
  formData: DestForm & SenderForm;
}>();

const basePdf = await pdf.templatePdf();
const fontData = await getFontsData();

const previewContainer = useTemplateRef('previewContainer');

const {
  initializeViewer,
  updateInputs,
  recreateViewer,
  destroyViewer,
  error,
} = usePdfViewer({
  basePdf: basePdf as string | ArrayBuffer,
  fontData,
  container: previewContainer as Ref<HTMLElement | null>,
});

// マウント時にビューアを初期化
onMounted(async () => {
  await initializeViewer(schemas, formData);
});

// フォームデータの変更を監視
watchDebounced(
  () => formData,
  newFormData => updateInputs(newFormData),
  { debounce: 150, deep: true, immediate: false },
);

// スキーマの変更を監視
watchDebounced(
  () => schemas,
  newSchemas => recreateViewer(newSchemas, formData),
  { debounce: 300, deep: true, immediate: false },
);

// アンマウント時にクリーンアップ
onBeforeUnmount(() => {
  destroyViewer();
});
</script>

<template>
  <div
    v-if="error"
    class="flex items-center justify-center p-8 text-gray-500"
  >
    <p>{{ error }}</p>
  </div>
  <aside
    v-else
    ref="previewContainer"
  />
</template>
