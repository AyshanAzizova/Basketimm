import {
    configureStore
} from '@reduxjs/toolkit'
import CategorySlice from './Slice/CategorySlice'
import BasketSlice from './Slice/BasketSlice'


export const Store = configureStore({
    reducer: {
        categories: CategorySlice,
        basket: BasketSlice
    }
})