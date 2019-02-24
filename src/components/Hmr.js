import { hot } from 'react-hot-loader'

import React, { Component } from 'react'
import {
  Input
} from 'antd'

class Hmr extends Component {

  state = {
    title: '',
    content: ''
  }

  onChange = (field, val) => {
    console.log('onChange')
    this.setState({ [field]: val })
  }

  render () {

    const {
      title,
      content,
    } = this.state

    return (
      <div>
        <Input value={title}
          onChange={e => this.onChange('title', e.target.value)}
        />
        <Input value={content} 
          onChange={e => this.onChange('content', e.target.value)}
        />
      </div>
    )
  }
}

// export default hot(module)(Hmr)
export default Hmr