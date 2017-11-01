import React from "react";

export default class BatchResultRow extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0
    }
  }

  render(){
    if(this.props.props === undefined){
      return (
        <tr></tr>
      )
    }else{
      const xml = this.props.props;
      const txn_type = xml.getElementsByTagName("card-transaction-type")[0].childNodes[0].nodeValue;
      const merchant_txn_id = xml.getElementsByTagName("merchant-transaction-id")[0].childNodes[0].nodeValue;
      const recurring_txn = xml.getElementsByTagName("recurring-transaction")[0].childNodes[0].nodeValue;
      const desc = xml.getElementsByTagName("soft-descriptor")[0].childNodes[0].nodeValue;
      const amount = xml.getElementsByTagName("amount")[0].childNodes[0].nodeValue;
      const currency = xml.getElementsByTagName("currency")[0].childNodes[0].nodeValue;
      const vaulted_shopper_id = xml.getElementsByTagName("vaulted-shopper-id")[0].childNodes[0].nodeValue;
      const processing_info = xml.getElementsByTagName("processing-info")[0];
      const processing_status = processing_info.children[0].childNodes[0].nodeValue;
      var processing_error = "";
      var processing_error_name = "";
      var processing_error_desc = "";
      if(processing_status === "FAIL"){
        processing_error = processing_info.children[1].children[0].children[0].childNodes[0].nodeValue;
        processing_error_name = processing_info.children[1].children[0].children[1].childNodes[0].nodeValue;
        processing_error_desc = processing_info.children[1].children[0].children[2].childNodes[0].nodeValue;
      }
      return(
        <tr>
          <td>{txn_type}</td>
          <td>{merchant_txn_id}</td>
          <td>{recurring_txn}</td>
          <td>{desc}</td>
          <td>{amount}</td>
          <td>{currency}</td>
          <td>{vaulted_shopper_id}</td>
          <td>{processing_status}</td>
          <td>{processing_status !== "SUCCESS" ? processing_error : "N/A"}</td>
          <td>{processing_status !== "SUCCESS" ? processing_error_name : "N/A"}</td>
          <td>{processing_status !== "SUCCESS" ? processing_error_desc : "N/A"}</td>
        </tr>
      );
    }
  }
}
