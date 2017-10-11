export default function reducer(state = {
  response: null,
  batchData: null
}, action) {

  switch (action.type) {
    case "POST_TRANSACTIONS": {
      return {...state, response: action.payload}
    }
    case "FIND_BATCH": {
      return {...state, batchData: action.payload}
    }
    default: {
      return state
    }

  }

}
