import React, { Component } from "react";

class Quiz extends Component {
  //console.log(props.userData.apelido);

  render() {
    const { apelido } = this.props.userData;

    return (
      <div>
        <h2>Apelido: {apelido}</h2>
      </div>
    );
  }
}

export default Quiz;
