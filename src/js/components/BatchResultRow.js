import React from "react";

export default class BatchResultRow extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0
    }
  }

  render(){
    if(this.props.props === undefined){
      return (
        <tr></tr>
      )
    }else{
      const TdComponents = this.props.props.map(data => {
        this.state.id+=1;
        return <td key={this.state.id}>{data}</td>
      })
      return(
        <tr>
          {TdComponents}
        </tr>
      );
    }
  }
}
