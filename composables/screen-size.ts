export function useScreenSize() {
  const innerWidth = ref(0);
  const isCompactMode = computed(() => innerWidth.value < 640);

  // ウィンドウサイズを更新
  const updateWindowSize = () => {
    innerWidth.value = window.innerWidth;
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
