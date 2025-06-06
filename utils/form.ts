import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export const convertFormToTemplateInput = (form: DestForm & SenderForm) => {
  const data: Omit<DestForm & SenderForm, 'destZipcode' | 'destHonorific'> & {
    destZipcode?: string;
    destHonorific?: string;
  } = { ...form };

  const destZipcode = data.destZipcode?.replaceAll('-', '') ?? '';
  const honorific = data.destHonorific?.trim();
  data.destName = (data.destName || '') + (honorific ? ` ${honorific}` : '');
  data.destZipcode = undefined;
  data.destHonorific = undefined;

  const destZipcode1 = (destZipcode.length > 0) ? destZipcode.substring(0, Math.min(3, destZipcode.length)) : '';
  const destZipcode2 = (destZipcode.length > 3) ? destZipcode.substring(3, Math.min(7, destZipcode.length)) : '';
  data.senderZipcode
    = data.senderZipcode.length > 0
      ? `〒${data.senderZipcode}`
      : data.senderZipcode;

  return { ...data, destZipcode1, destZipcode2 };
};
