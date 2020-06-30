import React, { Component } from "react";
import Navbar from "./../containers/navbar";
import ShareCard from "./../containers/shareCard";
import Button from "../views/Button.jsx";
import Status from "../views/Status.jsx";
import OrderForm from "./../containers/orderForm"

//import { fetchSessionsThunk } from "../../thunks";
import { connect } from "react-redux";

import "./../views/userHomePage.css";
import "../../styles/card.css"


import { fetchStockPrice, getBalance } from "../../thunks";


class UserHomePage extends Component {
  constructor(props) {
    super(props);
    //this.props.fetchAllSessions();
  }

  componentDidMount(){
    this.props.getBalance()
    let portfolio = [{ticker:'TSLA',shares:2},{ticker:'AAPL',shares:3},{ticker:"AMD",shares:5}]
    portfolio.map(stock=>(
      this.props.fetchStockPrice(stock.ticker)
    ))
  }

  render() {
    //let portfolio = this.props.portfolio;
    let portfolio = [{ticker:'TSLA',shares:2},{ticker:'AAPL',shares:3},{ticker:"AMD",shares:5}]
    if (portfolio === undefined) {
      portfolio = [];
    }

    const shareCards = []
    for(var key of Object.keys(this.props.prices)){
      shareCards.push(<ShareCard ticker={key} price={this.props.prices[key]}/>)
    }
    return(<div >
            <Navbar/>
            <h1 className="centered">Stonk Exchange</h1>
            <p className="centered"> Funds: {this.props.funds} </p>
            <div>
            {shareCards}
            </div>
            <OrderForm/>
          </div>)
  }
}

function mapState(state){
  return {
    prices: state.ticker.prices,
    loading: state.ticker.loading,
    numStocks: state.ticker.num,
    funds:state.ticker.balance
  }
}

function mapDispatch(dispatch){
  return{
    fetchStockPrice: (ticker) => dispatch(fetchStockPrice(ticker)),
    getBalance: () => dispatch(getBalance())
  }
}

export default connect(mapState, mapDispatch)(UserHomePage);
/*  <div className="centered"><Button to="/session/add">Add</Button></div>
  {sessions.map((session, index) => {
    return <SessionCard {...session} key={session.id} index={index + 1} />;
  })} */
