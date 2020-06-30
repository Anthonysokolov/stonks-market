import axios from "axios";

const ALPHA_KEY = "LQUHERWTP5QAK2JU"
const GET_DATA = "FETCH_TICKER_DATA"
const GET_BALANCE = "GET_BALANCE"
const API_ERROR = "API_ERROR"
const PLACE_ORDER = "PLACE_ORDER"
const INVALID_ORDER = "INVALID_ORDER"


function fetchAction(data){
  return{
    type:GET_DATA,
    symbol: data["01. symbol"],
    price: data["05. price"]
    //payload:{symbol:data["01. symbol"], price:[data["05. price"]]}
  }
}

function handleError(){
  return{
    type:API_ERROR,
  }
}

function handleGetBalance(data){
  return{
    type:GET_BALANCE,
    balance: data[0].balance
  }
}

function handlePlaceOrder(balance,numShares,data){
  let symbol = data["01. symbol"]
  let price = data["05. price"]

  if(balance > (price * numShares)){
    deductFundsAndUpdateStocks(price, symbol, numShares)
  }else{
    return{
      type:INVALID_ORDER
    }
  }
}

function deductFundsAndUpdateStocks(amount, ticker, numShares){
  let deductBy = amount * numShares
  axios
    .post("/api/users/deduct")
    .then(function(response){
      placeOrder(ticker, numShares)
    })
    .catch(function(response){
      console.log("Error", response)
    })
}


export function getBalance(){
  return function(dispatch){
    axios
      .get("/api/users/balance", {withCredentials:true})
      .then(function(response){
        dispatch(handleGetBalance(response.data))
      })
      .catch(function(response){
        console.log("Error", response)
      })
  }
}

export function placeOrder(ticker, numShares){
  return function(dispatch){
    axios
      .get("/api/users/balance", {withCredentials:true})
      .then(function(response){
        let balance = response.data[0].balance
        axios
          .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=LQUHERWTP5QAK2JU")
          .then(function(res){
            handlePlaceOrder(balance, numShares, res.data["Global Quote"])
          })
          .catch(function(res){
            console.log("Error", res)
          })
      })
      .catch(function(response){
        console.log("Error", response)
      })
  }
}

export function fetchStockPrice(ticker){
  return function(dispatch){
    console.log(ticker)
    axios
      .get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=LQUHERWTP5QAK2JU")
      .then(function(response){
        console.log("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + ticker + "&apikey=LQUHERWTP5QAK2JU")
        dispatch(fetchAction(response.data["Global Quote"]));
      })
      .catch(function(response){
        console.log("Error from axios:", response);
        dispatch(handleError())
      });
  };
}
// Reducer
const initialState = {prices:{}, loading:true, num:0, balance:5000}

export default function tickerReducer(state = initialState, action) {
  let nextState = state
  switch (action.type) {
    case GET_DATA:
      nextState.prices[action.symbol] = action.price
      nextState.loading = false
      nextState.num += 1
      return Object.assign({}, state, nextState);

    case GET_BALANCE:
      nextState.balance = action.balance
      return Object.assign({}, state, nextState)

    default:
      return state;
  }
}
