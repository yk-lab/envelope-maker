export function useScreenSize(breakpoint: number = 640) {
  const innerWidth = ref(0);
  const isCompactMode = computed(() => innerWidth.value < breakpoint);

  // ウィンドウサイズを更新
  const updateWindowSize = () => {
    if (import.meta.client) {
      innerWidth.value = window.innerWidth;
    }
  };

  onMounted(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize);
  });

  return {
    innerWidth: readonly(innerWidth),
    isCompactMode: readonly(isCompactMode),
  };
}
