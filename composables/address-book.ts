import { useLocalStorage } from '@vueuse/core';
import type { DestForm, SenderForm } from '~/scripts/forms/schema';

// 現在のストアバージョン
const CURRENT_VERSION = 1;
const STORAGE_KEY = 'envelope-address-book';

export interface AddressEntry {
  id: string;
  name: string; // 登録名
  type: 'destination' | 'sender';
  data: Partial<DestForm> | Partial<SenderForm>;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string; // 最終使用日
}

interface AddressBookStore {
  version: number;
  entries: AddressEntry[];
}

// localStorageから読み込んだエントリーの妥当性を検証
const isValidEntry = (entry: unknown): entry is AddressEntry => {
  if (!entry || typeof entry !== 'object') return false;
  const e = entry as Record<string, unknown>;
  return typeof e.id === 'string'
    && typeof e.name === 'string'
    && (e.type === 'destination' || e.type === 'sender')
    && e.data !== null && typeof e.data === 'object'
    && typeof e.createdAt === 'string'
    && typeof e.updatedAt === 'string'
    && typeof e.lastUsedAt === 'string';
};

// マイグレーション関数のマップ（現在v1のため未使用。バージョンアップ時にここへ関数を追加）
// 例: version 1 → 2 のマイグレーションを追加する場合:
//   1: (entries) => entries.map(e => ({ ...e, newField: 'default' })),
const migrations: Record<number, (entries: AddressEntry[]) => AddressEntry[]> = {};

/**
 * localStorageのデータをマイグレーションする
 * バージョンなしの旧形式（AddressEntry[]）にも対応
 */
const migrateStore = (raw: unknown): AddressBookStore => {
  // バージョン付き形式の場合
  if (raw && typeof raw === 'object' && 'version' in raw && 'entries' in raw) {
    const store = raw as Record<string, unknown>;
    let version = typeof store.version === 'number' ? store.version : CURRENT_VERSION;
    let entries: AddressEntry[] = Array.isArray(store.entries) ? store.entries : [];

    // バージョンが未来の場合（より新しいアプリで保存されたデータ）は空で初期化
    if (version > CURRENT_VERSION) {
      console.warn(`住所録のバージョン（${version}）がアプリのバージョン（${CURRENT_VERSION}）より新しいです。データをリセットします。`);
      return { version: CURRENT_VERSION, entries: [] };
    }

    // バージョンが古い場合は順次マイグレーション
    while (version < CURRENT_VERSION) {
      const migrate = migrations[version];
      if (!migrate) {
        throw new Error(`住所録のマイグレーション関数が未登録です（version ${version} → ${version + 1}）`);
      }
      entries = migrate(entries);
      version++;
    }

    return { version: CURRENT_VERSION, entries };
  }

  // バージョンなしの旧形式（AddressEntry[]の直接保存）の場合
  if (Array.isArray(raw)) {
    return { version: CURRENT_VERSION, entries: raw };
  }

  // 不明な形式の場合は空で初期化
  return { version: CURRENT_VERSION, entries: [] };
};

