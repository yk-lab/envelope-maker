import type { DestForm, SenderForm } from '~/scripts/forms/schema';

type AddressData = Partial<DestForm> | Partial<SenderForm>;

// AddressEntryのdataは宛先(dest*)・差出人(sender*)どちらの形式もあるため、プレフィックスの違いを吸収するアクセサー（dest優先）
export const getZipcode = (data: AddressData): string | null => {
  return ('destZipcode' in data ? data.destZipcode : null) ?? ('senderZipcode' in data ? data.senderZipcode : null) ?? null;
};

export const getAddress1 = (data: AddressData): string | null => {
  return ('destAddress1' in data ? data.destAddress1 : null) ?? ('senderAddress1' in data ? data.senderAddress1 : null) ?? null;
};

export const getAddress2 = (data: AddressData): string | null => {
  return ('destAddress2' in data ? data.destAddress2 : null) ?? ('senderAddress2' in data ? data.senderAddress2 : null) ?? null;
};

export const getAffiliation1 = (data: AddressData): string | null => {
  return ('destAffiliation1' in data ? data.destAffiliation1 : null) ?? ('senderAffiliation1' in data ? data.senderAffiliation1 : null) ?? null;
};

export const getAffiliation2 = (data: AddressData): string | null => {
  return ('destAffiliation2' in data ? data.destAffiliation2 : null) ?? ('senderAffiliation2' in data ? data.senderAffiliation2 : null) ?? null;
};

export const getName = (data: AddressData): string | null => {
  return ('destName' in data ? data.destName : null) ?? ('senderName' in data ? data.senderName : null) ?? null;
};

export const getHonorific = (data: AddressData): string => {
  return ('destHonorific' in data ? data.destHonorific : null) ?? '';
};
