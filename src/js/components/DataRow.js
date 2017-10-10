import React from "react";

export default class DataRow extends React.Component {
  constructor() {
    super()
  }

  render(){
    if(this.props.props === undefined){
      return (
        <tr></tr>
      )
    }else{
      const TdComponents = this.props.props.map(data => {
        return <td>{data}</td>
      })
      return(
        <tr>
          {TdComponents}
        </tr>
      );
    }
  }
}
