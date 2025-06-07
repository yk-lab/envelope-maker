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
    const overlay = useOverlay();
    const modal = overlay.create(LazyConfirmDialog, {
      props: options,
    });
    const { result } = modal.open();
    return await result;
  };

  return {
    confirm,
  };
};
