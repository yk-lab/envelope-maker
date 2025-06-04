import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export const useQueryParams = () => {
  const route = useRoute();

  /**
   * クエリパラメータからフォームのデフォルト値を取得
   */
  const getFormDefaults = (): Partial<DestForm & SenderForm> => {
    const query = route.query;
    const defaults: Partial<DestForm & SenderForm> = {};

    const fieldMappings = [
      'destZipcode', 'destAddress1', 'destAddress2', 'destAffiliation1',
      'destAffiliation2', 'destPosition', 'destName', 'destHonorific',
      'senderZipcode', 'senderAddress1', 'senderAddress2', 'senderAffiliation1',
      'senderAffiliation2', 'senderName',
    ] as const;

    fieldMappings.forEach((field) => {
      if (query[field]) {
        defaults[field] = String(query[field]);
      }
    });

    return defaults;
  };

  return {
    getFormDefaults,
  };
};
