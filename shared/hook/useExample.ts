'use client';

import { useState } from 'react';

export const useExample = () => {
  const [example, exampleSet] = useState<string | null>(null);

  const toggle = (id: string) => {
    exampleSet((prev) => (prev === id ? null : id));
  };

  return { example, toggle };
};