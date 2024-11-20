import { multi-bet-nexusTransaction } from 'multi-bet-nexus-core-v2'
import { usemulti-bet-nexusEventListener, usemulti-bet-nexusEvents, useWalletAddress } from 'multi-bet-nexus-react-v2'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { PLATFORM_CREATOR_ADDRESS } from '../../constants'

interface Params {
  showAllPlatforms?: boolean
}

export function useRecentPlays(params: Params = {}) {
  const { showAllPlatforms = false } = params
  const location = useLocation()
  const userAddress = useWalletAddress()

  // Fetch previous events
  const previousEvents = usemulti-bet-nexusEvents(
    'GameSettled',
    { address: !showAllPlatforms ? PLATFORM_CREATOR_ADDRESS : undefined },
  )

  const [newEvents, setEvents] = React.useState<multi-bet-nexusTransaction<'GameSettled'>[]>([])

  // Listen for new events
  usemulti-bet-nexusEventListener(
    'GameSettled',
    (event) => {
      // Ignore events that occured on another platform
      if (!showAllPlatforms && !event.data.creator.equals(PLATFORM_CREATOR_ADDRESS)) return
      // Set a delay on games with suspenseful reveal
      const delay = event.data.user.equals(userAddress) && ['plinko', 'slots'].some((x) => location.pathname.includes(x)) ? 3000 : 1
      setTimeout(
        () => {
          setEvents((events) => [event, ...events])
        },
        delay,
      )
    },
    [location.pathname, userAddress, showAllPlatforms],
  )

  // Merge previous & new events
  return React.useMemo(
    () => {
      return [...newEvents, ...previousEvents]
    },
    [newEvents, previousEvents],
  )
}
