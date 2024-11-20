/**
 * MetaMaskWallet
 * @path src/components/WalletConnection/MetaMaskWallet.tsx
 * @description The MetaMask wallet component for the multi-bet-nexus platform.
 */

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { multi-bet-nexusUi } from 'multi-bet-nexus-react-ui-v2';
import { Card} from '../../games/HiLo/styles'

/**
 * Props for the MetaMaskWallet component
 * @interface MetaMaskWalletProps
 */
interface MetaMaskWalletProps {
  /** Callback function when wallet is connected */
  onConnect: (address: string) => void;
  /** Callback function when wallet is disconnected */
  onDisconnect: () => void;
}

/**
 * MetaMask wallet component for connecting and managing Ethereum wallet
 * @param {MetaMaskWalletProps} props - The component props
 * @returns {JSX.Element} The MetaMask wallet component
 */
const MetaMaskWallet: React.FC<MetaMaskWalletProps> = ({ onConnect, onDisconnect }) => {
  /** State to track if the wallet is connected */
  const [isConnected, setIsConnected] = useState(false);
  /** State to store the user's Ethereum address */
  const [userAddress, setUserAddress] = useState<string | null>(null);

  /**
   * Effect hook to check connection and set up event listeners
   */
  useEffect(() => {
    checkConnection();
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  /**
   * Checks if the wallet is already connected
   * @async
   */
  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
          onConnect(accounts[0]);
        }
      } catch (error) {
        console.error('Failed to get accounts', error);
      }
    }
  };

  /**
   * Connects the MetaMask wallet
   * @async
   */
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);
        setUserAddress(address);
        onConnect(address);
      } catch (error) {
        console.error('Failed to connect to MetaMask', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };

  /**
   * Disconnects the MetaMask wallet
   */
  const disconnectWallet = () => {
    setIsConnected(false);
    setUserAddress(null);
    onDisconnect();
  };

  /**
   * Handles changes in connected accounts
   * @param {string[]} accounts - Array of account addresses
   */
  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setUserAddress(accounts[0]);
      onConnect(accounts[0]);
    } else {
      setIsConnected(false);
      setUserAddress(null);
      onDisconnect();
    }
  };

  return (
    <>
      <multi-bet-nexusUi.Portal target="screen">
        <multi-bet-nexusUi.Responsive>
          <Card>
            <div>MetaMask Wallet</div>
            <div>
              Status: {isConnected ? 'Connected' : 'Not Connected'}
            </div>
            {userAddress && (
              <div>
                Address: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </div>
            )}
          </Card>
        </multi-bet-nexusUi.Responsive>
      </multi-bet-nexusUi.Portal>
      <multi-bet-nexusUi.Portal target="controls">
        {isConnected ? (
          <multi-bet-nexusUi.Button onClick={disconnectWallet}>
            Disconnect
          </multi-bet-nexusUi.Button>
        ) : (
          <multi-bet-nexusUi.Button onClick={connectWallet}>
            Connect MetaMask
          </multi-bet-nexusUi.Button>
        )}
      </multi-bet-nexusUi.Portal>
    </>
  );
};

export default MetaMaskWallet;
