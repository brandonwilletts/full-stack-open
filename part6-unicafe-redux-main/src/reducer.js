// import { ok } from "assert"

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGoodCount = state.good + 1
      return { ...state, good: newGoodCount }
    case 'OK':
      const newOkCount = state.ok + 1
      return { ...state, ok: newOkCount }
    case 'BAD':
      const newBadCount = state.bad + 1
      return { ...state, bad: newBadCount }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }

}

export default counterReducer
