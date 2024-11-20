import { PublicKey } from '@solana/web3.js'
import { FAKE_TOKEN_MINT, multi-bet-nexusPlatformContext, multi-bet-nexusUi, PoolToken, TokenValue, useCurrentToken, useTokenBalance, useTokenMeta } from 'multi-bet-nexus-react-ui-v2'
import React from 'react'
import styled from 'styled-components'
import { Dropdown } from '../components/Dropdown'
import { Modal } from '../components/Modal'
import { POOLS } from '../constants'
import MetaMaskWallet from '../components/WalletConnection/MetaMaskWallet'

const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    height: 20px;
  }
`

const StyledTokenImage = styled.img`
  height: 20px;
  aspect-ratio: 1/1;
  border-radius: 50%;
`

const StyledTokenButton = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background: #ffffff11;
  }
`

function TokenImage({ mint, ...props }: {mint: PublicKey}) {
  const meta = useTokenMeta(mint)
  return (
    <StyledTokenImage src={meta.image} {...props} />
  )
}

function TokenSelectItem({ mint }: {mint: PublicKey}) {
  const balance = useTokenBalance(mint)
  return (
    <>
      <TokenImage mint={mint} /> <TokenValue mint={mint} amount={balance.balance} />
    </>
  )
}

export default function TokenSelect() {
  const [visible, setVisible] = React.useState(false)
  const [warning, setWarning] = React.useState(false)
  const context = React.useContext(multi-bet-nexusPlatformContext)
  const selectedToken = useCurrentToken()
  const balance = useTokenBalance()

  const selectPool = (pool: PoolToken) => {
    // if (multi-bet-nexus.isPlaying) return
    context.setPool(pool.token, pool.authority)
    setVisible(false)
    if (
      import.meta.env.VITE_REAL_PLAYS_DISABLED &&
      !pool.token.equals(FAKE_TOKEN_MINT)
    ) {
      setWarning(true)
    }
  }

  const click = () => {
    setVisible(!visible)
  }

  return (
    <>
      {warning && (
        <Modal>
          <h1>Real plays disabled</h1>
          <p>
            This platform only allows you to play with fake tokens.
          </p>
          <multi-bet-nexusUi.Button
            main
            onClick={() => {
              setWarning(false)
              context.setPool(FAKE_TOKEN_MINT)
            }}
          >
            Switch to fake tokens
          </multi-bet-nexusUi.Button>
        </Modal>
      )}
      <div style={{ position: 'relative' }}>
        <multi-bet-nexusUi.Button onClick={click}>
          {selectedToken && (
            <StyledToken>
              <TokenImage mint={selectedToken.mint} />
              <TokenValue amount={balance.balance} />
            </StyledToken>
          )}
        </multi-bet-nexusUi.Button>
        <Dropdown visible={visible}>
          {POOLS.map((pool, i) => (
            <StyledTokenButton onClick={() => selectPool(pool)} key={i}>
              <TokenSelectItem mint={pool.token} />
            </StyledTokenButton>
          ))}
        </Dropdown>
      </div>
      <MetaMaskWallet 
        onConnect={() => {/* Handle connect */}}
        onDisconnect={() => {/* Handle disconnect */}}
      />
    </>
  )
}
