<template>
  <div class="space-y-4">
    <p class="text-sm text-toned">
      現在入力されている内容を含むURLを生成しました。このURLを共有することで、同じ内容を他の人と共有できます。
    </p>

    <div class="space-y-3">
      <label class="block text-sm font-medium text-default">
        共有する情報
      </label>
      <div class="flex gap-4">
        <UCheckbox
          v-model="includeDestination"
          label="宛先情報を含める"
        />
        <UCheckbox
          v-model="includeSender"
          label="差出人情報を含める"
        />
      </div>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-default">
        共有URL
      </label>
      <div class="flex gap-2">
        <UInput
          v-model="shareUrl"
          readonly
          class="flex-1"
          :ui="{ base: 'font-mono select-all' }"
        />
        <UTooltip
          v-if="isSupported"
          :text="copied ? 'コピーしました！' : 'クリップボードにコピー'"
          :popper="{ placement: 'top' }"
        >
          <UButton
            :icon="copied ? 'i-mdi-check' : 'i-mdi-content-copy'"
            :color="copied ? 'success' : 'primary'"
            @click="() => copy()"
          />
        </UTooltip>
      </div>
    </div>

    <UAlert
      icon="i-mdi-information"
      color="primary"
      variant="subtle"
      title="プライバシーについて"
      description="URLには入力された住所情報が含まれます。共有する際は十分にご注意ください。"
    />
  </div>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

const props = defineProps<{
  formData: DestForm & SenderForm;
}>();

const includeDestination = ref(true);
const includeSender = ref(true);

/**
 * フォームデータからクエリパラメータを生成
 */
const generateQueryParams = (formData: DestForm & SenderForm): string => {
  const params = new URLSearchParams();

  // 宛先フィールドの定義
  const destinationFields = [
    'destZipcode', 'destAddress1', 'destAddress2',
    'destAffiliation1', 'destAffiliation2',
    'destPosition', 'destName', 'destHonorific',
  ];

  // 差出人フィールドの定義
  const senderFields = [
    'senderZipcode', 'senderAddress1', 'senderAddress2',
    'senderAffiliation1', 'senderAffiliation2', 'senderName',
  ];

  // 空でない値のみパラメータに追加
  Object.entries(formData).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      // 宛先情報の場合
      if (destinationFields.includes(key) && includeDestination.value) {
        params.append(key, value);
      }
      // 差出人情報の場合
      else if (senderFields.includes(key) && includeSender.value) {
        params.append(key, value);
      }
    }
  });

  return params.toString();
};

const shareUrl = computed(() => {
  const baseUrl = window.location.origin + window.location.pathname;
  const queryString = generateQueryParams(props.formData);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
});

const { copy, copied, isSupported } = useClipboard({ source: shareUrl });
</script>
