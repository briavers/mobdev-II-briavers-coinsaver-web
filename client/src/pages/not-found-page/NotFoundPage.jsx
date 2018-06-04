import React, { Component } from 'react';

/*
Component styles
*/
import './NotFoundPage.css';

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-5 col-sm-5 col-md-2 col-lg-3 col-xl-5"> </div>
        <div className="col-xs-7 col-sm-7 col-md-10 col-lg-9 col-xl-7 MainPageMainDiv">
          <h1>Start saving now</h1>
          <h2> <span className="colorPink">oops Something went wrong</span> </h2>

          <div className="logoHomePage">
            <img src="./uploads/piggyBank.png" alt="logo" />
            <h2 className="colorYellow">CoinSaver</h2>
          </div>
        </div>
      </div>

    )
  }
}

export default (NotFoundPage);