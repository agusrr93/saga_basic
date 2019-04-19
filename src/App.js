import React, { Component } from "react";
import {Provider} from 'react-redux'
import {store} from './store/index'
import { Route, Switch,BrowserRouter} from "react-router-dom"
import Detail from './component/Detail'
import Cart from './component/Cart'
import Checkout from './component/Checkout'
import {Parent} from './component/View'

class App extends Component {
  render() {
      return(
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Parent}/>
                <Route path='/detail/:itemId' component={Detail}/>
                <Route path='/cart/:tokenId' component={Cart}/>
                <Route path='/checkout' component={Checkout}/>
            </Switch>
          </BrowserRouter>
        </Provider>
      )
  }
}

export default App
