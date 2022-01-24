import React, {Component} from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from './components/AddProduct';
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

import Context from "./context/Context";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user: null,
      cart:{},
      products:[]
    };
    this.routerRef = React.createRef();
  }
  render(){
    return(
      <Context.Provider
        value ={
          {
            ...this.state,
            removeFromCart: this.removeFromCart,
            addToCart: this.addToCart,
            login: this.login,
            addProduct: this.addProduct,
            clearCart: this.clearCart,
            checkout: this.checkout
          }
        }
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav className="navbar container" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <b className="navbar-item is-size-4">ecommerce</b>
                <label 
                  role="button"
                  class="navbar-burger burger"
                  aria-label= "menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onclick={e =>{
                    e.preventDefault();
                    this.setState({showMenu: !this.state.showMenu});
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div >

              </div>
            </nav>
          </div>
        </Router>
      </Context.Provider>
    )
  }
}