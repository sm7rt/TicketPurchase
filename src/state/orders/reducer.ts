import { createReducer } from '@reduxjs/toolkit'
import {
  setOrder,
} from './actions'

export const initialState = {
  data: []
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setOrder, (state: any, action: any) => {
      state.data = [action.payload, ...state.data]
    })
)
