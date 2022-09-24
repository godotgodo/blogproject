import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  reducers: {
    addFavorite:(state,action)=>{
        state.value.push(action.payload);
    },
    deleteFavorite:(state,action)=>{
        for (var i = 0; i < state.value.length; i++) {
            if (state.value[i].title === action.payload.title) {
                state.value.splice(i, 1);
            }
        }
    }
  },
})

export const { addFavorite,deleteFavorite} = favoritesSlice.actions

export default favoritesSlice.reducer