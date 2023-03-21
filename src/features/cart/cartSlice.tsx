import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  info: {
    id: number;
    number: number;
  }[];
}

const initialState: CartState = {
  info: [{ id: 0, number: 0 }],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.info.filter((item) => item.id === action.payload)[0].number += 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.info.filter((item) => item.id === action.payload)[0].number -= 1;
    },

    /**
     * 		so what is PayloadAction...
     */
    setValue: (state, action: PayloadAction<number>) => {
      state.info.filter((item) => item.id === action.payload)[0].number =
        action.payload;
    },
  },
});

export const { increment, decrement, setValue } = cartSlice.actions;

export const selectNumber = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
