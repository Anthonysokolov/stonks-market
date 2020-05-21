import React, { Component } from "react";
import Navbar from "./../containers/navbar";
import ShareCard from "./../containers/shareCard";
import Button from "../views/Button.jsx";
import Status from "../views/Status.jsx";
import OrderForm from "./../containers/orderForm"

//import { fetchSessionsThunk } from "../../thunks";
import { connect } from "react-redux";

import "./../views/userHomePage.css";

class UserHomePage extends Component {
  constructor(props) {
    super(props);
    //this.props.fetchAllSessions();
  }

  render() {
    //let portfolio = this.props.portfolio;
    let portfolio = [{ticker:'TSLA',shares:2},{ticker:'AAPL',shares:3},{ticker:"AMD",shares:5}]
    if (portfolio === undefined) {
      portfolio = [];
    }

    return (
      <div>
        <Navbar />
        <h1 className="centered">Stonk Exchange</h1>
        <div>
          {(portfolio.length > 0) ?
            (
            portfolio.map(stock => (
              <ShareCard ticker={stock.ticker} numShares={stock.shares}/>
            ))
          )
            :
            (<p className="card-subtitle centered">Welcome! Go buy some stocks!</p>)
          }
        </div>
        <OrderForm/>
      </div>
    );
  }
}

function mapState(state) {
  return {
    trades: state.sessions.list,
    status: state.sessions.status,
    message: state.sessions.message
  };
}

function mapDispatch(dispatch) {
  return {
    //fetchAllSessions: () => dispatch(fetchSessionsThunk())
  };
}

export default connect(mapState, mapDispatch)(UserHomePage);
/*  <div className="centered"><Button to="/session/add">Add</Button></div>
  {sessions.map((session, index) => {
    return <SessionCard {...session} key={session.id} index={index + 1} />;
  })} */
