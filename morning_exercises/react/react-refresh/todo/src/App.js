import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Todos from './components/Todos'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Todos />
      </div>
    )
  }
}

export default App
