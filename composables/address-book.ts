import { useLocalStorage } from '@vueuse/core';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

export interface AddressEntry {
  id: string;
  name: string; // 登録名
  type: 'destination' | 'sender';
  data: Partial<DestForm> | Partial<SenderForm>;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string; // 最終使用日
}

export const useAddressBook = () => {
  const addressBook = useLocalStorage<AddressEntry[]>('envelope-address-book', []);

  /**
   * 住所録に新規登録
   */
  const addEntry = (
    name: string,
    type: 'destination' | 'sender',
    data: Partial<DestForm> | Partial<SenderForm>,
  ): AddressEntry => {
    const newEntry: AddressEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      type,
      data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
    };

    addressBook.value = [...addressBook.value, newEntry];
    return newEntry;
  };

  /**
   * 住所録エントリーを更新
   */
  const updateEntry = (id: string, updates: Partial<AddressEntry>): AddressEntry | null => {
    const index = addressBook.value.findIndex(entry => entry.id === id);
    if (index !== -1) {
      addressBook.value[index] = {
        ...addressBook.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return addressBook.value[index];
    }
    return null;
  };

  /**
   * 住所録エントリーを削除
   */
  const deleteEntry = (id: string) => {
    addressBook.value = addressBook.value.filter((entry: AddressEntry) => entry.id !== id);
  };

  /**
   * 最終使用日を更新
   */
  const updateLastUsedAt = (id: string) => {
    updateEntry(id, { lastUsedAt: new Date().toISOString() });
  };

  /**
   * 特定タイプのエントリーを取得
   */
  const getEntriesByType = (type: 'destination' | 'sender') => {
    return addressBook.value.filter((entry: AddressEntry) => entry.type === type);
  };

  /**
   * エントリーをソート
   */
  const getSortedEntries = (
    type?: 'destination' | 'sender',
    sortBy: 'name' | 'date' | 'lastUsed' = 'lastUsed',
  ) => {
    const entries = type ? getEntriesByType(type) : addressBook.value;

    switch (sortBy) {
      case 'name':
        return entries.sort((a: AddressEntry, b: AddressEntry) => a.name.localeCompare(b.name, 'ja'));
      case 'date':
        return entries.sort((a: AddressEntry, b: AddressEntry) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'lastUsed':
      default:
        // 最終使用日でソート（使用されていないものは最後に）
        return entries.sort((a: AddressEntry, b: AddressEntry) => new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime());
    }
  };

  /**
   * エントリーを検索
   */
  const searchEntries = (query: string, type?: 'destination' | 'sender') => {
    const normalizedQuery = query.toLowerCase();
    const entries = type ? getEntriesByType(type) : addressBook.value;

    return entries.filter((entry: AddressEntry) =>
      entry.name.toLowerCase().includes(normalizedQuery)
      || Object.values(entry.data).some((value: unknown) =>
        String(value).toLowerCase().includes(normalizedQuery),
      ),
    );
  };

  return {
    addressBook: readonly(addressBook),
    addEntry,
    updateEntry,
    deleteEntry,
    updateLastUsedAt,
    getEntriesByType,
    getSortedEntries,
    searchEntries,
  };
};