export const useAddressBook = () => {
  const store = useLocalStorage<AddressBookStore>(STORAGE_KEY, {
    version: CURRENT_VERSION,
    entries: [],
  });

  // 初期化時にマイグレーションを実行
  let migrated: AddressBookStore;
  try {
    migrated = migrateStore(store.value);
  }
  catch (error) {
    console.error('住所録のマイグレーションに失敗しました。データをリセットします:', error);
    migrated = { version: CURRENT_VERSION, entries: [] };
  }
  if (migrated.version !== store.value.version || migrated.entries !== store.value.entries) {
    store.value = migrated;
  }

  // エントリーの妥当性を検証し、不正なデータを除外
  const invalidCount = store.value.entries.filter(entry => !isValidEntry(entry)).length;
  if (invalidCount > 0) {
    console.error(`不正な住所録エントリーを${invalidCount}件除外しました`);
    store.value = { ...store.value, entries: store.value.entries.filter(entry => isValidEntry(entry)) };
  }

  // entries への便利アクセサ
  const entries = computed(() => store.value.entries);

  /**
   * ストアのentriesを更新するヘルパー
   */
  const setEntries = (newEntries: AddressEntry[]) => {
    store.value = { ...store.value, entries: newEntries };
  };

  /**
   * 住所録に新規登録
   */
  const addEntry = (
    name: string,
    type: 'destination' | 'sender',
    data: Partial<DestForm> | Partial<SenderForm>,
  ): AddressEntry => {
    if (!name.trim()) {
      throw new Error('登録名は必須です。');
    }

    // localStorage用の簡易ユニークID（シングルユーザー環境のため十分な一意性）
    const newEntry: AddressEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      type,
      data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
    };

    try {
      setEntries([...entries.value, newEntry]);
    }
    catch (error) {
      throw new Error('住所録の保存に失敗しました。ブラウザのストレージが利用できないか、容量が不足している可能性があります。', { cause: error });
    }

    return newEntry;
  };

  // updateEntryで変更可能なフィールドを制限（id, type, createdAtは不変）
  type UpdatableFields = Pick<AddressEntry, 'name' | 'data' | 'lastUsedAt'>;

  /**
   * 住所録エントリーを更新
   */
  const updateEntry = (id: string, updates: Partial<UpdatableFields>): AddressEntry | null => {
    const index = entries.value.findIndex(entry => entry.id === id);
    if (index === -1) {
      console.error(`住所録エントリーが見つかりません（ID: ${id}）。削除された可能性があります。`);
      return null;
    }

    const updated = {
      ...entries.value[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    try {
      // 配列全体を置き換えてリアクティビティとlocalStorage書き込みを確実にトリガー
      setEntries([
        ...entries.value.slice(0, index),
        updated,
        ...entries.value.slice(index + 1),
      ]);
    }
    catch (error) {
      throw new Error('住所録の更新に失敗しました。ブラウザのストレージが利用できないか、容量が不足している可能性があります。', { cause: error });
    }

    return updated;
  };

  /**
   * 住所録エントリーを削除
   */
  const deleteEntry = (id: string) => {
    try {
      setEntries(entries.value.filter((entry: AddressEntry) => entry.id !== id));
    }
    catch (error) {
      throw new Error('住所録の削除に失敗しました。', { cause: error });
    }
  };

  /**
   * 最終使用日を更新
   */
  const updateLastUsedAt = (id: string) => {
    const result = updateEntry(id, { lastUsedAt: new Date().toISOString() });
    if (!result) {
      console.error(`lastUsedAtの更新に失敗しました（ID: ${id}）`);
    }
  };

  /**
   * 特定タイプのエントリーを取得
   */
  const getEntriesByType = (type: 'destination' | 'sender') => {
    return entries.value.filter((entry: AddressEntry) => entry.type === type);
  };

  /**
   * エントリーをソート
   */
  const getSortedEntries = (
    type?: 'destination' | 'sender',
    sortBy: 'name' | 'date' | 'lastUsed' = 'lastUsed',
  ) => {
    // filter/spreadにより新しい配列を返す（後続のsortが元の配列を変更しないように）
    const targetEntries = type ? [...getEntriesByType(type)] : [...entries.value];

    switch (sortBy) {
      case 'name':
        return targetEntries.sort((a: AddressEntry, b: AddressEntry) => a.name.localeCompare(b.name, 'ja'));
      case 'date':
        return targetEntries.sort((a: AddressEntry, b: AddressEntry) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'lastUsed':
      default:
        // 最終使用日で降順ソート
        return targetEntries.sort((a: AddressEntry, b: AddressEntry) => new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime());
    }
  };

  /**
   * エントリーを検索
   */
  const searchEntries = (query: string, type?: 'destination' | 'sender') => {
    const normalizedQuery = query.toLowerCase();
    const targetEntries = type ? getEntriesByType(type) : entries.value;

    return targetEntries.filter((entry: AddressEntry) =>
      entry.name.toLowerCase().includes(normalizedQuery)
      || Object.values(entry.data).some((value: unknown) =>
        String(value).toLowerCase().includes(normalizedQuery),
      ),
    );
  };

  return {
    addressBook: readonly(entries),
    addEntry,
    updateEntry,
    deleteEntry,
    updateLastUsedAt,
    getEntriesByType,
    getSortedEntries,
    searchEntries,
  };
};
