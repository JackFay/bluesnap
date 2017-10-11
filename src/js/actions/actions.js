import axios from "axios";

export function postTransactions(serializedXml, apiKey) {
  return function(dispatch) {
    console.log("API Key: " + apiKey);
    axios.post("http://localhost:8080/api", {api: apiKey, xml: serializedXml}).then(response => {
      dispatch({type: "POST_TRANSACTIONS", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function findBatch(batchId, apiKey) {
  return function(dispatch) {
    axios.post("http://localhost:8080/api/findBatch", {apiKey: apiKey, batchId: batchId}).then(response => {
      dispatch({type: "FIND_BATCH", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}
