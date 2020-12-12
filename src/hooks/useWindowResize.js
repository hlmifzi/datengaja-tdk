import { useEffect } from 'react';

// Hook
function useWindowResize(handleResize, { onFirstRender, disabled } = {}) {
  const isClient = typeof window === 'object';

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    onFirstRender && _handleResize();

    function _handleResize() {
      handleResize();
    }

    if (!disabled) {
      window.addEventListener('resize', _handleResize);
      return () => window.removeEventListener('resize', _handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

}

export default useWindowResize;