import React from "react";
import {connect} from "react-redux";
import Nav from "../components/Nav";
import ReactFileReader from 'react-file-reader';
import {CSVToArray} from '../utils/utils'
import {generateXML} from '../utils/utils';
import {StringToXML} from '../utils/utils';
import {postTransactions} from '../actions/actions';
import DataRow from '../components/DataRow';
import TableHeader from '../components/TableHeader';
import BatchForm from '../components/BatchForm';
import axios from "axios";

@connect((store) => {
  return {
    transactions: store.main.response,
  };
})
export default class Dashboard extends React.Component{


    constructor(){
        super()

    }

    componentWillMount(){
      this.state = {
        csvData: [],
        csvUploaded: false,
        amount: null,
        apiKey: null
      }
    }

    handleFiles(files){
      var reader = new FileReader()
      reader.onload = function(e) {
        this.setState({
          csvData: CSVToArray(reader.result),
          csvUploaded: true,
          showSubmit: true
        })
        console.log(CSVToArray(reader.result))
      }.bind(this)
      reader.readAsText(files[0])

    }

    onAmountChange(e){
      this.state.amount = e.target.value;
    }

    onApiChange(e){
      this.state.apiKey = e.target.value;
    }

    onSubmit(){
      console.log("Submitting...printing xml...")
      var xmlString = generateXML(this.state.csvData);
      var xml = StringToXML(xmlString)
      var serializedXml = new XMLSerializer().serializeToString(xml);
      console.log(serializedXml);
      this.props.dispatch(postTransactions(serializedXml, this.state.apiKey));
    }

    render(){
        const { location } = this.props;
        const {csvData} = this.state;
        const {csvUploaded} = this.state;
        var headers = []
        if(csvData){
          headers = csvData.shift();
        }
        const DataRowComponents = csvData.map(csv => {
          if(csv.length > 1){
            console.log("the key is: " + csv[0]);
            return <DataRow key={csv[0]} props={csv} />
          }
        })

        if(this.props.transactions !== null){
          const xml = StringToXML(this.props.transactions.body);
          console.log(xml);
          let processing_error_desc = "";
          if(xml.getElementsByTagName("processing-error-description")[0] != undefined){
            processing_error_desc = xml.getElementsByTagName("processing-error-description")[0].childNodes[0].nodeValue;
          }
          return (
              <div>
                <Nav location={location} />
                <div className="jack-container">
                  <div className="jumbotron">
                    <h1>Response Code: {this.props.transactions.status}</h1>
                    <h3>Message: {this.props.transactions.message}</h3>
                    <h3>Description: {processing_error_desc}</h3>
                  </div>
                </div>
              </div>
          )
        }
        return(
          <div>
            <Nav location = {location} />
            <div className="container jack-container">
              <div className="jumbotron">
                <p>Upload CSV</p>
                <ReactFileReader handleFiles={this.handleFiles.bind(this)}>
                  <button className='btn'>Upload</button>
                </ReactFileReader>
              </div>
              <div className="jack-table">
                <table className="table table-striped">
                  <thead>
                    <TableHeader props={headers} />
                  </thead>
                  <tbody>
                    {DataRowComponents}
                  </tbody>
                </table>
              </div>
              <div className="jack-form">
                {csvUploaded ? <BatchForm onSubmit={this.onSubmit.bind(this)} onAmountChange={this.onAmountChange.bind(this)} onApiChange={this.onApiChange.bind(this)}/> : null}
              </div>
            </div>
          </div>
        );
    }
}
