import type { Font } from '@pdfme/common';
import { getDefaultFont } from '@pdfme/common';

export const getFontsData = async (): Promise<Font> => ({
  ...getDefaultFont(),
  NotoSansJP: { ...await useFont().notoFont() },
});
