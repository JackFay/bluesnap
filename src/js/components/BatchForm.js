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
            </fieldset>
          </form>
          <div className="form-group container">
            <div>
              <button disabled={this.props.loading} className='btn btn-default' onClick={this.props.onSubmit}>{this.props.loading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : "Submit Batch Transaction"}</button>
            </div>
          </div>
        </div>
    )
  }
}
