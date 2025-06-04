import type { Template } from '@pdfme/common';

export const usePdf = () => {
  const isFetching = ref(false);
  const loadedTemplatePdf = ref<Template['basePdf'] | null>(null);

  const templatePdf = async () => {
    if (!loadedTemplatePdf.value) {
      isFetching.value = true;

      const res = await fetch('/template_pdf/envelope-v.pdf', {
        priority: 'low',
      });
      loadedTemplatePdf.value = await (await res.blob()).arrayBuffer();
      isFetching.value = false;
    }
    return loadedTemplatePdf.value;
  };

  return { templatePdf };
};
