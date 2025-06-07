<script lang="ts" setup>
import type { AddressEntry } from '~/composables/address-book';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

const ADDRESS_BOOK_TYPE = 'sender';

const model = defineModel<DestForm & SenderForm>({ required: true });

// 住所録機能
const showAddressBookSelector = ref(false);
const showAddressBookRegister = ref(false);
const editingEntry = ref<AddressEntry | null>(null);

// SenderFormデータかどうかを検証するタイプガード
const isSenderFormData = (data: Partial<DestForm> | Partial<SenderForm>): data is Partial<SenderForm> => {
  return 'senderZipcode' in data
    && typeof data.senderZipcode === 'string'
    && (!('senderAddress1' in data) || typeof data.senderAddress1 === 'string')
    && (!('senderAddress2' in data) || typeof data.senderAddress2 === 'string')
    && (!('senderAffiliation1' in data) || typeof data.senderAffiliation1 === 'string')
    && (!('senderAffiliation2' in data) || typeof data.senderAffiliation2 === 'string')
    && (!('senderName' in data) || typeof data.senderName === 'string');
};

// 住所録から選択された時の処理
const onAddressSelect = (entry: AddressEntry) => {
  const data = entry.data;
  if (isSenderFormData(data)) {
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
const getCurrentSenderData = () => {
  return {
    senderZipcode: model.value.senderZipcode,
    senderAddress1: model.value.senderAddress1,
    senderAddress2: model.value.senderAddress2,
    senderAffiliation1: model.value.senderAffiliation1,
    senderAffiliation2: model.value.senderAffiliation2,
    senderName: model.value.senderName,
  };
};
</script>

<template>
  <!-- 住所録ボタン -->
  <div class="flex flex-wrap justify-end gap-2 mb-4">
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

  <!-- 差出人情報入力フィールド -->
  <AddressFormField
    v-model="model.senderZipcode"
    label="郵便番号"
    placeholder="差出人の郵便番号をハイフン込みで入力してください"
    :min-length="7"
    :max-length="8"
    autocomplete="postal-code"
    :has-leading="true"
    leading-text="〒"
  />
  <AddressFormField
    v-model="model.senderAddress1"
    label="住所（１行目）"
    placeholder="差出人の住所（１行目）を入力してください"
  />
  <AddressFormField
    v-model="model.senderAddress2"
    label="住所（２行目・マンション名等)"
    placeholder="差出人の住所（２行目）を入力してください"
  />
  <AddressFormField
    v-model="model.senderAffiliation1"
    label="会社名等"
    placeholder="必要であれば差出人の会社名等を入力してください"
  />
  <AddressFormField
    v-model="model.senderAffiliation2"
    label="部署名等"
    placeholder="必要であれば差出人の部署名等を入力してください"
  />
  <AddressFormField
    v-model="model.senderName"
    label="お名前"
    placeholder="差出人のお名前を入力してください"
  />

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
    :data="getCurrentSenderData()"
    :edit-entry="editingEntry"
    @registered="editingEntry = null"
  />
</template>
