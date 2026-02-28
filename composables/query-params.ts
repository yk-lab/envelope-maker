import { HONORIFICS } from '~/scripts/forms/schema';
import type { DestForm, Honorific, SenderForm } from '~/scripts/forms/schema';

export const useQueryParams = () => {
  const route = useRoute();

  /**
   * クエリパラメータからフォームのデフォルト値を取得
   */
  const getFormDefaults = (): Partial<DestForm & SenderForm> => {
    const query = route.query;
    const defaults: Partial<DestForm & SenderForm> = {};

    const stringFields = [
      'destZipcode', 'destAddress1', 'destAddress2', 'destAffiliation1',
      'destAffiliation2', 'destPosition', 'destName',
      'senderZipcode', 'senderAddress1', 'senderAddress2', 'senderAffiliation1',
      'senderAffiliation2', 'senderName',
    ] as const;

    stringFields.forEach((field) => {
      const value = query[field];
      if (value) {
        // 配列パラメータの場合は最初の値を使用
        const stringValue = Array.isArray(value) ? value[0] : value;
        if (typeof stringValue === 'string' && stringValue.length > 0) {
          defaults[field] = stringValue;
        }
      }
    });

    // destHonorificは許可された値のみ受け入れ
    const honorific = query.destHonorific;
    if (honorific) {
      const stringValue = Array.isArray(honorific) ? honorific[0] : honorific;
      if (typeof stringValue === 'string' && (HONORIFICS as readonly string[]).includes(stringValue)) {
        defaults.destHonorific = stringValue as Honorific;
      }
    }

    return defaults;
  };

  return {
    getFormDefaults,
  };
};
