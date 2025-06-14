export const GAME_CONTRACT_ADDRESS_SEPOLIA =
  '0x7eFc99DF7e8a2b01E2E3d905c37e45F8d3FB227F';
export const GAME_CONTRACT_ADDRESS_SIGNED_SEPOLIA =
  '0xDC587Db60a0c58ae7bf2D3a49dA340dB9d4b4EA7';

export const GAME_CONTRACT_ADDRESS =
  '0x9a68a6af680E33c59B7e1c34eCc8bbedf6b5B75B';
export const GAME_CONTRACT_ADDRESS_SIGNED =
  '0xE323a94B01ABfE4CEa4A2494e655d87dCA68B697';

// Paymaster URL for gasless transactions
if (!process.env.NEXT_PUBLIC_PAYMASTER_URL) {
  console.warn(
    'Warning: NEXT_PUBLIC_PAYMASTER_URL is not set in environment variables'
  );
}
if (!process.env.NEXT_PUBLIC_PAYMASTER_URL_SEPOLIA) {
  console.warn(
    'Warning: NEXT_PUBLIC_PAYMASTER_URL_SEPOLIA is not set in environment variables'
  );
}

export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;
export const PAYMASTER_URL_SEPOLIA =
  process.env.NEXT_PUBLIC_PAYMASTER_URL_SEPOLIA;

// Fee required to start a game (in ETH)
export const PLAY_FEE_ETH = '0.0001';
export const PLAY_FEE_USDC = '0.1';
