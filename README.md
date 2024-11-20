# Multi Bet Nexus 🎲

Welcome to the CrossChain Betting Platform repository. This project aims to create a state-of-the-art online betting platform that operates seamlessly across multiple blockchains, including Solana, Ethereum, and BNB. 🌐

## Table of Contents 📚
- [Overview](#overview)
- [Current Functionality](#current-functionality)
- [Expansion Requirements](#expansion-requirements)
- [Games](#games)
- [Wallet Integration](#wallet-integration)
- [Security and Transactions](#security-and-transactions)
- [Performance and Scalability](#performance-and-scalability)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview 💡

Our platform is an innovative online betting site that offers a variety of games, including Dice, Slots, Flip, and more. Users can connect their wallets to participate in these games, place bets, and manage their funds directly through the site. 💰

## Current Functionality ✅

- Integration with the Solana blockchain.
- Users can connect their Phantom wallet to interact with the platform.
- Users can play Dice, Slots, Flip, and other betting games using their connected wallet.
- The platform processes bets and payouts securely on the Solana blockchain.

## Expansion Requirements 🚀

We are expanding the functionality to also support Ethereum and BNB chains. The requirements include:

1. **Multi-Chain Support**: Extend support to include Ethereum and BNB chains alongside Solana.
2. **Wallet Integration**: Add support for MetaMask wallet to enable users to connect using Ethereum and BNB, while maintaining Phantom wallet connectivity for Solana users.
3. **Cross-Chain Compatibility**: Ensure that betting functionalities work seamlessly across Solana, Ethereum, and BNB chains.

## Games 🎮

- **Dice**: A classic betting game where users wager on the outcome of dice rolls.
- **Slots**: A slot machine game where users spin to match symbols for a payout.
- **Flip**: A coin flip game where users bet on the outcome of a coin toss.
- **Other Games**: Additional betting games providing various betting experiences.

## Wallet Integration 🪙

- **Phantom Wallet**: Currently integrated for Solana users.
- **MetaMask Wallet**: To be integrated for Ethereum and BNB users.

## Security and Transactions 🔒

- Ensure secure processing of bets and payouts on all supported blockchains.
- Implement robust security measures to protect user funds and data.

## Performance and Scalability

- Optimize the platform for high performance and scalability to handle a large number of users and transactions across multiple blockchains.

## Getting Started

- Installing Dependecies:
 npm install --legacy-peer-deps
- Running project:
 npm run start
 npm run dev

## Folder Structure

```
project-root/
├── node_modules/
├── public/
│   ├── games/
│   │   ├── crash.png
│   │   ├── dice.png
│   │   ├── flip.png
│   │   ├── hilo.png
│   │   ├── mines.png
│   │   ├── plinko.png
│   │   ├── roulette.png
│   │   └── slots.png
│   ├── fakemoney.png
│   ├── favicon.png
│   ├── multi-bet-nexus.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── logo.svg
│   ├── manifest.webmanifest
│   └── stuff.png
├── server/
│   ├── config/
│   │   ├── config.env.example
│   │   └── database.js
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── data/
│   │   ├── images/
│   │   │   ├── 1594728176097-61zBrD4EswL._AC_SL1500_.jpg
│   │   │   ├── 1594728821919-714hGsMXZaL._AC_UX679_.jpg
│   │   │   ├── 1594738805136-71htAr2SpBL._AC_SL1500_.jpg
│   │   │   ├── 1594738887088-81+WmLbpzvL._AC_SL1500_.jpg
│   │   │   ├── 1594739091288-716irmhfMkL._AC_SL1500_.jpg
│   │   │   ├── 1594739168624-61NwNFbA9FL._AC_SL1000_.jpg
│   │   │   ├── 1594739262021-61TAggR+upL._AC_SL1500_.jpg
│   │   │   └── travel_macbookpro13_front.png
│   │   ├── invoice/
│   │   │   ├── invoice-5f0da2c500b7001ab054bcaf.pdf
│   │   │   ├── invoice-5f09c880622ce4371411fb65.pdf
│   │   │   ├── invoice-5f096ef911137b230cccbcde.pdf
│   │   │   └── invoice-5f156c42e74db20a30e0b5b0.pdf
│   │   ├── util/
│   │   │   ├── fileDelete.js
│   │   │   └── path.js
│   │   ├── cart.json
│   │   └── products.json
│   ├── middlewares/
│   │   ├── common/
│   │   │   └── index.js
│   │   ├── helpers/
│   │   │   ├── asyncErrorHandler.js
│   │   │   ├── createNotification.js
│   │   │   ├── dbConnection.js
│   │   │   ├── dbErrorHandler.js
│   │   │   ├── fileRemover.js
│   │   │   ├── geoDistance.js
│   │   │   ├── imageCompressor.js
│   │   │   ├── mailer.js
│   │   │   ├── multer.js
│   │   │   └── waterMarker.js
│   │   ├── user_actions/
│   │   │   ├── auth.js
│   │   │   ├── getRatingInfo.js
│   │   │   └── userHas.js
│   │   └── validator/
│   │       └── index.js
│   ├── models/
│   │   ├── Address.js
│   │   ├── Admin.js
│   │   ├── AdminBank.js
│   │   ├── AdminFiles.js
│   │   ├── AdminWarehouse.js
│   │   ├── Banner.js
│   │   ├── BusinessInfo.js
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Dispatcher.js
│   │   ├── Districts.js
│   │   ├── Lead.js
│   │   ├── ManualOrder.js
│   │   ├── minedProduct.js
│   │   ├── Notification.js
│   │   ├── Order.js
│   │   ├── orderModel.js
│   │   ├── Payment.js
│   │   ├── paymentModel.js
│   │   ├── Product.js
│   │   ├── ProductBrand.js
│   │   ├── ProductImages.js
│   │   ├── productModel.js
│   │   ├── QnA.js
│   │   ├── RefereshToken.js
│   │   ├── Remark.js
│   │   ├── Review.js
│   │   ├── SocketMapping.js
│   │   ├── SuggestKeywords.js
│   │   ├── User.js
│   │   ├── userModel.js
│   │   └── WishList.js
│   ├── public/
│   │   ├── css/
│   │   │   ├── auth.css
│   │   │   ├── cart.css
│   │   │   ├── forms.css
│   │   │   ├── main.css
│   │   │   ├── orders.css
│   │   │   └── product.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── android-chrome-192x192.png
│   ├── routes/
│   │   ├── orderRoute.js
│   │   ├── paymentRoute.js
│   │   ├── productRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   ├── apiFeatures.js
│   │   ├── errorHandler.js
│   │   ├── jwtToken.js
│   │   ├── searchFeatures.js
│   │   ├── sendEmail.js
│   │   └── sendToken.js
│   ├── app.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── Dropdown.tsx
│   │   ├── Icon.tsx
│   │   ├── index.tsx
│   │   ├── Modal.tsx
│   │   └── Slider.tsx
│   ├── games/
│   │   ├── CrashGame/
│   │   │   ├── crash.mp3
│   │   │   ├── index.tsx
│   │   │   ├── music.mp3
│   │   │   ├── rocket.gif
│   │   │   ├── Slider.tsx
│   │   │   ├── styles.ts
│   │   │   ├── utils.ts
│   │   │   └── win.mp3
│   │   ├── Dice/
│   │   │   ├── constants.ts
│   │   │   ├── index.tsx
│   │   │   ├── lose.mp3
│   │   │   ├── play.mp3
│   │   │   ├── Slider.tsx
│   │   │   ├── styles.ts
│   │   │   ├── tick.mp3
│   │   │   └── win.mp3
│   │   ├── ExampleGame/
│   │   │   ├── index.tsx
│   │   │   └── test.mp3
│   │   ├── Flip/
│   │   │   ├── Coin.glb
│   │   │   ├── coin.mp3
│   │   │   ├── Coin.tsx
│   │   │   ├── Effect.tsx
│   │   │   ├── heads.png
│   │   │   ├── index.tsx
│   │   │   ├── lose.mp3
│   │   │   ├── star.png
│   │   │   ├── tails.png
│   │   │   └── win.mp3
│   │   ├── HiLo/
│   │   │   ├── card.mp3
│   │   │   ├── constants.ts
│   │   │   ├── finish.mp3
│   │   │   ├── index.tsx
│   │   │   ├── lose.mp3
│   │   │   ├── play.mp3
│   │   │   ├── styles.ts
│   │   │   └── win.mp3
│   │   ├── Mines/
│   │   │   ├── axe.mp3
│   │   │   ├── constants.ts
│   │   │   ├── explode.mp3
│   │   │   ├── finish.mp3
│   │   │   ├── index.tsx
│   │   │   ├── step.mp3
│   │   │   ├── styles.ts
│   │   │   ├── tick.mp3
│   │   │   ├── types.ts
│   │   │   ├── utils.ts
│   │   │   └── win.mp3
│   │   ├── Plinko/
│   │   │   ├── bump.mp3
│   │   │   ├── fall.mp3
│   │   │   ├── game.ts
│   │   │   ├── index.tsx
│   │   │   └── win.mp3
│   │   ├── Roulette/
│   │   ├── Slots/
│   │   │   ├── assets/
│   │   │   ├── constants.ts
│   │   │   ├── index.tsx
│   │   │   ├── ItemPreview.styles.ts
│   │   │   ├── ItemPreview.tsx
│   │   │   ├── Slot.styles.ts
│   │   │   ├── Slot.tsx
│   │   │   ├── Slots.styles.ts
│   │   │   └── utils.ts
│   │   └── index.tsx
��   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useOnClickOutside.ts
│   │   ├── useToast.ts
│   │   └── useUserStore.ts
│   ├── sections/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── GameCard.tsx
│   │   │   └── WelcomeBanner.tsx
│   │   ├── Game/
│   │   │   ├── Game.styles.ts
│   │   │   ├── Game.tsx
│   │   │   ├── LoadingBar.tsx
│   │   │   ├── ProvablyFairModal.tsx
│   │   │   └── TransactionModal.tsx
│   │   ├── RecentPlays/
│   │   │   ├── RecentPlays.styles.ts
│   │   │   ├── RecentPlays.tsx
│   │   │   ├── ShareModal.tsx
│   │   │   └── useRecentPlays.ts
│   │   ├── Header.tsx
│   │   ├── Toasts.tsx
│   │   ├── TokenSelect.tsx
│   │   └── UserButton.tsx
│   ├── tests/  
│   │   ├── components/
│   │   │   └── MetaMaskWallet.test.tsx
│   │   ├── games/
│   │   │   └── Dice.test.tsx
│   │   └── integration/
│   │       └── MetaMaskIntegration.test.tsx
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.tsx
│   ├── styles.css
│   ├── styles.ts
│   └── utils.ts
├── .env.example
├── .eslintrc.yml
├── .gitignore
├── index.html
├── MetamaskIntegration.md
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```
