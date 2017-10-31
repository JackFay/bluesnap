export default function reducer(state = {
  response: null,
  batchData: null,
  loading: false,
  response_message: null,
}, action) {

  switch (action.type) {
    case "MAKING_REQUEST": {
      return {...state, loading: action.payload}
    }
    case "POST_TRANSACTIONS": {
      return {...state, response: action.payload, loading: false}
    }
    case "FIND_BATCH": {
      console.log(action.payload);
      return {...state, batchData: action.payload.body, loading: false, response_message: action.payload.message}
    }
    default: {
      return state
    }

  }

}
