import { usemulti-bet-nexus, usemulti-bet-nexusProgram, useSendTransaction } from 'multi-bet-nexus-react-v2'
import { multi-bet-nexusPlatformContext, multi-bet-nexusUi } from 'multi-bet-nexus-react-ui-v2'
import React from 'react'
import { Icon } from '../../components/Icon'
import { Modal } from '../../components/Modal'

export function ProvablyFairModal(props: {onClose: () => void}) {
  const multi-bet-nexus = usemulti-bet-nexus()
  const platform = React.useContext(multi-bet-nexusPlatformContext)
  const [initializing, setInitializing] = React.useState(false)
  const program = usemulti-bet-nexusProgram()
  const sendTransaction = useSendTransaction()

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

  return (
    <Modal onClose={() => props.onClose()}>
      <h1>Provably Fair</h1>
      {!multi-bet-nexus.userCreated && (
        <>
          <p>
            Provably Fair allows you to verify that the result of each game was randomly generated. Since you are playing from this wallet for the first time, you can request the initial hashed seed ahead of time. After this it will be done automatically for each play.
          </p>
          <multi-bet-nexusUi.Button main disabled={initializing} onClick={initialize}>
            Get hashed seed
          </multi-bet-nexusUi.Button>
        </>
      )}
      {multi-bet-nexus.userCreated && (
        <>
          <p>
            Your client seed will affect the result of the next game you play.
          </p>
          <div style={{ display: 'grid', gap: '10px', width: '100%', padding: '20px' }}>
            <div>Next RNG Seed (sha256)</div>
            <multi-bet-nexusUi.TextInput
              value={multi-bet-nexus.nextRngSeedHashed ?? ''}
              disabled
            />
            <div>Client Seed</div>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <multi-bet-nexusUi.TextInput
                style={{ flexGrow: '1' }}
                value={platform.clientSeed}
                disabled={multi-bet-nexus.isPlaying}
                maxLength={32}
                onChange={platform.setClientSeed}
              />
              <multi-bet-nexusUi.Button
                disabled={multi-bet-nexus.isPlaying}
                onClick={() => platform.setClientSeed(String(Math.random() * 1e9 | 0))}
              >
                <Icon.Shuffle />
              </multi-bet-nexusUi.Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
