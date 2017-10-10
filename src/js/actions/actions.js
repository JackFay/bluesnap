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
