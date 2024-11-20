import { computed } from '@preact/signals-react'
import { multi-bet-nexusUi, TokenValue, useCurrentPool, useCurrentToken, useSound, useUserBalance } from 'multi-bet-nexus-react-ui-v2'
import { usemulti-bet-nexus } from 'multi-bet-nexus-react-v2'
import React from 'react'
import styled from 'styled-components'
import { Chip } from './Chip'
import { StyledResults } from './Roulette.styles'
import { Table } from './Table'
import { CHIPS, SOUND_LOSE, SOUND_PLAY, SOUND_WIN } from './constants'
import { addResult, bet, clearChips, results, selectedChip, totalChipValue } from './signals'

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  color: white;
`
function Results() {
  const _results = computed(() => [...results.value].reverse())
  return (
    <StyledResults>
      {_results.value.map((index, i) => {
        return (
          <div key={i}>
            {index + 1}
          </div>
        )
      })}
    </StyledResults>
  )
}

function Stats() {
  const pool = useCurrentPool()
  const token = useCurrentToken()
  const balance = useUserBalance()
  const wager = totalChipValue.value * token.baseWager / 10_000

  const multiplier = Math.max(...bet.value)
  const maxPayout = multiplier * wager
  const maxPayoutExceeded = maxPayout > pool.maxPayout
  const balanceExceeded = wager > (balance.balance + balance.bonusBalance)

  return (
    <div style={{ textAlign: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        {balanceExceeded ? (
          <span style={{ color: '#ff0066' }}>
            TOO HIGH
          </span>
        ) : (
          <>
            <TokenValue amount={wager} />
          </>
        )}
        <div>Wager</div>
      </div>
      <div>
        <div>
          {maxPayoutExceeded ? (
            <span style={{ color: '#ff0066' }}>
              TOO HIGH
            </span>
          ) : (
            <>
              <TokenValue amount={maxPayout} />
              ({multiplier.toFixed(2)}x)
            </>
          )}
        </div>
        <div>Potential win</div>
      </div>
    </div>
  )
}

export default function Roulette() {
  const game = multi-bet-nexusUi.useGame()
  const token = useCurrentToken()
  const pool = useCurrentPool()
  const balance = useUserBalance()
  const multi-bet-nexus = usemulti-bet-nexus()

  const sounds = useSound({
    win: SOUND_WIN,
    lose: SOUND_LOSE,
    play: SOUND_PLAY,
  })

  const wager = totalChipValue.value * token.baseWager / 10_000

  const multiplier = Math.max(...bet.value)
  const maxPayout = multiplier * wager
  const maxPayoutExceeded = maxPayout > pool.maxPayout
  const balanceExceeded = wager > (balance.balance + balance.bonusBalance)

  const play = async () => {
    await game.play({
      bet: bet.value,
      wager,
    })
    sounds.play('play')
    const result = await game.result()
    addResult(result.resultIndex)
    if (result.payout > 0) {
      sounds.play('win')
    } else {
      sounds.play('lose')
    }
  }

  return (
    <>
      <multi-bet-nexusUi.Portal target="screen">
        <multi-bet-nexusUi.Responsive>
          <Wrapper onContextMenu={(e) => e.preventDefault()}>
            <Stats />
            <Results />
            <Table />
          </Wrapper>
        </multi-bet-nexusUi.Responsive>
      </multi-bet-nexusUi.Portal>
      <multi-bet-nexusUi.Portal target="controls">
        <multi-bet-nexusUi.Select
          options={CHIPS}
          value={selectedChip.value}
          onChange={(value) => selectedChip.value = value}
          label={(value) => (
            <>
              <Chip value={value} /> = <TokenValue amount={token.baseWager * value} />
            </>
          )}
        />
        <multi-bet-nexusUi.Button
          disabled={!wager || multi-bet-nexus.isPlaying}
          onClick={clearChips}
        >
          Clear
        </multi-bet-nexusUi.Button>
        <multi-bet-nexusUi.PlayButton disabled={!wager || balanceExceeded || maxPayoutExceeded} onClick={play}>
          Spin
        </multi-bet-nexusUi.PlayButton>
      </multi-bet-nexusUi.Portal>
    </>
  )
}
