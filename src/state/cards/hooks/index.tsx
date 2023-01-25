import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ICard } from 'state/type'
import { AppState, useAppDispatch } from '../../index'
import {
  setCard,
} from '../actions'

export function useCardInfoManager() {
  const dispatch = useAppDispatch()

  const cards = useSelector<
    AppState,
    AppState['cards']['data']
  >((state) => state.cards.data)

  const setCardAction = useCallback(
    (newState: ICard) => {
      dispatch(setCard(newState))
    },
    [dispatch],
  )

  return {
    cards,
    setCardAction,
  } as const
}
