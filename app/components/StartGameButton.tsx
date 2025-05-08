'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { useState } from 'react';
import { AirdropABI } from '../utils/abis/AirdropABI';
//import { AirdropSignedABI } from '../utils/abis/AirdropSignedABI';
import { baseSepolia } from 'viem/chains';
import { parseEther } from 'viem';
import { encodeFunctionData } from 'viem';
import { useSendCalls } from 'wagmi/experimental';
import {
  GAME_CONTRACT_ADDRESS,
  PAYMASTER_URL_SEPOLIA,
  //PLAY_FEE_USDC,
  PLAY_FEE_ETH,
} from '../utils/constants';
import { useRouter } from 'next/navigation';

export function StartGameButton() {
  const router = useRouter();
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { switchChain } = useSwitchChain();
  const { sendCallsAsync } = useSendCalls({
    mutation: {
      onSuccess: () => {
        setSuccess(true);
        router.push('/category-select');
      },
      onError: (error) => {
        console.error('Error starting game:', error);
        setError('Failed to start game. Please try again.');
      },
    },
  });

  const handleStartGame = async () => {
    if (!account.isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!account.chainId) {
      setError('Please connect to Base network');
      return;
    }

    if (account.chainId !== baseSepolia.id) {
      switchChain({ chainId: baseSepolia.id });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = encodeFunctionData({
        abi: AirdropABI,
        functionName: 'fundContract',
      });

      await sendCallsAsync({
        calls: [
          {
            to: GAME_CONTRACT_ADDRESS,
            data,
            value: parseEther(PLAY_FEE_ETH),
          },
        ],
        capabilities: {
          paymasterService: {
            url: PAYMASTER_URL_SEPOLIA,
          },
        },
      });
    } catch (err) {
      console.error('Error starting game:', err);
      setError('Failed to start game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='text-center'>
      {error && (
        <div className='mb-4'>
          <p className='text-red-500'>{error}</p>
        </div>
      )}
      {success && (
        <div className='mb-4'>
          <p className='text-green-500'>Game started successfully! 🎮</p>
        </div>
      )}
      <button
        onClick={handleStartGame}
        disabled={isLoading || !account.isConnected}
        className='px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
            Starting Game...
          </div>
        ) : !account.isConnected ? (
          'Connect Wallet'
        ) : (
          'Start Game'
        )}
      </button>
    </div>
  );
}
