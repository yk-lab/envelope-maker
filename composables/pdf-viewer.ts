import type { Template } from '@pdfme/common';
import { text } from '@pdfme/schemas';
import type { Viewer as ViewerType } from '@pdfme/ui';
import { useDebounceFn } from '@vueuse/core';
import type { Ref, ShallowRef } from 'vue';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';
import { convertFormToTemplateInput } from '~/utils/form';

interface UsePdfViewerOptions {
  basePdf: string | ArrayBuffer;
  fontData: Record<string, { data: string | ArrayBuffer | Uint8Array; fallback?: boolean; subset?: boolean }>;
  container: Ref<HTMLElement | null> | Readonly<ShallowRef<HTMLElement | null>>;
}

export function usePdfViewer(options: UsePdfViewerOptions) {
  const { basePdf, fontData, container } = options;
  const viewer = ref<ViewerType>();

  // PDFビューアを初期化する
  const initializeViewer = async (schemas: Template['schemas'], formData: DestForm & SenderForm) => {
    if (!container.value) {
      console.error('Container element is not found');
      return;
    }

    const { Viewer } = await import('@pdfme/ui');

    const template = {
      basePdf,
      schemas,
    };

    const plainFormData = JSON.parse(JSON.stringify(formData));
    const inputs = [convertFormToTemplateInput(plainFormData)];

    viewer.value = new Viewer({
      domContainer: container.value,
      template,
      inputs,
      plugins: { Text: text },
      options: {
        font: fontData,
        lang: 'ja',
      },
    });
  };

  // 入力データを更新する（デバウンス付き）
  const updateInputs = useDebounceFn((formData: DestForm & SenderForm) => {
    if (!viewer.value) {
      console.error('Viewer is not initialized');
      return;
    }

    try {
      const plainFormData = JSON.parse(JSON.stringify(formData));
      const newInputs = [convertFormToTemplateInput(plainFormData)];
      console.log('Updating inputs:', newInputs);
      viewer.value.setInputs(newInputs);
    }
    catch (e) {
      console.error('Error updating inputs:', e);
    }
  }, 150);

  // スキーマ変更時にビューアを再作成する（デバウンス付き）
  const recreateViewer = useDebounceFn(async (schemas: Template['schemas'], formData: DestForm & SenderForm) => {
    if (!container.value) {
      console.error('Container element is not found');
      return;
    }

    try {
      // 既存のビューアを破棄
      if (viewer.value) {
        viewer.value.destroy();
        viewer.value = undefined;
      }

      // 新しいスキーマでビューアを再作成
      await initializeViewer(schemas, formData);
    }
    catch (e) {
      console.error('Error recreating viewer:', e);
    }
  }, 300);

  // クリーンアップ関数
  const destroyViewer = () => {
    if (viewer.value) {
      viewer.value.destroy();
      viewer.value = undefined;
    }
  };

  return {
    viewer: readonly(viewer),
    initializeViewer,
    updateInputs,
    recreateViewer,
    destroyViewer,
  };
}
