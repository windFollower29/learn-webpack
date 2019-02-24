import React, { Component } from 'react'
import { hot } from 'react-hot-loader';

import Hmr from './Hmr'

const App = props => {
  
  return (
    <div>
      hello world---
      <Hmr />
    </div>
  )
}

export default hot(module)(App)