export default function reducer(state = {
  response: null,
  batchData: null,
  loading: false,
}, action) {

  switch (action.type) {
    case "MAKING_REQUEST": {
      return {...state, loading: action.payload}
    }
    case "POST_TRANSACTIONS": {
      return {...state, response: action.payload, loading: false}
    }
    case "FIND_BATCH": {
      return {...state, batchData: action.payload, loading: false}
    }
    default: {
      return state
    }

  }

}
