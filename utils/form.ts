import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export const convertFormToTemplateInput = (form: DestForm & SenderForm) => {
  const data: Omit<DestForm & SenderForm, 'destZipcode' | 'destHonorific'> & {
    destZipcode?: string;
    destHonorific?: string;
  } = { ...form };

  const destZipcode = data.destZipcode?.replace('-', '') ?? '';
  data.destName += ` ${data.destHonorific ?? ''}`;
  delete data.destZipcode;
  delete data.destHonorific;

  const destZipcode1 = destZipcode.substring(0, 3);
  const destZipcode2 = destZipcode.substring(3, 7);
  data.senderZipcode
    = data.senderZipcode.length > 0
      ? `〒${data.senderZipcode}`
      : data.senderZipcode;

  return { ...data, destZipcode1, destZipcode2 };
};
