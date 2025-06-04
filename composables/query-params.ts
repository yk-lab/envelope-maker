import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export const useQueryParams = () => {
  const route = useRoute();

  /**
   * クエリパラメータからフォームのデフォルト値を取得
   */
  const getFormDefaults = (): Partial<DestForm & SenderForm> => {
    const query = route.query;
    const defaults: Partial<DestForm & SenderForm> = {};

    // 宛先情報
    if (query.destZipcode) defaults.destZipcode = String(query.destZipcode);
    if (query.destAddress1) defaults.destAddress1 = String(query.destAddress1);
    if (query.destAddress2) defaults.destAddress2 = String(query.destAddress2);
    if (query.destAffiliation1) defaults.destAffiliation1 = String(query.destAffiliation1);
    if (query.destAffiliation2) defaults.destAffiliation2 = String(query.destAffiliation2);
    if (query.destPosition) defaults.destPosition = String(query.destPosition);
    if (query.destName) defaults.destName = String(query.destName);
    if (query.destHonorific) defaults.destHonorific = String(query.destHonorific);

    // 差出人情報
    if (query.senderZipcode) defaults.senderZipcode = String(query.senderZipcode);
    if (query.senderAddress1) defaults.senderAddress1 = String(query.senderAddress1);
    if (query.senderAddress2) defaults.senderAddress2 = String(query.senderAddress2);
    if (query.senderAffiliation1) defaults.senderAffiliation1 = String(query.senderAffiliation1);
    if (query.senderAffiliation2) defaults.senderAffiliation2 = String(query.senderAffiliation2);
    if (query.senderName) defaults.senderName = String(query.senderName);

    return defaults;
  };

  return {
    getFormDefaults,
  };
};
