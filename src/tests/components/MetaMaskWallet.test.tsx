/// <reference types="jest" />

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetaMaskWallet from '../../components/WalletConnection/MetaMaskWallet';

// Mock ethers
jest.mock('ethers', () => ({
  BrowserProvider: jest.fn(),
  Contract: jest.fn(),
}));

// Mock window.ethereum
const mockEthereum = {
  request: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
};

global.window.ethereum = mockEthereum;

describe('MetaMaskWallet Component', () => {
  const mockOnConnect = jest.fn();
  const mockOnDisconnect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders connect button when not connected', () => {
    render(<MetaMaskWallet onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    expect(screen.getByText('Connect MetaMask')).toBeInTheDocument();
  });

  test('connects wallet when button is clicked', async () => {
    mockEthereum.request.mockResolvedValueOnce(['0x123']);
    
    render(<MetaMaskWallet onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    
    fireEvent.click(screen.getByText('Connect MetaMask'));
    
    await waitFor(() => {
      expect(mockOnConnect).toHaveBeenCalledWith('0x123');
    });
  });

  test('disconnects wallet when disconnect button is clicked', async () => {
    mockEthereum.request.mockResolvedValueOnce(['0x123']);
    
    render(<MetaMaskWallet onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    
    // Connect first
    fireEvent.click(screen.getByText('Connect MetaMask'));
    await waitFor(() => {
      expect(screen.getByText('Disconnect')).toBeInTheDocument();
    });

    // Then disconnect
    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockOnDisconnect).toHaveBeenCalled();
  });

  test('handles account changes', async () => {
    mockEthereum.request.mockResolvedValueOnce(['0x123']);
    
    render(<MetaMaskWallet onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    
    // Simulate account change
    const accountsChangedHandler = mockEthereum.on.mock.calls.find(call => call[0] === 'accountsChanged')[1];
    accountsChangedHandler(['0x456']);

    await waitFor(() => {
      expect(mockOnConnect).toHaveBeenCalledWith('0x456');
    });
  });

  test('shows error message when MetaMask is not installed', () => {
    delete global.window.ethereum;

    render(<MetaMaskWallet onConnect={mockOnConnect} onDisconnect={mockOnDisconnect} />);
    
    expect(screen.getByText('MetaMask is not installed')).toBeInTheDocument();

    // Restore window.ethereum for other tests
    global.window.ethereum = mockEthereum;
  });
});
