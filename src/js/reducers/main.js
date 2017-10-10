export default function reducer(state = {
  transactions: null,
}, action) {

  switch (action.type) {
    case "POST_TRANSACTIONS": {
      return {...state, transactions: action.payload}
    }
    default: {
      return state
    }

  }

}
