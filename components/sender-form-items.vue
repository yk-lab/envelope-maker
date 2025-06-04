<script lang="ts" setup>
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

const model = defineModel<DestForm & SenderForm>({ required: true });
</script>

<template>
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
</template>
