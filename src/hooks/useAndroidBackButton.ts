import { useEffect, useRef } from 'react';

interface BackButtonHandlers {
  hasOpenModal: boolean;
  onCloseModals: () => void;
  isSubView: boolean;
  onReturnToRoot: () => void;
}

export function useAndroidBackButton({
  hasOpenModal,
  onCloseModals,
  isSubView,
  onReturnToRoot,
}: BackButtonHandlers) {
  const handlersRef = useRef({
    hasOpenModal,
    onCloseModals,
    isSubView,
    onReturnToRoot,
  });

  useEffect(() => {
    handlersRef.current = {
      hasOpenModal,
      onCloseModals,
      isSubView,
      onReturnToRoot,
    };
  }, [hasOpenModal, onCloseModals, isSubView, onReturnToRoot]);

  // Manage history stack state whenever modal or subview changes
  useEffect(() => {
    if (hasOpenModal || isSubView) {
      window.history.pushState({ gserviaModal: true }, '');
    }
  }, [hasOpenModal, isSubView]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const { hasOpenModal: modalOpen, onCloseModals: closeModals, isSubView: subView, onReturnToRoot: returnRoot } = handlersRef.current;

      if (modalOpen) {
        // Prevent default browser exit and close modal
        closeModals();
      } else if (subView) {
        // Return to main services catalog
        returnRoot();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
