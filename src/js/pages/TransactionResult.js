import React from "react";
import {connect} from "react-redux";
import Nav from "../components/Nav";
import DataRow from '../components/DataRow';
import TableHeader from '../components/TableHeader';
import BatchForm from '../components/BatchForm';
import axios from "axios";

@connect((store) => {
  return {
    transaction: store.main.transactions,
  };
})
export default class TransactionResult extends React.Component{


    constructor(){
        super()
    }

    render(){
        const { location } = this.props;
        const {transaction} = this.props;
        console.log(transaction);
        return(
          <div>
            <Nav location={location} />
            <div className="container">
              <p>{transaction}</p>
            </div>
          </div>
        );
    }
}
