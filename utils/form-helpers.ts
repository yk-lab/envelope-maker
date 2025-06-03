import type { DestForm, SenderForm } from '~/scripts/forms/schema';
import { defaultDest, defaultSender } from '~/scripts/forms/schema';

// フォームの一部をリセットする汎用関数
export const resetFormSection = <T extends Partial<DestForm & SenderForm>>(
  currentForm: DestForm & SenderForm,
  sectionDefaults: T,
): DestForm & SenderForm => {
  return { ...currentForm, ...sectionDefaults };
};

// 宛先フォームをリセット
export const resetDestForm = (currentForm: DestForm & SenderForm): DestForm & SenderForm => {
  return resetFormSection(currentForm, defaultDest());
};

// 差出人フォームをリセット
export const resetSenderForm = (currentForm: DestForm & SenderForm): DestForm & SenderForm => {
  return resetFormSection(currentForm, defaultSender());
};

// フィールドが使用されているかチェック
export const hasFieldValue = (...fields: string[]): boolean => {
  return fields.some(field => field.length > 0);
};

// スキーマオプションを計算
export const calculateSchemaOptions = (form: DestForm & SenderForm) => {
  return {
    outputDestPosition: hasFieldValue(form.destPosition),
    useDestAffiliation: hasFieldValue(form.destAffiliation1, form.destAffiliation2),
    useSenderAffiliation: hasFieldValue(form.senderAffiliation1, form.senderAffiliation2),
  };
};
