import { LazyConfirmDialog } from '#components';

export const useConfirmDialog = () => {
  const confirm = async (options: {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
    cancelColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  }): Promise<boolean> => {
    try {
      const overlay = useOverlay();
      const modal = overlay.create(LazyConfirmDialog, {
        props: options,
      });
      const { result } = modal.open();
      return await result;
    }
    catch (error) {
      console.error('確認ダイアログの表示に失敗しました:', error);
      const toast = useToast();
      toast.add({
        title: '確認ダイアログを表示できませんでした',
        description: 'ページを再読み込みして、もう一度お試しください。',
        icon: 'i-mdi-alert',
        color: 'error',
      });
      return false;
    }
  };

  return {
    confirm,
  };
};
