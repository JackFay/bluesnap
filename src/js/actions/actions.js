import axios from "axios";

export function postTransactions(serializedXml, apiKey) {
  return function(dispatch) {
    console.log("API Key: " + apiKey);
    axios.post("http://localhost:8080/api", {api: apiKey, xml: serializedXml}).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}
