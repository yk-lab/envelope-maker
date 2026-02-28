import type { Template } from '@pdfme/common';
import { text } from '@pdfme/schemas';
import type { Viewer as ViewerType } from '@pdfme/ui';
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
  const error = ref<string | null>(null);

  // PDFビューアを初期化する
  const initializeViewer = async (schemas: Template['schemas'], formData: DestForm & SenderForm) => {
    if (!container.value) {
      error.value = 'プレビューの表示領域が見つかりません';
      console.error('プレビューの表示領域が見つかりません');
      return;
    }

    try {
      const { Viewer } = await import('@pdfme/ui');

      // Vueのリアクティブプロキシを除去するためにディープクローン
      const plainFormData = JSON.parse(JSON.stringify(formData));
      const inputs = [convertFormToTemplateInput(plainFormData)];

      viewer.value = new Viewer({
        domContainer: container.value,
        template: {
          basePdf,
          schemas,
        },
        inputs,
        plugins: { Text: text },
        options: {
          font: fontData,
          lang: 'ja',
        },
      });
      error.value = null;
    }
    catch (e) {
      error.value = 'プレビューの初期化に失敗しました';
      console.error('PDFビューアの初期化に失敗しました:', e);
    }
  };

  // 入力データを更新する
  const updateInputs = (formData: DestForm & SenderForm) => {
    if (!viewer.value) {
      return;
    }

    try {
      // Vueのリアクティブプロキシを除去するためにディープクローン
      const plainFormData = JSON.parse(JSON.stringify(formData));
      const newInputs = [convertFormToTemplateInput(plainFormData)];
      viewer.value.setInputs(newInputs);
    }
    catch (e) {
      error.value = 'プレビューの更新に失敗しました';
      console.error('入力データの更新に失敗しました:', e);
    }
  };

  // スキーマ変更時にビューアを再作成する
  const recreateViewer = async (schemas: Template['schemas'], formData: DestForm & SenderForm) => {
    if (!container.value) {
      error.value = 'プレビューの表示領域が見つかりません';
      console.error('プレビューの表示領域が見つかりません');
      return;
    }

    try {
      if (viewer.value) {
        viewer.value.destroy();
        viewer.value = undefined;
      }

      await initializeViewer(schemas, formData);
    }
    catch (e) {
      error.value = 'プレビューの再作成に失敗しました';
      console.error('ビューアの再作成に失敗しました:', e);
    }
  };

  // クリーンアップ関数
  const destroyViewer = () => {
    if (viewer.value) {
      viewer.value.destroy();
      viewer.value = undefined;
    }
  };

  return {
    viewer: readonly(viewer),
    error: readonly(error),
    initializeViewer,
    updateInputs,
    recreateViewer,
    destroyViewer,
  };
}
