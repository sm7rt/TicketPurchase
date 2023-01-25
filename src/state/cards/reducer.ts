import { createReducer } from '@reduxjs/toolkit'
import {
  setCard,
} from './actions'

export const initialState = {
  data: [
    {id: 1, cardNumber: "4916169439743889", exp: "02/20", cardName: "Test Card", cvc: "294", cardType: "visa" }
  ]
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setCard, (state: any, action: any) => {
      state.data = [action.payload, ...state.data]
    })
)
