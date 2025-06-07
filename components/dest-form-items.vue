<script lang="ts" setup>
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import type { AddressEntry } from '~/composables/address-book';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

const HONORIFIC_OPTIONS = [
  { name: '（なし）', value: '' },
  { name: '様', value: '様' },
  { name: '御中', value: '御中' },
  { name: '行', value: '行' },
] as const;

const ADDRESS_BOOK_TYPE = 'destination';

const model = defineModel<DestForm & SenderForm>({ required: true });

// 住所録機能
const showAddressBookSelector = ref(false);
const showAddressBookRegister = ref(false);
const editingEntry = ref<AddressEntry | null>(null);

// 宛先フォームデータかどうかを判定する型ガード関数
const isDestFormData = (data: Partial<DestForm> | Partial<SenderForm>): data is Partial<DestForm> => {
  return 'destZipcode' in data || 'destAddress1' in data || 'destName' in data;
};

// 住所録から選択された時の処理
const onAddressSelect = (entry: AddressEntry) => {
  const data = entry.data;
  if (isDestFormData(data)) {
    Object.assign(model.value, data);
  }
};

// 住所録編集
const onAddressEdit = (entry: AddressEntry) => {
  editingEntry.value = entry;
  showAddressBookRegister.value = true;
  showAddressBookSelector.value = false;
};

// 現在の入力内容を取得
const getCurrentDestData = () => {
  return {
    destZipcode: model.value.destZipcode,
    destAddress1: model.value.destAddress1,
    destAddress2: model.value.destAddress2,
    destAffiliation1: model.value.destAffiliation1,
    destAffiliation2: model.value.destAffiliation2,
    destPosition: model.value.destPosition,
    destName: model.value.destName,
    destHonorific: model.value.destHonorific,
  };
};
</script>

<template>
  <!-- 住所録ボタン -->
  <div class="flex flex-wrap gap-2 justify-end mb-4">
    <UButton
      icon="i-mdi-book-open-page-variant"
      size="sm"
      color="primary"
      variant="outline"
      @click="showAddressBookSelector = true"
    >
      住所録から選択
    </UButton>
    <UButton
      icon="i-mdi-bookmark-plus"
      size="sm"
      color="warning"
      variant="outline"
      @click="showAddressBookRegister = true"
    >
      現在の内容を住所録に登録
    </UButton>
  </div>

  <!-- 宛先情報入力フィールド -->
  <AddressFormField
    v-model="model.destZipcode"
    label="郵便番号"
    placeholder="お届け先の郵便番号を入力してください"
    :min-length="7"
    :max-length="8"
    autocomplete="postal-code"
    :has-leading="true"
    leading-text="〒"
  />
  <AddressFormField
    v-model="model.destAddress1"
    label="住所（１行目）"
    placeholder="お届け先の住所（１行目）を入力してください"
  />
  <AddressFormField
    v-model="model.destAddress2"
    label="住所（２行目・マンション名等)"
    placeholder="お届け先の住所（２行目）を入力してください"
  />
  <AddressFormField
    v-model="model.destAffiliation1"
    label="会社名等"
    placeholder="必要であればお届け先の会社名等を入力してください"
  />
  <AddressFormField
    v-model="model.destAffiliation2"
    label="部署名等"
    placeholder="必要であればお届け先の部署名等を入力してください"
  />
  <AddressFormField
    v-model="model.destPosition"
    label="役職等"
    placeholder="必要であればお届け先の相手様の役職を入力してください"
  />
  <AddressFormField
    v-model="model.destName"
    label="お名前"
    placeholder="お届け先のお名前を入力してください"
  />
  <fieldset aria-label="敬称を選択">
    <div class="flex items-center justify-between">
      <div class="text-sm/6 font-medium text-highlighted">
        敬称
      </div>
    </div>

    <RadioGroup
      v-model="model.destHonorific"
      class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      <RadioGroupOption
        v-for="option in HONORIFIC_OPTIONS"
        :key="`dest-honorific-${option.value}`"
        v-slot="{ active, checked }"
        as="template"
        :value="option.value"
      >
        <div :class="['cursor-pointer focus:outline-hidden', active ? 'ring-2 ring-sky-500 ring-offset-2' : '', checked ? 'bg-sky-500 text-white ring-0 hover:bg-sky-400' : 'bg-white text-highlighted ring-1 ring-gray-300 hover:bg-gray-50', !active && !checked ? 'ring-inset' : '', active && checked ? 'ring-2' : '', 'flex items-center justify-center rounded-md px-3 py-3 text-sm uppercase sm:flex-1']">
          {{ option.name }}
        </div>
      </RadioGroupOption>
    </RadioGroup>
  </fieldset>

  <!-- 住所録選択モーダル -->
  <LazyAddressBookSelector
    v-model="showAddressBookSelector"
    :type="ADDRESS_BOOK_TYPE"
    @select="onAddressSelect"
    @edit="onAddressEdit"
  />

  <!-- 住所録登録モーダル -->
  <LazyAddressBookRegister
    v-model="showAddressBookRegister"
    :type="ADDRESS_BOOK_TYPE"
    :data="getCurrentDestData()"
    :edit-entry="editingEntry"
    @registered="editingEntry = null"
  />
</template>
