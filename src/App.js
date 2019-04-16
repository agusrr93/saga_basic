import React, { Component } from "react";
import {Provider} from 'react-redux'
import {store} from './store/index'
import {Parent} from './component/View'

class App extends Component {
  render() {
      return(
        <Provider store={store}>
            <Parent hello='hhe' keenof='hha'></Parent>
        </Provider>
      )
  }
}

export default App
