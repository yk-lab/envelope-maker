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
    const newWindow = window.open(url);

    if (!newWindow) {
      // ポップアップブロック時はURLを解放してエラーを通知
      URL.revokeObjectURL(url);
      throw new Error('PDFを新しいウィンドウで開けませんでした。ポップアップブロッカーの設定をご確認ください。');
    }

    // ウィンドウがPDFを読み込む十分な時間を確保してからURLを解放
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return {
    generateAndOpenPdf,
  };
}
