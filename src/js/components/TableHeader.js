import React from "react";

export default class TableHeader extends React.Component {
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
      const TdComponents = this.props.props.map(header => {
        this.state.id+=1;
        return <td key={this.state.id}>{header}</td>
      })
      return(
        <tr>
          {TdComponents}
        </tr>
      );
    }
  }
}
