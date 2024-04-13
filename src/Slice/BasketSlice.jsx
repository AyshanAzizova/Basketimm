import {
    createSlice
} from "@reduxjs/toolkit";

export const BasketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: []
    },
    reducers: {
        addBasket: (state, action) => {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id)
            if (existingIndex >= 0) {
                state.items[existingIndex].count += 1
            } else {
                const newItem = {
                    ...action.payload,
                    count: 1
                }
                state.items.push(newItem)
            }
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                if (state.items[index] > 1) {
                    state.items[index].count -= 1
                } else {
                    state.items = state.items.filter(item => item.id !== action.payload.id)
                }
            }
        },
    }
})
export const {addBasket,removeItem} = BasketSlice.actions

export default BasketSlice.reducer