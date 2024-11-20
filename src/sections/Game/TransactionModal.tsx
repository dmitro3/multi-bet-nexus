import { decodeGame, getGameAddress, getPlayerUnderlyingAta, getUserUnderlyingAta } from 'multi-bet-nexus-core-v2'
import { multi-bet-nexusUi } from 'multi-bet-nexus-react-ui-v2'
import { useAccount, usemulti-bet-nexus, usemulti-bet-nexusProgram, useSendTransaction, useTransactionStore, useWalletAddress } from 'multi-bet-nexus-react-v2'
import React from 'react'
import { Modal } from '../../components/Modal'
import { LoadingBar, useLoadingState } from './LoadingBar'

export function TransactionModal(props: {onClose: () => void}) {
  const [closingAccount, setClosingAccount] = React.useState(false)
  const [initializing, setInitializing] = React.useState(false)
  const program = usemulti-bet-nexusProgram()
  const sendTransaction = useSendTransaction()
  const userAddress = useWalletAddress()
  const multi-bet-nexus = usemulti-bet-nexus()
  const game = useAccount(getGameAddress(userAddress), decodeGame)
  const txStore = useTransactionStore()
  const loadingState = useLoadingState()
  const status = Object.keys(game?.status ?? {})[0]

  const initialize = async () => {
    try {
      setInitializing(true)
      await sendTransaction(
        program.methods
          .playerInitialize()
          .instruction(),
        { confirmation: 'confirmed' },
      )
    } finally {
      setInitializing(false)
    }
  }

  const reset = async () => {
    if (!game) return
    // if (game.bonusUsed) {
    //   const bonus = getPlayerBonusAtaForPool(game.user, game.pool)
    // }

    const playerAta = getPlayerUnderlyingAta(userAddress, game.tokenMint)
    const userUnderlyingAta = getUserUnderlyingAta(userAddress, game.tokenMint)
    const ix = program.methods
      .playerClaim()
      .accounts({
        playerAta,
        underlyingTokenMint: game.tokenMint,
        userUnderlyingAta,
      })
      .instruction()

    await sendTransaction(
      ix,
      { confirmation: 'confirmed' },
    )
  }

  const closeAccount = async () => {
    try {
      setClosingAccount(true)
      await sendTransaction(
        program.methods
          .playerClose()
          .instruction(),
        { confirmation: 'confirmed' },
      )
    } finally {
      setClosingAccount(false)
    }
  }

  return (
    <Modal onClose={() => props.onClose()}>
      <h1>Transaction</h1>
      {loadingState} - {txStore.state} - {status} - {multi-bet-nexus.nonce.toString()}
      <div style={{ display: 'flex', gap: '10px' }}>
        <multi-bet-nexusUi.Button disabled={multi-bet-nexus.userCreated || initializing} onClick={initialize}>
          Open account
        </multi-bet-nexusUi.Button>
        <multi-bet-nexusUi.Button onClick={reset}>
          Reset account
        </multi-bet-nexusUi.Button>
        <multi-bet-nexusUi.Button disabled={!multi-bet-nexus.userCreated || closingAccount} onClick={closeAccount}>
          Close account
        </multi-bet-nexusUi.Button>
        {txStore.txId && (
          <multi-bet-nexusUi.Button main onClick={() => window.open('https://solscan.io/tx/' + txStore.txId)}>
            View TX
          </multi-bet-nexusUi.Button>
        )}
      </div>
      <LoadingBar />
    </Modal>
  )
}
