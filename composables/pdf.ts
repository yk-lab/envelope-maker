import type { Template } from '@pdfme/common';

export const usePdf = () => {
  const isFetching = ref(false);
  const loadedTemplatePdf = ref<Template['basePdf'] | null>(null);

  const templatePdf = async () => {
    if (!loadedTemplatePdf.value) {
      isFetching.value = true;

      try {
        const res = await fetch('/template_pdf/envelope-v.pdf', {
          priority: 'low',
        });
        if (!res.ok) {
          throw new Error(`テンプレートPDFの取得に失敗しました: HTTP ${res.status}`);
        }
        loadedTemplatePdf.value = await (await res.blob()).arrayBuffer();
      }
      catch (error) {
        console.error('テンプレートPDFの読み込みに失敗しました:', error);
        throw error;
      }
      finally {
        isFetching.value = false;
      }
    }
    return loadedTemplatePdf.value;
  };

  return { templatePdf };
};
