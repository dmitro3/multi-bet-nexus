/**
 * useMultiChain
 * @path src/hooks/useMultiChain.ts
 * @description A custom hook for managing multiple chains.
 */
import { useState } from 'react';

/**
 * Custom hook for managing and switching between multiple blockchain chains
 * @returns {Object} An object containing the selected chain and a function to switch chains
 */
const useMultiChain = () => {
  /**
   * State to store the currently selected chain
   * @type {string}
   */
  const [selectedChain, setSelectedChain] = useState('ethereum'); // default to Ethereum

  /**
   * Function to switch the current chain
   * @param {string} chain - The chain to switch to ('ethereum' or 'binance')
   */
  const switchChain = (chain: string) => {
    setSelectedChain(chain);
    if (window.ethereum) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain === 'ethereum' ? '0x1' : '0x38' }],
      });
    }
  };

  return { selectedChain, switchChain };
};

export default useMultiChain;
