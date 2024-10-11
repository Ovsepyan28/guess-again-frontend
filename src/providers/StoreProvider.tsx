'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { useWhoami } from '@/hooks/useWhoami';
import { setUser } from '@/redux/features/user/userSlice';
import { AppStore, makeStore } from '@/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const { user } = useWhoami();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (user) {
      storeRef.current?.dispatch(setUser(user));
    }
  }, [user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
