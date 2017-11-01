import React from "react";

export default class BatchForm extends React.Component {
  constructor() {
    super()
  }

  render(){

    return(
        <div>
          <div className="form-group container">
            <div>
              <button disabled={this.props.loading} className='btn btn-default' onClick={this.props.onSubmit}>{this.props.loading ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : "Submit Batch Transaction"}</button>
            </div>
          </div>
        </div>
    )
  }
}
