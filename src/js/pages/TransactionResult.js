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
    loading: store.main.loading,
    response_message: store.main.response_message
  };
})
export default class TransactionResult extends React.Component{


    constructor(){
        super()
        this.state = {
          batchId: 0,
        }
    }

    onBatchIdChange(e){
      this.state.batchId = e.target.value.toUpperCase();
    }

    onSubmit(){
      this.props.dispatch(findBatch(this.state.batchId));
    }

    render(){
        const { location } = this.props;
        const {batchData} = this.props;
        const xml = StringToXML(batchData);
        const cardTransactions = xml.getElementsByTagName("card-transaction");
        const errors = xml.getElementsByTagName("processing-errors");
        const {response_message} = this.props;
        var error = false;
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
                </fieldset>
              </form>
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <div className="error">
                    {response_message !== null && response_message !== 'OK' ? response_message : null}
                    {error !== false ? error : null}
                  </div>
                  <button className='btn btn-default' disabled={this.props.loading} onClick={this.onSubmit.bind(this)}>{this.props.loading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : "Find Batch Transaction"}</button>
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
