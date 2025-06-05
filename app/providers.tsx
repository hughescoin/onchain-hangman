'use client';

import { baseSepolia } from 'wagmi/chains';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import type { ReactNode } from 'react';
import { PAYMASTER_URL } from './utils/constants';
export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_MINIKIT_API_KEY}
      chain={baseSepolia}
      config={{ appearance: { mode: 'auto' }, paymaster: PAYMASTER_URL }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
