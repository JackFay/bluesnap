import axios from "axios";
const hostname = process.env.NODE_ENV === 'production' ? 'http://ec2-52-39-33-214.us-west-2.compute.amazonaws.com:8080' : 'http://ec2-52-39-33-214.us-west-2.compute.amazonaws.com:8090';

export function postTransactions(serializedXml, apiKey) {
  return function(dispatch) {
    dispatch({type: "MAKING_REQUEST", payload: true});
    axios.post("/api", {api: apiKey, xml: serializedXml}).then(response => {
      dispatch({type: "POST_TRANSACTIONS", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function findBatch(batchId, apiKey) {
  return function(dispatch) {
    axios.post(hostname + "/api/findBatch", {apiKey: apiKey, batchId: batchId}).then(response => {
      dispatch({type: "FIND_BATCH", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function postBatchMetaData(batchId, csv, res_code, res_message, res_body) {
  return function(dispatch) {
    axios.post(hostname + "/api/postBatchMetaData",
     {batchId: batchId,
      csvPath: csv,
      res_code: res_code,
      res_message: res_message,
      res_body: res_body}).then(response => {
    }).catch(error => {
      console.log(error);
    });
  }
}
