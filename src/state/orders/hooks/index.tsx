import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../../index'
import {
  setOrder,
} from '../actions'

export function useOrderInfoManager() {
  const dispatch = useAppDispatch()

  const orders = useSelector<
    AppState,
    AppState['orders']['data']
  >((state) => state.orders.data)

  const setOrderAction = useCallback(
    (newState: any) => {
      dispatch(setOrder(newState))
    },
    [dispatch],
  )

  return {
    orders,
    setOrderAction,
  } as const
}
