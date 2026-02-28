import type { Font } from '@pdfme/common';

// モジュールレベルでstateを保持し、複数回呼び出してもキャッシュが効くようにする
const isFetching = ref(false);
const loadedNotoFont = ref<Font['value'] | null>(null);

export const useFont = () => {
  const notoFont = async (): Promise<Font['value']> => {
    if (!loadedNotoFont.value) {
      isFetching.value = true;

      try {
        const response = await fetch('/fonts/NotoSansJP-Regular.otf');
        if (!response.ok) {
          throw new Error(`フォント取得に失敗しました: HTTP ${response.status}`);
        }
        const fontData = await response.arrayBuffer();

        loadedNotoFont.value = {
          fallback: false,
          data: fontData,
        };
      }
      catch (error) {
        // ローカルフォントはsame-origin静的ファイルのためほぼ失敗しないが、万一に備えてCDNフォールバック
        console.error('ローカルフォントの読み込みに失敗しました。Google Fontsにフォールバックします:', error);
        loadedNotoFont.value = {
          fallback: false,
          data: 'https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf',
        };
      }
      finally {
        isFetching.value = false;
      }
    }
    return loadedNotoFont.value;
  };

  return { notoFont, isFetching: readonly(isFetching) };
};
