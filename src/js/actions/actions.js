import axios from "axios";

export function postTransactions(serializedXml, apiKey) {
  return function(dispatch) {
    dispatch({type: "MAKING_REQUEST", payload: true});
    axios.post("http://ec2-52-39-33-214.us-west-2.compute.amazonaws.com:8080/api", {api: apiKey, xml: serializedXml}).then(response => {
      dispatch({type: "POST_TRANSACTIONS", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function findBatch(batchId, apiKey) {
  return function(dispatch) {
    axios.post("http://ec2-52-39-33-214.us-west-2.compute.amazonaws.com:8080/api/findBatch", {apiKey: apiKey, batchId: batchId}).then(response => {
      dispatch({type: "FIND_BATCH", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}
