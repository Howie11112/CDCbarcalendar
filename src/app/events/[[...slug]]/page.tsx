'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 无条件重定向到首页
    router.push('/');
  }, [router]);

  return null;
}
