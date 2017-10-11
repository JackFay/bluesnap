import React from "react";
import {connect} from "react-redux";
import {findBatch} from "../actions/actions";
import {StringToXML} from "../utils/utils";
import BatchResultRow from "../components/BatchResultRow";
import Nav from "../components/Nav";
import DataRow from '../components/DataRow';
import TableHeader from '../components/TableHeader';
import BatchForm from '../components/BatchForm';
import axios from "axios";

@connect((store) => {
  return {
    batchData: store.main.batchData,
  };
})
export default class TransactionResult extends React.Component{


    constructor(){
        super()
        this.state = {
          batchId: 0,
          apiKey: null,
        }
    }

    onBatchIdChange(e){
      this.state.batchId = e.target.value;
    }

    onApiChange(e){
      this.state.apiKey = e.target.value;
    }

    onSubmit(){
      this.props.dispatch(findBatch(this.state.batchId, this.state.apiKey));
    }

    render(){
        const { location } = this.props;
        const {batchData} = this.props;
        const xml = StringToXML(batchData);

        const cardTransactions = xml.getElementsByTagName("card-transaction");
        console.log(cardTransactions);
        var cardTxnsArray = [];
        for(var i = cardTransactions.length; i--; cardTxnsArray.unshift(cardTransactions[i]));
        const BatchResultRows = cardTxnsArray.map((txn, index) => {
          return <BatchResultRow key={index} props={txn} />
        })

        return(
          <div>
            <Nav location={location} />
            <div className="jack-form">
              <form className="form-horizontal">
                <fieldset>
                  <legend>Details</legend>
                  <div className="form-group">
                    <label htmlFor="batchId" className="col-lg-2 control-label">Batch ID: </label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" id="batchId" onChange={this.onBatchIdChange.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="apiKey" className="col-lg-2 control-label">API Key: </label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" id="apiKey" onChange={this.onApiChange.bind(this)}/>
                    </div>
                  </div>
                </fieldset>
              </form>
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <button className='btn' onClick={this.onSubmit.bind(this)}>Find Batch Transaction</button>
                </div>
              </div>
            </div>
            <div className="jack-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td>Transaction Type</td>
                    <td>Merchant Id</td>
                    <td>Recurring Transaction</td>
                    <td>Description</td>
                    <td>Amount</td>
                    <td>Currency</td>
                    <td>Shopper Id</td>
                    <td>Processing Status</td>
                    <td>Error Code</td>
                    <td>Error Name</td>
                    <td>Error Description</td>
                  </tr>
                </thead>
                <tbody>
                  {BatchResultRows}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}
