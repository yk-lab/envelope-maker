import type { Font } from '@pdfme/common';

export const useFont = () => {
  const isFetching = ref(false);
  const loadedNotoFont = ref<Font['value'] | null>(null);

  const notoFont = async (): Promise<Font['value']> => {
    if (!loadedNotoFont.value) {
      isFetching.value = true;

      try {
        const response = await fetch('/fonts/NotoSansJP-Regular.otf');
        const fontData = await response.arrayBuffer();

        loadedNotoFont.value = {
          fallback: false,
          data: fontData,
        };
      }
      catch (error) {
        console.error('Failed to load local font:', error);
        // Fallback to Google Fonts URL if local load fails
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
