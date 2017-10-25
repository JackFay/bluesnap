import axios from "axios";
import config from "../../config";

export function postTransactions(serializedXml, apiKey) {
  return function(dispatch) {
    dispatch({type: "MAKING_REQUEST", payload: true});
    axios.post(config.hostname + "/api", {api: apiKey, xml: serializedXml}).then(response => {
      dispatch({type: "POST_TRANSACTIONS", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function findBatch(batchId, apiKey) {
  return function(dispatch) {
    dispatch({type: "MAKING_REQUEST", payload: true});
    axios.post(config.hostname + "/api/findBatch", {apiKey: apiKey, batchId: batchId}).then(response => {
      dispatch({type: "FIND_BATCH", payload: response.data});
    }).catch(error => {
      console.log(error);
    });
  }
}

export function postBatchMetaData(batchId, csv, res_code, res_message, res_body) {
  return function(dispatch) {
    axios.post(config.hostname + "/api/postBatchMetaData",
     {batchId: batchId,
      csvPath: csv,
      res_code: res_code,
      res_message: res_message,
      res_body: res_body}).then(response => {
        console.log({batchId: batchId,
         csvPath: csv,
         res_code: res_code,
         res_message: res_message,
         res_body: res_body});
        console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}
