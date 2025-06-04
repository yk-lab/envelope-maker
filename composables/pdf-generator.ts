import type { Template } from '@pdfme/common';
import { text } from '@pdfme/schemas';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';
import { convertFormToTemplateInput } from '~/utils/form';

export function usePdfGenerator() {
  const pdf = usePdf();

  // PDFを生成して新しいウィンドウで開く
  const generateAndOpenPdf = async (
    form: DestForm & SenderForm,
    schemas: Template['schemas'],
  ) => {
    try {
      const { generate } = await import('@pdfme/generator');
      const [basePdf, fontData] = await Promise.all([
        pdf.templatePdf(),
        getFontsData(),
      ]);

      const pdfBuffer = await generate({
        template: {
          basePdf,
          schemas,
        },
        inputs: [convertFormToTemplateInput(form)],
        plugins: { text },
        options: {
          font: fontData,
          lang: 'ja',
        },
      });

      // PDFをBlobとして作成し、新しいウィンドウで開く
      const blob = new Blob([new Uint8Array(pdfBuffer.buffer)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);

      // メモリリークを防ぐためにURLを解放
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
    catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  };

  return {
    generateAndOpenPdf,
  };
}
