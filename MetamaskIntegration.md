# MetaMask Wallet Integration using WalletConnect

## Overview

This project enhances an existing betting platform by adding **MetaMask wallet integration**. Previously, the platform supported only **Phantom wallet** for Solana users. With this update, users can now connect their **MetaMask wallets** to interact with the platform using **Ethereum** and **BNB** chains, allowing them to place bets, manage funds, and participate in betting games like **Dice**, **Slots**, and **Flip**.

This integration uses the **WalletConnect** library, enabling seamless wallet connections for Ethereum Virtual Machine (EVM)-compatible chains such as Ethereum, BNB, and Polygon.

## Changes Made to Implement MetaMask Integration

### 1. **MetaMask Wallet Connection**
   - Implemented **MetaMask** wallet connection using **WalletConnect** to allow users to connect their Ethereum or BNB-based wallets.
   - Added logic to detect if MetaMask is installed and prompt the user to connect if they haven't already.

### 2. **Component Update: MetaMask Wallet Integration**
   - **MetaMask Connection Logic**: Added a check to see if MetaMask is installed. If MetaMask is not detected, the user is prompted to install it.
   - **Connection State**: Integrated state management to track whether the wallet is connected and to store the connected account.

   Example code for connection logic:
   ```typescript
   const connectMetaMask = async () => {
     if (window.ethereum) {
       try {
         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         setWeb3(new Web3(window.ethereum));
         setAccount(accounts[0]);
       } catch (error) {
         console.error('User denied account access:', error);
       }
     } else {
       alert('MetaMask is not installed. Please install it to use this feature.');
     }
   };
### 3. **Play Button Interaction**
- Modified the **Play** button to ensure that the user is prompted to connect to MetaMask if they are not already connected.
- The button is disabled until the wallet is connected, and the user can only play the game once they have connected their MetaMask wallet.
- The play action also checks if the user is connected to the correct network (Ethereum or BNB).

#### Example of the modified `play` function:

```typescript
const play = async () => {
  if (!account) {
    // Prompt user to connect to MetaMask if not already connected
    await connectMetaMask();
    return;
  }

  sounds.play('play');

  await game.play({
    wager,
    bet,
  });

  const result = await game.result();

  setResultIndex(result.resultIndex);

  if (result.resultIndex < rollUnderIndex) {
    sounds.play('win');
  } else {
    sounds.play('lose');
  }
};

### 4. **State Management for MetaMask**
- Added state variables to track whether MetaMask is connected and which account is currently in use.

#### Example state management for the wallet:

```typescript
const [web3, setWeb3] = useState<Web3 | null>(null);
const [account, setAccount] = useState<string | null>(null);
```

### 5. **Switching Chains**
- Implemented a function to switch the connected chain to Ethereum or BNB.
- This function is called when the user selects a different chain from the dropdown menu.
- Integrated MetaMask wallet into the **Dice** game component.
- Ensured the game logic is paused until the user connects MetaMask.
- Updated the **Play** button to only allow interaction once MetaMask is connected.

### Installation and Setup
To set up the project locally with MetaMask integration, follow these steps:

1. Clone the Repository:

```
git clone https://bitbucket.org/human_glb/multi-bet-nexus.git
```
2. Navigate to the project directory:
```
cd multi-bet-nexus
```
3. Install Dependencies:

```
npm install --legacy-peer-deps
```
4. Run the Project:

- For production:
```
npm run start
```
- For development:
```
npm run dev
```
### Usage
Once the project is running, you can test the MetaMask wallet integration by following these steps:

1. Open the application in your browser.
2. Connect MetaMask: Click the "Connect MetaMask" button and follow the prompts to connect your wallet.
3. Choose a network: Ensure that you are connected to Ethereum or BNB chain via MetaMask.
4. Place Bets: Once connected, participate in betting games like Dice using ETH, BNB, or other EVM currencies.
Manage Funds: Use MetaMask to manage funds, place bets, and receive payouts.
### Testing the Integration
1. Connect MetaMask: Ensure MetaMask is properly connected and displays the correct network (Ethereum or BNB).
2. Check Wallet Status: The UI will prompt you to connect MetaMask if it is not already connected.
3. Play the Game:
The "Roll" button is enabled only after MetaMask is connected.
Ensure that transactions flow correctly from placing the bet to receiving the result.
4. Cross-Chain Compatibility: Verify that bets and payouts work seamlessly across Solana, Ethereum, and BNB.
### Future Improvements
- Additional Wallet Support: Extend support for other wallets (e.g., WalletConnect-compatible wallets).
- Additional Games: Add more games to the platform to expand user engagement.
- Enhanced Security: Strengthen security measures for fund management and user data protection across all chains.
## License
This project is licensed under the MIT License.
