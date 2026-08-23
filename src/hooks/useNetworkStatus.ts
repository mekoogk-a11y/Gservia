import { useState, useEffect } from 'react';

export interface NetworkState {
  isOnline: boolean;
  since: Date | null;
  effectiveType?: string;
}

export function useNetworkStatus(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    since: null,
    effectiveType: typeof navigator !== 'undefined' && 'connection' in navigator 
      ? (navigator as any).connection?.effectiveType 
      : undefined,
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetworkState({
        isOnline: true,
        since: new Date(),
        effectiveType: 'connection' in navigator ? (navigator as any).connection?.effectiveType : undefined,
      });
    };

    const handleOffline = () => {
      setNetworkState({
        isOnline: false,
        since: new Date(),
        effectiveType: undefined,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return networkState;
}
