import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"

@connect((store) => {
  return {
  }
})
export default class Nav extends React.Component {
  constructor() {
    super()
  }



  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Batch Transaction Uploader</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/findBatch">Find Batch<span className="sr-only">(current)</span></Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
