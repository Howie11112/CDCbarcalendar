'use client';

import React from 'react';
import { TranslationExample } from '../../components/TranslationExample';
import '../../i18n/config';

export default function TranslationTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TranslationExample />
    </div>
  );
} 