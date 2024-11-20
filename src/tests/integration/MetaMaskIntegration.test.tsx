import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ethers, JsonRpcProvider } from 'ethers';
import MetaMaskIntegration from '../../components/WalletConnection/MetaMaskWallet';


// Mock ethers
jest.mock('ethers');

describe('MetaMask Integration', () => {
  let mockProvider: jest.Mocked<ethers.BrowserProvider>;
  let mockSigner: jest.Mocked<ethers.Signer>;

  beforeEach(() => {
    // Setup mock provider and signer
    mockSigner = {
      getAddress: jest.fn().mockResolvedValue('0x1234567890123456789012345678901234567890'),
      // Add other necessary mock methods
    } as unknown as jest.Mocked<ethers.Signer>;

    mockProvider = {
      getSigner: jest.fn().mockReturnValue(mockSigner),
      // Add other necessary mock methods
    } as unknown as jest.Mocked<ethers.BrowserProvider>;

    (window as any).ethereum = {
      request: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn(),
    };

    (JsonRpcProvider as jest.Mock).mockReturnValue(mockProvider);
  });

  test('connects to MetaMask when button is clicked', async () => {
    const mockOnConnect = jest.fn();
    const mockOnDisconnect = jest.fn();

    render(
      <MetaMaskIntegration
        onConnect={() => {}}
        onDisconnect={() => {}}
      />
    );

    const connectButton = screen.getByText('Connect to MetaMask');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(window.ethereum.request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' });
    });

    expect(await screen.findByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('0x1234...7890')).toBeInTheDocument();
  });

  test('displays error message when MetaMask is not installed', async () => {
    (window as any).ethereum = undefined;

    render(
        <MetaMaskIntegration
          onConnect={() => {}}
          onDisconnect={() => {}}
        />
      );
    
    const connectButton = screen.getByText('Connect to MetaMask');
    fireEvent.click(connectButton);

    expect(await screen.findByText('MetaMask is not installed')).toBeInTheDocument();
  });

  test('updates account when MetaMask account changes', async () => {
    const mockOnConnect = jest.fn();
    const mockOnDisconnect = jest.fn();

    render(<MetaMaskIntegration onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    
    // Simulate initial connection
    const connectButton = screen.getByText('Connect to MetaMask');
    fireEvent.click(connectButton);

    await waitFor(() => {
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });

    // Simulate account change
    const accountsChangedCallback = (window.ethereum.on as jest.Mock).mock.calls.find(call => call[0] === 'accountsChanged')[1];
    accountsChangedCallback(['0x9876543210987654321098765432109876543210']);

    await waitFor(() => {
      expect(screen.getByText('0x9876...3210')).toBeInTheDocument();
    });
  });
});
