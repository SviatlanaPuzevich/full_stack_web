import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js"
import {setNotification} from "./notificationReducer.js";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes (state, {payload}) {
      return payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload.id
      return state.map((item) =>
        item.id === id ? action.payload : item
      )
    }
  }
})

export const {setAnecdotes, createAnecdote, voteFor} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
    return async (dispatch) => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const savedAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(savedAnecdote))
      dispatch(setNotification(`you saved ${savedAnecdote.content}`, 5))
    } catch (error) {
      console.error(error)
    }
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    try {
      const updatedAnecdote = await anecdoteService.update(anecdote)
      dispatch(voteFor(updatedAnecdote))
      dispatch(setNotification(`you voted for ${updatedAnecdote.content}`, 5))
    } catch (error) {
      console.error(error)
    }
  }
}