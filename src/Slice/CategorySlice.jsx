import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import axios from "axios";

const apiUrl = 'http://localhost:4000/products';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(apiUrl)
    return response.data
})

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
    const response = await axios.post(apiUrl, category)
    return response.data
})

export const editCategory = createAsyncThunk('categories/editCategory', async ({id, category}) => {
    const response = await axios.put(`${apiUrl}/${id}`, category)
    return response.data
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
     await axios.delete(`${apiUrl}/${id}`)
     return id
})

export const CategorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: "nothing"
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.items = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(addCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeed'
                state.items.push(action.payload)
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(editCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.status = 'succeed'
                const index = state.item.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload)
            })

    }
})
export default CategorySlice.reducer