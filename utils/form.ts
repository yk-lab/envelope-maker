import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export const convertFormToTemplateInput = (form: DestForm & SenderForm) => {
  // destZipcodeとdestHonorificはPDFテンプレートに直接渡さない（加工後の値を使う）
  const { destZipcode, destHonorific, ...rest } = { ...form };

  const cleanZipcode = destZipcode?.replaceAll('-', '') ?? '';
  const honorific = destHonorific?.trim();
  rest.destName = (rest.destName || '') + (honorific ? ` ${honorific}` : '');

  const destZipcode1 = (cleanZipcode.length > 0) ? cleanZipcode.substring(0, Math.min(3, cleanZipcode.length)) : '';
  const destZipcode2 = (cleanZipcode.length > 3) ? cleanZipcode.substring(3, Math.min(7, cleanZipcode.length)) : '';
  rest.senderZipcode
    = rest.senderZipcode.length > 0
      ? `〒${rest.senderZipcode}`
      : rest.senderZipcode;

  return { ...rest, destZipcode1, destZipcode2 };
};
