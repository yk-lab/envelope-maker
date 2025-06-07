<template>
  <UModal
    v-model:open="isOpen"
    :title="`${type === 'destination' ? '宛先' : '差出人'}の住所録`"
    :ui="{
      body: 'p-0!',
    }"
  >
    <template #body>
      <header class="space-y-4 sticky top-0 bg-default z-10 p-4 border-b border-muted sm:p-6">
        <!-- 検索バー -->
        <UInput
          v-model="searchQuery"
          class="w-full max-w-xs"
          placeholder="名前や住所で検索..."
          icon="i-mdi-magnify"
        >
          <template
            v-if="searchQuery"
            #trailing
          >
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-mdi-close"
              aria-label="Clear input"
              @click="searchQuery = ''"
            />
          </template>
        </UInput>

        <!-- ソート選択 -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">並び順:</span>
          <USelect
            v-model="sortBy"
            :items="sortOptions"
            value-attribute="value"
            option-attribute="label"
            size="sm"
          />
        </div>
      </header>

      <!-- 住所録リスト -->
      <UPageList
        v-if="filteredEntries.length > 0"
        class="space-y-2 max-h-96 p-4 sm:p-6"
      >
        <UPageCard
          v-for="entry in filteredEntries"
          :key="entry.id"
          @click="selectEntry(entry)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-medium truncate">
                  {{ entry.name }}
                </h4>
                <UBadge
                  v-if="entry.lastUsedAt"
                  :label="getLastUsedLabel(entry.lastUsedAt)"
                  color="neutral"
                  size="xs"
                />
              </div>
              <div class="text-sm text-gray-500 space-y-0.5">
                <p v-if="getZipcode(entry.data)">
                  〒{{ getZipcode(entry.data) }}
                </p>
                <p v-if="getAddress1(entry.data)">
                  {{ getAddress1(entry.data) }}
                  {{ getAddress2(entry.data) }}
                </p>
                <p
                  v-if="getName(entry.data)"
                  class="font-medium"
                >
                  {{ getName(entry.data) }}
                  {{ getHonorific(entry.data) }}
                </p>
              </div>
            </div>
            <div class="flex gap-1 ml-2">
              <UTooltip text="編集">
                <UButton
                  variant="ghost"
                  color="neutral"
                  icon="i-mdi-pencil"
                  size="xs"
                  @click.stop="editingEntry = entry"
                />
              </UTooltip>
              <UTooltip text="削除">
                <UButton
                  variant="ghost"
                  color="error"
                  icon="i-mdi-trash-can"
                  size="xs"
                  @click.stop="confirmDelete(entry)"
                />
              </UTooltip>
            </div>
          </div>
        </UPageCard>
      </UPageList>

      <!-- 空の状態 -->
      <div
        v-else
        class="text-center py-8"
      >
        <UIcon
          name="i-mdi-book-open-blank-variant"
          class="text-4xl text-gray-300 mb-2"
        />
        <p class="text-gray-500">
          {{ searchQuery ? '検索結果がありません' : '住所録が登録されていません' }}
        </p>
      </div>
    </template>

    <LazyAddressBookRegister
      v-model="showAddressBookRegister"
      :type="type"
      :data="{}"
      :edit-entry="editingEntry"
      @registered="editingEntry = null"
    />
  </UModal>
</template>

<script setup lang="ts">
import type { AddressEntry } from '~/composables/address-book';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

interface Props {
  type: 'destination' | 'sender';
}

const props = defineProps<Props>();
const emit = defineEmits<{
  select: [entry: AddressEntry];
  edit: [entry: AddressEntry];
}>();

const { getSortedEntries, searchEntries, deleteEntry, updateLastUsedAt } = useAddressBook();
const { confirm } = useConfirmDialog();

const isOpen = defineModel<boolean>({ required: true });

const searchQuery = ref();
const sortBy = ref('lastUsed' as 'lastUsed' | 'name' | 'date');
const editingEntry = ref<AddressEntry | null>(null);

const sortOptions = [
  { label: '使用順', value: 'lastUsed' },
  { label: '名前順', value: 'name' },
  { label: '更新日順', value: 'date' },
] as { label: string; value: 'lastUsed' | 'name' | 'date' }[];

// 型安全なアクセサー関数
const getZipcode = (data: Partial<DestForm> | Partial<SenderForm>) => {
  return ('destZipcode' in data ? data.destZipcode : null) || ('senderZipcode' in data ? data.senderZipcode : null);
};

const getAddress1 = (data: Partial<DestForm> | Partial<SenderForm>) => {
  return ('destAddress1' in data ? data.destAddress1 : null) || ('senderAddress1' in data ? data.senderAddress1 : null);
};

const getAddress2 = (data: Partial<DestForm> | Partial<SenderForm>) => {
  return ('destAddress2' in data ? data.destAddress2 : null) || ('senderAddress2' in data ? data.senderAddress2 : null);
};

const getName = (data: Partial<DestForm> | Partial<SenderForm>) => {
  return ('destName' in data ? data.destName : null) || ('senderName' in data ? data.senderName : null);
};

const getHonorific = (data: Partial<DestForm> | Partial<SenderForm>) => {
  return ('destHonorific' in data ? data.destHonorific : null) || '';
};

const getLastUsedLabel = (lastUsedAt: string) => {
  const now = new Date();
  const lastUsed = new Date(lastUsedAt);
  const diffInDays = Math.floor((now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return '今日使用';
  if (diffInDays === 1) return '昨日使用';
  if (diffInDays < 7) return `${diffInDays}日前`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}週間前`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}ヶ月前`;
  return `${Math.floor(diffInDays / 365)}年前`;
};

const filteredEntries = computed(() => {
  if (searchQuery.value) {
    return searchEntries(searchQuery.value, props.type);
  }
  return getSortedEntries(props.type, sortBy.value);
});

const showAddressBookRegister = computed({
  get: () => editingEntry.value !== null,
  set: (value) => {
    if (!value) {
      editingEntry.value = null;
    }
  },
});

const selectEntry = (entry: AddressEntry) => {
  updateLastUsedAt(entry.id);
  emit('select', entry);
  isOpen.value = false;
};

const confirmDelete = async (entry: AddressEntry) => {
  const confirmed = await confirm({
    title: '削除の確認',
    message: `「${entry.name}」を住所録から削除しますか？`,
    confirmText: '削除',
    confirmColor: 'error',
  });
  if (confirmed) {
    deleteEntry(entry.id);
  }
};
</script>
