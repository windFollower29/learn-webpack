
// import hot from './hot'

import { hot } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import Category from './Category'


const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  )
}

render(App)


