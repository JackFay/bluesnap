import React from "react";
import {connect} from "react-redux";
import Nav from "../components/Nav";
import ReactFileReader from 'react-file-reader';
import {CSVToArray} from '../utils/utils'
import {generateXML} from '../utils/utils';
import {StringToXML} from '../utils/utils';
import {postTransactions} from '../actions/actions';
import {postBatchMetaData} from '../actions/actions';
import DataRow from '../components/DataRow';
import TableHeader from '../components/TableHeader';
import BatchForm from '../components/BatchForm';
import axios from "axios";

@connect((store) => {
  return {
    transactions: store.main.response,
    loading: store.main.loading,
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
        batchId: "",
        csvName: "",
      }
    }

    handleFiles(e){
      var reader = new FileReader()
      reader.onload = function(e) {
        this.setState({
          csvData: CSVToArray(reader.result),
          csvUploaded: true,
          showSubmit: true,
          csvName: reader.fileName,
        })
      }.bind(this);
      reader.fileName = e.target.files[0].name;
      reader.readAsText(e.target.files[0]);
    }

    onBatchIdChange(e){
      this.state.batchId = e.target.value.toUpperCase();
    }

    onSubmit(){
      if(this.state.batchId === ""){
        alert("please fill out all the fields");
        return;
      }
      var xmlString = generateXML(this.state.csvData, this.state.batchId);
      var xml = StringToXML(xmlString);
      var serializedXml = new XMLSerializer().serializeToString(xml);
      this.props.dispatch(postTransactions(serializedXml));
    }

    postBatchMetaData(error_body){
      const batchId = this.state.batchId;
      const csv = this.state.csvName;
      const res_code = this.props.transactions.status;
      const res_message = this.props.transactions.message;
      const res_body = error_body
      this.props.dispatch(postBatchMetaData(batchId, csv, res_code, res_message, res_body));
    }

    render(){
        const { location } = this.props;
        const {csvData} = this.state;
        const {csvUploaded} = this.state;
        const {loading} = this.props;
        var headers = []
        if(csvData){
          headers = csvData.shift();
        }
        const DataRowComponents = csvData.map(csv => {
          if(csv.length > 1){
            return <DataRow key={csv[0]} props={csv} />
          }
        })

        if(this.props.transactions !== null){
          const xml = StringToXML(this.props.transactions.body);
          let processing_error_desc = "";
          if(xml.getElementsByTagName("processing-error-description")[0] != undefined){
            processing_error_desc = xml.getElementsByTagName("processing-error-description")[0].childNodes[0].nodeValue;
          }
          this.postBatchMetaData(processing_error_desc);
          return (
              <div>
                <Nav location={location} />
                <div className="container">
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
            <div className="container">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="batchId" className="col-lg-2">Batch ID: </label>
                  <div className="col-lg-10">
                    <input type="text" className="form-control" id="batchId" onChange={this.onBatchIdChange.bind(this)}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="uploadCsv" className="col-lg-2">Upload CSV: </label>
                  <div className="col-lg-10">
                    <input type="file" accept="csv/*" id="csvUploader" onChange={this.handleFiles.bind(this)} />
                  </div>
                </div>
              </form>
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
                {csvUploaded ? <BatchForm onSubmit={this.onSubmit.bind(this)} loading={loading}/> : null}
              </div>
            </div>
          </div>
        );
    }
}
