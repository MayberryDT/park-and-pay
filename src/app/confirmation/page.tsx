"use client";

import ConfirmationPage from '@/components/ConfirmationPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading confirmation...</p>}>
      <ConfirmationPage />
    </Suspense>
  );
}
