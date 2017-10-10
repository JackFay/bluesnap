import React from "react";

export default class TableHeader extends React.Component {
  constructor() {
    super()
  }

  render(){
    if(this.props.props === undefined){
      return (
        <tr></tr>
      )
    }else{
      const TdComponents = this.props.props.map(header => {
        return <td>{header}</td>
      })
      return(
        <tr>
          {TdComponents}
        </tr>
      );
    }
  }
}
