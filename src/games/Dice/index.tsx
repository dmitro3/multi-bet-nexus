/**
 * Dice Game
 * @path src/components/games/Dice/index.tsx
 * @description The Dice game component for the multi-bet-nexus platform.
 */
import { BPS_PER_WHOLE } from 'multi-bet-nexus-core-v2'
import { multi-bet-nexusUi, TokenValue, useCurrentPool, useSound, useWagerInput } from 'multi-bet-nexus-react-ui-v2'
import { usemulti-bet-nexus } from 'multi-bet-nexus-react-v2'
import React, { useState, useEffect } from 'react'
import Slider from './Slider'
import { SOUND_LOSE, SOUND_PLAY, SOUND_TICK, SOUND_WIN } from './constants'
import { Container, Result, RollUnder, Stats } from './styles'
import Web3 from 'web3'

const DICE_SIDES = 100

export const outcomes = (
  length: number,
  multiplierCallback: (resultIndex: number) => number | undefined,
) => {
  const payoutArray = Array.from({ length })
    .map((_, resultIndex) => {
      const payout = multiplierCallback(resultIndex) ?? 0
      return payout
    })
  const totalValue = payoutArray.reduce((p, x) => p + x, 0)
  return payoutArray.map((x) => Number(BigInt(x * BPS_PER_WHOLE) / BigInt(totalValue || 1) * BigInt(length)) / BPS_PER_WHOLE)
}

export default function Dice() {
  const multi-bet-nexus = usemulti-bet-nexus()
  const [wager, setWager] = useWagerInput()
  const pool = useCurrentPool()
  const [resultIndex, setResultIndex] = React.useState(-1)
  const [rollUnderIndex, setRollUnderIndex] = React.useState(Math.floor(DICE_SIDES / 2))
  const sounds = useSound({
    win: SOUND_WIN,
    play: SOUND_PLAY,
    lose: SOUND_LOSE,
    tick: SOUND_TICK,
  })

  const multiplier = Number(BigInt(DICE_SIDES * BPS_PER_WHOLE) / BigInt(rollUnderIndex)) / BPS_PER_WHOLE

  const bet = React.useMemo(
    () => outcomes(
      DICE_SIDES,
      (resultIndex) => {
        if (resultIndex < rollUnderIndex) {
          return (DICE_SIDES - rollUnderIndex)
        }
      }),
    [rollUnderIndex],
  )

  const maxWin = multiplier * wager

  const game = multi-bet-nexusUi.useGame()

  // MetaMask connection state
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== 'undefined'
  }

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (isMetaMaskInstalled()) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWeb3(new Web3(window.ethereum))
        setAccount(accounts[0])
        console.log('Connected account:', accounts[0])
      } catch (error) {
        console.error('User denied account access', error)
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to play.')
    }
  }

  useEffect(() => {
    // Check if user is already connected to MetaMask
    if (isMetaMaskInstalled()) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setWeb3(new Web3(window.ethereum))
          }
        })
    }
  }, [])

  const play = async () => {
    if (!account) {
      // Prompt user to connect to MetaMask if not already connected
      await connectMetaMask()
      return
    }

    sounds.play('play')

    await game.play({
      wager,
      bet,
    })

    const result = await game.result()

    setResultIndex(result.resultIndex)

    if (result.resultIndex < rollUnderIndex) {
      sounds.play('win')
    } else {
      sounds.play('lose')
    }
  }

  return (
    <>
      <multi-bet-nexusUi.Portal target="screen">
        <multi-bet-nexusUi.Responsive>
          <Container>
            <RollUnder>
              <div>
                <div>{rollUnderIndex + 1}</div>
                <div>Roll Under</div>
              </div>
            </RollUnder>
            <Stats>
              <div>
                <div>
                  {(rollUnderIndex / DICE_SIDES * 100).toFixed(0)}%
                </div>
                <div>Win Chance</div>
              </div>
              <div>
                <div>
                  {multiplier.toFixed(2)}x
                </div>
                <div>Multiplier</div>
              </div>
              <div>
                {maxWin > pool.maxPayout ? (
                  <div style={{ color: 'red' }}>
                    Too high
                  </div>
                ) : (
                  <div>
                    <TokenValue suffix="" amount={maxWin} />
                  </div>
                )}
                <div>Payout</div>
              </div>
            </Stats>
            <div style={{ position: 'relative' }}>
              {resultIndex > -1 &&
                <Result style={{ left: `${resultIndex / DICE_SIDES * 100}%` }}>
                  <div key={resultIndex}>
                    {resultIndex + 1}
                  </div>
                </Result>
              }
              <Slider
                disabled={multi-bet-nexus.isPlaying}
                range={[0, DICE_SIDES]}
                min={1}
                max={DICE_SIDES - 5}
                value={rollUnderIndex}
                onChange={
                  (value) => {
                    setRollUnderIndex(value)
                    sounds.play('tick')
                  }
                }
              />
            </div>
          </Container>
        </multi-bet-nexusUi.Responsive>
      </multi-bet-nexusUi.Portal>
      <multi-bet-nexusUi.Portal target="controls">
        <multi-bet-nexusUi.WagerInput
          value={wager}
          onChange={setWager}
        />
        <multi-bet-nexusUi.PlayButton onClick={play}>
          {account ? 'Roll' : 'Connect MetaMask'}
        </multi-bet-nexusUi.PlayButton>
      </multi-bet-nexusUi.Portal>
    </>
  )
}
