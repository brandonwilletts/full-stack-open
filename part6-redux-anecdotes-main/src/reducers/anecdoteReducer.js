import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const changedAnecdote = action.payload
      return (
        state
          .map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
          .sort((a, b) => b.votes - a.votes)
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    const newVotes = anecdote.votes + 1
    const updatedAnecdoteObject = {
      ...anecdote,
      votes: newVotes
    }
    const updatedAnecdote = await anecdoteService.update(updatedAnecdoteObject)
    dispatch(addVote(updatedAnecdote))
  }
}

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer