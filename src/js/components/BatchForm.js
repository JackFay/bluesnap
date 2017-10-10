import React from "react";

export default class BatchForm extends React.Component {
  constructor() {
    super()
  }

  render(){

    return(
        <div>
          <form class="form-horizontal">
            <fieldset>
              <legend>Details</legend>
              <div class="form-group">
                <label for="apiKey" class="col-lg-2 control-label">API Key</label>
                <div class="col-lg-10">
                  <input type="text" class="form-control" id="apiKey" onChange={this.props.onApiChange}/>
                </div>
              </div>
              <div class="form-group">
                <label for="amount" class="col-lg-2 control-label">Charge Amount: $</label>
                <div class="col-lg-10">
                  <input type="number" class="form-control" id="amount" value="95.00" onChange={this.props.onAmountChange}/>
                </div>
              </div>
            </fieldset>
          </form>
          <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
              <button className='btn' onClick={this.props.onSubmit}>Submit Batch Transaction</button>
            </div>
          </div>
        </div>
    )
  }
}
