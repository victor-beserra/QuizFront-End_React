import React from 'react'
import Quiz from "./Quiz"


class Inicial extends React.Component {
  render() {
    return (
      <div>
        <div class="question-image"></div>
        <h1>Quiz Front-end !</h1>
        <Quiz />
      </div>
    );
  }
  }
  
  export default Inicial;