import React from "react";

export default class BatchForm extends React.Component {
  constructor() {
    super()
  }

  render(){

    return(
        <div>
          <form className="form-horizontal">
            <fieldset>
              <legend>Details</legend>
              <div className="form-group">
                <label htmlFor="apiKey" className="col-lg-2 control-label">API Key</label>
                <div className="col-lg-10">
                  <input type="text" className="form-control" id="apiKey" onChange={this.props.onApiChange}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="amount" className="col-lg-2 control-label">Charge Amount: $</label>
                <div className="col-lg-10">
                  <input type="number" className="form-control" id="amount" value="95.00" onChange={this.props.onAmountChange}/>
                </div>
              </div>
            </fieldset>
          </form>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button className='btn' onClick={this.props.onSubmit}>Submit Batch Transaction</button>
            </div>
          </div>
        </div>
    )
  }
}
